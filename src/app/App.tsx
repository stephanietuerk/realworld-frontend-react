import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import Footer from './footer/Footer.tsx';
import Header from './header/Header.tsx';

export default function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
