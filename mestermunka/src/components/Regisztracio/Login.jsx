import React, { useState, useContext } from "react";
import { login_request } from "./login_request";
import "./Login.css"
import UserContext from "../../js/UserContext";
function Login({ toggleForm }) {

    const { setUser } = useContext(UserContext);
    function log(event) {
        event.preventDefault()
        login_request(setUser)
    }
    
    return (
        <div className="logincontainer">
            <div className="loginwrapper">
                <form onSubmit={log}>
                    <h1>Bejelentkezés</h1>
                    <div className="loginfelulet">
                        <div className="input-box">
                            <div className="input-field">
                                <input type="email" placeholder="Email" id="loginEmail" required />
                            </div>

                            <div className="input-box">
                                <div className="input-field">
                                    <input type="password" placeholder="Jelszó" id="loginPassword" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn">Bejelentkezés</button>
                    <p className="toggle-link" onClick={toggleForm}>
                        Nincs még profilom, Regisztrálok.
                    </p>
                </form>
            </div>
        </div>

    );
}

export default Login;
