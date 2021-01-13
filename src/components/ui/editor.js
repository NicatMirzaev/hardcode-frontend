import React from 'react';

const Editor = props => {
  if (typeof window !== 'undefined') {
    const AceEditor = require('react-ace').default;
    require("ace-builds/src-noconflict/mode-python");
    require("ace-builds/src-noconflict/mode-java");
    require("ace-builds/src-noconflict/mode-c_cpp");
    require("ace-builds/src-noconflict/mode-javascript");
    require("ace-builds/src-noconflict/mode-csharp");
    require("ace-builds/src-noconflict/theme-monokai");

    return <AceEditor {...props}/>
  }

  return null;
}

export default Editor;
