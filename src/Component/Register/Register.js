import React from "react";
import { useState } from "react";
import Login from "../Login/Login";
import register from "./Register.css";
import isEmpty from "validator/lib/isEmpty";
import ReCAPTCHA from "react-google-recaptcha";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [show, setShow] = useState(false);

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("Email", JSON.stringify(email));
      localStorage.setItem("Password", JSON.stringify(password));
      setLogin(!login);
    }
  };
  const handleClick = () => {
    setLogin(!login);
  };
  const validateAll = () => {
    const msg = {};
    if (isEmpty(email)) {
      msg.email = "Please input your Email";
    }
    if (isEmpty(password)) {
      msg.password = "Please input your password";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validateAll();
    if (!isValid) return;
  };
  const handleOnchange = (value) => {
    console.log("Captcha value:", value);
  };

  return (
    <>
      <div className="main">
        {login ? (
          <div>
            <form className="formRegister" onSubmit={handleFormSubmit}>
              <h3>REGISTER</h3>
              <div className="formItemRegister">
                <p>Usename</p>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="formItemRegister">
                <p>Email</p>
                <input
                  type="email"
                  className="form-control"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <p style={{ color: "red" }}>{validationMsg.email}</p>
              </div>

              <div className="container">
                <p>Password</p>
                <input
                  type={show ? "text" : "password"}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span onClick={() => setShow({ show: show })}>
                  <RemoveRedEyeIcon />
                </span>
                <p style={{ color: "red" }}>{validationMsg.password}</p>
              </div>
              <ReCAPTCHA
                className="recapcha"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleOnchange}
              />
              <div className="note">
                <span>
                  By registering I confirm I have read and agree to Terms of
                  Use. We send occasional marketing messages which can be
                  switched off in account settings. We manage personal data as
                  set out in our Privacy Notice.
                </span>
              </div>

              <button
                className="buttonRegister"
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </button>

              <p className="outlogin" onClick={handleClick}>
                Don't have an account?
              </p>
            </form>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}
