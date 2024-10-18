/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { appConfiguration } from '#/config';

const { baseUrl } = appConfiguration;

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');

  const [htmlPreview, setHtmlPreview] = useState('');

  useEffect(() => {
    const convertMarkdown = async () => {
      if (markdown) {
        try {
          const response = await axios.post(`${baseUrl}/api/marked/convert`, { markdown });

          setHtmlPreview(response.data.data);
        } catch (error) {
          console.error('Error converting markdown', error);
        }
      } else {
        setHtmlPreview('');
      }
    };

    convertMarkdown();
  }, [markdown]);

  // Reset function to clear the markdown
  const resetMarkdown = () => {
    setMarkdown('');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <h1 style={{ textAlign: 'center', margin: 0 }}>Markdown Real-Time Preview</h1>
        <button onClick={resetMarkdown} style={{ zIndex: 1 }}>
          Reset
        </button>
      </div>
      <div style={{ display: 'flex', position: 'relative', padding: '10px' }}>
        <textarea
          style={{
            width: '50%',
            height: 'calc(100vh - 50px)',
            padding: '10px',
            border: '1px solid gray',
            boxSizing: 'border-box',
          }}
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
          placeholder='Write your markdown here...'
        />
        <div
          style={{
            width: '50%',
            height: 'calc(100vh - 50px)',
            padding: '10px',
            overflowY: 'scroll',
            border: '1px solid gray',
            boxSizing: 'border-box',
          }}
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
        />
      </div>
    </>
  );
};

export default MarkdownEditor;
