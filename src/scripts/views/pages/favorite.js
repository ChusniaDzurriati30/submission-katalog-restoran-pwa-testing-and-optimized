import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
            <div class="content">
              <h2 class="content__heading">Restaurant Favorite</h2>
              <div id="restaurants" class="restaurants"></div>
            </div>
        `;
  },

  async afterRender() {
    const restaurants = await TheRestaurantDbSource.nowPlayingRestaurants(); // akses source
    const restaurantsContainer = document.querySelector('.restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML
        += createRestaurantItemTemplate(restaurant); // tampilkan restaurant;
    });
  },
};

export default Favorite;
