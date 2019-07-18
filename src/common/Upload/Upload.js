import React from "react";
import { Upload, Icon, message, Modal } from "antd";
import CropImage from "./CropImage/CropImage.js";
import './Upload.css';

export default class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      cropVisible: false,
      originalFile: undefined,
      propsCropImage: {},
      previewVisible: false,
      previewImage: "",
      fileList: [],
    };
  }

  uploadButton = uploading => (
    <div>
      <Icon type={uploading ? "loading" : this.props.iconType || "plus"} />
      <div className="ant-upload-text">{this.props.uploadText || "Upload"}</div>
    </div>
  );

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = file => {
    const isPNGJPG = file.type === "image/png" || file.type === "image/jpeg";
    if (!isPNGJPG) {
      message.error(this.props.messageErrorFileType || "You can only upload (PNG, JPG) file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(this.props.messageErrorFileSize || "Image must smaller than 2MB!");
    }
    if (isPNGJPG && isLt2M) {
      const self = this;
      const fr = new FileReader();
      fr.onload = function() {
        let img = new Image();
        img.onload = function() {
          self.getBase64(file, imageUrl => {
            self.setState({
              cropVisible: true,
              originalFile: file,
              propsCropImage: {
                src: imageUrl,
                width: img.width,
                height: img.height
              }
            });
          });
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    }
    return false;
  };

  handleCancelCrop = () => this.setState({ cropVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleCancelPreview = () => this.setState({ previewVisible: false });

  handleUpload = cropImage => {
    const { originalFile } = this.state;
    const file = {
      uid: originalFile.uid,
      name: originalFile.name,
      status: "done",
      url: cropImage
    };
    this.setState({
      cropVisible: false,
      uploading: true,
      fileList: [file]
    });
    this.setState({
      uploading: false
    });
    message.success(this.props.messageSuccess || "Uploaded image successfully!");
  };

  onRemove = () => {
    this.setState({
      fileList: []
    });
  };

  render() {
    const {
      previewVisible,
      previewImage,
      uploading,
      cropVisible,
      propsCropImage,
      fileList
    } = this.state;
    return (
      <div
        className="clearfix-upload-button"
      >
        
        <Upload
          listType={"picture-card"}
          fileList={fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
        >
          {fileList.length >= 1 ? null : this.uploadButton(uploading)}
        </Upload>
        
        <Modal
          centered={true}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancelPreview}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Modal
          bodyStyle={{ minWidth: 520 }}
          width="fit-content"
          centered={true}
          destroyOnClose={true}
          title={this.props.cropTitle || "Crop Image"}
          footer={null}
          visible={cropVisible}
          onCancel={this.handleCancelCrop}
        >
          <CropImage 
            onCropFinish={this.handleUpload} 
            {...propsCropImage}
            {...this.props}
          />
        </Modal>
      </div>
    );
  }
}

