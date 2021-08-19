import Image from "next/image";
const LargeCard = ({ img, title, description, buttonText }) => {
  return (
    <section className="relative py-16 overflow-hidden cursor-pointer ">
      <div className="relative h-96 min-w-[280px]">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64 ">{title}</h3>
        <p className="">{description}</p>
        <button className="px-4 py-2 rounded-lg mt-5 text-sm bg-gray-900 text-white">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
