import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const Frontend = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

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

  useEffect(() => {
    ace.require('ace/snippets').snippetManager.register(snippets.html, 'html');
    ace.require('ace/snippets').snippetManager.register(snippets.css, 'css');
    ace.require('ace/snippets').snippetManager.register(snippets.javascript, 'javascript');
  }, []);

  const runCode = () => {
    try {
      const jsResult = eval(jsCode);
      console.log('JavaScript Output:', jsResult);
    } catch (jsError) {
      console.error('JavaScript Error:', jsError);
    }

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    document.body.appendChild(iframe);

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(htmlCode);
    const style = iframeDocument.createElement('style');
    style.innerHTML = cssCode;
    iframeDocument.head.appendChild(style);
    iframeDocument.close();
  };
 
  
  return (
    <div >
      <Navbar/>
      <div className="bg-gray-100 mx-auto">
      <div className='mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
        <div className=' px-4 py-4'>
          <h1 className='font-bold text-center mx-auto mb-4'>HTML</h1>
         
          <AceEditor
            mode="html"
            theme="monokai"
            value={htmlCode}
            onChange={(newCode) => setHtmlCode(newCode)}
            enableSnippets={true}
            style={{ width: '100%', height: '300px' }  }
           
          />
          
          
        </div>
        <div className=' px-4 py-4'>
          <h1 className='font-bold text-center mx-auto mb-4'>CSS</h1>
         
          <AceEditor
            mode="css"
            theme="monokai"
            value={cssCode}
            onChange={(newCode) => setCssCode(newCode)}
            enableSnippets={true}
            style={{ width: '100%', height: '300px' }  }
          />
          
         
        </div>
        <div className=' px-4 py-4'>
          <h1 className='font-bold text-center mx-auto mb-4'>JavaScript</h1>
         
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={jsCode}
            onChange={(newCode) => setJsCode(newCode)}
            enableSnippets={true}
            style={{ width: '100%', height: '300px' }  }
          />
          
         
          
        </div>
      </div>
      <button onClick={runCode} className='block mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Run
          </button>
      </div>
      <h1 className='block mx-auto mt-4 text-black font-bold py-2 px-4 rounded'>Output</h1>
      
    
    </div>
  );
};

export default Frontend;
