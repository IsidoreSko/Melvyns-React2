"use client";

import { Mail, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Partie 1 : Vanilla form
// export const LoginForm = ({ onSubmit }) => {
//   // 🦁 Utilise 2 states pour le mail et le name

//   // 🦁 Crée une méthode "handleSubmit" qui sera passée au `onSubmit` de `form`
//   const handleSubmit = (e) => {
//     // - Commence par empêcher le comportement par défaut du formulaire
//     e.preventDefault();
//     const currentTarget = e.currentTarget;
//     const formData = new FormData(currentTarget);
//     // const email = formData.get("email");
//     const values = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//     };
//     // - Puis appelle `onSubmit` avec un objet contenant le mail et le name
//     onSubmit(values);
//   };
//   return (
//     // Ajoute la props `onSubmit`
//     <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
//       <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
//         <Mail size={16} />

//         <input
//           type="email"
//           /* 🦁 Contrôle cette input */
//           name="email"
//           className="grow"
//           placeholder="email"
//         />
//       </label>
//       <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
//         <User2 size={16} />

//         <input
//           type="text"
//           /* 🦁 Contrôle cette input */
//           name="name"
//           // Pour que le nom est un minimum de 3 lettres
//           minLength={3}
//           className="grow"
//           placeholder="user"
//         />
//       </label>
//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// Partie 2 : useState
// export const LoginForm = ({ onSubmit }) => {
//   // 🦁 Utilise 2 states pour le mail et le name
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   // 🦁 Crée une méthode "handleSubmit" qui sera passée au `onSubmit` de `form`
//   const handleSubmit = (e) => {
//     // - Commence par empêcher le comportement par défaut du formulaire
//     e.preventDefault();

//     const values = {
//       name,
//       email,
//     };
//     // - Puis appelle `onSubmit` avec un objet contenant le mail et le name
//     // eslint-disable-next-line no-undef
//     onSubmit(values);
//   };
//   return (
//     // Ajoute la props `onSubmit`
//     <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
//       <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
//         <Mail size={16} />

//         <input
//           type="email"
//           className="grow"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
//         <User2 size={16} />

//         <input
//           type="text"
//           // Pour que le nom est un minimum de 3 lettres
//           minLength={3}
//           className="grow"
//           placeholder="user"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// Partie 3 : useRef
// export const LoginForm = ({ onSubmit }) => {
//   const emailRef = useRef(null);
//   const nameRef = useRef(null);
//   // 🦁 Crée une méthode "handleSubmit" qui sera passée au `onSubmit` de `form`
//   const handleSubmit = (e) => {
//     // - Commence par empêcher le comportement par défaut du formulaire
//     e.preventDefault();

//     const values = {
//       email: emailRef.current?.value,
//       name: nameRef.current?.value,
//     };
//     onSubmit(values);
//   };
//   return (
//     // Ajoute la props `onSubmit`
//     <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
//       <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
//         <Mail size={16} />

//         <input
//           type="email"
//           className="grow"
//           placeholder="email"
//           ref={emailRef}
//         />
//       </label>
//       <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
//         <User2 size={16} />

//         <input
//           type="text"
//           // Pour que le nom est un minimum de 3 lettres
//           minLength={3}
//           className="grow"
//           placeholder="user"
//           // value={name}
//           ref={nameRef}
//         />
//       </label>
//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// Partie 4 : react-hook-form
export const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    // Ajoute la props `onSubmit`
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
        <Mail size={16} />

        <input
          type="email"
          className="grow"
          placeholder="email"
          {...register(
            "email",
            // Gestion des erreurs concernant le mail:
            {
              required: {
                value: true,
                message: "The mail is required",
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            }
          )}
        />
      </label>
      {/* Apparition du message d'erreur: */}
      {errors.email ? (
        <p className="text-error">{errors.email.message}</p>
      ) : null}
      <label className="input input-bordered flex items-center gap-2 has-[:invalid]:input-error">
        <User2 size={16} />

        <input
          type="text"
          className="grow"
          placeholder="user"
          {...register(
            "name",
            // Gestion des erreurs concernant le name user
            {
              required: {
                value: true,
                message: "Name is required.",
              },
              minLength: {
                value: 4,
                message: "Minimum user name is 4 char.",
              },
            }
          )}
        />
      </label>
      {/* Apparition du message d'erreur: */}
      {errors.name ? <p className="text-error">{errors.name.message}</p> : null}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Logged in !</h2>
          <p>Email : {user.email}</p>
          <p>Name : {user.name}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <LoginForm
        onSubmit={(values) => {
          setUser(values);
        }}
      />
    </div>
  );
}
