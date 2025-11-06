import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { AboutModalProvider } from '../context/AboutModalProvider.tsx';
import { AuthProvider } from '../context/AuthProvider.tsx';
import { AuthenticatedUserProvider } from '../context/AuthenticatedUserProvider.tsx';
import AboutModal from '../features/about-modal/AboutModal.tsx';
import ArticleProviderLayout from '../features/article-page/ArticleProviderLayout.tsx';
import HomePage from '../features/home-page/HomePage.tsx';
import { ROUTE } from '../shared/constants/routing.ts';
import App from './App.tsx';

const ArticlePage = lazy(
  () => import('../features/article-page/ArticlePage.tsx'),
);
const LoginModal = lazy(() => import('../features/auth-modal/LoginModal.tsx'));
const RegisterModal = lazy(
  () => import('../features/auth-modal/RegisterModal.tsx'),
);
const CreateArticlePage = lazy(
  () => import('../features/create-article-page/CreateArticlePage.tsx'),
);
const EditArticlePage = lazy(
  () => import('../features/edit-article-page/EditArticlePage.tsx'),
);
const ProfilePage = lazy(
  () => import('../features/profile-page/ProfilePage.tsx'),
);
const SettingsPage = lazy(
  () => import('../features/settings-page/SettingsPage.tsx'),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 60_000,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default function AppRouter() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthenticatedUserProvider>
          <AboutModalProvider>
            <Routes location={state?.backgroundLocation || location}>
              <Route path='/' element={<App />}>
                <Route index element={<HomePage />} />
                <Route path={'/settings'} element={<SettingsPage />} />
                <Route path={'/profile/:username'} element={<ProfilePage />} />
                <Route element={<ArticleProviderLayout />}>
                  <Route path={'/article/:slug'} element={<ArticlePage />} />
                  <Route
                    path={'/article/:slug/edit'}
                    element={<EditArticlePage />}
                  ></Route>
                </Route>
                <Route
                  path={'/article/new'}
                  element={<CreateArticlePage />}
                ></Route>
              </Route>
            </Routes>

            {state?.backgroundLocation && (
              <Routes>
                <Route path={ROUTE.login} element={<LoginModal />} />
                <Route path={ROUTE.register} element={<RegisterModal />} />
              </Routes>
            )}

            <AboutModal />
          </AboutModalProvider>
        </AuthenticatedUserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
