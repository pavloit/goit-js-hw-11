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
  loadBtn: document.querySelector(".load-more")
};

let searchWord = "";
let page = 1;



axios.defaults.baseURL = 'https://pixabay.com/api/';

async function galery(q, p = 1, pp = 40) {
  page = p;
  const galleryItems = await axios.get(`?key=${API_KEY}&q=${q}&page=${page}&per_page=${pp}`)
  const hits = galleryItems.data.hits;
console.log(galleryItems);
  return markup(hits);
}

selectors.form.addEventListener('submit', onSubmit)


function onSubmit(event) {
  event.preventDefault();
  if (!selectors.searchInput.value) {
    return Notify.warning('Please enter some keyword to search images!')
  }
  if (selectors.searchInput.value != searchWord) {
    selectors.gallery.innerHTML = ''
  }

  searchWord = selectors.searchInput.value;
  console.log(selectors.searchInput.value);
  selectors.searchInput.value = "";
  return galery(searchWord);
}


function markup(arr) {
  arr2 = []
  arr.map(({ tags, likes, views, comments, downloads, largeImageURL, previewURL }) => console.log(
    `Likes: ${likes}\nView: ${views}\nComments ${comments}\nDownloads: ${downloads}\nlargeImageURL: ${largeImageURL}\nPreviewURL: ${previewURL}\nTags: ${tags}\n`));
  
  arr.map(({ tags, likes, views, comments, downloads, largeImageURL, previewURL }) => arr2.push({
    likes,
    views,  
    comments,
    downloads,
    largeImageURL,
    previewURL, 
    tags
  }))
  
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
  if (!searchWord) {
    return
  }
  page += 1;
  return galery(searchWord, page)
}

  
