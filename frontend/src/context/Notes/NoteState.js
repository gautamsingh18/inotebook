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
    console.log("fetch all note function called");
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
    const note = await response.json();
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
      method: "DELETE",
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMmYyMjU0NTdiOTMyYzRlODc5ZjEwIn0sImlhdCI6MTY5MjU5NDgxOX0.7iNba3E4o1uuXgAeDwkjhazdKqaAMrtpNHMnE0FJupE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(await response.json());
    let newNote = await JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
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
