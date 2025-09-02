import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getJSON, setJSON } from "../storage";

const XpContext = createContext();
const XP_KEY = "cb:xp_wallet";

export const XpProvider = ({ children }) => {
  const [xp, setXp] = useState(0);

  useEffect(() => { (async () => setXp(await getJSON(XP_KEY, 0)))(); }, []);
  useEffect(() => { setJSON(XP_KEY, xp); }, [xp]);

  const addXp = useCallback((amount) => {
    setXp(x => Math.max(0, x + (amount | 0)));
  }, []);

  const spendXp = useCallback((amount) => {
    let ok = false;
    setXp(x => { ok = x >= amount; return ok ? x - amount : x; });
    return ok;
  }, []);

  return <XpContext.Provider value={{ xp, addXp, spendXp }}>{children}</XpContext.Provider>;
};

export const useXp = () => useContext(XpContext);
