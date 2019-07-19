import React, { Component } from 'react'
import functionTest from '../functionTest/functionTest.js'

class componentTest extends Component {
    render() {
        let {
            img = [{}],
            clearImg,
            uploadImg,
            disabled,
            onPreview,
        } = this.props;
        return (
            img[0] ? (
                <div className="upload-block has-image">
                    <img onClick={()=>onPreview(img[0])} src={img[0].url} alt=""/>
                    <div>
                        <button onClick={uploadImg}>Edit</button>
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

export default functionTest (componentTest, {
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