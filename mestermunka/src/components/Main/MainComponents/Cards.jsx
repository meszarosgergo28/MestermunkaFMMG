import { React, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Cards.css";
import fodrasz from '../../../assets/fodrasz.png';
import manikur from '../../../assets/manikurikon.png';
import massage from '../../../assets/massageikon.png';
import arckezeles from '../../../assets/arckezelesikon.png';
import pedikur from '../../../assets/pedicure.png';
import { Link } from 'react-router-dom';
import UserContext from '../../../js/UserContext';

function CardSlider() {

	const { user } = useContext(UserContext);

	const settings = {
		dots: true,
		infinite: true,
		speed: 400,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
	};

	return (
		<>
			<div className="szolgaltatasoktitle">legnépszerűbb szolgáltatásaink</div>
			<div className="slider-container">
				<Slider {...settings}>
					<div className="item">
						<div className="nev">Fodrász</div>
						<img src={fodrasz} alt="fodrász" />
					</div>
					<div className="item">
						<div className="nev">Manikűr</div>
						<img src={manikur} alt="manikűr" />
					</div>
					<div className="item">
						<div className="nev">Pedikűr</div>
						<img src={pedikur} alt="pedikűr" />
					</div>
					<div className="item">
						<div className="nev">Masszázs</div>
						<img src={massage} alt="masszázs" />
					</div>
					<div className="item">
						<div className="nev">Arckezelés</div>
						<img src={arckezeles} alt="arc kezelés" />
					</div>
				</Slider>

				{!user && <Link to="/regisztracio" className="btn">Kipróbálom!</Link>}
				{user && <Link to="/foglalas" className="btn">Kipróbálom!</Link>}
			</div>
		</>
	);
}

export default CardSlider;

