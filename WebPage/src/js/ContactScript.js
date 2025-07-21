
document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    let isValid = true;

    // Name
    const nameInput = document.getElementById("fname");
    const nameFeedback = document.getElementById("fnameError");
    if (nameInput.value.trim() === "") {
        isValid = false;
        nameFeedback.textContent = "Dieses Feld ist notwendig.";
    } else if (nameInput.value.trim().length < 3 || nameInput.value.trim().length > 100) {
        isValid = false;
        nameFeedback.textContent = "mindestens 3 Zeichen, maximal 100 Zeichen.";
    } else {
        nameFeedback.textContent = "";
    }
    if(isValid) {

    }

    // E-Mail
    const emailInput = document.getElementById("mail");
    const emailFeedback = document.getElementById("mailError");
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
        isValid = false;
        emailFeedback.textContent = "Dieses Feld ist notwendig.";
    } else if (!emailRegex.test(emailValue) || emailValue.length > 200) {
        isValid = false;
        emailFeedback.textContent = "Bitte geben Sie eine gültige E-Mail-Adresse ein (max. 200 Zeichen).";
    } else {
        emailFeedback.textContent = "";
    }

    // Design-Slider
    const designInput = document.getElementById("design");
    const designFeedback = document.getElementById("designError");
    if (parseInt(designInput.value, 10) === 0) {
        isValid = false;
        designFeedback.textContent = "Bitte geben Sie ein Rating ab zwischen 1 und 10.";
    } else {
        designFeedback.textContent = "";
    }

    // Elemente-Slider
    const elementsInput = document.getElementById("elements");
    const elementsFeedback = document.getElementById("elementsError");
    if (parseInt(elementsInput.value, 10) === 0) {
        isValid = false;
        elementsFeedback.textContent = "Bitte geben Sie ein Rating ab zwischen 1 und 10.";
    } else {
        elementsFeedback.textContent = "";
    }


    // Wenn etwas ungültig ist
    if (!isValid) {
        alert("Bitte füllen Sie alle Felder korrekt aus.");
        return;
    }
    if(isValid){
        alert("Danke für das Feedback!")
    }
    //senden
    const formData = {
        name: nameInput.value.trim(),
        email: emailValue,
        rating_design: parseInt(designInput.value, 10),
        rating_components: parseInt(elementsInput.value, 10),
    };

    const api = "https://web-modules.dev/api/v1/feedback";
    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 635|jimGmeEhh8U6VVwpfSNNl05G1trqXh9cTPlDol34d5e176c5`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            //form zurücksetzen
            document.querySelector("form").reset();
            fetchFeedback();
        } else {
            const errorData = await response.json();
            alert(`Fehler beim Senden: ${errorData.message || "Unbekannter Fehler"}`);
        }
    } catch (error) {
        console.error("Fehler beim Senden des Formulars:", error);
        alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
    }
});

//slider funktionen für Design bewertungen
function updateDesign(value) {
    document.getElementById('design-rating').textContent = value;
}
function updateElement(value) {
    document.getElementById('element-rating').textContent = value;
}

//Feedback Daten abziehen für Statistik
async function fetchFeedback(){
    document.getElementById("feedbackTable").style.visibility = "visible";
    const apiURL = "https://web-modules.dev/api/v1/feedback"

    try {
        // Daten von der API abrufen
        const response = await fetch(apiURL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer 635|jimGmeEhh8U6VVwpfSNNl05G1trqXh9cTPlDol34d5e176c5`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Abrufen der Daten: ${response.status}`);
        }
        const data = await response.json();


        const feedbacks = data.feedbacks.slice(-10); //nur die letzten 10 werden angezeigt.
        if (!Array.isArray(feedbacks)) {
            throw new Error("Erwartetes Array von Feedbacks nicht gefunden.");
        }

        // Tabelle füllen
        const tableBody = document.querySelector("#feedbackTable tbody");
        tableBody.innerHTML = "";

        feedbacks.forEach(feedback => {
            const row = document.createElement("tr");

            // Name
            const nameCell = document.createElement("td");
            nameCell.textContent = feedback.name || "Unbekannt";
            row.appendChild(nameCell);

            // Design Bewertung
            const designRatingCell = document.createElement("td");
            designRatingCell.textContent = feedback.rating_design || "Keine Bewertung";
            row.appendChild(designRatingCell);

            // Komponenten Bewertung
            const componentsRatingCell = document.createElement("td");
            componentsRatingCell.textContent = feedback.rating_components || "Keine Bewertung";
            row.appendChild(componentsRatingCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Fehler:", error.message);
    }
}




