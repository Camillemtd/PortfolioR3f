import SkillItem from "./SkillItem";
import skills from "../../data/Skills";
import Contact from "./Contact"
import React from "react";

const ThirdSection = () => {
  return (
    <section className="bg-black bg-opacity-50 z-40 slide-in-bottom text-white p-10 md:m-20  h-full max-h-full min-h-screen h-full flex justify-center flex-col items-center max-w-screen-xl self-center">
        <h2 id="skill" className="text-focus-in xl:text-9xl text-6xl font-black text-center mb-20 mt-20 xl:mt-0">SKILLS</h2>
        <div className="flex flex-wrap items-center xl:justify-between justify-center max-w-screen-xl">
          {skills.map((skill, index) => {
            return (
              <SkillItem
                key={index}
                title={skill.title}
                icone={skill.icone}
                pourcentage={skill.pourcentage}
              />
            );
          })}
        </div>
        <h2 className="text-6xl text-center mb-20 mt-20 xl:mt-48 font-black">CONTACT</h2>
        <Contact/>
    </section>
  );
};

export default ThirdSection;
