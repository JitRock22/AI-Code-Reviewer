import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToReview = () => {
    navigate("/review");
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <button onClick={goToReview}>Go to Review Page</button>
    </div>
  );
}

export default Home;
