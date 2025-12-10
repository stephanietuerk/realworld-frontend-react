import { useEffect, useState } from 'react';
import { AboutModalContext } from './about-modal-context';
import { PREVENT_MODAL_TOKEN } from './about-modal-context';

export function AboutModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const preventModalLocal =
      localStorage.getItem(PREVENT_MODAL_TOKEN) === 'true';
    if (!preventModalLocal) {
      setIsModalVisible(true);
    }
  }, []);

  const dismissModal = (forever: boolean) => {
    if (forever) {
      localStorage.setItem(PREVENT_MODAL_TOKEN, 'true');
    } else {
      localStorage.setItem(PREVENT_MODAL_TOKEN, 'false');
    }
    setIsModalVisible(false);
  };

  return (
    <AboutModalContext.Provider value={{ isModalVisible, dismissModal }}>
      {children}
    </AboutModalContext.Provider>
  );
}
