export function jelszoChange() {
    const regiJelszo = document.getElementById("regijelszo").value;
    const ujJelszo = document.getElementById("ujjelszo").value;
    const ujJelszoMeg = document.getElementById("ujjelszomegegyszer").value;
  

    if (ujJelszo !== ujJelszoMeg) {
      alert("A két új jelszó nem egyezik!");
      return;
    }
  

    if (ujJelszo.length < 8) {
      alert("A jelszónak minimum 8 karakter hosszúnak kell lennie!");
      return;
    }
  

    if (!/[A-Z]/.test(ujJelszo)) {
      alert("A jelszónak tartalmaznia kell legalább egy nagybetűt!");
      return;
    }
  

    if (!/\d/.test(ujJelszo)) {
      alert("A jelszónak tartalmaznia kell legalább egy számjegyet!");
      return;
    }
  

    const passwordRegex = /^[A-Za-z0-9.*!$,%?;+@#<>)\-_=\/\\:]{8,}$/;
    if (!passwordRegex.test(ujJelszo)) {
      alert("A jelszó csak megengedett karaktereket tartalmazhat.");
      return;
    }
  

    const user = JSON.parse(sessionStorage.getItem("user"));
  
    fetch(`https://localhost:44385/api/User/${user.Id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        OldPasswd: regiJelszo,
        NewPasswd: ujJelszo
      })
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Hibás a jelenlegi jelszó!");
          } else {
            throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
          }
          return;
        }
  
        alert("Sikeres jelszómódosítás!");
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
  

        document.getElementById("regijelszo").value = "";
        document.getElementById("ujjelszo").value = "";
        document.getElementById("ujjelszomegegyszer").value = "";
      })
      .catch((error) => {
        console.error("Hiba történt: ", error);
        alert("Szerver hiba. Próbáld meg később!");
      });
  }
  