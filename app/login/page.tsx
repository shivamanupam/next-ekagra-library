"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IconButton } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch (err) {
      console.log("Login Error: ", err);
      setLoading(false);
      setError(err);
    }
  }

  return (
    <>
      <IconButton sx={{ color: "white", cursor: "pointer" }}>
        <KeyboardBackspaceIcon
          className="absolute top-16 left-10"
          onClick={() => router.push("/")}
        >
          Back
        </KeyboardBackspaceIcon>
      </IconButton>
      <div className="mx-auto my-auto min-w-xl min-h-full flex flex-col gap-4">
        <h2 className="text-4xl">Admin Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="border rounded-sm px-8 py-8 flex flex-col gap-8"
        >
          <div className="flex flex-row">
            <div className="flex flex-col items-center min-w-fit gap-4 p-4 text-md">
              <label htmlFor="email">Email</label>
              <label htmlFor="password">Password</label>
            </div>

            <div className="flex flex-col gap-4">
              <input
                placeholder="Enter admin email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border rounded-sm px-2 py-1 w-fit min-w-[28ch]"
              />
              <input
                placeholder="Please enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border rounded-sm px-2 py-1 w-fit min-w-[28ch]"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="border rounded-sm px-4 py-2 max-w-fit cursor-pointer self-center"
          >
            {loading ? "Loging In..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
