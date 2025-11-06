import { useContext } from 'react';
import { AboutModalContext } from '../../context/AboutModalProvider';

export function useAboutModal() {
  const context = useContext(AboutModalContext);
  if (!context) {
    throw new Error('useAboutModal must be used within AboutModalProvider');
  }
  return context;
}
