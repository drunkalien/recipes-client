import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";

type CardProps = {
  id: string;
  image: string;
  name: string;
};

export const Card = ({ image, name, id }: CardProps) => {
  return (
    <div className="border p-5 flex flex-col rounded border-black">
      <div className="flex flex-col items-center">
        <h3 className="font-bold text-3xl mb-3">{name}</h3>
        <div className="relative w-full h-72">
          <Image
            className="rounded object-cover"
            fill={true}
            src={image}
            alt={name}
          />
        </div>
      </div>
      <div className="w-full">
        <Link href={`/${id}`}>
          <Button className="w-full mt-3">Read more</Button>
        </Link>
      </div>
    </div>
  );
};
