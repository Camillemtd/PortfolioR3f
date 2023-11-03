import SkillItem from "./SkillItem";
import skills from "../../data/Skills";
import Contact from "./Contact"
import React from "react";

const ThirdSection = () => {
  return (
    <section className="bg-black bg-opacity-50 z-40 slide-in-bottom text-white p-20 m-20 h-full max-h-full min-h-screen h-full">
        <h2 id="skill" className="text-focus-in text-9xl font-medium text-center mb-20">SKILLS</h2>
        <div className="flex flex-wrap items-center justify-between">
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
        <h2 className="text-6xl text-center mb-20 mt-48">Contact</h2>
        <Contact/>
    </section>
  );
};

export default ThirdSection;
