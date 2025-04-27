export function validate(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const vnev = document.getElementById("vnev").value;
    const knev = document.getElementById("knev").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("passwd").value;
    const confirmPassword = document.getElementById("cpasswd").value;
    const termsAccepted = document.querySelector('.altalanos input').checked;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[.*!$,%?;+@#<>)-_=/\\:])[A-Za-z0-9.*!$,%?;+@#<>)-_=/\\:]{8,}$/;


    if (!emailRegex.test(email)) {
        alert("Az email cím formátuma érvénytelen!");
        return;
    }

    if (vnev.length < 2  || /[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(vnev)) {
        alert("A vezetéknévnek legalább 2 karakter hosszúnak kell lennie és csak betűket tartalmazhat.");
        return;
    }
    if (knev.length < 3  || /[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(knev)) {
        alert("A keresztnévnek legalább 3 karakter hosszúnak kell lennie és csak betűket tartalmazhat.");
        return;
    }

    if (!phoneRegex.test(phone)) {
        alert("A telefonszám csak számokat tartalmazhat, legalább 10 karakter hosszunak kell lennie");
        return;
    }

    if (password.length < 8) {
        alert("A jelszónak minimum 8 karakter hosszúnak kell lennie!");
        return;
    }
    if (!/[A-Z]/.test(password)) {
        alert("A jelszónak tartalmaznia kell legalább egy nagybetűt!");
        return;
    }
    if (!/\d/.test(password)) {
        alert("A jelszónak tartalmaznia kell legalább egy számjegyet!");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Ilyen karaktert nem tartalmazhat!");
        return;
    }


    if (password !== confirmPassword) {
        alert("A két jelszó nem egyezik");
        return;
    }


    if (!termsAccepted) {
        alert("El kell fogadnod az általános szerződési feltételeket!");
        return;
    }

    fetch("https://localhost:44385/api/User", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Email: email,
            Passwd: password,
            Surname: vnev,
            Firstname: knev,
            PhoneNumber: phone,
            Role_Id: 2
        })
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 409) {
                    alert("Ez az e-mail cím már regisztrálva van.");
                } else {
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            } else {
                alert("Sikeres regisztráció!");
                document.getElementById("email").value = "";
                document.getElementById("vnev").value = "";
                document.getElementById("knev").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("passwd").value = "";
                document.getElementById("cpasswd").value = "";
                document.querySelector('.altalanos input').checked = false;
            }
            //return response.json();
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            alert("Szerver hiba. Kérlek próbáld meg később!");
        });
}