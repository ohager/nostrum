import { useContext } from "react";
import { AppContext } from "@/components/appContext";

export const useAppContext = () => {
  return useContext(AppContext);
};
