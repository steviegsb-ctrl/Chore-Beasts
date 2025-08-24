import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Picker } from "react-native";

/**
 * Props:
 * - players: [{id, name, xp}]
 * - addXp: (playerId, amount) => void
 * - xpPerTask: number
 */
export default function TasksScreen({ players = [], addXp, xpPerTask = 5 }) {
  // simple example list
  const [tasks, setTasks] = useState([
    { id: 1, room: "Kitchen", title: "Wash dishes", done: false, assignedTo: "stevie" },
    { id: 2, room: "Kitchen", title: "Take out bins", done: false, assignedTo: "leo" },
    { id: 3, room: "Living Room", title: "Vacuum floor", done: true, assignedTo: "parker" },
  ]);

  const toggle = (task) => {
    setTasks((list) =>
      list.map((t) =>
        t.id === task.id ? { ...t, done: !t.done } : t
      )
    );

    // XP logic: add on complete, subtract if unchecking
    if (!task.done) {
      addXp?.(task.assignedTo, xpPerTask);
    } else {
      addXp?.(task.assignedTo, -xpPerTask);
    }
  };

  const reassign = (taskId, newAssignee) => {
    setTasks((list) =>
      list.map((t) => (t.id === taskId ?
