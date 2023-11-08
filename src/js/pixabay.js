import axios from "axios";
import { markup } from "./markup";

const API_KEY = '40310679-7bde47196eb03c19dd1299faf';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getPhoto(query, page = 1) {
  const settings = {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true'
    },
    headers: {
      'Content-Type': 'application/json',
    }
  }

    return await axios.get('', settings)
}

export {getPhoto}