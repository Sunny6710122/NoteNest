import React, { useContext, useEffect, useRef, useState } from "react";
import NotesContext from "../Context/Notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import {useNavigate} from 'react-router-dom';

export default function Notes() {
  const Contxt = useContext(NotesContext);
  const { notes, GetData, Editnote,Alerting } = Contxt;
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""});
  const ref = useRef(null);
  let history = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      GetData();
    }
    else{
      history("/signin")
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    ref.current.click();
    setNote({id: note._id,etitle: note.title, edescription:note.description, etag: note.tag})
    
  };


  const handleclick = (event)=>{
        event.preventDefault();
        
        Editnote(note.id, note.etitle, note.edescription, note.etag);
        Alerting("Note Updated", "Success")
    }

    const onchange = (event)=>{
        setNote({...note, [event.target.name]: event.target.value})
    }

  return (
    <>
      <Addnote />
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter the title" onChange={onchange} required/>
                            </div>
                            <div className="form-group my-3" >
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="Enter the description" onChange={onchange} required/>
                            </div>
                            <div className="form-group my-3" >
                                <label htmlFor="exampleInputPassword1">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="Enter the Tag" onChange={onchange}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
                    </div>
                </div>
            </div>
        </div>

      
      <div className="row my-3">
        <h2>You Notes</h2>
        <div className="container">{notes.length===0?"No Notes to display":""}</div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} notes1={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
}
