import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";

const About = () => {
  const a = useContext(NoteContext);
  return <>this is about {a.name}</>;
};

export default About;
