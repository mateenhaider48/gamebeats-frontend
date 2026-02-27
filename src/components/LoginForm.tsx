// src/app/login/page.tsx
"use client";
import { log } from "console";
import { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [userExist, setUserExist] = useState(false);
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Debounced function to check user existence while typing
  const checkUserExist = useCallback(
    debounce(async (number: string) => {
      try {
        const res = await axios.post(
          `${process.env.BACKEND_URL}/api/auth/check-user`,
          {
            phoneNumber: number,
          },
        );
        if (res.data.success)
          window.location.href = "http://localhost:3000/subscription";
      } catch (err) {
        console.error("Error checking user:", err);
      }
    }, 500),
    [],
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, ""); // keep digits & +
    // ensure + is only at the start
    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "");
    }
    setPhoneNumber(value);

    // only check if Bangladash selected
    if (country === "Bangladash +880") checkUserExist(value);
  };

  const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      country === "Bangladash +880" &&
      (countryCode === "+880" || countryCode === "880")
    ) {
          try {
           const res = await axios.get(
              "https://api.payment-app.info/grameenphone/billing/check_subscription_by_name",
              {
                params: {
                  msisdn: phoneNumber,
                  name: "GamesBeat",
                },
              },
            );
            if(res.data.status === 200)
                window.location.href = "https://gamebeats-frontend.vercel.app/"
          } catch (error: any) {
            if (error.response?.status === 400) {
              window.location.href = "http://localhost:3000/subscription";
            } else {
              console.error(error);
            }
          }
      }
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "url(/images/slides/slide-text.jpg) bottom right" }}
    >
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-12 bg-form p-0">
            <div className="d-flex align-items-center justify-content-center over">
              <form
                id="login-form"
                className="mt-5 mb-5"
                style={{ backgroundColor: "rgba(255,255,255,.9)" }}
                onSubmit={LoginUser}
              >
                <h1 className="mb-4 mt-4">SIGN IN</h1>

                {/* Country select */}
                <div className="form-outline mb-4">
                  <label>Country</label>
                  <select
                    className="form-control"
                    style={{ color: "black" }}
                    name="country"
                    value={country}
                    onChange={(e) => {
                      const [name, code] = e.target.value.split(" ");
                      setCountry(e.target.value);
                      setCountryCode(code);
                      setUserExist(name === "France");
                    }}
                    required
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    <option value="France +33">France (+33)</option>
                    <option value="Bangladash +880">Bangladash (+880)</option>
                    <option value="Poland +48">Poland (+48)</option>
                    <option value="Romania +40">Romania (+40)</option>
                  </select>
                </div>

                {/* Phone input */}
                <div className="form-outline mb-4">
                  <div className="input-group input-group-lg">
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Enter your phone number (e.g, +880)"
                      inputMode="numeric"
                      maxLength={14}
                      required
                      style={{ color: "black" }}
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <p style={{ fontSize: "13px", marginLeft: "8px" }}>
                    Enter your phone number in international format (with or
                    without +)
                  </p>
                </div>

                {/* Password field if user exists */}
                {userExist && (
                  <div className="form-outline mb-4">
                    <div className="input-group input-group-lg">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-5">
                  <input
                    type="submit"
                    className="btn btn-login mb-5"
                    value="Continue"
                  />
                </div>

                <p>
                  "Don't have an account?"{" "}
                  <a href="/register" className="link-info">
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
