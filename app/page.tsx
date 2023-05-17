import type { Metadata } from "next";
//componetns
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export const metadata: Metadata = {
  title: "OpenTable",
  description: "OpenTable clone with NextJs",
};

export default function Home() {
  return (
    <>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        <RestaurantCard />
      </div>
    </>
  );
}
