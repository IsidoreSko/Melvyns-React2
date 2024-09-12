// @ts-nocheck
"use client";

import { User2 } from "lucide-react";
import { useEffect, useState } from "react";

// 🦁 Créer une clé `STORAGE_KEY` qui est égale à `storage-name`
const STORAGE_KEY = "storage-name";

// const NameForm = ({ initialName }) => {
//   // 🦁 Comme valeur initiale, récupère la valeur dans le localStorage
//   const [name, setName] = useState(
//     () => localStorage.getItem(STORAGE_KEY) ?? initialName
//   );

//   // 🦁 Créer un `useEffect` avec `name` comme dépendance
//   // 🦁 Sauvegarde le `name` dans le localStorage avec la clé définie dans `STORAGE_KEY`
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, name);
//   }, [name]);

const getInitialStorageValue = (key, initialValue) => {
  try {
    // return localStorage.getItem(key) ?? initialValue;
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  } catch {
    return initialValue;
  }
};
const useStickyState = (key, initialValue) => {
  const [value, setValue] = useState(() =>
    getInitialStorageValue(key, initialValue)
  );

  useEffect(() => {
    // localStorage.setItem(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

const NameForm = ({ initialName }) => {
  // 🦁 Comme valeur initiale, récupère la valeur dans le localStorage
  const [name, setName] = useStickyState(STORAGE_KEY, initialName);

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="input input-bordered flex items-center gap-2">
        <User2 size={16} />
        <input
          type="text"
          className="grow"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex flex-col gap-8">
      <NameForm initialName={"Jean"} />
    </div>
  );
}
