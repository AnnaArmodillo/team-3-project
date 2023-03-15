import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import App from './App';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import { Main } from './components/pages/MainPage/Main';
import { Signup } from './components/pages/SignupPage/Signup';
import { Signin } from './components/pages/SigninPage/Signin';
import { NewSurveyCreating } from './components/pages/NewSurveyCreatingPage/NewSurveyCreating';
import { Profile } from './components/pages/ProfilePage/ProfilePage';
import { MySurveys } from './components/pages/MySurveysPage/MySurveysPage';
import { Contacts } from './components/pages/ContactsPage/Contacts';
import { Secret } from './components/pages/SecretPage/SecretPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { SurveyPage } from './components/pages/surveyPage/surveyPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'creating',
        element: (
          <PrivateRoute>
            <NewSurveyCreating />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'mysurveys',
        element: <MySurveys />,
      },
      {
        path: 'surveys/:surveyId',
        element: (
          <PrivateRoute>
            <SurveyPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: 'secret',
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </QueryClientProvider>,
);
