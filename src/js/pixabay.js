import axios from "axios";
import { markup } from "./markup";

const API_KEY = '40310679-7bde47196eb03c19dd1299faf'
axios.defaults.baseURL = 'https://pixabay.com/api/';


async function getPhoto(query, page = 1, per_page = 40) {
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
  const galleryItems = await axios.get('', settings)
  const hits = galleryItems.data.hits;
  const totalHits = galleryItems.data.totalHits  
 
    return markup(hits, page, per_page, query, totalHits);
}

export {getPhoto}