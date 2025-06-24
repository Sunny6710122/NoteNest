import React, {useContext} from 'react';
import Notes from './Notes';
import NotesContext from "../Context/Notes/noteContext";
import Alert from './Alert';

export default function Home() {

  const Contxt = useContext(NotesContext);
    const {alert1}= Contxt;



      return (
        <>
        <Alert alertt={alert1}/>
    <div className='container my-5'>
      <Notes />
    </div>
    </>
  )
}
