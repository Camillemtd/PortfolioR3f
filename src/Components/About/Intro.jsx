import React from "react";

const Intro = () => {
  return (
    <div className="h-screen text-white text-6xl font-thin w-full flex justify-center items-center text-center flex flex-col ">
      <span className="slide-in-top">SCROLL DOWN</span>
      <div className="example example--2 mt-10">
        <span className="scroll-icon">
          <span className="scroll-icon__dot"></span>
        </span>
      </div>
    </div>
  );
};

export default Intro;
