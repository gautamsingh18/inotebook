import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const state = {
    name: "gautam",
    class: "12",
  };
  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
