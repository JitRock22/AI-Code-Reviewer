import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import prism from 'prismjs';
import Markdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`write Your Code here`);
  const [review, setReview] = useState(``);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewer() {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.post(
        'https://ai-code-reviewer-enq8.onrender.com/ai/get-review',
        { code }
      );
      setReview(response.data);
    } catch (error) {
      console.error('Error fetching review:', error);
      setReview('An error occurred while fetching the review.');
    } finally {
      setIsLoading(false); // Set loading to false after fetching (or error)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="editor">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, 'javascript')
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                borderRadius: '5px',
                height: '100%',
                width: '100%',
              }}
            />
          </div>
          <div className="enter" onClick={reviewer}>
            Review
          </div>
        </div>
        <div className="right">
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing your code.....</p>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;