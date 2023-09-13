import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.auth_token) {
      localStorage.setItem("token", json.auth_token);
      props.showAlert("signed up successfully", "success");
      navigate("/");
    } else {
      props.showAlert("invalid creds", "danger");
    }
  };
  return (
    <div className="container" onSubmit={handleSubmit}>
      <form>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control my-2"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            onChange={handleOnChange}
            required
            minLength={5}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleOnChange}
            required
            minLength={5}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            required
            minLength={5}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="cpassword"
            name="cpassword"
            placeholder="Password"
            onChange={handleOnChange}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
