import Stars from "@/app/components/Stars";
import { calculateReviewRatingAverange } from "@/utils/calculateReviewRatingAverage";
import { PRICE, Cuisine, Location, Review } from "@prisma/client";
import Link from "next/link";
interface Props {
  restaurant: {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[];
  };
}
export default function RestaurantCard({ restaurant }: Props) {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverange(restaurant.reviews);
    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 0) return "Average";
    else return "";
  };
  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded " />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            {" "}
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <p className="mr-4">{restaurant.price}</p>
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
