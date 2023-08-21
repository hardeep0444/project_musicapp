import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login, Home } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCredentials) => {
      //if we have the user credentials
      if (userCredentials) {
        userCredentials.getIdToken().then((token) => {
          console.log(token);
        });
      }
      // if we dont't have the user credentials then reload the login page
      else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
    return () => {
      console.log("APP CLEANUPP");
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="h-auto w-min-[680px] bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
