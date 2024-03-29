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
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { SingleChoiceSurveyPage }
  from './components/pages/SingleChoiceSurveyPage/SingleChoiceSurveyPage';
import { MultipleChoiceSurveyPage }
  from './components/pages/MultipleChoiceSurveyPage/MultipleChoiceSurveyPage';
import { UniqueChoiceSurveyPage }
  from './components/pages/UniqueChoiceSurveyPage/UniqueChoiceSurveyPage';
import { VisitedSurveys } from './components/pages/VisitedSurveysPage/VisitedSurveys';
import { InvitationPage } from './components/pages/InvitationPage/InvitationPage';
import SurveysCatalogPage from './components/pages/SurveysCatalogPage/SurveysCatalogPage';
import { Doc } from './components/pages/DocPage/Doc';

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
        path: 'contacts',
        element: <Contacts />,
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
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'invitation',
        element: (
          <PrivateRoute>
            <InvitationPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'mysurveys',
        element: (
          <PrivateRoute>
            <MySurveys />
          </PrivateRoute>
        ),
      },
      {
        path: 'surveys',
        element: <SurveysCatalogPage />,
      },
      {
        path: '/surveys/sc/:surveyId',
        element: (
          <PrivateRoute>
            <SingleChoiceSurveyPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/surveys/mc/:surveyId',
        element: (
          <PrivateRoute>
            <MultipleChoiceSurveyPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/surveys/uc/:surveyId',
        element: (
          <PrivateRoute>
            <UniqueChoiceSurveyPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/visited',
        element: (
          <PrivateRoute>
            <VisitedSurveys />
          </PrivateRoute>
        ),
      },
      {
        path: '/doc',
        element: <Doc />,
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
