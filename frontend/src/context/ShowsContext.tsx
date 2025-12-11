import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/api";
import type { Show } from "../types";

type ShowsContextType = {
  shows: Show[];
  refreshShows: () => Promise<void>;
  createShow: (payload: { name: string; start_time: string; total_seats: number }) => Promise<Show>;
};

const ShowsContext = createContext<ShowsContextType | undefined>(undefined);

export const ShowsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);

  const refreshShows = async () => {
    const res = await api.get<Show[]>("/shows");
    setShows(res.data);
  };

  useEffect(() => {
    refreshShows().catch(console.error);
  }, []);

  const createShow = async (payload: { name: string; start_time: string; total_seats: number }) => {
    const res = await api.post<Show>("/shows", payload);
    setShows((s) => [...s, res.data]);
    return res.data;
  };

  return (
    <ShowsContext.Provider value={{ shows, refreshShows, createShow }}>
      {children}
    </ShowsContext.Provider>
  );
};

export const useShows = () => {
  const ctx = useContext(ShowsContext);
  if (!ctx) throw new Error("useShows must be used inside ShowsProvider");
  return ctx;
};
