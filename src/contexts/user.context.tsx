import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangeListerner,
} from "../services/firebase/firebase.service";

export interface IUserContext {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => null,
});

export interface UserContextProps {
  children: JSX.Element | string;
}

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListerner((user: User) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={
        {
          currentUser,
          setCurrentUser,
        } as any
      }
    >
      {children}
    </UserContext.Provider>
  );
};
