"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";

import "./styles/globalsClasses.css"

interface HomePageProps {
  email?: string;
}

export default function HomePage({ email }: HomePageProps) {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/login");
  }

  return (
    <main>
      <h1>Super secure home page</h1>
      <p>Only <strong>{email}</strong> holds the magic key to this kingdom!</p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}