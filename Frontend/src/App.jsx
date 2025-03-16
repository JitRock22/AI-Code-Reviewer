import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Markdown from "react-markdown"
import Editor from "react-simple-code-editor"
import rehypeHighlight from "rehype-highlight"
import axios from "axios"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`write Your Code here`)
  const [review, setReview] = useState(``);
  useEffect(() => {
    prism.highlightAll()
  })
  //this funcion helps to send reqst to the backend after clicking button
  async function reviewer() {
    // const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    const response = await axios.post('https://ai-code-reviewer-enq8.onrender.com/ai/get-review', { code })
    setReview(response.data);
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="editor">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div className="enter" onClick={reviewer}>Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>  
            {review}
          </Markdown>
        </div>
      </main>
    </>

  )
}

export default App
