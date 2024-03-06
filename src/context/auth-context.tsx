"use client";
import { createContext } from "react";
import { auth } from "@/config/firebase-config";
import {
  AuthError,
  GoogleAuthProvider,
  User,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GetRoadmap } from "@/server-actions/roadmap";

export interface FirebaseContextType {
  user: User | null | undefined;
  signInUser: () => void;
  signOutUser: () => void;
  getAuthRedirect: () => void;
}

export const FirebaseAuthContext = createContext<FirebaseContextType>({
  user: undefined,
  signInUser: () => {},
  signOutUser: () => {},
  getAuthRedirect: () => {},
});

type props = {
  children: React.ReactNode;
};

export const FirebaseAuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    getUser();
    console.log(user);
  }, [user]);

  const getUser = () => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        if (path == "/") return;
        router.push("/auth");
        return;
      }

      sessionStorage.setItem("uid", authUser!.uid);
      authUser?.getIdToken().then((token) => {
        sessionStorage.setItem("access_token", token);
      });
      console.log(sessionStorage.getItem("uid"));
      console.log(sessionStorage.getItem("access_token"));
      setUser(authUser);
    });
    return user;
  };

  const signInUser = async () => {
    const OAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, OAuthProvider).catch((error) => {
      const { code, message }: AuthError = error;
      console.error({ code, message });
    });
  };

  const getAuthRedirect = async () => {
    getRedirectResult(auth)
      .then((authUser) => {
        setUser(authUser?.user);
        getUser();
      })
      .catch(() => null);
  };

  const signOutUser = async () => {
    setUser(null);
    sessionStorage.clear();
    router.push("/");
    await signOut(auth);
    getUser();
  };

  return (
    <FirebaseAuthContext.Provider
      value={{ user, signInUser, signOutUser, getAuthRedirect }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
