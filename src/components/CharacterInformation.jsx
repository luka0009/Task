import React, { useState, useEffect } from "react";

export default CharacterInformation = ({ selectedCharachter }) => {
  return (
    <div className="min-w-[320px] text-left top-[-160px] left-[270px] pl-3 h-fit absolute z-99 bg-slate-800 text-blue-500 text-[14px] pb-7 pt-2">
      <div>
        <span className="block"> {selectedCharacher.name} mass - {selectedCharacher.mass}</span>
        <span className="block"> {selectedCharacher.name} height - {selectedCharacher.height}</span>
        <span className="block"> {selectedCharacher.name} hair color - {selectedCharacher.hair_color}</span>
        <span className="block"> {selectedCharacher.name} skin color - {selectedCharacher.skin_color}</span>
        <span className="block"> {selectedCharacher.name} eye color - {selectedCharacher.eye_color}</span>
        <span className="block"> {selectedCharacher.name} birth year - {selectedCharacher.birth_year}</span>
        <span className="block"> {selectedCharacher.name} gender - {selectedCharacher.gender}</span>
      </div>
    </div>
  );
};
