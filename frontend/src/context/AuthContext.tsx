import { createContext, useState, useContext } from "react";
import type { FC, ReactNode } from "react";

type AuthContextType = {
  isAdmin: boolean;
  loginAsAdmin: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children?: ReactNode }> = ({ children }: { children?: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const loginAsAdmin = () => setIsAdmin(true);
  const logout = () => setIsAdmin(false);
  return (
    <AuthContext.Provider value={{ isAdmin, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
