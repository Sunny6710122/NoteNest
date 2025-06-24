import React, { useContext } from "react";
import NotesContext from "../Context/Notes/noteContext";


const Noteitem = (props) => {
    const Contxt = useContext(NotesContext);
    const { deletenote } = Contxt;
    const { notes1, updateNote  } = props;
    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className="card-body">
                <h5 className="card-title">{notes1.title}</h5>
                <p className="card-text">{notes1.description}</p> 
                <i className="fa-regular fa-trash-can " onClick={()=>{deletenote(notes1._id)}}></i>
                <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(notes1)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem