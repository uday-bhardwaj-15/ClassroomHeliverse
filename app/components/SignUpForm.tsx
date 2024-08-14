"use client";

import React, { useState } from "react";
import { signUp } from "../actions/users/signUp";
// import { signUp } from '../actions/users/signUp';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("Signing up...");
    const message = await signUp(username, password);
    setMessage(message);
  };
  return (
    <div className="flex flex-col gap-4 bg-gray-400 p-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Sign up</button>

      <p>{message}</p>
    </div>
  );
};

export default SignUpForm;
