export default function App() {
  return (
    <ShoesList>
      {/* // < className="grid grid-cols-1 gap-4 md:grid-cols-2"> */}
      {/* 🦁 Ceci est le premier composant */}
      {/* 🦁 Tu peux le copier/coller dans un nouveau composant pour le séparer */}
      {/* {      <div className="card w-full bg-base-300 shadow-xl">
        <figure>
          <img
            src="/images/shoes-1.png"
            className="h-32 w-full object-cover object-center"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Shark Shoes
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>This yellow shoes will make your friend jealous.</p>
        </div>
      </div>

      <div className="card w-full bg-base-300 shadow-xl">
        <figure>
          <img
            src="/images/shoes-2.png"
            className="h-32 w-full object-cover object-center"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Blue Wheti
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>
            You can wear this shoes with any clothes. It will make you look
            cool.
          </p>
        </div>
      </div>

      <div className="card w-full bg-base-300 shadow-xl">
        <figure>
          <img
            src="/images/shoes-3.png"
            className="h-32 w-full object-cover object-center"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Basic Fit</h2>
          <p>
            You know what? This shoes is the best shoes for you who like to
            walk.
          </p>
        </div>
      </div>

      <div className="card w-full bg-base-300 shadow-xl">
        <figure>
          <img
            src="/images/shoes-4.png"
            className="h-32 w-full object-cover object-center"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Darku Shoes</h2>
          <p>Wow, this shoes is so cool. You can wear it for any occasion.</p>
        </div>
      </div>} */}
      <ShoeCard
        image="/images/shoes-1.png"
        title="Shark Shoes"
        description="This yellow shoes will make your friend jealous."
        isNew={true}
        // {On pourait juste mettre isNew}
      />
      <ShoeCard
        image="/images/shoes-2.png"
        title="Blue Wheti"
        description="You can wear this shoes with any clothes. It will make you look cool."
        isNew={true}
      />
      <ShoeCard
        image="/images/shoes-3.png"
        title="Basic Fit"
        description="You know what? This shoes is the best shoes for you who like to walk."
      />
      <ShoeCard
        image="/images/shoes-4.png"
        title="Darku Shoes"
        description="Wow, this shoes is so cool. You can wear it for any occasion."
      />
    </ShoesList>
  );
}

// 🦁 Celui-ci va prendre des "props"
// 🦁 Tu peux prendre une props `image`, `title` et `description`
// 🦁 Créer un component `ShoeCard`
function ShoeCard({ image, title, description, isNew }) {
  return (
    <div className="card w-full bg-base-300 shadow-xl">
      <figure>
        <img
          src={image}
          className="h-32 w-full object-cover object-center"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {/* <NewBadge isNew={isNew} />{} */}
          {isNew ? <NewBadge /> : null}
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function ShoesList({ children }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  );
}

// function NewBadge({ isNew }) {
//   if (!isNew) {
//     return null;
//   }
//   return <div className="badge badge-secondary">NEW</div>;
// }
function NewBadge() {
  return <div className="badge badge-secondary">NEW</div>;
}
