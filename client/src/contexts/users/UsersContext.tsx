import { createContext, useReducer, useEffect } from "react";

import { User, Action } from "./usersTypes";
import { usersReducer } from "./usersReducer";

export type UsersContextType = {
  users: User[];
  dispatch: React.Dispatch<Action>;
  addUser: (user: FormData) => Promise<void>;
};

type UsersProviderProps = {
  children: React.ReactNode;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, dispatch] = useReducer(usersReducer, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        dispatch({ type: "SET_USERS", payload: data });
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (formData: FormData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });
      const newUser: User = await response.json();
      dispatch({ type: "ADD_USER", payload: newUser });
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <UsersContext.Provider value={{ dispatch, users, addUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;