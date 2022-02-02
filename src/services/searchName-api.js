import ImageGallery from '../components/ImageGallery/ImageGallery';

function fetchSearchName(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=24205096-94d89c4098710352347d23de8&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.rejected(
        new Error(`Pictures with name ${name} not found`),
      );
    })
    .then(response => {
      return response.hits;
    });
}
const api = {
  fetchSearchName,
};
export default api;
