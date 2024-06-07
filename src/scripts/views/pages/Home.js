import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../template/template-creator';

const Home = {
  async render() {
    return `
            <div class="content">
            <section id="Home" class="jumbotron">
      <h1 class="header_jumbotron">Welcome to Restaurant Apps!</h1>
      <picture>
      <source media="(min-width: 768px)"data-no-lazy="true" srcset="/images/hero-image-2-large.jpg">
      <img data-src="/images/hero-image-2-small.jpg" class="jumbotron_img lazyload" alt="Restaurant Apps Logo">
     </picture>
      <p>Discover the best restaurants in town.</p>
    </section>
              <h2 class="content__heading">Restaurant list</h2>
              <div id="restaurants" class="restaurants"></div>
            </div>

        `;
  },

  async afterRender() {
    const restaurants = await TheRestaurantDbSource.listRestaurants(); // akses source
    const restaurantsContainer = document.querySelector('.restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML
        += createRestaurantItemTemplate(restaurant); // tampilkan restaurant;
    });
  },
};

export default Home;
