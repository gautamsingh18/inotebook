import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">TITLE- {note.title}</h5>
        <p className="card-text">DESCRIPTION- {note.description}</p>
        <p className="card-text">TAG- {note.tag}</p>
      </div>
    </div>
  );
};

export default NoteItem;
