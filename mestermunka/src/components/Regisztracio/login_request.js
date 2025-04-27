export function login_request(setUser) {
    var email_input = document.getElementById('loginEmail').value
    var password_input = document.getElementById('loginPassword').value

    fetch("https://localhost:44385/api/User/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Email: email_input,
            Passwd: password_input
        })

    })
        .then((response) => {
            console.log(response.status)
            if (!response.ok) {
                //401
                if (response.status === 401) {
                    alert("Hibás a jelszó!")
                }
                else if (response.status === 404) {
                    alert("Az email cím nem található")
                }
                else {
                    throw new Error(`HTTP hiba. Státuszkód: ${response.status}`)
                }
                throw new Error(`HHTP hiba! Státuszkód: ${response.status}`)
            }
            else {
                console.log(response.body)
                alert("Sikeres bejelentkezés!")
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            sessionStorage.setItem("user", JSON.stringify(data))
            setUser(data)
            window.location.href = "/profil";
            document.getElementById("loginEmail").value = "";
            document.getElementById("loginPassword").value = "";

        })
        .catch((error) => {
            console.error("Hiba történt: ", error)
            //alert("Szerver hiba. Próbáld meg később!")
        })
}