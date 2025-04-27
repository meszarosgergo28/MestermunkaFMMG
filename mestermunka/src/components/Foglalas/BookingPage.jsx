import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "./BookingPage.css";
import "react-calendar/dist/Calendar.css";
import Menu from "../CommonComponents/Menu";
import Footer from "../CommonComponents/Footer";

export default function BookingPage() {
  const { id } = useParams();

  const getNextAvailableDate = () => {
    const today = new Date();
    const day = today.getDay();
    let next = new Date(today); 

    //ha hetvege akkor az alapbol kivalasztott datum a hetfo legyen
    if (day === 5) {
      next.setDate(today.getDate() + 3);
    } else if (day === 6) {
      next.setDate(today.getDate() + 2);
    } else {
      next.setDate(today.getDate() + 1);
    }

    next.setHours(0, 0, 0, 0);
    return next;
  };

  const [date, setDate] = useState(getNextAvailableDate);
  const [time, setTime] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [szakemberek, setSzakemberek] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);

  //szolgaltatas lekerese
  useEffect(() => {
    fetch("https://localhost:44385/api/Service")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        const found = data.find((s) => s.Id === parseInt(id));
        if (found) setService(found);
      })
      .catch((err) => console.error("Szolgáltatás hiba:", err));
  }, [id]);

  //foglalasok betoltese
  useEffect(() => {
    if (!selectedUserId || !date) return;

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    fetch(`https://localhost:44385/api/Reservation/dolgozo/${selectedUserId}?Date=${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((err) => console.error("Foglalások betöltése sikertelen:", err));
  }, [selectedUserId, date]);

  //szakemberek betoltese
  useEffect(() => {
    if (!service) return;
    fetch(`https://localhost:44385/api/Userservices?id=${service.Id}`)
      .then((res) => res.json())
      .then((data) => setSzakemberek(data))
      .catch((err) => console.error("Szakember hiba:", err));
  }, [service]);

  //munkaido betoltese
  useEffect(() => {
    if (!selectedUserId || !date) return;

    fetch(`https://localhost:44385/api/Workinghours/${selectedUserId}`)
      .then((res) => res.json())
      .then((data) => setWorkingHours(data))
      .catch((err) => console.error("Munkaidő hiba:", err));
  }, [selectedUserId, date]);


  //szabad idopontok kiszamitasa
  useEffect(() => {
    if (!selectedUserId || !date || !service || workingHours.length === 0) return;

    const day = date.getDay() === 0 ? 7 : date.getDay();
    const todayHours = workingHours.find((d) => d.Daynumber === day);
    if (!todayHours) {
      setAvailableTimeSlots([]);
      return;
    }

    const [startH, startM] = todayHours.Openingtime.split(":").map(Number);
    const [endH, endM] = todayHours.Closingtime.split(":").map(Number);
    const startMin = startH * 60 + startM;
    const endMin = endH * 60 + endM;

    const slotDuration = 30;
    const serviceDuration = service.Duration;

    const slots = [];
    for (let min = startMin; min + serviceDuration <= endMin; min += slotDuration) {
      const h = String(Math.floor(min / 60)).padStart(2, "0");
      const m = String(min % 60).padStart(2, "0");
      slots.push(`${h}:${m}`);
    }

    const blocked = new Set();

    reservations.forEach((item) => {
      const duration = item.SzolgaltatasHossz || 30;
      const [h, m] = item.FoglaltIdopont.split(":").map(Number);
      const start = h * 60 + m;
      const slotCount = Math.ceil(duration / slotDuration);

      // blokkoljuk a foglalas idejet es utana levo idopontokat
      for (let i = 0; i < slotCount; i++) {
        const total = start + i * slotDuration;
        const hh = String(Math.floor(total / 60)).padStart(2, "0");
        const mm = String(total % 60).padStart(2, "0");
        blocked.add(`${hh}:${mm}`);
      }

      // blokkoljuk az elotte levo idopontokat, amik nem fernenek bele az idobe
      const reverseBlockCount = Math.ceil(serviceDuration / slotDuration) - 1;
      for (let j = 1; j <= reverseBlockCount; j++) {
        const backMin = start - j * slotDuration;
        if (backMin >= startMin) {
          const bh = String(Math.floor(backMin / 60)).padStart(2, "0");
          const bm = String(backMin % 60).padStart(2, "0");
          blocked.add(`${bh}:${bm}`);
        }
      }
    });

    const free = slots.filter((slot) => !blocked.has(slot));
    setAvailableTimeSlots(free);
  }, [selectedUserId, date, reservations, service, workingHours]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert("Kérlek válassz szakembert!");
      return;
    }
    if (!time) {
      alert("Kérlek válassz időpontot!");
      return;
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    const payload = {
      Worker_Id: selectedUserId,
      Guest_Id: user.Id,
      Service_Id: service.Id,
      Datetime: date.toLocaleDateString("sv-SE"),
      Appointment: time
    };

    fetch("https://localhost:44385/api/Reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        //console.log(payload);
        if (!res.ok) throw new Error("Foglalás sikertelen!");
        return res.json();
      })
      .then(() => {
        alert(
          `Foglalás sikeres:\nSzolgáltatás: ${service.Name}\nDátum: ${date.toLocaleDateString()}\nIdőpont: ${time}\nÁr: ${service.Price}Ft`
        );
        window.location.href = "/foglalas";
      })
      .catch((err) => {
        console.error("POST hiba:", err);
        alert("Hiba történt a foglalás mentésekor.");
      });
  };

  if (!service) return <div>Szolgáltatás betöltése...</div>;

  return (
    <>
      <Menu />
      <div className="foglalas-container">
        <h1 className="foglalas-title">Foglalás – {service.Name}</h1>
        <h1 className="foglalas-title">Szolgáltatás ára – {service.Price}Ft</h1>
        <h1 className="foglalas-title">Szolgáltatás hossza – {service.Duration} Perc</h1>
        <form onSubmit={handleSubmit} className="foglalas-form">
          <div className="calendar-container">
            <label className="naptar-label">Válassz dátumot:</label>
            <Calendar
              onChange={setDate}
              value={date}
              minDate={new Date()}
              tileDisabled={({ date }) => {
                const nap = date.getDay();
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isWeekend = nap === 0 || nap === 6;
                const isToday = date.getTime() === today.getTime();
                return isWeekend || isToday;
              }
              }
            />
          </div>

          <div>
            <label className="naptar-label">Válassz szakembert:</label>
            <div className="szakemberek-container">
              {szakemberek.length > 0 ? (
                szakemberek.map((szakember, index) => (
                  <div
                    key={index}
                    className={`szakember-div ${selectedUserId === szakember.User_Id ? 'selected' : ''}`}
                    onClick={() => setSelectedUserId(szakember.User_Id)}
                  >
                    {szakember.FullName}
                  </div>
                ))
              ) : (
                <p>Nincs elérhető szakember ehhez a szolgáltatáshoz.</p>
              )}
            </div>
          </div>

          <div className="input-group">
            <label className="naptar-label">Válassz időpontot:</label>
            <div className="idopontok-container">
              {availableTimeSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`idopont-div ${time === slot ? 'selected' : ''}`}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Foglalás
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
