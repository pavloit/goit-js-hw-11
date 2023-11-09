import { Notify } from "notiflix"
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
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



async function onSubmit(event) {
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
  
  const getData = await getPhoto(query, page)
  const hits = getData.data.hits;
  totalHits = getData.data.totalHits;

  if (totalHits === 0) {
    return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }  

  if (totalHits <= 40) {
    Notify.info(`We're sorry, but there are only ${totalHits} 
      images matches your quary`)
    scrollTrigger("off");  
  }

    if (page == 1 && totalHits > 40) {
    Notify.success(`Hooray! We found ${totalHits} "${query}" images.`)
    selectors.gallery.innerHTML = '';
    window.scrollTo({
    top: 0
    });
    scrollTrigger("on");
  }  
  markup(hits);
  simple.refresh();

}

async function startSearch(word, page) {  
  const getData = await getPhoto(word, page)
  const hits = getData.data.hits;
  totalHits = getData.data.totalHits;

    
  if (page === Math.ceil(totalHits/perPage)&& page > 1) {
    Notify.info("We're sorry, but you've reached the end of search results.")
    scrollTrigger("off");
  }

  markup(hits);
  simple.refresh(); 
}

  

function handleScroll() {
  
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    page += 1;
    console.log('handlerScroll: ', page);
    if (page >= 14) {
      console.log('Returned handlerScroll: ', page);
    return scrollTrigger('off')
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

function scrollTrigger(state) {
  if (state === "on") {
    console.log('scrollTrigger: ', state);
    window.addEventListener('scroll', throttle(handleScroll, 2000, {
      leading: true,
      trailing: false
    }))
    return
  }
  
  if (state === "off") {
    console.log('scrollTrigger: ', state);
    return window.removeEventListener('scroll', throttle(handleScroll, 2000, {
      leading: true,
      trailing: false
    }))
  }
  
}