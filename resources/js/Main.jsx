import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext, AuthProvider } from "./src/component/LoginRegisterComponent/AuthContext";


const Main = () => {
  return (

    <AuthProvider>
         <BrowserRouter>
        <App />
      </BrowserRouter>
   </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<Main />);
