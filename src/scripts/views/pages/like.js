/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../template/template-creator';

const Like = {
  async render() {
    return `
            <div class="content">
              <h2 class="content__heading liked_restaurant">Your Liked Restaurant</h2>
              <div id="restaurants" class="restaurants"></div>
            </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants(); // Mengambil daftar semua film favorit dari IndexedDB
    const restaurantsContainer = document.querySelector('.restaurants');
    restaurants.forEach((restaurant) => {
      // Membuat tampilan untuk setiap film menggunakan template-creator dan menambahkannya ke container
      restaurantsContainer.innerHTML
        += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Like;
