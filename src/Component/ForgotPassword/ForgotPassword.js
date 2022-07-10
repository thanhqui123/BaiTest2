import React from "react";
import forgotPassword from "./ForgotPassword.css";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from '../Nav/Nav'
import Footer from "../Footer/Footer";
import { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [validationMsgForgotPassword, setValidationMsgForgotPassword] = useState("");
  const validateAll = () => {
    const msg = {};
    if (isEmpty(email)) {
      msg.email = "Please input your Email";
    }
    setValidationMsgForgotPassword(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
  };

  const handleOnchangeForgotPassword = (value) => {
    console.log("Captcha value:", value);
  };
  return (
    <div>
      <Nav />
      <form className="formForgotPassword">
        <h3>FORGOT YOUR PASSWORD ?</h3>
        <div className="noteForgotPassword">To reset your password, enter the email address that you used to set up your account. We'll send you a link to help you get back into your account.</div>

        <div className="container">
          
          <input type="email" placeholder="Email"
           onChange={(event) => setEmail(event.target.value)}
          />
           <p style={{ color: "red" }}>{validationMsgForgotPassword.email}</p>
        </div>
        
        <ReCAPTCHA
          className="recapchaForgotPassword"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={handleOnchangeForgotPassword}
        />

        <button className="buttonForgotPassword"  onClick={handleSubmit}>Send</button>
      </form>
      <Footer />
    </div>
  );
}
