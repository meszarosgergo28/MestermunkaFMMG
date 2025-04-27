import {React, useContext} from 'react';
import './IdopontSection.css'
import { Link } from 'react-router-dom';
import UserContext from '../../../js/UserContext';

function IdopontSection() {
  const { user } = useContext(UserContext);
  return (
    <div className='parent-container'>
      <div className="booking-container">
        <div className="booking-card">
          <div className="booking-text">
            <h2 className="booking-title">NÁLUNK AZ IDŐPONTFOGLALÁS GYORS ÉS EGYSZERŰ!</h2>
            <p className="booking-description">
              Néhány kattintással kiválaszthatod a számodra megfelelő szakembert, megadhatod az időpontot, és már kész is vagy.
              Próbáld ki most, és élvezd az online időpontfoglalás kényelmét!
            </p>
          </div>
          <div className="booking-image-container">
            {!user && <Link to="/regisztracio" className="booking-button">FOGLALÁS</Link>}
            {user && <Link to="/foglalas" className="booking-button">FOGLALÁS</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdopontSection