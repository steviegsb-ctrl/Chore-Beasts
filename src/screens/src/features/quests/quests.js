import { getJSON, setJSON } from "../../storage";

const KEY = "cb:daily_quests";
const POOL = [
  { id: "tidy-room", label: "Tidy one room", bonus: 10 },
  { id: "dishes", label: "Do the dishes", bonus: 10 },
  { id: "laundry", label: "Put away laundry", bonus: 15 },
  { id: "floor", label: "Sweep/Vacuum a room", bonus: 15 },
  { id: "bathroom", label: "Wipe bathroom surfaces", bonus: 20 },
  { id: "bins", label: "Take out the bins", bonus: 10 },
  { id: "pet", label: "Feed/walk pets", bonus: 10 },
  { id: "make-bed", label: "Make your bed", bonus: 5 }
];

const todayKey = () => new Date().toISOString().slice(0, 10);

const pick3 = () => {
  const pool = [...POOL];
  const out = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out.map(q => ({ ...q, done: false }));
};

export const getOrCreateTodayQuests = async () => {
  const state = await getJSON(KEY, {});
  const t = todayKey();
  if (state.date === t && Array.isArray(state.quests)) return state.quests;
  const quests = pick3();
  await setJSON(KEY, { date: t, quests });
  return quests;
};

export const setQuests = async (quests) => {
  await setJSON(KEY, { date: todayKey(), quests });
};
