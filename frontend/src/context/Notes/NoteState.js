import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  let note = [];
  const [notes, setNotes] = useState(note);
  const host = "http://localhost:5000";

  const fetchAllNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMmYyMjU0NTdiOTMyYzRlODc5ZjEwIn0sImlhdCI6MTY5MjU5NDgxOX0.7iNba3E4o1uuXgAeDwkjhazdKqaAMrtpNHMnE0FJupE",
      },
    });
    //todo
    const json = await response.json();
    console.log("fetchallnote function called");
    note = json;
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/createNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMmYyMjU0NTdiOTMyYzRlODc5ZjEwIn0sImlhdCI6MTY5MjU5NDgxOX0.7iNba3E4o1uuXgAeDwkjhazdKqaAMrtpNHMnE0FJupE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    console.log("add a note function called");
    const note = {
      _id: "64e5a742f8f5225e9c080haaf",
      user: "64e5a4aff28f5225e9c080ba6",
      title: "temp note",
      description: "this is my third note",
      tag: "personal",
      date: "2023-08-23T06:16:37.218Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    console.log("deleting a note function called");
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMmYyMjU0NTdiOTMyYzRlODc5ZjEwIn0sImlhdCI6MTY5MjU5NDgxOX0.7iNba3E4o1uuXgAeDwkjhazdKqaAMrtpNHMnE0FJupE",
      },
    });
    const json = await response.json();
    console.log(json);
  };

  //edit a note

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNWE0YWZmOGY1MjI1ZTljMDgwYmE2In0sImlhdCI6MTY5Mjc3MTYwN30.JHejjD8x4rB-q6AwUmi0Hnvm9zX7Db5oM5-8MLlhwFM",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);
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
      value={{ notes, setNotes, deleteNote, editNote, addNote, fetchAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
