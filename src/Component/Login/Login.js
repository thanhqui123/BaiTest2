import React from "react";
import Home from "../Home/Home";
import { useState } from "react";
import login from "./Login.css";
import isEmpty from "validator/lib/isEmpty";
import ReCAPTCHA from "react-google-recaptcha";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

export default function Login() {
  const [emaillog, setEmaillog] = useState(" ");
  const [passwordlog, setPasswordlog] = useState(" ");
  const [validationMsglog, setValidationMsglog] = useState("");
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);

  const [home, setHome] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    let pass = localStorage.getItem("Password").replace(/"/g, "");
    let mail = localStorage.getItem("Email").replace(/"/g, "");

    if (!emaillog || !passwordlog) {
      setFlag(true);
    } else if (passwordlog !== pass || emaillog !== mail) {
      setFlag(true);
    } else {
      setHome(!home);
      setFlag(false);
    }
  };
  const validateAll = () => {
    const msg = {};
    if (isEmpty(emaillog)) {
      msg.emaillog = "Please input your Email";
    }
    if (isEmpty(passwordlog)) {
      msg.passwordlog = "Please input your password";
    }
    setValidationMsglog(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmitLog = () => {
    const isValid = validateAll();
    if (!isValid) return;
  };
  const handleOnchangeLog = (value) => {
    console.log("Captcha value:", value);
  };
  return (
    <>
      <div className="main">
        {home ? (
          <div>
            <form className="formLogin" onSubmit={handleLogin}>
              <h3>LogIn</h3>
              <div className="formItemLogin">
                <p>Email</p>
                <input
                  type="email"
                  className="form-control"
              
                  onChange={(event) => setEmaillog(event.target.value)}
                />
                 <p style={{color:'red'}}>{validationMsglog.emaillog}</p>
              </div>
              <div className="container">
              <p>Password</p>
                <input type={show ? "text" : "password"}  onChange={(event) => setPasswordlog(event.target.value)}/>
               
                <span  onClick={() => setShow({show: show}) }>
                  <RemoveRedEyeIcon/>
                </span>
                <p style={{ color: "red" }}>{validationMsglog.passwordlog}</p>
              </div>
              <ReCAPTCHA
                className="recapchaLog"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleOnchangeLog}
              />

              <button className="buttonLogin"  type="submit" onClick={handleSubmitLog} >
                Login
              </button>
              
              <div className="linkForgotPassword">
                <a href="/forgotPassword/">FORGOT YOUR PASSWORD ?</a>
                
               
              </div>
             
            </form>
          </div>
        ): (
          <Home />
        )}
      </div>
    </>
  );
}
