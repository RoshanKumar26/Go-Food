import React,{ useState } from 'react'
import { Link ,useNavigate} from "react-router-dom"
import Nav from '../components/Nav'

export default function Login() {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  let navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('userEmail',credentials.email);
      localStorage.setItem('authToken',json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
    else {
        alert("Enter valid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
    <div> <Nav/> </div>
    <div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label white-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label white-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
    </div>
  )
}
