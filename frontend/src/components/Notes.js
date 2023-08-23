import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const context = useContext(NoteContext);

  const { notes, setNotes } = context;
  return (
    <>
      <div className="container my-3">
        <div className="row col-md-3 ">
          <h2>Your notes</h2>
          <h3>
            {notes.map((note) => {
              return <NoteItem note={note} />;
            })}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Notes;
