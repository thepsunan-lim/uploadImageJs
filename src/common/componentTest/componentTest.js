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

export default functionTest(componentTest);

