document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = parseInt(params.get("id"), 10);

    //Bei klicken auf Link geht entsprechende bericht.html Seite auf.
    const articles = JSON.parse(localStorage.getItem("articles"));

    if (!articles || !articleId) {
        document.querySelector(".Bericht-Background").innerHTML = `
            <h2 class="article-title">Artikel nicht gefunden</h2>
            <p class="article-content">Bitte wählen Sie einen gültigen Artikel aus.</p>
        `;
        return;
    }

    const article = articles.find(a => a.id === articleId);

    if (article) {
        document.querySelector(".article-title").textContent = article.title;
        document.querySelector(".article-content").textContent = article.text;
    } else {
        document.querySelector(".Bericht-Background").innerHTML = `
            <h2 class="article-title">Artikel nicht gefunden</h2>
            <p class="article-content">Bitte wählen Sie einen gültigen Artikel aus.</p>
        `;
    }
});
