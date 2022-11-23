import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.name,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup function to unsubscibe onAuthStateChanged when user is force to
    // web app
    return () => unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
