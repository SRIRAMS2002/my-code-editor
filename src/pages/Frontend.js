import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-language_tools'; // Import the language tools extension
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const Frontend = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  // Define snippets for each language
  const snippets = {
    html: [
      {
        name: 'Basic HTML Template',
        value: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>',
        tabTrigger: 'htmltemplate',
        scope: 'html',
      },
    ],
    css: [
      {
        name: 'Center Text',
        value: 'text-align: center;',
        tabTrigger: 'centertext',
        scope: 'css',
      },
    ],
    javascript: [
      {
        name: 'Console Log',
        value: 'console.log(${1:expression});',
        tabTrigger: 'log',
        scope: 'javascript',
      },
    ],
  };

  // Initialize Ace Editor with snippet support
  useEffect(() => {
    // Add snippets to the editor's snippet manager
    ace.require('ace/snippets').snippetManager.register(snippets.html, 'html');
    ace.require('ace/snippets').snippetManager.register(snippets.css, 'css');
    ace.require('ace/snippets').snippetManager.register(snippets.javascript, 'javascript');
  }, []);

  const runCode = () => {
    // Execute JavaScript code
    try {
      const jsResult = eval(jsCode);
      // Display JavaScript output (you can modify this to format as needed)
      console.log('JavaScript Output:', jsResult);
    } catch (jsError) {
      console.error('JavaScript Error:', jsError);
    }

    // Create an iframe to render HTML and apply CSS
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    document.body.appendChild(iframe);

    // Write HTML and CSS to the iframe
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(htmlCode);
    const style = iframeDocument.createElement('style');
    style.innerHTML = cssCode;
    iframeDocument.head.appendChild(style);
    iframeDocument.close();
  };

  return (
    <div>
      <Navbar />
      <div className='flex'>
        <div>
          <h1 className='font-bold text-center mx-auto'>HTML</h1>
          <AceEditor
            mode="html"
            theme="monokai"
            value={htmlCode}
            onChange={(newCode) => setHtmlCode(newCode)}
            enableSnippets={true} // Enable snippet support for HTML editor
          />
        </div>
        <div>
          <h1 className='font-bold text-center mx-auto'>CSS</h1>
          <AceEditor
            mode="css"
            theme="monokai"
            value={cssCode}
            onChange={(newCode) => setCssCode(newCode)}
            enableSnippets={true} // Enable snippet support for CSS editor
          />
        </div>
        <div>
          <h1 className='font-bold text-center mx-auto'>JavaScript</h1>
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={jsCode}
            onChange={(newCode) => setJsCode(newCode)}
            enableSnippets={true} // Enable snippet support for JavaScript editor
          />
          <button onClick={runCode}>Run</button>
          {/* Output Display Area for JavaScript */}
          {/* You can display JavaScript output here */}
        </div>
      </div>
    </div>
  );
};

export default Frontend;
