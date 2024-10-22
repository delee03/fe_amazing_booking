import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import PageNotFoundAnimate from "../../assets/animations/PageNotFoundAnimate.json";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center flex-col space-y-3">
      <Lottie
        style={{
          width: "800px",
          height: "700px",
        }}
        animationData={PageNotFoundAnimate}
        loops
      />
      <button
        onClick={() => {
          navigate("/");
        }}
        className="bg-purple-600 px-3 py-5 rounded-xl text-white uppercase tracking-wide font-black hover:bg-purple-950 duration-300"
      >
        quay về trang chủ
      </button>
    </div>
  );
};

export default PageNotFound;
