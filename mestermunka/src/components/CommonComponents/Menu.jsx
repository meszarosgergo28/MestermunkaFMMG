import React, { useEffect, useContext } from 'react';
import Logo from '../../assets/logovilagos.PNG';
import "./Menu.css";
import { openmenu } from "../../js/menutoggle.js";
import { Link } from 'react-router-dom';
import UserContext from '../../js/UserContext.js';

function Menu() {

    const { user } = useContext(UserContext);
    useEffect(() => {
        openmenu();
    }, []);
    return (
        <div className="menu">
            <Link className='nopointer'>
                <div className='logotitle'>
                    <img src={Logo} alt='Logo' className='logo' />
                    <div className='company'>Szépség Éden</div>
                </div>
            </Link>
            <div className='menu-list'>
                <Link to="/">FŐOLDAL</Link>
                <Link to="/galeria">GALÉRIA</Link>
                {user && <Link to="/foglalas">FOGLALÁS</Link>}
                {user && <Link to="/profil">PROFIL</Link>}
                {!user && <Link to="/regisztracio">REGISZTRÁCIÓ</Link>}
            </div>
        </div>
    )
}

export default Menu;