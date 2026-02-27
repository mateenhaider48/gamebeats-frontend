"use client";

// src/app/register/page.tsx
import { useState } from "react";
import axios from "axios";
import { log } from "console";

export default function RegisterForm() {
  const [username, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryName, setCountryName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if(password === confirmPassword){
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/auth/register`,
        {
          email,
          username,
          phoneNumber,
          password,
          countryName,
          fullName
        },
      );
      if (response.data.success) {
           setIsSuccess(true);
           setError(response.data.message);
            setCountryName("");
            setFullName("");
            setPhoneNumber("");
            setUserName("");
            setConfirmPassword("")
            setPassword("")
            setEmail("")
     } else {
        setIsSuccess(false);
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    }
    else{
      setError("Password and repeat password must be same")
    }
    } catch (error: any) {
      console.log("This is error while sending data", error.message);
       setIsSuccess(false);
    if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else {
      setError("Server error. Please try again.");
    }
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: "url(/images/slides/slide-text.jpg) bottom right",
      }}
    >
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-12 bg-form p-0">
            <div className="d-flex align-items-center justify-content-center over">
              <form
                id="login-form"
                className="mt-5 mb-5"
                style={{ backgroundColor: "rgba(255, 255, 255, .9)" }}
                action="/my-account"
                onSubmit={onSubmit}
              >
                <h1 className="mb-4 mt-4">Sign Up and PLAY</h1>
                <div className="form-outline mb-4">

                  <label className="form-label sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label sr-only" htmlFor="username">
                    Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    pattern="[A-Za-z\s]+"
                    className="form-control form-control-lg"
                    placeholder="username"
                    autoComplete="name"
                    title="Only letters and spaces are allowed"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label sr-only" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="form-control form-control-lg"
                    placeholder="Phone Number"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Your password"
                    autoComplete="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                    title="Password must have at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label sr-only" htmlFor="confirm Password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Repeat Your Password"
                    autoComplete="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                    title="Password must have at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label sr-only" htmlFor="fullName">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="countryCode"
                    pattern="[A-Za-z\s]+"
                    className="form-control form-control-lg"
                    placeholder="Full Name (optional)"
                    autoComplete="fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label sr-only" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    pattern="[A-Za-z\s]+"
                    className="form-control form-control-lg"
                    placeholder="Country (Optional)"
                    autoComplete="country"
                    title="Only letters and spaces are allowed"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                  />
                </div>
                
                <p
                  style={{
                    color: isSuccess ? "green" : "red",
                    fontSize: "1rem",
                    marginTop: "4px",
                    marginLeft: "25px",
                    lineHeight: 1.9,
                    fontFamily: "sans-serif",
                  }}
                >
                  {error}
                </p>
                <div className="mt-5">
                  <input
                    className="btn btn-login mb-5"
                    type="submit"
                    value="START NOW"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
