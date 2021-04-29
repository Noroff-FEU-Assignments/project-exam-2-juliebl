import CardListItem from './CardListItem';
function Card() {
  return (
    <li className="border p-4 grid grid-cols-1 grid-rows-3 min-h-96 rounded-md">
      <div className="overflow-hidden row-span-2 relative">
        <img
          src="https://juliebl-exam.s3.eu-north-1.amazonaws.com/large_albert_vincent_wu_Akqn_ZZR_1o_L4_unsplash_b0e5c87af3.jpg"
          alt=""
          className="absolute w-full h-auto left-1/2 top-1/2 translate-3d-50"
        />
      </div>

      <div className="mt-2">
        <h3 className="font-bold">Damsgårdveien room</h3>
        <p>
          <span className="font-medium">$150</span> / night
        </p>
        <ul className="my-4">
          <CardListItem icon="guest" text="2 guests" />
          <CardListItem icon="bed" text="1 bedroom" />
          <CardListItem icon="bath" text="1 bathroom" />
        </ul>
        <ul>
          <CardListItem icon="kitchen" text="Kitchen" />
          <CardListItem icon="breakfast" text="Breakfast" />
          <CardListItem icon="wifi" text="WIFI" />
        </ul>
      </div>
    </li>
  );
}

export default Card;
