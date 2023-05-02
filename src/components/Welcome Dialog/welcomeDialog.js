import React from "react";
import logo from "./Magenta Logo with background.svg";
import "./welcomeDialog.css";

const WelcomeDialog = () => {
    return <div className="dialog-box">
        <div className="icon-container">
            <img src={logo} alt="magenta logo" />
        </div>
        <div className="title-content">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <h1>Magenta</h1>
            <p>Calculator</p>
        </div>
        <div className="lower-content">
            <p>Developed by Archie Cedeño Sevillano</p>
            <p><small>Copyright &copy; 2023</small></p>
        </div>
    </div>
}

export default WelcomeDialog;