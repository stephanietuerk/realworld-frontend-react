import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, useLocation } from 'react-router';
import { AuthProvider } from '../context/AuthProvider.tsx';
import { AuthenticatedUserProvider } from '../context/AuthenticatedUserProvider.tsx';
import ArticlePage from '../features/article-page/ArticlePage.tsx';
import ArticleProviderLayout from '../features/article-page/ArticleProviderLayout.tsx';
import LoginModal from '../features/auth-modal/LoginModal.tsx';
import RegisterModal from '../features/auth-modal/RegisterModal.tsx';
import CreateArticlePage from '../features/create-article-page/CreateArticlePage.tsx';
import EditArticlePage from '../features/edit-article-page/EditArticlePage.tsx';
import HomePage from '../features/home-page/HomePage.tsx';
import ProfilePage from '../features/profile-page/ProfilePage.tsx';
import SettingsPage from '../features/settings-page/SettingsPage.tsx';
import { ROUTE } from '../shared/constants/routing.ts';
import App from './App.tsx';

const queryClient = new QueryClient();

export default function AppRouter() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthenticatedUserProvider>
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
        </AuthenticatedUserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
