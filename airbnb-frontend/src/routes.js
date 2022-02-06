import { HomePage } from './pages/HomePage';
import { TripPage } from './pages/TripPage';
import { StayDetails } from './pages/StayDetails';
import { StayList } from './pages/StayList';
import { HostPage } from './pages/HostPage';

const routes = [
  {
    path: '/stay/:stayId',
    component: StayDetails
  },
  {
    path: '/stay',
    component: StayList
  },
  {
    path: '/host',
    component: HostPage
  },
  {
    path: '/trip',
    component: TripPage
  },

  {
    path: '/',
    component: HomePage,
  },


];

export default routes;
