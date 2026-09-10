import { createBrowserRouter, type RouteObject } from 'react-router';
import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: (
      <main>
        <NotFound />
      </main>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
