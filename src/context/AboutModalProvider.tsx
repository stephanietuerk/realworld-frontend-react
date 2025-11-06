import { createContext, useEffect, useState } from 'react';

interface AboutModalContextValue {
  isModalVisible: boolean;
  dismissModal: (forever: boolean) => void;
}

const tokenString = 'prevent-welcome-modal';

export const AboutModalContext = createContext<AboutModalContextValue | null>(
  null,
);

export function AboutModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem(tokenString) === 'true';
    if (!hasSeen) {
      setIsModalVisible(true);
    }
  }, []);

  const dismissModal = (forever: boolean) => {
    if (forever) {
      localStorage.setItem(tokenString, 'true');
    }
    setIsModalVisible(false);
  };

  return (
    <AboutModalContext.Provider value={{ isModalVisible, dismissModal }}>
      {children}
    </AboutModalContext.Provider>
  );
}
