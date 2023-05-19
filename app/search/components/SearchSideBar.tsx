import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const select = {
  id: true,
  name: true,
};

interface result {
  id: number;
  name: string;
}

const fetchLocations = async (): Promise<result[]> => {
  const locations = await prisma.location.findMany({
    select,
  });
  if (!locations) throw new Error();
  return locations;
};

const fetchCuisines = async (): Promise<result[]> => {
  const cuisines = await prisma.cuisine.findMany({
    select,
  });
  if (!cuisines) throw new Error();
  return cuisines;
};

export default async function SearchSideBar() {
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  console.log(cuisines);
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <p className="font-light text-reg capitalize">{location.name}</p>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        <p className="font-light text-reg">Mexican</p>
        <p className="font-light text-reg">Italian</p>
        <p className="font-light text-reg">Chinese</p>
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <button className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2">
            $$
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
            $$$
          </button>
        </div>
      </div>
    </div>
  );
}
