import { Notify } from "notiflix"
import SimpleLightbox from "simplelightbox";
import { selectors } from "./js/selectors.js";
import { getPhoto } from "./js/pixabay";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/style.css'
import { markup } from "./js/markup.js";




const simple = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        captionClass: 'caption' 
}); 

let searchWord = "";
let page = 1;
let totalHits = 500;
let perPage = 40

selectors.form.addEventListener('submit', onSubmit)



function onSubmit(event) {
  selectors.gallery.innerHTML = '';
  page = 1;
  event.preventDefault();
  const query = selectors.searchInput.value.trim()
  selectors.form.reset();
  if (!query) {
    return Notify.warning('Please enter some keyword to search images!')
  }
  if (query === searchWord) {
    return Notify.info(`You are already searching for "${query}"`)
  }
  searchWord = query;
  
  return startSearch(query, page)
}

async function startSearch(word, page) {  
  const getData = await getPhoto(word, page)
  hits = getData.data.hits;
  totalHits = getData.data.totalHits;

  if (totalHits === 0) {
    return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }  

  if (page == 1 && totalHits > 40) {
    Notify.success(`Hooray! We found ${totalHits} "${word}" images.`)
    selectors.gallery.innerHTML = '';
    window.scrollTo({
    top: 0
    });
    window.addEventListener('scroll', handleScroll);
  }  
  
  if (totalHits <= 40) {
    Notify.info(`We're sorry, but there are only ${totalHits} 
      images matches your quary`)
    window.removeEventListener('scroll', handleScroll)  
  }
  
  if (page === Math.ceil(totalHits/perPage)&& page > 1) {
    Notify.info("We're sorry, but you've reached the end of search results.")
    window.removeEventListener('scroll', handleScroll)  
  }

  if (page < Math.ceil(totalHits/perPage)) {
    window.addEventListener('scroll', handleScroll);
  }

  markup(hits);
  simple.refresh(); 
}

  

function handleScroll() {
  
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    page += 1;
    if (page>=14) {
    return
  }
    startSearch(searchWord, page);
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