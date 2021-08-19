import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(4);
  const router = useRouter();
  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      },
    });
  };
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div
        className="relative  flex items-center h-10 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          className=""
          alt=""
        />
      </div>
      {/* Middle */}
      <div className="flex items-center md:border-2 rounded-full  py-2 md:shadow-sm">
        <input
          type="text"
          placeholder={placeholder || "Search your stay"}
          className="flex-grow outline-none pl-5 bg-transparent text-sm text-gray-600 placeholder-gray-400"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon className="hidden md:inline-flex bg-red-400 h-8  text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      {/* Right */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer hover:text-red-500">
          Become a host
        </p>
        <GlobeAltIcon className="hidden md:inline h-6 cursor-pointer" />
        <div className="flex border-2 space-x-2 rounded-full p-2 items-center">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col mx-auto col-span-3 mt-2">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fd5b61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="font-semibold text-2xl flex-grow">
              Number of Guests
            </h2>
            <UserIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-red-400 outline-none"
              value={numberOfGuests}
              min={1}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-400" onClick={resetInput}>
              Cancel
            </button>
            <button className="flex-grow text-red-400" onClick={search}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
