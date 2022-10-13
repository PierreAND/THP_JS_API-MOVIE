const movieSearch = document.querySelector('#moviesearch');
const movieSearchButton = document.querySelector('#moviesearchbutton');
const modal = document.querySelector('#mymodal');


const userSearch = () => {
  movieSearchButton.addEventListener('click', (e) => {
    getMovie(movieSearch.value);
    e.preventDefault();
  });
};

const getMovie = (searchTerm) => {
  fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=25927e05`)
  .then((response) => {
    return response.json()
  })
  .then((response) =>{
  displayMovie(response["Search"])
  })
  .catch((error) => {
    console.error(error)
  })
};

const displayMovie = (array) => {
  for (let i = 0; i < array.length; i++) {
    showMovie(document.querySelector(".card"), array[i]["Title"], array[i]["Year"], array[i]["Poster"], array[i]["imdbID"]);
  };
}

const showMovie = (element, title, year, image, id) => {
  element.innerHTML += `
  <div>
    <h2>${title}</h2>
    <p>${year}</p>
    <img src="${image}" alt="image">
    <button class="readmorebtn">Read more...</button>
  </div>
  `;

  const modal = document.querySelector("#mymodal");
  const readMoreBtn = document.querySelectorAll('.readmorebtn');
let idList = []
  
  idList.push(id)
  console.log(idList.forEach(id => id))

  readMoreBtn.forEach(button, index => button.addEventListener('click', () => {
    console.log(button)
    getPlot();
    modal.style.display = 'block';
  }));
};

userSearch();
intOb();

const getPlot = (id) => {
fetch(`https://omdbapi.com/?i=${id}&apikey=25927e05`)
  .then((response) => {
    return response.json()
  })
  .then((response) =>{
  displayPlot(response)
  })
  .catch((error) => {
    console.error(error)
  })
}

const displayPlot = (moviePlot) => {
  showPlot(moviePlot["Poster"], moviePlot["Plot"], moviePlot["Year"], moviePlot["Title"]);
  
};

const showPlot = (image, plot, year, title) => {
  modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <img src="${image}" alt="image" />
    <h2>${title}</h2>
    <p>${year}</p>
    <p>${plot}</p>
  </div>
  `
  const span = document.querySelector(".close");

  span.addEventListener('click', () => {
    modal.style.display = 'none';
  });
};

