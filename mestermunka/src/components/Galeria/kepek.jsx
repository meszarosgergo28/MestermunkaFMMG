import React from 'react';
import './Kepek.css'
import galeria1 from "./pics/gallery1.jpg"
import galeria2 from "./pics/gallery2.jpg"
import galeria3 from "./pics/gallery3.jpg"
import galeria4 from "./pics/gallery4.jpg"
import galeria5 from "./pics/gallery5.jpg"
import galeria6 from "./pics/gallery6.jpg"
import galeria7 from "./pics/gallery7.jpg"
import galeria8 from "./pics/gallery8.jpg"
import galeria9 from "./pics/gallery9.jpg"
import galeria10 from "./pics/gallery10.jpg"
import galeria11 from "./pics/gallery11.jpg"

function Kepek() {

    return (
        <>
            <div className="cgal">Galéria</div>
            <div className="album">
                <div className="responsive-container-block bg">
                    <div className="responsive-container-block img-cont">
                        <img className="img" src={galeria1} loading="lazy"/>
                        <img className="img" src={galeria2} loading="lazy"/>
                        <img className="img" src={galeria3} loading="lazy"/>
                        <img className="img img-last" src={galeria10} loading="lazy"/>
                    </div>
                    <div className="responsive-container-block img-cont">
                        <img className="img img-big" src={galeria4} loading="lazy"/>
                        <img className="img" src={galeria5} loading="lazy"/>
                        <img className="img img-big img-last" src={galeria9} loading="lazy"/>
                    </div>
                    <div className="responsive-container-block img-cont">
                        <img className="img" src={galeria6} loading="lazy"/>
                        <img className="img" src={galeria7} loading="lazy"/>
                        <img className="img" src={galeria8} loading="lazy"/>
                        <img className="img img-last" src={galeria11} loading="lazy"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Kepek;

