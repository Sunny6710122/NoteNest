import React, { useContext, useState } from "react";
import NotesContext from "../Context/Notes/noteContext";

export default function Addnote() {
    const Contxt = useContext(NotesContext);
    const { Addnote, Alerting } = Contxt;

    const [note, setNote] = useState({title: "", description: "", tag: "Personal"});

    const handleclick = (event)=>{
        event.preventDefault();
        Addnote(note.title,note.description,note.tag)
        setNote({title: "", description: "", tag: "Personal"})
        Alerting("Note Added", "Success");
    }
    
    const onchange = (event)=>{
        setNote({...note, [event.target.name]: event.target.value})
    }
  return (
    <div>
      <h1>Adding a Note</h1>
            <form>
              <div className="form-group my-3">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title}  aria-describedby="emailHelp" placeholder="Enter the title" onChange={onchange} required/>
              </div>
              <div className="form-group my-3" >
                <label htmlFor="exampleInputPassword1">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="Enter the description" onChange={onchange} required/>
              </div>
              <div className="form-group my-3" >
                <label htmlFor="exampleInputPassword1">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="Enter the Tag" onChange={onchange}/>
              </div>
              <button type="submit" onClick={handleclick} className="btn btn-primary">Add Note</button>
            </form>
    </div>
  )
}
