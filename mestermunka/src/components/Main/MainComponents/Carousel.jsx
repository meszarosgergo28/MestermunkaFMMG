import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import masszazs from '../../../assets/massagecarousel.JPG';
import manikur from '../../../assets/manicurecarousel.JPG';
import fodrasz from '../../../assets/fodraszcarousel.JPG';
import "bootstrap/dist/css/bootstrap.min.css";
import './Carousel.css';

function MyCarousel() {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img src={masszazs} alt="Masszázs" className="d-block w-100" />
                <Carousel.Caption>
                    <h3>Masszázs</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={manikur} alt="Manikűr" className="d-block w-100" />
                <Carousel.Caption>
                    <h3>Manikűr</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={fodrasz} alt="Fodrász" className="d-block w-100" />
                <Carousel.Caption>
                    <h3>Fodrászat</h3>

                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default MyCarousel;
