import { Notify } from "notiflix"
import { selectors } from "./js/selectors";
import { getPhoto } from "./js/pixabay";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/style.css'



let searchWord = "";
let page = 1;


selectors.form.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault();
  const query = selectors.searchInput.value
  selectors.form.reset();
  if (!query.trim()) {
    return Notify.warning('Please enter some keyword to search images!')
  }
  if (query == searchWord) {
    return Notify.info(`You are already searching for "${query}"`)
  }
  selectors.loadDiv.classList.add('dn')
  page = 1;
  searchWord = query;
  return getPhoto(searchWord);
}

selectors.loadBtn.addEventListener('click', onClick)

function onClick() {
  selectors.loadDiv.classList.add('dn')
  page += 1;
  return getPhoto(searchWord, page)
}
