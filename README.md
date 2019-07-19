# UploadImageJS 

## Intro

This lib is for components that need enchancement for uploading and cropping images.

This lib is the simple combination of CropperJS and Ant Design.  
CropperJs: https://fengyuanchen.github.io/cropperjs/  
Ant Design: https://ant.design/docs/react/introduce

## Overview & Process

1. There's common folder which contains 2 sub-folders (ExampleComponent, UploadFunction)  
    /common->  
    > /ExampleComponent->  
    >> ExampleComponent.js  
            /UploadFunction  ->  
                              UploadFunction.js  
                              /CropImage          ->  
                                                  CropImage.js
  
## ExampleComponent

2. ExampleComponent is a component that uses UploadFunction as an enchancer. It will have their functions ready from the enhancer which are uploadImg (to upload image when called), clearImg (to clear image when called) and onPreview (preview the uploaded image when called).
  
## UploadFunction

3. The UploadFunction will retrieve the component and the component's props into itself and create upload and crop function as the component and its props said so. 

4. The available config/settings to the function are:  
    4.1 ratio (set aspect ratio for cropping)  
    4.2 messageErrorFileType (set text for error file type)  
    4.3 messageErrorFileSize (set text for error file size)  
    4.4 messageSuccess (set text for successful upload)  
    4.5 cropTitle (set text for crop title)  
    4.6 cropButtonText (set text for crop button)  
    4.7 undoButtonText (set text for undo button)  
    4.8 saveButtonText (set text for done button)  
    4.9 imgMaxSize (set max file size for image)

5. The UploadFunction has 2 main javascript files which will be the upload part and the crop part. The crop part has a sub-folder inside the "UploadFunction" folder.

6. The UploadFunction as said in #3 will return the component with the function.  
    6.1 The uploadImg function will trigger the onClickButton function which will triggers the none-display input part Upload component from Ant Design, which means that the select file window will show up. After selecting the image the function will check beforeUpload function to check the requirements that the file need to be.  
    6.2 The clearImg function will trigger the onRemove function which then clear the file (fileList) or your image.  
    6.3 The onPreview function will trigger the handlePreview function that will set the preview modal to be visible and let us see the uploaded image.

7. Others function in UploadFunction file are getBase64 (render and load the image upload), handleCancelCrop (Cancel upload and crop) and handleUpload (get the cropped image and upload). imgMaxSize will change the max file size in "beforeUpload" function (you should set the messageErrorFileSize as well since the default is for 2MB).

8. Messages the will pop up are:  
    8.1 messageErrorFileType (shown when attempt to upload the wrong file type)  
    8.2 messageErrorFileSize (shown when attempt to upload oversize file)  
    8.3 messageSuccess (shown when successfully upload and crop)  

9. Returned components in UploadFunction:  
    9.1 Component (the component that used this function with the given functions & image from UploadFunction)  
    9.2 Upload (the upload component from Ant Design which is always hidden)  
    9.3 1st Modal (the modal the helps previewing the uploaded and cropped image, (#4.5)cropTitle prop will be set here)  
    9.4 2nd Modal (the modal the contains the cropper part which will help crop the image)
    
## CropperImage

10. CropperJs part is in the "CropImage" folder which contains CropImage component. After UploadFunction pushed its props into this component, #4.1 #4.6-#4.8 will be set here. 

11. The functions in CropImage are:  
    11.1 onReady (will check if the image uploaded is ready to crop or not)  
    11.2 cropImage (will crop the image with the settings in the function)  
    11.3 reviewCropImage (will review 11.2 if correctly defined or not)  
    11.4 undoCropped (will undo the cropped and back to the cropping part)  
    11.5 cropEnd (will end the cropping)

12. The return part of this is pretty simple so no explaination is needed for now. :D (Cropper component is from CropperJs)
  
------
13. All the configurations available can be set on either the component when called or in the component that used the function.
  
Have Fun! 
