"use client";
import styles from "./3.module.css";
// 🦁 Tu vas devoir créer un badge qui possède plusieurs "variant" (couleur) et taille (size).

// 🦁 1. Variants
// Pour chaque variant, tu vas utiliser les "inline styles" pour définir la couleur de fond et la couleur du texte.
// Pour ça, tu vas créer un objet `VARIANTS` qui contiendra les clés suivantes :
// - red
//   - background: "#ef444415"
//   - color: "#b91c1c"
// - green
//   - background: "#22c55e15"
//   - color: "#15803d"
// - purple
//   - background: "#8b5cf615"
//   - color: "#6d28d9"

// const VARIANTS = {
//   red: {
//     background: "#ef444415",
//     color: "#b91c1c",
//   },
//   green: {
//     background: "#22c55e15",
//     color: "#15803d",
//   },
//   purple: {
//     background: "#8b5cf615",
//     color: "#6d28d9",
//   },
// };

// const VARIANTS = {
//   red: "badge-color-red",
//   green: "badge-color-green",
//   purple: "badge-color-purple",
// };

// const VARIANTS = {
//   red: styles["badge-color-red"],
//   green: styles["badge-color-green"],
//   purple: styles["badge-color-purple"],
// };

const VARIANTS = {
  red: styles.colorRed,
  green: styles.colorGreen,
  purple: styles.colorPurple,
};

// 🦁 2. Sizes
// Pour chaque size, tu vas utiliser les "inline styles" pour définir la taille du padding et la taille de la police.
// Pour ça, tu vas créer un objet `SIZES` qui contiendra les clés suivantes :
// - default
//   - padding: "2px 6px"
// - lg
//   - padding: "4px 8px"

// const SIZES = {
//   default: {
//     padding: "2px 6px",
//   },
//   lg: {
//     padding: "4px 8px",
//   },
// };

// const SIZES = {
//   default: "badge-size-default",
//   lg: "badge-size-large",
// };

// const SIZES = {
//   default: styles["badge-size-default"],
//   lg: styles["badge-size-large"],
// };

const SIZES = {
  default: styles.sizeDefault,
  lg: styles.sizeLarge,
};

// 🦁 Tu vas ensuite pouvoir utiliser ces objets pour définir les styles de ton badge.
// Avec les props, tu vas pouvoir récupérer la taille et le variant du badge pour lui appliquer les styles correspondants.
// Pour ça, tu peux utiliser la syntaxe suivante :
// 💡 SIZES[size] || SIZES.default;
// 💡 COLORS[variant] || COLORS.red;
// Et les appliquer directement sur le style de ton span.
// 💡 Tu peux ensuite utiliser le spread (...) pour ajouter les styles.

// 🦁 Finalement, voici les styles "commun" entre chaque badge :
// - display: "inline-flex"
// - alignItems: "center"
// - borderRadius: "6px"
// - fontWeight: "500"
// - width: "fit-content"

// 💣 Supprime cette ligne
// eslint-disable-next-line no-unused-vars
// const Badge = ({ size, variant, children }) => {
//   const variantStyle = VARIANTS[variant];
//   const sizeStyle = SIZES[size];
//   return (
//     <span
//       style={{
//         // 🦁 Ajoute les styles
//         display: "inline-flex",
//         alignItems: "center",
//         borderRadius: "6px",
//         fontWeight: "500",
//         width: "fit-content",
//         ...variantStyle,
//         ...sizeStyle,
//       }}
//     >
//       {children}
//     </span>
//   );
// };

// const Badge = ({ size, variant, children }) => {
//   const variantStyle = VARIANTS[variant];
//   const sizeStyle = SIZES[size];
//   return (
//     <span className={`badge-base ${variantStyle} ${sizeStyle}`}>
//       {children}
//     </span>
//   );
// };

// const Badge = ({ size, variant, children }) => {
//   const variantStyle = VARIANTS[variant];
//   const sizeStyle = SIZES[size];
//   return <span className={` ${variantStyle} ${sizeStyle}`}>{children}</span>;
// };

const Badge = ({ size, variant, children }) => {
  const variantStyle = VARIANTS[variant];
  const sizeStyle = SIZES[size];
  return (
    <span className={`${styles.badge} ${variantStyle} ${sizeStyle}`}>
      {children}
    </span>
  );
};

export default function App() {
  return (
    <div className="grid grid-cols-4 flex-col gap-2 bg-white p-8 text-black">
      <p className="code">Size / color</p>
      <p className="code">Green</p>
      <p className="code">Red</p>
      <p className="code">Purple</p>
      <p className="code">lg</p>
      <Badge size="lg" variant="green">
        New
      </Badge>
      <Badge size="lg" variant="red">
        New
      </Badge>
      <Badge size="lg" variant="purple">
        New
      </Badge>
      <p className="code">default</p>
      <Badge size="default" variant="green">
        New
      </Badge>
      <Badge size="default" variant="red">
        New
      </Badge>
      <Badge size="default" variant="purple">
        New
      </Badge>
    </div>
  );
}
