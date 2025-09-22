import { useLocation, useNavigate } from 'react-router-dom';

export function useCloseModal(): () => void {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = (): void => {
    const background = location.state?.backgroundLocation;
    navigate(background || '/', { replace: true });
  };

  return closeModal;
}
