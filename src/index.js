import { Notify } from "notiflix"
import { selectors } from "./js/selectors";
import { getPhoto } from "./js/pixabay";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/style.css'
import { loadmore } from "./js/markup";


let load = loadmore;
let searchWord = "";
let page = 1;

selectors.form.addEventListener('submit', onSubmit)
window.addEventListener('scroll', handleScroll);


function onSubmit(event) {
  event.preventDefault();
  const query = selectors.searchInput.value.trim()
  load = false;
  selectors.form.reset();

  if (!query) {
    return Notify.warning('Please enter some keyword to search images!')
  }
  if (query == searchWord) {
    return Notify.info(`You are already searching for "${query}"`)
  }
  window.scrollTo({
    top: 0
  });
  page = 1;
  searchWord = query;

  return getPhoto(searchWord, page);
}

function handleScroll() {
  if (!l) {
    return
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    load = false;
    page += 1;
    getPhoto(searchWord, page);
  }
}

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});