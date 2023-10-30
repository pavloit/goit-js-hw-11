import { Notify } from "notiflix"
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/style.css'


const API_KEY = '40310679-7bde47196eb03c19dd1299faf'

const selectors = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  body: document.querySelector('body'),
  like: document.querySelector('.heart'),
  searchInput: document.querySelector('.search-input'),
  loadBtn: document.querySelector(".load")
};

let searchWord = "";
let page = 1;

selectors.loadBtn.classList.add('dn')

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function galery(q, p = 1, pp = 40) {
  const settings = {
    params: {
      key: API_KEY,
      q,
      page: p,
      per_page: pp,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true'
    },
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const galleryItems = await axios.get('', settings)
  const hits = galleryItems.data.hits;
  const totalHits = galleryItems.data.totalHits  
  
  if (p == 1) {
  Notify.success(`Hooray! We found ${totalHits} "${q}" images.`)
}  

  if (hits.length === 0) {
    return Notify.warning("Sorry, there are no images matching your search query. Please try again.")
  }
 
  if (hits.length === pp && p * pp < totalHits) {
    console.log(galleryItems);
    selectors.loadBtn.classList.remove('dn')
    return markup(hits);
}
   selectors.loadBtn.classList.add('dn')
   markup(hits);
   return Notify.warning("We're sorry, but you've reached the end of search results.")
}

selectors.form.addEventListener('submit', onSubmit)


function onSubmit(event) {
  event.preventDefault();
  const query = selectors.searchInput.value
  if (!query) {
    return Notify.warning('Please enter some keyword to search images!')
  }
  if (query == searchWord) {
    selectors.searchInput.value = "";
    return Notify.warning(`You are already searching for "${query}"`)
  }
  selectors.gallery.innerHTML = '';
  page = 1;
  searchWord = query;
  selectors.searchInput.value = "";
  return galery(searchWord);
}


function markup(arr) {
  console.log(arr);
  
  selectors.gallery.insertAdjacentHTML('beforeend', `${arr.map(({ tags, likes, views, comments, downloads, largeImageURL, previewURL}) => `
      <div class="photo-card">
        <a class="gallery_link" href="${largeImageURL}">
          <img src="${previewURL}" class="gallery__image" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>`).join("")}`)
  
  
new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        captionClass: 'caption' 
}); 
}

selectors.loadBtn.addEventListener('click', onClick)

function onClick() {
 
  page += 1;
  return galery(searchWord, page)
}


