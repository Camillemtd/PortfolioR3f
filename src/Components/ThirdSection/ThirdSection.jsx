import SkillItem from "./SkillItem";
import skills from "../../data/Skills";
import Contact from "./Contact"

const ThirdSection = () => {
  return (
    <section className="bg-black bg-opacity-50 z-40 scale-up-ver-bottom text-white p-20 min-h-screen m-20">
      <h2 className="text-9xl font-medium text-center mb-20">SKILLS</h2>
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
