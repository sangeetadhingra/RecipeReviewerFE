// Utility to preview the layout of JSON objects

import React from "react";
const Preview = ({json}) => {
    return(<div>
      <pre>
        {JSON.stringify(json, null, 2)}
      </pre>
    </div>)
}

export default Preview;