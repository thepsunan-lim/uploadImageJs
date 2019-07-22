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
      {/* this is where you config outside the component, the variables should be the same name as in "ExampleCompoent.js" */}  
      </ComponentTest>
    </div>
  );
}

export default App;