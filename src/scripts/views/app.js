/* eslint-disable no-unused-vars */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routers/url-parser';
import routes from '../routers/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._intialAppShell();
  }

  /* Untuk  menginisiasikan komponen lain */
  _intialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector('.skip-to-content');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });

    const START = 10;
    const NUMBER_OF_IMAGES = 100;
  }
}

export default App;
