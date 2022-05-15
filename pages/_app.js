import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";
import { auth, firestore } from "../lib/firebase";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { user, username } = useUserData();
  return (
    <UserContext.Provider value={{ user, username }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
