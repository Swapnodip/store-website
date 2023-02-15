import React from "react";
import { useNavigate } from "react-router-dom";

const ExitPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Your order is confirmed</h2>
      <button
        className="big_button"
        onClick={() => {
          navigate("/");
        }}
      >
        Return to store
      </button>
    </div>
  );
};

export default ExitPage;
