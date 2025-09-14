import { Route, Routes, useLocation } from 'react-router';
import { AuthProvider } from '../context/AuthProvider.tsx';
import { UserProvider } from '../context/UserProvider.tsx';
import ArticlePage from '../features/article-page/ArticlePage.tsx';
import ArticleProviderLayout from '../features/article-page/ArticleProviderLayout.tsx';
import LoginModal from '../features/auth-modal/LoginModal.tsx';
import RegisterModal from '../features/auth-modal/RegisterModal.tsx';
import HomePage from '../features/home-page/HomePage.tsx';
import ProfilePage from '../features/profile-page/ProfilePage.tsx';
import { ROUTE } from '../shared/constants/routing.ts';
import App from './App.tsx';

export default function AppRouter() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  return (
    <AuthProvider>
      <UserProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={'/profile/:username'} element={<ProfilePage />} />
            <Route element={<ArticleProviderLayout />}>
              <Route path={'/article/:slug'} element={<ArticlePage />} />
            </Route>
          </Route>
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path={ROUTE.login} element={<LoginModal />} />
            <Route path={ROUTE.register} element={<RegisterModal />} />
          </Routes>
        )}
      </UserProvider>
    </AuthProvider>
  );
}
