import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const fetchSettings = async () => {
    const res = await fetch("http://localhost:5000/api/settings");
    return res.json();
  };

  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

// custom hook
export const useSettings = () => useContext(SettingsContext);