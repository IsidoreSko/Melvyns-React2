"use client";

import { useEffect } from "react";
import { useState } from "react";

// export default function App() {
//   const [isCountingClick, setIsCountingClick] = useState(false);
//   // eslint-disable-next-line no-unused-vars
//   const [count, setCount] = useState(0);

// 🦁 1 - Créer un `useEffect` qui vient écouter les click sur `window`

// useEffect(() => {
//   const onClick = () => {
//     if (!isCountingClick) return;
//     // setCount(count + 1);
//     setCount((curr) => curr + 1);
//   };
//   document.addEventListener("click", onClick);
//   return () => {
//     document.removeEventListener("click", onClick);
//   };
// }, [isCountingClick]);

// 2 - Pour optimiser:
// useEffect(() => {
//   // On place la condition en premier ce qui évite l'écoute de click quand isCountingClick est false
//   if (!isCountingClick) return;
//   const onClick = () => {
//     setCount((curr) => curr + 1);
//   };
//   document.addEventListener("click", onClick);
//   return () => {
//     document.removeEventListener("click", onClick);
//   };
//   // 🦁 Ensuite il incrémente le state `count` uniquement si `isCountingClick` est `true`
// }, [isCountingClick]);

// 3 - Custome Hook:
const useEventListener = ({
  eventName,
  handler,
  element = window,
  enabled = true,
}) => {
  useEffect(() => {
    // On place la condition en premier ce qui évite l'écoute de click quand isCountingClick est false
    if (!enabled) return;
    const onClick = () => {
      handler();
    };
    element.addEventListener(eventName, onClick);
    return () => {
      element.removeEventListener(eventName, onClick);
    };
    // 🦁 Ensuite il incrémente le state `count` uniquement si `isCountingClick` est `true`
  }, [element, enabled, eventName, handler]);
};
export default function App() {
  const [isCountingClick, setIsCountingClick] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  useEventListener({
    eventName: "click",
    handler: () => {
      setCount((curr) => curr + 1);
    },
    enabled: isCountingClick,
  });

  return (
    <div className="flex max-w-sm flex-col gap-8">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Is Counting Click</span>
          <input
            type="checkbox"
            className="toggle"
            checked={isCountingClick}
            onChange={(e) => setIsCountingClick(e.target.checked)}
          />
        </label>
      </div>
      <h2 className="text-2xl font-bold">Click count: {count}</h2>
    </div>
  );
}
