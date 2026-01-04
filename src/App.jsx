import React, { useState } from "react";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";
import "./App.css";

export default function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [variant, setVariant] = useState("bar");

  return (
    <div
      style={{ width: "350px", margin: "50px auto", fontFamily: "sans-serif" }}
    >
      <h2>Password Strength Meter</h2>

      {/* Variant selector */}
      <div style={{ marginBottom: "8px" }}>
        {["bar", "circle", "emoji", "gradient"].map((v) => (
          <label key={v} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              value={v}
              checked={variant === v}
              onChange={(e) => setVariant(e.target.value)}
            />{" "}
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </label>
        ))}
      </div>

      {/* Password input */}
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "👁️‍🗨️" : "👁️"}
        </span>
      </div>

      {/* Password meter */}
      <PasswordStrengthMeter password={password} variant={variant} />
    </div>
  );
}
