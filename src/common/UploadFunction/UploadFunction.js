import React, {Component, Fragment} from 'react';
import { Upload, message, Modal } from "antd";
import CropImage from "./CropImage/CropImage.js";

class UploadEnhancer extends Component {
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
        this.clearImg = this.onRemove.bind(this);
        this.uploadImg = this.onClickButton.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
    }
   

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    
    beforeUpload = file => {
        const isPNGJPG = file.type === "image/png" || file.type === "image/jpeg";
        if (!isPNGJPG) {
            message.error(this.props.config.messageErrorFileType || this.props.messageErrorFileType || "You can only upload (PNG, JPG) file!");
        }
        const isLt2M = file.size / 1024 / 1024 < (this.props.config.imgMaxSize || this.props.imgMaxSize || 2);
        if (!isLt2M) {
            message.error(this.props.config.messageErrorFileSize || this.props.messageErrorFileSize || "Image must smaller than 2MB!");
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
        message.success(this.props.config.messageSuccess || this.props.messageSuccess || "Uploaded image successfully!");
    };

    onRemove = () => {
        this.setState({
            fileList: []
        });
    };

    onClickButton = (event) => {
        event.preventDefault(); 
        this.upload.upload.uploader.fileInput.click();
    }

    render() {
        const {
            previewVisible,
            previewImage,
            cropVisible,
            propsCropImage,
            fileList
          } = this.state;
        let { component, ...rest } = this.props;
        let img = this.state.fileList;
        let Component = component;
        return (
            <Fragment>
                <Component {...rest} img={img} onPreview={this.handlePreview} clearImg={this.clearImg} uploadImg={this.uploadImg} editImg={this.uploadImg}/>
                <Upload 
                    ref = {
                        e => this.upload = e
                    }
                    className = "upload"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    beforeUpload={this.beforeUpload}
                    onRemove={this.onRemove}
                    showUploadList= {false}
                >
                </Upload>
                <Modal
                    bodyStyle={{ minWidth: 520 }}
                    width="fit-content"
                    centered={true}
                    destroyOnClose={true}
                    title={this.props.config.cropTitle || this.props.cropTitle || "Crop Image"}
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
                
            </Fragment>
        )
    }
}

function UploadFunction (Component, config) {
    return (
        (props) => <UploadEnhancer {...config} {...props} component={Component} />
    )
}

export default UploadFunction;

