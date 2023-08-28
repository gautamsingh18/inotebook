import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const note = [
    {
      _id: "64e5a722f8f5225e9c080bab",
      user: "64e5a4aff8f5225e9c2080ba6",
      title: "temp note",
      description: "this is my first note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    },
    {
      _id: "64e5a73cf8f5225e9c080bad",
      user: "64e5a4aff8f5225e9c0280ba6",
      title: "temp note",
      description: "this is my second updated note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    },
    {
      _id: "64e5a742f8f5225e9c080baf",
      user: "64e5a4aff28f5225e9c080ba6",
      title: "temp note",
      description: "this is my third note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    },
    {
      _id: "64e5a742f8f5225e9c080haf",
      user: "64e5a4aff28f5225e9c080ba6",
      title: "temp note",
      description: "this is my third note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(note);

  //add a note
  const addNote = async (title, description, tag) => {
    //todo
    console.log("add a note function called");
  };

  //delete a note
  const deleteNote = async (id) => {
    console.log("deleting a note function called");
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}api/notes/updateNote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNWE0YWZmOGY1MjI1ZTljMDgwYmE2In0sImlhdCI6MTY5Mjc3MTYwN30.JHejjD8x4rB-q6AwUmi0Hnvm9zX7Db5oM5-8MLlhwFM",
      },
    });
    const json = response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
    console.log("edit a note function called");
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, deleteNote, editNote, addNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
