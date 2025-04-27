import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Settings.css";
import { jelszoChange } from "../../js/passwordChange";
let oldDate;

function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [date, setDate] = useState(new Date());
    const [user, setUser] = useState(null);
    const [dateInfo, setDateInfo] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    useEffect(() => {
        //console.log(1)
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        
        if (oldDate != date) {
            //console.log(date)
            //console.log(oldDate)
            oldDate = date
            
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            fetch(`https://localhost:44385/api/Reservation/vendeg/${UserData.Id}?Date=${formattedDate}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Hiba történt az időpontok lekérdezésekor!")
                    }
                    return response.json()
                })
                .then(data => {
                    setDateInfo(data)
                })
                .catch((error) => console.log(error))
        }

    },)



    let UserData = JSON.parse(sessionStorage.getItem('user'))
    //console.log(UserData)
    function jelszoValtoztatas(e) {
        e.preventDefault()
        jelszoChange()
    }

    function logout() {
        sessionStorage.clear();
        window.location.href = "/"
    }

    return (
        <div className="settingscontainer">
            <div className="options">
                <div className="item" onClick={() => setActiveTab("profile")}>
                    Profil
                </div>
                <div className="item" onClick={() => setActiveTab("bookings")}>
                    Foglalásaim
                </div>
                <div className="item" onClick={() => setActiveTab("password")}>
                    Jelszó változtatás
                </div>
                <div className="item" onClick={() => setActiveTab("logout")}>
                    Kijelentkezés
                </div>
            </div>
            <div className="elements">
                <div className={`content ${activeTab === "profile" ? "active" : "hidden"}`}>
                    <h2>Profil Információk</h2>
                    {user ? (
                        <>
                            <p><strong>Név:</strong> {user.Firstname} {user.Surname}</p>
                            <p><strong>Email:</strong> {user.Email}</p>
                        </>
                    ) : (
                        <p>Felhasználói adatok betöltése...</p>
                    )}
                </div>
                <div className={`content ${activeTab === "bookings" ? "active" : "hidden"}`}>
                    <h2>Foglalásaim</h2>
                    <Calendar
                        onChange={setDate}
                        minDate={new Date()}
                        tileDisabled={({ date }) => {
                            const nap = date.getDay();
                            return nap === 0 || nap === 6;
                        }}
                    />
                    <p>Kiválasztott dátum: {date.toLocaleDateString()}</p>
                    <div className="foglalt-idopontok-container">
                        {dateInfo.length > 0 ? (
                            dateInfo.map((item, index) => (
                                <div key={index} className={`foglalas-kartya ${selectedBookingId === item.Id ? "selected" : ""}`}
                                    onClick={() => setSelectedBookingId(item.Id)}>
                                    <p><strong>Időpont:</strong> {item.Idopont}</p>
                                    <p><strong>Szolgáltatás:</strong> {item.Szolgaltatas}</p>
                                    <p><strong>Szakember:</strong> {item.Szakember}</p>
                                    <p><strong>Ár:</strong> {item.Ar} Ft</p>
                                    <p><strong>Hossz:</strong> {item.Hossz} perc</p>
                                </div>
                            ))
                        ) : (
                            <p>Nincs foglalás erre a napra.</p>
                        )}
                    </div>
                    <button
                        className="cancel-btn"
                        disabled={!selectedBookingId}
                        onClick={() => {
                            if (!selectedBookingId) return;

                            const confirmed = window.confirm("Biztosan törölni szeretnéd a foglalást?");
                            if (!confirmed) return;

                            fetch(`https://localhost:44385/api/Reservation/${selectedBookingId}`, {
                                method: "DELETE"
                            })
                                .then((res) => {
                                    if (!res.ok) throw new Error("Törlés sikertelen!");
                                    alert("Foglalás sikeresen törölve!");

                                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

                                    return new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
                                        fetch(`https://localhost:44385/api/Reservation/vendeg/${user.Id}?Date=${formattedDate}`)
                                    );//elkeruljuk a 404-es hibat a delay segitsegevel
                                })
                                .then(res => res.json())
                                .then(data => {
                                    setDateInfo(data);
                                    setSelectedBookingId(null); // reset
                                })
                                .catch((err) => {
                                    console.error("Törlés hiba:", err);
                                    alert("Hiba történt a törlés közben!");
                                });
                        }}
                    >
                        Foglalás lemondása
                    </button>

                </div>
                <div className={`content ${activeTab === "password" ? "active" : "hidden"}`}>
                    <form onSubmit={jelszoValtoztatas}>
                        <h2>Jelszó változtatás</h2>
                        <p>Itt módosíthatod a jelszavad.</p>
                        <div className="password-container">
                            <input type="password" placeholder="Régi jelszó" id="regijelszo" required />
                            <input type="password" placeholder="Új jelszó" id="ujjelszo" required />
                            <input type="password" placeholder="Új jelszó mégegyszer" id="ujjelszomegegyszer" required />
                            <button type="submit" className="cancel-btn">Jelszó módosítása</button>
                        </div>
                    </form>
                </div>
                <div className={`content ${activeTab === "logout" ? "active" : "hidden"}`}>
                    <h2>Kijelentkezés</h2>
                    <p>Kilépés a fiókból.</p>
                    <button className="cancel-btn" onClick={logout}>Kijelentkezem</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
