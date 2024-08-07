import "./login.css"
import { Link } from "react-router-dom";
import React, { useContext, useRef,  useState } from 'react';
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    setErrorMessage("");
    try{
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS", payload: res.data });
    } catch(err) {
      dispatch({type:"LOGIN_FAILURE" }); 
      setErrorMessage(err.response?.data || "Something went wrong!");
      console.error(err);
    }
  };

  console.log(isFetching);

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
            type="text" 
            className="loginInput" 
            placeholder="Enter your username!..." 
            ref={userRef}
            />
            
            <label>Password</label>
            <input 
            type="password" 
            className="loginInput" 
            placeholder="Enter your password!..." 
            ref={passwordRef}
            />
            
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>

        </form>
        {errorMessage && <span className="error">{errorMessage}</span>}
        <button className="loginRegisterButton">
          <Link className="link" to="/register">Register</Link>
        </button>
    </div>
  );
}
