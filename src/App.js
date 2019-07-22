import React from 'react';
import ComponentTest from "./common/ExampleComponent/ExampleComponent.js"

function App() {
  return (
    <div>
      <ComponentTest 
        config={
          {
            ratio:1, 
          }
        }  
      >
      {/* the ratio, if set to 0, will let you crop the image freely as limited with minimum size */}
      {/* this is where you config outside the component, the variables should be the same name as in "ExampleCompoent.js" */}  
      </ComponentTest>
    </div>
  );
}

export default App;