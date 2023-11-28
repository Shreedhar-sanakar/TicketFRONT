import React, {useState} from 'react';
import './App.css';
import {Link, useHistory} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
// import Tickets from './tickets';

const Login = () => {
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [loading,setLoading] = useState(false);
    const history = useHistory();

    const loginFunc = async (event) =>{
        setLoading(true);
        event.preventDefault();
        let data = {
            email : email,
            password : password
        }
        let url = "https://ticketmanagementapp-pj90.onrender.com/api/login"
        //let url = 'http://localhost:4000/api/login'
        let response = await fetch(url,{
            method:"POST",
            body : JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let Fetchdata = await response.json();
        //console.log("Fetched Data", Fetchdata);
        if(Fetchdata.status===200){
            localStorage.setItem('token',Fetchdata.token);
            if(Fetchdata.userDetails.role === "admin"){
                history.replace('/layout');
            }else if(Fetchdata.userDetails.role==='customer'){
                history.replace('/customer');
            }else if( Fetchdata.userDetails.role==='agent'){
                history.replace('/agents');
            }
            
        }
        setEmail("");
        setPassword("");
        setLoading(false);
    }

    return (
        <div className="container mt-3 login-div">
            <div className="card col-lg-6 col-md-8 col-xs-12 card-bg text-center">
                   <h1>Login</h1>
                <div className="card-body login-body">
                    <form className="form-group" onSubmit={loginFunc} method="POST">
                    <div className="input-group">
              <span>
                <i className="fa fa-user login_icon"></i>
              </span>
              <input type="text" name="email" id="email" value={email} className="bg-light form-control mb-2" onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required/>
            </div>
            <div className="input-group">
              <span>
                <i className="fa fa-lock login_icon"></i>
              </span>
              <input type="password" name="password" id="password" value={password} className="bg-light form-control mb-2" onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required/>
            </div>      
                        <button type="submit" className="btn btn-info px-3">Login {loading && <Spinner animation="border" variant="light" />} </button>
                    </form>
                    <div>
                        <Link to="/layout">Forgot Password</Link>
                        <p>Doesn't have an account? <Link to="/register">Sign Up</Link></p>        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;