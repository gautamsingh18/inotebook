import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const { addNote } = context;
  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note);
  };
  const handleOnChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleOnChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleOnClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
