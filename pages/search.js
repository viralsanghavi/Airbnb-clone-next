import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import MapComponent from "../components/MapComponent";

const Search = ({ searchResults }) => {
  console.log(searchResults);
  const router = useRouter();
  const { endDate, location, numberOfGuests, startDate } = router.query;
  const buttons = [
    { name: "Cancelation Flexibelity" },
    { name: "Type of place" },
    { name: "Price" },
    { name: "Rooms and Beds" },
    { name: "More Filters" },
  ];
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${numberOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays - {range} - for {numberOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex space-x-3 text-gray-800 whitespace-nowrap mb-5">
            {buttons.map((button) => (
              <p className="button" key={button.name}>
                {button.name}
              </p>
            ))}
          </div>
          <div className="flex flex-col">
            {searchResults.map(
              ({
                description,
                lat,
                location,
                long,
                price,
                star,
                title,
                total,
                img,
              }) => (
                <InfoCard
                  key={img}
                  img={img}
                  description={description}
                  lat={lat}
                  location={location}
                  long={long}
                  price={price}
                  star={star}
                  title={title}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px] h-screen">
          <MapComponent searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
export async function getServerSideProps(context) {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
