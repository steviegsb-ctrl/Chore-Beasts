import { useCallback, useEffect, useState } from "react";
import { getJSON, setJSON } from "../../storage";

const KEY = "cb:streaks";
const sameDay = (a, b) => a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const yesterday = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);

export const useStreaks = () => {
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [lastDone, setLastDone] = useState(null);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => { (async () => {
    const d = await getJSON(KEY, { streak: 0, best: 0, lastDone: null, frozen: false });
    setStreak(d.streak); setBest(d.best); setFrozen(!!d.frozen);
    setLastDone(d.lastDone ? new Date(d.lastDone) : null);
  })(); }, []);

  useEffect(() => { setJSON(KEY, { streak, best, lastDone, frozen }); }, [streak, best, lastDone, frozen]);

  const markProgressToday = useCallback(() => {
    const today = new Date();
    if (lastDone && sameDay(lastDone, today)) return;
    let next = 1;
    if (lastDone && sameDay(yesterday(today), lastDone)) next = streak + 1;
    else if (frozen) { next = streak; setFrozen(false); }
    setStreak(next); setBest(b => Math.max(b, next)); setLastDone(today);
  }, [lastDone, streak, frozen]);

  return { streak, best, frozen, setFrozen, markProgressToday };
};
