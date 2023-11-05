import { selectors } from "./selectors";
import simpleLightbox from "simplelightbox";
import { Notify } from "notiflix";

function markup(arr, page, per_page, query, totalHits) {

  if (page == 1 && arr.length > 0) {
    Notify.success(`Hooray! We found ${totalHits} "${query}" images.`)
    selectors.gallery.innerHTML = '';
    window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}  

  if (arr.length === 0) {
    return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
  
  if (page * per_page >= totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.")
  }

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
  simple.refresh();
}

const simple = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        captionClass: 'caption' 
}); 


export {markup}