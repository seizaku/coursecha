import { useContext } from "react";
import { FirebaseAuthContext } from "@/context/auth-context";

const useAuth = () => {
  return useContext(FirebaseAuthContext);
};

export default useAuth;
