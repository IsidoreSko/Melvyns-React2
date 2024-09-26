"use client";

import { Search } from "lucide-react";
/* eslint-disable no-unused-vars */ // 🦁 Enlève cette ligne
import { useState, useRef } from "react";

const useDebounceFn = (callback, time) => {
  // 🦁 Remplace cette variable par un `useRef`
  const debounce = useRef(null);
  // 💡 timeout correspond à la référence de notre timeout.
  //   Quand tu fais un setTimeout, il return une valeur que
  //   tu peux clear afin de l'annuler. https://developer.mozilla.org/fr/docs/Web/API/setTimeout#valeur_de_retour
  let timeout = useRef(null);

  const onDebounce = (...args) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      callback(...args);
    }, time);
  };
  // 🦁 Annule le timeout https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
  // ℹ️ Cette fonction sera appelée à chaque fois que l'user tape un caractère, on veut donc clear
  //    le dernier timeout pour relancer un nouveau timeout.
  // 🦁 Crée un nouveau timeout https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
  //    a la fin il doit appeler la callback avec les arguments et le temps est défini par le paramètre `time`

  return onDebounce;
};

const fetchAgeByName = (name) => {
  return fetch(`https://api.agify.io/?name=${name}`).then((res) => res.json());
};

let render = 0;
const useRenderCount = () => {
  const render = useRef(0);
  return render.current++;
};

export default function App() {
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const onSearch = useDebounceFn((value) => {
    fetchAgeByName(inputRef.current?.value).then((data) => {
      setResult(data);
      inputRef.current?.focus();
    });
  }, 500);

  // 🦁 Wrap la function `onSearch` dans le hooks useDebounce
  // 💡 const onSearch = useDebounce((value) => {...}, 500);
  // const onSearch = (value) => {

  //   });
  // };
  const renderCount = useRenderCount();

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Render {renderCount} time</p>
      <label className="input input-bordered flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search bar"
          onChange={(event) => {
            // onSearch(event.target.value);
            onSearch();
          }}
        />
        <Search size={16} />
      </label>
      {result ? (
        <div style={{ padding: 16 }}>
          The age for <b>{result.name}</b> is <b>{result.age}</b> and there is{" "}
          <b>{result.count}</b> people with this name.
        </div>
      ) : null}
    </div>
  );
}
