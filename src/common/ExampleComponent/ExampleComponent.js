import React, { Component } from 'react'
import UploadFunction from '../UploadFunction/UploadFunction.js'

class ExampleComponent extends Component {
    render() {
        let {
            img = [{}],
            clearImg,
            uploadImg,
            disabled,
            onPreview,
            editImg,
        } = this.props;
        return (
            img[0] ? (
                <div className="upload-block has-image">
                    <img onClick={()=>onPreview(img[0])} src={img[0].url} alt=""/>
                    <div>
                        <button onClick={editImg}>Edit</button>
                        <button onClick={clearImg}>Clear</button>
                    </div>
                </div>
            ) : (
                <div className="upload-block">
                    <button onClick={!disabled ? uploadImg : undefined}>Upload</button>
                </div>
            )
        )
    }
}

export default UploadFunction (ExampleComponent, {
    ratio: undefined, // set aspect ratio for cropping
    messageErrorFileType: undefined, // set text for error file type
    messageErrorFileSize: undefined, // set text for error file size
    messageSuccess: undefined, // set text for successful upload
    cropTitle: undefined, // set text for crop title
    cropButtonText: undefined, // set text for crop button
    undoButtonText: undefined, // set text for undo button
    saveButtonText: undefined, // set text for done button
    imgMaxSize: undefined, // set max file size for image
});