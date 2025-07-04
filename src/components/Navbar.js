import React, {useEffect} from 'react'
import { Link , useLocation,useNavigate } from 'react-router-dom';



export default function Navbar() {
  let location = useLocation();
  useEffect(()=>{
    console.log(location.pathname);
  }, [location])
  let history = useNavigate();

  const handlelogout = ()=>{
    localStorage.removeItem('token');
    history("/signin");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
            <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <Link className="nav-link"  aria-current="page" to="/signin">Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign up</Link>
              </li>
            </ul>
            </form>:<button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
          </div>
        </div>
      </nav>
  )
}
