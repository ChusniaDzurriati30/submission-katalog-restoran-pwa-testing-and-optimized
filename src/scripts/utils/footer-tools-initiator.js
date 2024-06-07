/* eslint-disable max-len */
import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';

const FooterToolsInitiator = {
  /* Metode init digunakan untuk menginisialisasi komponen-komponen di footer, seperti tombol subscribe dan unsubscribe */
  async init({ subscribeButton, unsubscribeButton }) {
    this._subscribeButton = subscribeButton;
    this._unsubscribeButton = unsubscribeButton;
    this._registrationServiceWorker = null;

    // Memeriksa apakah browser mendukung service worker
    if ('serviceWorker' in navigator) {
      this._registrationServiceWorker = await navigator.serviceWorker.getRegistration(); // Mendapatkan registrasi service worker (jika ada).
    }

    await this._initialListener();
    await this._initialState();
  },

  /* Metode _initialListener digunakan untuk menambahkan event listener ke tombol-tombol */
  async _initialListener() {
    this._subscribeButton.addEventListener('click', (event) => {
      this._subscribePushMessage(event);
    });

    this._unsubscribeButton.addEventListener('click', (event) => {
      this._unsubscribePushMessage(event);
    });
  },

  // eslint-disable-next-line no-empty-function
  /* melakukan perubahan state tombol dengan memberi efek sembunyikan dan tampilkan tombol */
  async _initialState() {
    this._showSubscribeButton();
  },

  /* Metode _subscribePushMessage digunakan untuk mengatur perilaku tombol subscribe */
  async _subscribePushMessage(event) {
    event.stopPropagation();

    if (await this._isCurrentSubscriptionAvailable()) {
      window.alert('Already subscribe to push message');
      return;
    }

    if (!(await this._isNotificationRady())) {
      console.log("Notification isn't available");
      return;
    }

    console.log('_subscribePushMessage: Subscribing to push message...');
    const pushSubscription = await this._registrationServiceWorker?.pushManager.subscribe(
      this._generateSubscribeOption(),
    );

    if (!pushSubscription) {
      console.log('Failed to subscribe push message');
      return;
    }

    try {
      await this._sendPostToServer(
        CONFIG.PUSH_MSG_SUBSCRIBE_URL,
        pushSubscription,
      );
      console.log('Push message has been subscribed');
    } catch (err) {
      console.log(
        'Failed to store push notification data to server:',
        err.message,
      );

      // Undo subscribing push notification
      await pushSubscription?.unsubscribe();
    }

    this._showSubscribeButton();
  },

  /* Metode _subscribePushMessage digunakan untuk mengatur perilaku tombol unsubscribe */
  async _unsubscribePushMessage(event) {
    event.stopPropagation();

    const pushSubscription = await this._registrationServiceWorker?.pushManager.getSubscription();
    if (!pushSubscription) {
      window.alert("Haven't subscribing to push message");
      return;
    }

    try {
      await this._sendPostToServer(
        CONFIG.PUSH_MSG_UNSUBSCRIBE_URL,
        pushSubscription,
      );

      const isHasBeenUnsubscribed = await pushSubscription.unsubscribe();
      if (!isHasBeenUnsubscribed) {
        console.log('Failed to unsubscribe push message');
        await this._sendPostToServer(
          CONFIG.PUSH_MSG_SUBSCRIBE_URL,
          pushSubscription,
        );
        return;
      }

      console.log('Push message has been unsubscribed');
    } catch (err) {
      console.log(
        'Failed to erase push notification data from server:',
        err.message,
      );
    }
    this._showSubscribeButton();
  },

  /* Melakukan konversi base64 berupa string menjadi Uint8Array */
  _urlB64ToUint8Array: (base64String) => {
    // eslint-disable-next-line no-mixed-operators
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  /* Yang bertugas mengembalikan objek opsi (options) yang digunakan saat melakukan permintaan langganan (subscribe) untuk notifikasi push */
  _generateSubscribeOption() {
    return {
      userVisibleOnly: true,
      applicationServerKey: this._urlB64ToUint8Array(
        CONFIG.PUSH_MSG_VAPID_PUBLIC_KEY,
      ),
    };
  },

  /* Digunakan untuk mengirim data ke server melalui HTTP POST request */
  async _sendPostToServer(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  /* Digunakan untuk mengatur tampilan tombol subscribe dan unsubscribe berdasarkan status */
  _isSubscribedToServerForHiddenSubscribeButton(state = false) {
    if (state) {
      this._subscribeButton.style.display = 'none';
      this._unsubscribeButton.style.display = 'inline-block';
    } else {
      this._subscribeButton.style.display = 'inline-block';
      this._unsubscribeButton.style.display = 'none';
    }
  },

  /* Memeriksa ketersediaan subscription di sisi client */
  async _isCurrentSubscriptionAvailable() {
    const checkSubscription = await this._registrationServiceWorker?.pushManager.getSubscription();
    return Boolean(checkSubscription);
  },

  /* Agar memastikan ketersediaan fitur notification dari aplikasi web di sisi user */
  async _isNotificationRady() {
    if (!NotificationHelper._checkAvailability()) {
      console.log('Notification not supported in this browser');
      return false;
    }

    if (!NotificationHelper._checkPermission()) {
      console.log('User did not granted the notification permission yet');
      const status = await Notification.requestPermission();

      if (status === 'denied') {
        window.alert(
          'Cannot subscribe to push message because the status of notification permission is denied',
        );
        return false;
      }

      if (status === 'default') {
        window.alert(
          'Cannot subscribe to push message because the status of notification permission is ignored',
        );
        return false;
      }
    }

    return true;
  },

  async _showSubscribeButton() {
    this._isSubscribedToServerForHiddenSubscribeButton(
      await this._isCurrentSubscriptionAvailable(),
    );
  },
};

export default FooterToolsInitiator;
