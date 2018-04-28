// Import components
import api_key from '../config' ;
import axios from 'axios';
/**
 * Makes a request to the flickr API for photos.
 * @param query - items to query flickr for
 * @returns promise
 */
export default (query) => {
  // Request photos from API
	return axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
	.then(response => {
    // Get the photos from the response
    const photos = response.data.photos.photo;

    // Create a request for each photo source
		const photoPromises = photos.map((photo) => {
      const id = photo.id;

			return axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${api_key}&photo_id=${id}&per_page=24&format=json&nojsoncallback=1`)
			.then(size => {
				size.id = id;
				return size;
			});
    });

    // Actually make the requests
    return Promise.all(photoPromises);
  })
  .then(photos => {
    // Format the response so React is happy for ID's
    const mediumPhotos = photos.map((photo) => {
      const size = photo.data.sizes.size.find((size) => size.label === 'Small');
      // Takes the small photo and returns it with the ID
      return Object.assign(size, { id: photo.id });
    });

    return mediumPhotos;
  })
  .catch(error => {
  	console.log('Error fetching data', error);
  });
}
