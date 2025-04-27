import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contact">
        <p className="contactinfo"><strong>Telefon:</strong> +36 20 265 5470</p>
        <p className="contactinfo"><strong>Email:</strong> szepsegeden@gmail.com</p>
      </div>
      <div className="map">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Szombathely, Zrínyi Ilona u. 12, 9700&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          width="300"
          height="200"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </footer>
  );
}

