import React from "react";
import { useNavigate } from "react-router-dom";
import reviewImg from "/src/assets/coding.gif";
function Home() {
  const navigate = useNavigate();

  const goToReview = () => {
    navigate("/review");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fceabb, #f8b500)",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side Text */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h2 style={{ fontSize: "3rem"}} className=" px-4 font-extrabold">
           CodeSense: 1000x faster code reviews
          </h2>
          <p style={{ fontSize: "1.2rem", margin: "1rem 0" }} className=" px-4">
            Expert code reviews for performance, readability, and best practices. Built for developers who care about clean, reliable code. </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              style={{
                color: "white",
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={goToReview} className="bg-orange-400 hover:bg-orange-500 font-bold"
            >
              Try Code Reviewer
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "1rem",
            marginTop: "2rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={reviewImg}
            alt="AI Review Example"
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
