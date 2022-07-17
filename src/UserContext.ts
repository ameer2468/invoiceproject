import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export const UserContext = createContext<{
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}>({
  user: { type: 'unauthenticated' },
  setUser: () => {},
});
export const useUser = () => {
  const user = useContext(UserContext);
  return { user };
};
