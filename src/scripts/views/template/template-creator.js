import CONFIG from '../../globals/config';

/* Restaurant detail template */
const createRestaurantDetailTemplate = (restaurant) => `
<h2 class="restaurant__title ">${restaurant.name}</h2>
<img class="lazyload restaurant__poster" data-src="${CONFIG.BASE_IMAGE_URL}${
  restaurant.pictureId
}"
alt="${restaurant.name}">
<div class="restaurant__info">
    <h3>Information</h3>
    <h4>Tagline</h4>
    <p>${restaurant.city}</p>
    
    <h4>Duration</h4>
    <p>${restaurant.address} minutes</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
</div>
<div class="restaurant__overview">
    <h3>Overview</h3>
    <p>${restaurant.description}</p>
</div> 
<div class="restaurant__categories">
<h3>Categories</h3>
<p>${restaurant.categories.map((category) => category.name).join(', ')}</p>
</div> 
<div class="restaurant__menus">    
<h3>Food Menu</h3>
<ul>
    ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
</ul>
<h3>Drink Menu</h3>
<ul>
    ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
</ul>
</div>
<div class="customerReviews">
    <h3>Customer Reviews</h3>
    <ul>
        ${restaurant.customerReviews
    .map(
      (review) => `
            <li>
                <p><strong>${review.name}</strong></p>
                <p>${review.review}</p>
                <p>Date: ${review.date}</p>
            </li>`,
    )
    .join('')}
    </ul>
</div>


`;

/* Restaurant item template */
const createRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-item">
    <div class="restaurant-item__header">
    <img
        class="lazyload restaurant-item__header__poster"
        data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}"
        alt="${restaurant.name}"
    />
    <div class="restaurant-item__header__rating">
        <p>
        ⭐️<span class="restaurant-item__header__rating__score"
            >${restaurant.rating}</span
        >
        </p>
    </div>
    </div>
    <div class="restaurant-item__content">
        <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}" >${
  restaurant.name || '-'
}</a></h3>
        <p>${restaurant.description}</p>
    </div>
    </div>
`;

/* Like button template */
const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

/* Liked button template */
const createLikedButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createUnlikeButtonTemplate,
};
