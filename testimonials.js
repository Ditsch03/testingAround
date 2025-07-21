let currentID = 0;

//laden testimonial
document.addEventListener("DOMContentLoaded", () => {
    const apiConnection = "https://web-modules.dev/api/v1/testimonials/10";
    const arrow = document.getElementById("arrow");
    const arrowLeft = document.getElementById("arrow-left");

    let testimonials = [];
    let currentIndex = 0;

    //testimonials anzeigen
    function displayTestimonial(testimonial) {
        document.getElementById("testimonial-avatar").src = testimonial.avatar;
        document.getElementById("testimonial-avatar").alt = `${testimonial.firstname} ${testimonial.lastname}`;
        document.getElementById("testimonial-name").textContent = `${testimonial.firstname} ${testimonial.lastname}`;
        document.getElementById("testimonial-company").textContent = `- ${testimonial.company}`;
        document.getElementById("testimonial-quote").textContent = `"${testimonial.quote}"`;
        document.getElementById("likeCount").textContent = `${testimonial.likes_count}`;
        currentID = testimonial.id;
    }

    // Laden der Testimonials
    fetch(apiConnection, {
        headers: {
            "Authorization": `Bearer 635|jimGmeEhh8U6VVwpfSNNl05G1trqXh9cTPlDol34d5e176c5`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Serververbindung funktioniert nicht.");
            }
            return response.json();
        })
        .then(data => {
            testimonials = data.testimonials;

            if (testimonials.length === 0) {
                alert("Keine Testimonials verfügbar.");
                return;
            }

            // Erstes testimonial anzeigen
            displayTestimonial(testimonials[currentIndex]);
        })
        .catch(error => {
            console.error("Fehler beim Laden der Testimonials:", error);
            alert("Testimonials können nicht geladen werden.");
        });

    // pfeilfunktion für ANzeigen des nächsten Testimonials
    arrow.addEventListener("click", function () {
        if (testimonials.length === 0) {
            alert("Keine Testimonials verfügbar.");
            return;
        }
        currentIndex = (currentIndex + 1) % testimonials.length;
        displayTestimonial(testimonials[currentIndex]);
    });

    arrowLeft.addEventListener("click", function () {
        if (testimonials.length === 0) {
            alert("Keine Testimonials verfügbar.");
            return;
        }
        currentIndex = (currentIndex - 1) % testimonials.length;
        displayTestimonial(testimonials[currentIndex]);
    });
});


const LikeButton = document.getElementById("likeButton");

LikeButton.addEventListener("click", async function() {
    LikeButton.src = "../docs/liked.png"
    LikeButton.classList.add("disabled");
    document.getElementById("likeCount").textContent++;

    //senden des likes an API
    const likeData = {
        type: "testimonial",
        id: currentID
    };

    const api = "https://web-modules.dev/api/v1/like";
    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 635|jimGmeEhh8U6VVwpfSNNl05G1trqXh9cTPlDol34d5e176c5`,
            },
            body: JSON.stringify(likeData),
        });

        if (response.ok) {
            alert("Danke für den Like!")
        } else {
            const errorData = await response.json();
            alert(`Fehler beim Senden: ${errorData.message || "Unbekannter Fehler"}`);
            likeButton.classList.remove("disabled");
            likeButton.src = "../docs/unliked.png";
            likeCount.textContent--;
        }
    } catch (error) {
        console.error("Fehler beim Senden des Likes:", error);
        alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
        likeButton.classList.remove("disabled");
        likeButton.src = "../docs/unliked.png";
        likeCount.textContent--;
    }
});