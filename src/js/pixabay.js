import axios from "axios";
import { markup } from "./markup";

const API_KEY = '40310679-7bde47196eb03c19dd1299faf'
axios.defaults.baseURL = 'https://pixabay.com/api/';
let totalHits = 500;
let per_page = 40;

async function getPhoto(query, page = 1) {
  const settings = {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true'
    },
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if (page > 1 && (page - 1) * per_page >= totalHits) {
    console.log('page: ', page, 'totalHits: ', totalHits);
    return
  }


  const galleryItems = await axios.get('', settings)
  const hits = galleryItems.data.hits;
  totalHits = galleryItems.data.totalHits  
 
    return markup(hits, page, per_page, query, totalHits);
}

export {getPhoto}