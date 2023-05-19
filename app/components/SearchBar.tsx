"use client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, KeyboardEvent } from "react";
export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const onChangeSearchBarHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const onClickSearchBarHandler = () => {
    if (location === "") return;
    router.push(`/search?city=${location}`);
    setLocation("");
  };

  const onEnterSearchBarHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onClickSearchBarHandler();
  };

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={onChangeSearchBarHandler}
        onKeyDown={onEnterSearchBarHandler}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={onClickSearchBarHandler}
      >
        Let's go
      </button>
    </div>
  );
}
