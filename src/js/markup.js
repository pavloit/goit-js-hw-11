import { selectors } from "./selectors";


function markup(arr) {

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
}

export {markup}