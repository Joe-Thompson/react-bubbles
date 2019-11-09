import React, { useState } from "react";
import api from "../utils/api";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const changeHandler = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    const submitHandler = (event) => {
            event.preventDefault();

            api()
                .post("/api/login", user)
                .then(result => {
                    console.log(result);
                    localStorage.setItem("token", result.data.payload);
                    props.history.push("/bubbles")
                })
                .catch(error => {
                    console.log(error);
                })
        };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
        <form className="form" onSubmit={submitHandler}>
            <input className="input" type="text" name="username" placeholder="Username" value={user.username} onChange={changeHandler} />
            <input className="input" type="password" name="password" placeholder="Password" value={user.password} onChange={changeHandler} />
            <button className="button" type="submit">Log In</button>
        </form>
    </>
  );
};

export default Login;
