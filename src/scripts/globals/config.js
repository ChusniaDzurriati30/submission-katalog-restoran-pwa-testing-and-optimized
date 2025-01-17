const CONFIG = {
  KEY: '7ba3d1a86bbbd31132cb3614557323ed',
  BASE_URL: 'https://restaurant-api.dicoding.dev/', // Updated URL
  BASE_IMAGE_URL: 'https://restaurant-api.dicoding.dev/images/medium/',
  DEFAULT_LANGUAGE: 'en-us',
  CACHE_NAME: 'Katalog restaurant',
  DATABASE_NAME: 'movie-catalogue-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'movies',
  WEB_SOCKET_SERVER: 'wss://movies-feed.dicoding.dev',
  PUSH_MSG_VAPID_PUBLIC_KEY:
    'BN7-r0Svv7CsTi18-OPYtJLVW0bfuZ1x1UtrygczKjennA_qs7OWmgOewcuYSYF3Gc_mPbqsDh2YoGCDPL0RxDQ',
  PUSH_MSG_SUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/subscribe',
  PUSH_MSG_UNSUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/unsubscribe',
};

export default CONFIG;
