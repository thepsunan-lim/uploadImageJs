import React, { Component } from "react";
import "./CropImage.css";
import Cropper from "react-cropper";
import { Button } from "antd";

export default class CropImage extends Component {
  constructor(props) {
    super(props);
    const { aspectRatio = (this.props.config.ratio || this.props.ratio || 0)} = props;
    this.state = {
      ready: false,
      src: this.props.src,
      cropResult: null,
      maxWidthCrop: 520,
      maxHeightCrop: 520,
      cropped: false,
      aspectRatio,
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
  }

  componentDidMount() {
    let { top, left, width, height } = this.state;
    if (width > height) {
      left = (width - height) / 2;
    } else {
      top = (height - width) / 2;
    }
    this.cropper.cropper.setCropBoxData({ top, left });
    this.cropper.cropper.setCropBoxData({ width });
    this.setState({ top, left });
  }

  onReady = () => {
    const { naturalWidth, naturalHeight } = this.cropper.cropper.canvasData;
    const maxWidth = (window.innerWidth - 200) * 0.75;
    const maxHeight = (window.innerHeight - 200) * 0.75;

    let [width, height] = [naturalWidth, naturalHeight];

    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
    if (width > maxWidth) {
      height = (this.props.height * maxWidth) / this.props.width;
      width = maxWidth;
    }

    const { top, left } = this.cropper.cropper.getCropBoxData();
    this.setState({
      ready: true,
      top,
      left,
      width,
      height
    });
  };

  cropImage = () => {
    const { width, height } = this.cropper.cropper.getCroppedCanvas();
    const { onCropFinish } = this.props;
    const { maxWidthCrop, maxHeightCrop } = this.state;
    let cropResult = this.cropper.cropper
      .getCroppedCanvas({
        width: Math.min(width, maxWidthCrop),
        height: Math.min(height, maxHeightCrop),
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high"
      })
      .toDataURL();
    onCropFinish(cropResult);
  };

  reviewCropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    const { width, height } = this.cropper.cropper.getCropBoxData();
    this.setState({
      cropResult: this.cropper.cropper
        .getCroppedCanvas({
          width,
          height,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high"
        })
        .toDataURL(),
      cropped: true
    });
  };

  undoCropped = () => {
    const { top, left, width, height } = this.cropper.cropper.getCropBoxData();
    this.setState({ cropped: false, top, left });
    this.cropper.cropper.setCropBoxData({ width, height });
  };

  cropEnd = () => {
    const { top, left } = this.cropper.cropper.getCropBoxData();
    this.setState({ top, left });
  };

  render() {
    const CropperStyle = {
      width: this.state.width,
      height: this.state.height
    };

    const ImageStyle = {
      top: this.state.top,
      left: this.state.left
    };

    return (
      <div className="CropImage-wrap">
        <div className="CropImage">
          <div className="CropImage-cropper-wrap">
            <div
              className={
                "CropImage-cropper" + (this.state.cropped ? " hide" : "")
              }
            >
              <Cropper
                style={CropperStyle}
                autoCropArea={1}
                aspectRatio={this.state.aspectRatio}
                dragMode={"none"}
                minContainerHeight={1}
                minContainerWidth={1}
                minCropBoxHeight={CropperStyle.height * 0.2}
                guides={true}
                zoomOnWheel={false}
                movable={false}
                src={this.state.src}
                ref={cropper => {
                  this.cropper = cropper;
                }}
                cropend={this.cropEnd}
                ready={this.onReady}
                key={`Cropper-${this.state.ready}`}
              />
            </div>
            <img
              className={
                "CropImage-image" + (this.state.cropped ? " show" : "")
              }
              style={ImageStyle}
              src={this.state.cropResult}
              alt="cropped_image"
            />
          </div>
        </div>
        {!this.state.cropped ? (
          <div className="ConfirmModal-button-wrap">
            <Button key="crop" type="primary" onClick={this.reviewCropImage}>
              {this.props.config.cropButtonText || this.props.cropButtonText || "Crop"}
            </Button>
          </div>
        ) : (
          <div className="ConfirmModal-button-wrap">
            <Button key="undo" onClick={this.undoCropped}>
              {this.props.config.undoButtonText || this.props.undoButtonText || "Undo"}
            </Button>
            <Button key="save" type="primary" onClick={this.cropImage}>
              {this.props.config.saveButtonText || this.props.saveButtonText || "Save"}
            </Button>
          </div>
        )}
      </div>
    );
  }
}
