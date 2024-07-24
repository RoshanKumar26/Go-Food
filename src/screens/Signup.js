import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    geolocation: ""
  })

  let navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        name: credentials.name, 
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    
    if(json.success)
    {
      localStorage.setItem('authToken',json.authToken)
      navigate("/")
    }
  };

const onChange = (e) => {
setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

  return (
    <>
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div><Nav/></div>
      <div className='container'> 
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label white-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label white-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label white-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label white-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword2" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
      </div>
    </>
  );
}