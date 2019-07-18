render() {
    let {
        img = "",
        clearImg,
        uploadImg,
        disabled
    } = this.props;

    return (
        img ? (
            <div className="upload-block has-image">
                <img src={img} />
                <div>
                    <Button onClick={uploadImg}>Edit</Button>
                    <Button onClick={clearImg}>Clear</Button>
                </div>
            </div>
        ) : (
            <div className="upload-block">
                <Icon type="file" />
                <Button onClick={!disabled ? uploadImg : undefined}>Upload</Button>
            </div>
        )
    );
}

export default PinUploadEnhancer(UploadBlock);

import React, {Component, Fragment}  from 'react'

class PinUploadEnhanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalImg: undefined,
            croppedImg: undefined
        }
        this.clearImg = this.clearImg.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
    }

    clearImg() {
        this.setState({
            originalImg: undefined,
            croppedImg: undefined
        });
        // TODO: Clear img data in Upload
    }

    uploadImg() {
        this.upload.selectFile();
    }

    render() {
        let { component, ...rest } = this.props;
        let img = this.state.croppedImg;
        let Component = component;
        return (
            <Fragment>
                <Component {...rest} img={img} clearImg={this.clearImg} uploadImg={this.uploadImg} />
                <Modal /> // Preview
                <Modal /> // Cropper
                <Upload ref={e => this.upload = e} />
            </Fragment>
        )
    }
}

PinUploadEnhancer = function(Component) {
    return (
        (props) => <PinUploadEnhanced {...props} component={Component} />
    )
}
