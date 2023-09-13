import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      await localStorage.setItem("token", json.auth_token);
      props.showAlert("logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("invalid creds", "danger");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
