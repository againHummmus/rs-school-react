import { createContext, type Dispatch, type SetStateAction } from 'react';

export const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>]>(['light', () => {}]);
