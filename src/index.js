import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MovieProvider } from "./context/Movie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>

        <App />
        </MovieProvider>
        <ToastContainer/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
