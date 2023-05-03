import React from "react";
import "./App.scss";
import { UserList } from "./components/user-list/user-list";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <header>
        <div className="overlay">
          <div className="developer-details">
            <span>Created by Nir Almog</span>
            <FontAwesomeIcon
              icon={faGithubSquare}
              onClick={() => window.open("https://github.com/nir11", "_blank")}
              size="2x"
              className="github-icon"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/nir-almog-9a4202151/",
                  "_blank"
                )
              }
              size="2x"
              className="linkedin-icon"
            />
          </div>
          <h1>Appsforce Home Assignment</h1>
        </div>
      </header>

      <UserList />

      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        enableMultiContainer
        limit={1}
        autoClose={500} // close after 500 ms
      />
    </div>
  );
}

export default App;
