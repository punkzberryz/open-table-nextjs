import type { Metadata } from "next";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true,
};

const fetchRestaurantsByCity = (city: string | undefined) => {
  if (!city) return prisma.restaurant.findMany({ select });

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city,
        },
      },
    },
    select,
  });
};

export const metadata: Metadata = {
  title: "Search | OpenTable",
  description: "OpenTable clone with NextJs",
};

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string };
}) {
  const city = searchParams.city.toLocaleLowerCase();
  const restaurants = await fetchRestaurantsByCity(city);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
