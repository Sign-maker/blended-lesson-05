import { Header } from 'components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/rates',
        element: <Rates />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export const App = () => {
  useEffect(() => {
    const success = pos => {
      const crd = pos.coords;
      //dispatch()
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  return <RouterProvider router={router} />;
};
