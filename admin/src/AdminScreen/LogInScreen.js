import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

function LogInScreen() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHendler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div style={{ width: "35%", margin: "auto", padding: "25px" }}>
      <form onSubmit={submitHendler}>
        <div className="form-outline mb-4">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
          <label className="form-label">Email address</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
          <label className="form-label">Password</label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
              />
              <label className="form-check-label"> Remember me </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LogInScreen;
