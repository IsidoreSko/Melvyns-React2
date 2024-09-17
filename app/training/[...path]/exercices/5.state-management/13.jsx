"use client";
import { useReducer } from "react";
import { RefreshCcw, Hash } from "lucide-react";
// 🦁 Créer une méthode `reducer` qui prends en paramètre `state` et `action`
// 🦁 Return le `state` + 1
// const reducer = (state, action) => {
//   return state + 1;
// };

const REDUCER_ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  SET: "SET",
};

const reducer = (state, action) => {
  const value = action.value || 1;
  switch (action.type) {
    // case "INCREMENT":
    case REDUCER_ACTIONS.INCREMENT:
      return state + value;

    // case "DECREMENT":
    case REDUCER_ACTIONS.DECREMENT:
      return state - value;

    // case "RESET":
    case REDUCER_ACTIONS.RESET:
      return (state = 0);

    case REDUCER_ACTIONS.SET:
      if (isNaN(action.value)) {
        // (typeof action.value !== "number")
        throw new Error("action.value must be a number");
      }

      return action.value;

    default:
      throw new Error("Invalid case");
  }
};
export default function App() {
  // 🦁 Remplace ceci par un `useReducer`
  // ⚡ La seul action sera d'incrémenter le count
  // const count = 0;
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div className="card m-auto w-full max-w-md bg-base-200 shadow-xl">
      <div className="card-body items-center text-center">
        <label className="input input-bordered flex  items-center gap-2">
          <Hash scale={16} />
          <input
            type="text"
            className="w-10 grow"
            placeholder="Count"
            value={count}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              if (isNaN(value)) {
                value = 0;
              }
              dispatch({ type: REDUCER_ACTIONS.SET, value: value });
            }}
          />
        </label>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() =>
              dispatch({ type: REDUCER_ACTIONS.INCREMENT, value: 5 })
            }
          >
            + 5
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: REDUCER_ACTIONS.INCREMENT })}
          >
            +
          </button>
          <button
            className="btn btn-outline"
            onClick={() => dispatch({ type: REDUCER_ACTIONS.RESET })}
          >
            <RefreshCcw size={16} />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: REDUCER_ACTIONS.DECREMENT })}
          >
            -
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "DECREMENT", value: 5 })}
          >
            - 5
          </button>
        </div>
      </div>
    </div>
  );
}
