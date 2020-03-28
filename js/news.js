const apiKey = "080b6a2a4f764c56baeb6002959b4105";
let keyword = "covid-19";
let url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;

const container = document.querySelector(".container");

const getNews = link => {
    console.log(link);
    fetch(link)
        .then(response => response.json())
        .then(data => addContent(data))
        .catch(err => console.log(`Error: ${err}`));
};

const changeUrl = searchString =>
    `https://newsapi.org/v2/everything?q=${searchString}&apiKey=${apiKey}`;

const addContent = data => {
    document.querySelector(".loader").style.display = "none";
    const { articles } = data;
    console.log(articles[0]);
    articles.forEach(article => createPost(article));
};

const createPost = newsItem => {
    newsItem.author = newsItem.author == null ? "Unknown" : newsItem.author;
    const container = document.querySelector(".container");
    let post = `
      <section class="news post">
        <img src="${newsItem.urlToImage}" alt="News post image" />
        <h1 class="news-title">${newsItem.title}</h1>
        <p class="news-author"><strong>Written by:</strong> <em>${newsItem.author}</em></p>
        <p class="description">${newsItem.description}</p>
        <a href="${newsItem.url}" target="_blank" class="read-more">go read it</a>
      </section>
  `;

    container.innerHTML += post;
};

const searchForm = document.querySelector("#search");

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    let searchString = searchForm.querySelector("[data-search-bar]").value;
    let searchPhrase = !!searchString ? searchString : "coding";
    searchString = "";

    url = changeUrl(searchPhrase);

    document.querySelector(".container").innerHTML = "";
    newsApp();
});

const newsApp = () => {
    getNews(url);
};

newsApp();