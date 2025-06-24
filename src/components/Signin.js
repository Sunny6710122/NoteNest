import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import NotesContext from "../Context/Notes/noteContext";

export default function Signin() {
    const Contxt = useContext(NotesContext);
    const {Alerting}= Contxt;


    const [data, setData] = useState({Email: "", Password: ""});
    let history = useNavigate();
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({Email: data.Email, Password: data.Password})
          });
          const json = await response.json();

          if(json.success)
          {
            localStorage.setItem('token', json.authtoken)

            history("/");
            Alerting("Logged in", "Success")
          }
          else{
            Alerting("Invalid Data Input", "Error")
          }
    }

    const onchange = (event)=>{
        setData({...data, [event.target.name]: event.target.value})
    }

  return (
    <div className='container'>
      <h2>Sign in to iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="Email" name="Email" onChange={onchange} value={data.Email} aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="Password" name="Password" onChange={onchange} value={data.Password} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary my-2">Submit</button>
        </form>
    </div>
  )
}
