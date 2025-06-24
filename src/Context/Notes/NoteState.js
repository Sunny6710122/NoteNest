import { useState } from "react";
import noteContext from "./noteContext";

import React from "react";

export default function NoteState({ children }) {
  const NotesInitial = [];
  const host = "http://localhost:5000";

  const GetData = async () => {
    const response = await fetch(`${host}/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token"),
      }
    });
    
    const json = await response.json();
    setNotes(json);
  };

  const Addnote = async(title, description, tag) => {
    await fetch(`${host}/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token"),
      },
      body: JSON.stringify({title: title, description: description, tag: tag}),
    });
    await GetData();
  };

  const Editnote = async(id, title, description, tag) => {
    for (let i = 0; i < notes.length; i++) {
      if(notes[i]._id===id)
      {
        await fetch(`${host}/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
            localStorage.getItem("token"),
          },
          body: JSON.stringify({title: title, description: description, tag: tag}),
        });
        await GetData();
        break;
      }
    }

    
    

  };

  const deletenote = async(id) => {

    await fetch(`${host}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token"),
      }
    });
    
    await GetData();
    Alerting("Note Deleted", "Success")
  };

  const [notes, setNotes] = useState(NotesInitial);


  const [alert1, setAlert] = useState(null);




  const Alerting = (message, typ) => {
    setAlert({
      msg: message,
      type: typ
    });
    setTimeout(() => {
        setAlert(null)
    }, 2000);
  }



  //Alert


  return (
    <noteContext.Provider
      value={{ notes, setNotes, Addnote, deletenote, Editnote,GetData,alert1 , Alerting}}
    >
      {children}
    </noteContext.Provider>
  );
}
