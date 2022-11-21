const RSS_URL = `rss/tin-moi-nhat.rss`;
const textarea = document.querySelector("#feed-textarea > ul");

const date = new Date();
document.querySelector("#date").innerHTML = date.toDateString();

fetch(RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    console.log(data);
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach((el) => {
      html += `
        <article class="bg-light border border-success float-sm-none">
        <div class="d-flex">
            <a href="${
              el.querySelector("link").innerHTML
            }" target="_blank" rel="noopener">${
        el.querySelector("title").innerHTML
      }
            </a>
            <div class="ml-auto">${el.querySelector("pubDate").innerHTML}</div>
        </div >
          <div class="media">
          ${el.querySelector("description").innerHTML} 
          </div>
        </article>
      `;
    });
    textarea.insertAdjacentHTML("beforeend", html);
  });
