import React from "react";

const Signup = () => {
  return (
    <div>
      <form>
        <div className="form-group my-2">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted my-2">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="exampleInputPassword1"
            placeholder="Password"
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
