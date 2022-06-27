import React, { createContext, useContext } from "react";

export const UserContext = createContext<any>({ type: "unauthenticated" });
export const useUser = () => {
  const user = useContext(UserContext);
  return { user };
};
