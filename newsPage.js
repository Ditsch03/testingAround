document.addEventListener("DOMContentLoaded", () => {
    const newsGrid = document.getElementById("newsGrid");
    const jsonFilePath = "berichte.json";

    //Laden der Daten von berichte.json auf die news.html Seite.
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON");
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Expected an array but got something else.");
            }
            localStorage.setItem("articles", JSON.stringify(data));

            data.forEach(article => {
                const articleElement = document.createElement("article");
                articleElement.classList.add("newsPost");

                //foto ladet nicht, nur wenn es im gleichen Ordner ist wie json File.
                articleElement.innerHTML = `
                    <img class="newsImage" src="${article.image}" alt="${article.alt}"> 
                    <section class="newsNameAndLink">
                        <h1 class="newsTitle">${article.title}</h1>
                        <a class="newslink" href="bericht.html?id=${article.id}">Klicken zum lesen</a>
                    </section>
                `;
                newsGrid.appendChild(articleElement);
            });
        })
        .catch(error => console.error("Error loading news articles:", error)); });

