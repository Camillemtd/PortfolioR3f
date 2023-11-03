import React from 'react';

const SkillItem = ({ title, pourcentage, icone }) => (
  <div className="flex flex-col mt-5 w-96 gap-5 slide-in-bottom">
    <div className="flex items-center gap-10">
      {icone}
      <span className="text-4xl mr-2">{title}</span>
    </div>
    <div className="flex-grow">
      
      <div className="h-4 bg-slate-200 shadow-inset-gray rounded-full overflow-hidden w-2/3">
        <div
          className="h-full bg-indigo-500 shadow-inset-mauve scale-in-hor-left"
          style={{ width: `${pourcentage}%` }}
        ></div>
      </div>
    </div>
  </div>
);

export default SkillItem;