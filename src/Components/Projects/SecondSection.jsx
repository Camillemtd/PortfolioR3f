import { Html } from "@react-three/drei";
import CarouselMobile from "./CarouselMobile";

const SecondSection = ({showCarousel, data}) => {
	return (
		<section id="project" className="bg-transparent md:mt-20 h-screen xl:h-32">
			<h2 className="md:text-8xl text-6xl text-white mt-32 md:mt-0 slide-in-bottom flex flex-col font-black p-10">PROJECTS</h2>
			{!showCarousel && (
            <CarouselMobile data={data}/>
          )}
		</section>
	);
};

export default SecondSection;