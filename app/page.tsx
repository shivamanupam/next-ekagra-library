import Card from "@/components/Card";
import { connectDB } from "@/lib/db";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Link from "next/link";

const cards = [
  {
    title: "The Coldest Sunset",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    tags: ["photography", "travel", "winter"],
  },
  {
    title: "Breezy Summer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque.",
    tags: ["farm", "riverside"],
  },
  {
    title: "Colorful Autumn",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores et perferendis eaque, exercitationem praesentium nihil.",
    tags: ["colorful", "weather", "beautiful"],
  },
];

export default async function Home() {
  await connectDB();
  return (
    <>
      <div className="flex flex-col py-4 gap-8">
        <div className="border-b pb-4 px-4 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <LocalLibraryIcon fontSize="large" />
            <h1 className="text-2xl">Ekagra Library</h1>
          </div>
          <Link href="/login" className="mr-2 text-xl cursor-pointer">
            Login
          </Link>
        </div>

        <div className="flex flex-col px-4 gap-4">
          <h2 className="text-2xl italic">What this app is all about??</h2>
          <p className="mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
            fugiat, quidem adipisci alias fuga pariatur numquam unde voluptatem
            molestiae eveniet maiores enim ab sapiente atque doloribus illum
            itaque? Enim, laudantium excepturi accusantium repellendus esse eius
            sunt quo explicabo?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, soluta? Aut delectus aspernatur totam cumque, et
            sequi quo alias in nostrum iusto. Beatae corrupti deserunt amet iure
            recusandae minima odit facere reprehenderit vero, aspernatur
            asperiores non ducimus fugit, consectetur, eos harum? Voluptatibus
            laborum possimus perferendis, quisquam ea sit quibusdam, adipisci
            dolore culpa voluptate assumenda aliquam! Ipsa, accusamus. Iure
            numquam a fugit laborum voluptatum quis temporibus quasi eveniet
            sapiente. Eveniet, sapiente!
          </p>
        </div>

        <div className="px-4 mt-4 flex flex-row justify-between">
          {cards.map((card, index) => {
            return (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                tags={card.tags}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
