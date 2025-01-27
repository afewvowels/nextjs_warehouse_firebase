"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/navigation";

import "../styles/globalsClasses.css"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");

    if (password !== confirmation) {
      setError("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      router.push("/login");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <main>
      <h1>Pray tell, who be this gallant soul seeking entry to mine humble
        abode?</h1>
      <form onSubmit={handleSubmit} action="#">
        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            name="confirm-password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            id="confirm-password"
            placeholder="••••••••"
            required
          />
        </div>
        {error && (
          <div role="alert">
            <span>{error}</span>
          </div>
        )}
        <button type="submit">Create an account</button>
        <p>
          Already have an account?{" "}
          <Link href="/login">Login here</Link>
        </p>
      </form>
    </main>
  );
}