/* Import halaman yang ingin dimunculkan */
import Home from '../views/pages/Home';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': Home, // default page
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
