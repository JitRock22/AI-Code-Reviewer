// File: Review.jsx
import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import prism from 'prismjs';
import Markdown from 'react-markdown';
import { useNavigate } from "react-router-dom";
import Editor from 'react-simple-code-editor';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
// import loadingImg from "/src/assets/loading.gif"
import '/src/App.css';

function Review() {
  const [code, setCode] = useState(`write Your Code here`);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/Home");
  };
  useEffect(() => {
    prism.highlightAll();
  });

  const handleRefresh = () => {
    setCode(`write Your Code here`);
    setReview('');
  }

  async function reviewer() {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  return (
    <><>

    </>
      <main className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white p-4 gap-4">
        <div className="flex-1 flex flex-col border border-gray-700 rounded-2xl p-4 bg-black shadow-lg">
          <h2 className="text-xl font-bold mb-2">Enter Your Code</h2>
          <div className="flex-1 overflow-auto rounded-xl max-h-[400px]">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={12}
              style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: 16,
                backgroundColor: '#1e1e1e',
                minHeight: '400px',
                borderRadius: '12px',
              }} />
          </div>
          <div className='flex justify-center gap-6'>

            <button
              onClick={goToHome}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
            >
              Return Home
            </button>
            <button
              onClick={reviewer}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
            >
              Review
            </button>
            <button
              onClick={handleRefresh}
              className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
            >
              Refresh
            </button>
          </div>

        </div>

        <div className="flex-1 flex flex-col border border-gray-700 rounded-2xl p-4 bg-[#0d1117] shadow-lg">
          <h2 className="text-xl font-bold mb-2">Code Review</h2>
          <div className="flex-1 overflow-auto max-h-[400px] rounded-xl">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p className='text-gray-400 font-bold'>Analyzing your code.....</p>

              </div>
            ) : (
              <Markdown rehypePlugins={[rehypeHighlight]} className="prose prose-invert max-w-none">
                {review}
              </Markdown>
            )}
          </div>
        </div>
      </main></>
  );
}

export default Review;
