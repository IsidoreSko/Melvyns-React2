// @ts-nocheck
"use client";

import clsx from "clsx";

const Button = ({ children, variant, id, onClick }) => {
  const buttonClass = clsx("btn ring-offset-2 ring-offset-base-100", {
    "btn-primary": variant === "primary",
    "btn-error": variant === "error",
    "btn-success": variant === "success",
    "btn-warning": variant === "warning",
  });

  return (
    <button className={buttonClass} id={id} onClick={() => onClick(id)}>
      {children}
    </button>
  );
};

export default function App() {
  const onClickButton = (id) => alert(`You clicked on ${id}`);
  // const handleClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     alert("You click on the container");
  //     return;
  //   }
  //   const onClickId = (id) => {
  //     alert(`You click me ${id}`);
  //   };

  return (
    <div
      onClick={(e) => {
        const target = e.target;

        if (target === e.currentTarget) {
          alert(`You clicked on the container`);
        }
      }}
      className="flex flex-wrap gap-4 p-4"
      // onClick={handleClick}
      // 🦁 Rajoute un `onClick` avec un arrow function
      // 💡 (e) => {...}
      // Récupère l'id de l'élément cliqué avec `target`
      // Si `target` === `currentTarget` = container
      // Sinon = id de l'élément cliqué
      // Affiche une `alert` avec `alert`
    >
      <Button
        onClick={(id) => onClickButton(id)}
        variant={"primary"}
        id="eat-me"
      >
        Eat me
      </Button>
      <Button
        onClick={(id) => onClickButton(id)}
        variant={"error"}
        id="love-me"
      >
        Love me
      </Button>
      <Button
        onClick={(id) => onClickButton(id)}
        variant={"success"}
        id="drink-me"
      >
        Drink me
      </Button>
      <Button
        onClick={(id) => onClickButton(id)}
        variant={"warning"}
        id="leave-me"
      >
        Eat me
      </Button>
    </div>
  );
}
