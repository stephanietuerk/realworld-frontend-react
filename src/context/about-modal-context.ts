import { createContext } from 'react';

export interface AboutModalContextValue {
  isModalVisible: boolean;
  dismissModal: (forever: boolean) => void;
}

export const AboutModalContext = createContext<AboutModalContextValue | null>(
  null,
);

export const PREVENT_MODAL_TOKEN = 'prevent-welcome-modal';
