// const shoesList = [
//   {
//     id: 1,
//     isNew: true,
//     image: "/images/shoes-2.png",
//     title: "Blue Wheti",
//     description:
//       "You can wear this shoes with any clothes. It will make you look cool.",
//   },
//   {
//     id: 2,
//     image: "/images/shoes-3.png",
//     title: "Basic Fit",
//     description:
//       "You know what? This shoes is the best shoes for you who like to walk.",
//   },
//   {
//     id: 3,
//     image: "/images/shoes-4.png",
//     title: "Darku Shoes",
//     description:
//       "Wow, this shoes is so cool. You can wear it for any occasion.",
//   },
// ];

const shoesList = [
  {
    id: 1,
    isNew: true,
    image: "/images/shoes-2.png",
    title: "Blue Wheti",
    description:
      "You can wear this shoes with any clothes. It will make you look cool.",
    categories: ["Casual", "Comfort"],
  },
  {
    id: 2,
    image: "/images/shoes-3.png",
    title: "Basic Fit",
    description:
      "You know what? This shoes is the best shoes for you who like to walk.",
    categories: ["Walking", "Outdoor", "Sport"],
  },
  {
    id: 3,
    image: "/images/shoes-4.png",
    title: "Darku Shoes",
    description:
      "Wow, this shoes is so cool. You can wear it for any occasion.",
    categories: ["Formal", "Classic"],
  },
];

export default function App() {
  return (
    <ShoesList>
      {/* 🦁 Créer un tableau avec les informations ci-dessous */}
      {/* 💡 Utilise l'IA et demande lui : "Créer un tableau pour afficher ces composants via une liste. Ne me donne que le tableau JavaScript." */}

      {/* 🦁 Le nom du tableau = shoesList */}
      {/* 💸 {shoesList.map(shoe => (...))} */}
      {/* {shoesList.map((shoe) => (
        <ShoeCard
          key={shoe.id}
          isNew={shoe.isNew}
          image={shoe.image}
          title={shoe.title}
          description={shoe.description}
        />
      ))} */}
      {shoesList.map((shoe) => (
        <ShoeCard key={shoe.id} {...shoe} />
      ))}
      {/* <ShoeCard
        isNew
        image="/images/shoes-1.png"
        title="Shark Shoes"
        description="This yellow shoes will make your friend jealous."
      />
      <ShoeCard
        isNew
        image="/images/shoes-2.png"
        title="Blue Wheti"
        description="You can wear this shoes with any clothes. It will make you look cool."
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
      /> */}
    </ShoesList>
  );
}

function ShoesList({ children }) {
  return <div className="grid }-cols-1 gap-4 md:grid-cols-2">{children}</div>;
}

function NewBadge() {
  return <div className="badge badge-secondary">NEW</div>;
}

function ShoeCard({ image, title, description, isNew = false, categories }) {
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
          {isNew ? <NewBadge /> : null}
        </h2>
        <p>{description}</p>
        <div className="flex items-center justify-between">
          <div className="card-actions justify-end">
            {categories.map((category) => (
              <div key={category} className="badge badge-outline">
                {category}
              </div>
            ))}
            <label className="label flex cursor-pointer flex-col gap-1">
              <span className="label-text">Cart</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
