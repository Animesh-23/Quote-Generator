const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
const newQuote = () => {
  loading();
  let idx = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[idx];
  quoteText.textContent = quote.text;
  if (quote.text.length > 125) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  if (!quote.author) {
    author.textContent = "unknown";
    return;
  }
  author.textContent = quote.author;
  complete();
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
};
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();
