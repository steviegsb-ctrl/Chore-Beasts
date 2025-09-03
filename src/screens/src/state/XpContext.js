// src/state/XpContext.js
import React, { createContext, useContext, useMemo, useState } from "react";

const Ctx = createContext({ xp: 0, addXp: () => {} });

export function XpProvider({ children }) {
  const [xp, setXp] = useState(0);
  const addXp = (n = 0) => setXp(v => v + (Number.isFinite(n) ? n : 0));

  const value = useMemo(() => ({ xp, addXp }), [xp]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useXp = () => useContext(Ctx);

// default export is the context itself (optional, but harmless)
export default Ctx;
