import './Regisztracio.css';
import { validate } from './register.js';

function Regisztracio({ toggleForm }) {
    return (
        <div className='regisztraciocontainer'>
            <div className="regisztraciowrapper">
                <form action="">
                    <h1>Regisztráció</h1>
                    <div className='regisztraciofelulet'>
                        <div className="input-box">
                            <div className="input-field">
                                <input type="text" placeholder="Vezetéknév" id="vnev" required />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="input-field">
                                <input type="text" placeholder="Keresztnév" id="knev" required />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="input-field">
                                <input type="email" placeholder="Email" id="email" required />
                                <i className="bx bxs-envelope"></i>
                            </div>

                        </div>
                        <div className="input-box">
                            <div className="input-field">
                                <input type="text" placeholder="Telefonszám" id="phone" required />
                                <i className='bx bxs-phone'></i>
                            </div>
                            <div className="input-field">
                                <input type="password" placeholder="Jelszó" id="passwd" required />
                                <i className="bx bxs-key"></i>
                            </div>
                            <div className="input-field">
                                <input type="password" placeholder="Jelszó mégegyszer" id="cpasswd" required />
                                <i className="bx bxs-key"></i>
                            </div>
                        </div>
                    </div>
                    <label className="altalanos"><input type="checkbox" />Elfogadom az általános szerződési feltéleleket!</label>
                    <button type="submit" onClick={validate} className="btn">Regisztrálok</button>
                    <p className="toggle-link" onClick={toggleForm}>
                        Már van profilom, Bejelentkezek.
                    </p>
                    <p className='tajekoztato'>
                        Az időpont foglaláshoz szükséges felhasználói fiókkal rendelkezni!
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Regisztracio;