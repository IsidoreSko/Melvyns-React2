"use client";

import { User2, X } from "lucide-react";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Troisième partie Accessibilité:
const useEventListener = ({
  handler,
  isEnabled = true,
  type,
  element = window,
}) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    if (!element) {
      return;
    }

    const onEvent = (e) => {
      handlerRef.current(e);
    };

    element.addEventListener(type, onEvent);

    return () => {
      element.removeEventListener(type, onEvent);
    };
  }, [isEnabled, type, element]);
};

const useClickOutside = (ref, handler) => {
  const listener = (event) => {
    if (!ref.current) return;
    if (ref.current.contains(event.target)) return;
    handler();
  };

  useEventListener({
    handler: listener,
    type: "mousedown",
  });
  useEventListener({
    handler: listener,
    type: "touchstart",
  });
};

const getFocusableElements = (ref) =>
  Array.from(
    ref.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )
  );

const useFocusTrap = (ref, isEnabled) => {
  useEventListener({
    type: "keydown",
    isEnabled,
    handler: (event) => {
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(ref);

      const activeElement = document.activeElement;

      let nextActiveElementIndex = event.shiftKey
        ? focusableElements.indexOf(activeElement) - 1
        : focusableElements.indexOf(activeElement) + 1;

      const toFocusElement = focusableElements[nextActiveElementIndex];

      if (toFocusElement) {
        console.log("Return nothing");
        return;
      }

      nextActiveElementIndex =
        nextActiveElementIndex < 0 ? focusableElements.length - 1 : 0;

      focusableElements[nextActiveElementIndex].focus();
      event.preventDefault();
      return;
    },
  });
};

// 🦁 Crée un contexte `DialogContext` avec une valeur par défaut `null`
// const DialogContext = createContext(null);
// // 🦁 Crée une fonction `useDialogContext` qui va retourner le contexte `DialogContext`
// // 💡 Utilise `useContext` pour récupérer le contexte `DialogContext`
// // ❌ Si le contexte renvoie null, on va renvoyer une erreur
// // ✅ Sinon on va renvoyer le contexte
// const useDialogContext = () => {
//   const context = useContext(DialogContext);
//   if (!context) {
//     throw new Error("useDialogContext must be within 'Dialod'");
//   }
//   return context;
// };
// // Modifie Dialog pour qu'il injecte le `open, setOpen` dans notre `DialogContext.Provider`
// // https://react.dev/reference/react/createContext#provider
// const Dialog = ({ children }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <DialogContext.Provider value={{ open, setOpen }}>
//       {children}
//       {/* <DialogContent open={open} setOpen={setOpen}></DialogContent> */}
//     </DialogContext.Provider>
//   );
// };
// const DialogTrigger = ({ children }) => {
//   const { setOpen } = useDialogContext();

//   if (typeof children !== "string") {
//     return cloneElement(children, {
//       // Pour que le onClick du bouton se trouvant dans le app, dialogTragger fonctionne en utilise le "e" ainsi:
//       onClick: (e) => {
//         setOpen(true);
//         children.props.onClick?.(e);
//       },
//     });
//   }
//   return (
//     <button onClick={() => setOpen(true)} className="btn">
//       {children}
//     </button>
//   );
// };
// const DialogClose = ({ children }) => {
//   const { setOpen } = useContext(DialogContext);
//   if (typeof children !== "string") {
//     return cloneElement(children, {
//       // Pour que le onClick du bouton se trouvant dans le app, dialogTragger fonctionne en utilise le "e" ainsi:
//       onClick: (e) => {
//         setOpen(false);
//         children.props.onClick?.(e);
//       },
//     });
//   }

//   return (
//     <button onClick={() => setOpen(false)} className="btn btn-primary">
//       {children}
//     </button>
//   );
// };

// // 🦁 Enlève les props et utilise `useDialogContext` pour récupérer le contexte
// const DialogContent = ({ children }) => {
//   const { open } = useDialogContext();

//   if (!open) return;

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-50"
//     >
//       <div className="card w-96 bg-base-200 shadow-xl animate-in fade-in-50 slide-in-from-bottom-3">
//         <div className="card-body">{children}</div>
//       </div>
//     </div>
//   );
// };

// // 🦁 Crée un component DialogTrigger qui prend comme props children
// // Celui-ci va contenir le bouton avec un onClick qui va mettre à jour le state `open`
// // Utilise `useDialogContext` pour récupérer le contexte `DialogContext`

// // 🦁 Crée un component DialogClose qui prend comme props children
// // Celui-ci va contenir le bouton avec un onClick qui va mettre à jour le state `open`
// // Utilise `useDialogContext` pour récupérer le contexte `DialogContext`

// export default function App() {
//   return (
//     <div>
//       {/* 🦁 Mets ensemble nos components pour avoir un Dialog fonctionnel */}
//       <Dialog buttonText="Open dialog">
//         <DialogTrigger>
//           <button
//             className="btn btn-primary btn-lg"
//             onClick={() => {
//               alert("Houlala");
//             }}
//           >
//             Open dialog
//           </button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogClose>
//             <button className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-lg bg-base-100">
//               <X size={12} />
//             </button>
//           </DialogClose>
//           <p>What is your name ?</p>
//           <label className="input input-bordered flex items-center gap-2">
//             <User2 scale={16} />
//             <input type="text" className="grow" placeholder="Username" />
//           </label>
//           <div className="card-actions">
//             <button className="btn btn-primary">Submit</button>
//             {/* <DialogClose>Close</DialogClose> */}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
const DialogContext = createContext(null);

const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialogContext must be used within `Dialog`");
  }

  return context;
};

const Dialog = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger = ({ children }) => {
  const { setOpen } = useDialogContext();

  if (typeof children !== "string") {
    return cloneElement(children, {
      onClick: (e) => {
        setOpen(true);
        children.props.onClick?.(e);
      },
    });
  }

  return (
    <button onClick={() => setOpen(true)} className="btn">
      {children}
    </button>
  );
};

const DialogClose = ({ children }) => {
  const { setOpen } = useDialogContext();

  if (typeof children !== "string") {
    return cloneElement(children, {
      onClick: (e) => {
        setOpen(false);
        children.props.onClick?.(e);
      },
    });
  }

  return (
    <button onClick={() => setOpen(false)} className="btn">
      {children}
    </button>
  );
};

const DialogContent = ({ children }) => {
  const { open, setOpen } = useDialogContext();
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setOpen(false);
  });

  useEventListener({
    isEnabled: open,
    type: "keydown",
    handler: (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
  });

  useFocusTrap(ref, open);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-50"
    >
      <div
        ref={ref}
        className="card w-96 bg-base-200 shadow-xl animate-in fade-in-50 slide-in-from-bottom-3"
      >
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button className="btn btn-primary btn-lg">Open dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogClose>
            <button className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-lg bg-base-100">
              <X size={12} />
            </button>
          </DialogClose>
          <p>What is your name ?</p>
          <label className="input input-bordered flex items-center gap-2">
            <User2 scale={16} />
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <div className="card-actions">
            {/* 🦁 Ajoute le bouton "Cancel" */}
            <button className="btn btn-primary">Submit</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
