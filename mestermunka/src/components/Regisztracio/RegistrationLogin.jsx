import React, { useState } from "react";
import Regisztracio from "./Regisztracio";
import Login from "./Login";
import Menu from "../CommonComponents/Menu";
import Footer from "../CommonComponents/Footer";

function RegistrationLogin() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div>
      <Menu />
      {isLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Regisztracio toggleForm={toggleForm} />
      )}
      <Footer />
    </div>
  );
}

export default RegistrationLogin;
