const url = "https://quotes.rest/qod?language=en";

const typing = function (text, author) {
  let index = 0;
  let letter = "";
  let keepGoing = true;
  let keepGo = true;

  (function type() {
    //typing quote
    letter = text.slice(0, ++index);
    document.querySelector(".typing").textContent = letter;
    if (letter.length === text.length) {
      index = 0;
      keepGoing = false;

      document.styleSheets[0].cssRules[4].style.borderRight = "0";

      (function typeAuthor() {
        //typing author
        document.querySelector(".author").style.visibility = "visible";
        letter = author.slice(0, ++index);

        document.querySelector(".author").textContent = letter;
        if (letter.length === author.length) {
          index = 0;
          keepGo = false;
          document.styleSheets[0].cssRules[5].style.borderRight = "0";
        }
        if (keepGo) {
          setTimeout(typeAuthor, 100);
        }
      })();
    }

    if (keepGoing) {
      setTimeout(type, 100);
    }
  })();
};

const handleErrors = function (response) {
  if (!response.ok) {
    console.log("dupa");
  }
  return response.json();
};

fetch(url)
  .then((response) => handleErrors(response))

  .then((data) => {
    let text = data.contents.quotes[0].quote;
    let author = data.contents.quotes[0].author;

    typing(text, author);
  });
