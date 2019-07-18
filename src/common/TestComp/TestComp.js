import React from "react";
import Upload from "../Upload/Upload.js";
import "./TestComp.css";

export default function TestComp () {
  const UploadProps = {
      iconType: undefined, // you can fill type of the style of the upload box here (default is "plus", more icons at https://ant.design/components/icon/)
      uploadText: undefined, // you can fill text that shows up for "upload"
      messageErrorFileType: undefined, // set text for error file type
      messageErrorFileSize: undefined, // set text for error file size
      messageSuccess: undefined, // set text for successful upload
      cropTitle: undefined, // set text for crop title
      cropButtonText: undefined, // set text for crop button
      undoButtonText: undefined, // set text for undo button
      saveButtonText: undefined, // set text for done button
  };
  return (
      <div className = {"TestComp"}>
          <Upload {...UploadProps}/>
      </div>
  );

};

