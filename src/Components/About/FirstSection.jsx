const FirstSection = () => {
  return (
    <section
      id="section1"
      className="h-screen text-white  flex justify-start items-center text-center z-40 relative w-full xl:justify-center xl:w-1/2"
    >
      <div className=" xl:m-10 p-10 rounded-lg">
        <h1 className="md:text-9xl text-6xl pb-10 font-medium slide-in-bottom">METARD CAMILLE</h1>
        <p className="text-center md:text-3xl text-2xl leading-10 slide-in-bottomText">
          Hello! I'm a <span className='font-semibold text-cyan-400'>WEB DEVELOPER</span> with a passion for 3D web design, currently
          seeking a frontend developer position. Explore my work and discover my
          passion for innovation.
        </p>
      </div>
    </section>
  );
};

export default FirstSection;
