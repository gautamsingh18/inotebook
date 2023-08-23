import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const note = [
    {
      _id: "64e5a722f8f5225e9c080bab",
      user: "64e5a4aff8f5225e9c080ba6",
      title: "temp note",
      description: "this is my first note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    },
    {
      _id: "64e5a73cf8f5225e9c080bad",
      user: "64e5a4aff8f5225e9c080ba6",
      title: "temp note",
      description: "this is my second updated note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    },
    {
      _id: "64e5a742f8f5225e9c080baf",
      user: "64e5a4aff8f5225e9c080ba6",
      title: "temp note",
      description: "this is my third note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(note);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
