import { useState } from "react";
import Image from "next/image";

import Image1 from "@/public/image1.webp";
import Image2 from "@/public/image2.webp";
import Image3 from "@/public/image3.webp";
import Image4 from "@/public/image4.webp";
import Image5 from "@/public/image5.webp";
import Image6 from "@/public/image6.webp";
import Image7 from "@/public/image7.webp";
import Image8 from "@/public/image8.webp";
import Image9 from "@/public/image9.webp";
import Image10 from "@/public/image10.webp";
import Image11 from "@/public/image11.webp";
import Design from "@/public/design.svg";

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
];

const challenges = [
  "Sculpt Challenge",
  "Runway Challenge",
  "Juicy Challenge",
  "Burn Challenge",
  "ForeverFit Challenge",
  "Fuego Challenge",
];

interface CardProps {
  plan: string;
  price: string;
  onClick: () => void;
  isSelected: boolean;
  minimized?: boolean;
}

const Card: React.FC<CardProps> = ({
  plan,
  price,
  onClick,
  isSelected,
  minimized = false,
}) => (
  <div
    className={`relative bg-primary pb-4 pt-5 rounded-3xl border-2 cursor-pointer ${
      isSelected ? "border-lightgreen" : "border-lightgreen"
    } hover:border-2 hover:border-lightgreen`}
    onClick={onClick}
  >
    {!minimized ? (
      <>
        <div>
          <div className="flex items-center justify-between px-6">
            <p className="text-sm font-semibold text-black">
              <span className="font-medium text-lightgreen">{plan}</span> Billed
              at {price} USD/yr
            </p>
            <div className="relative">
              <input
                type="checkbox"
                className="h-7 w-7 appearance-none rounded-md border border-gray checked:bg-lightgreen"
                checked={isSelected}
                onChange={onClick}
              />
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-[-7px] top-[-5px] m-2 h-6 w-6 text-white"
                >
                  <path d="M6 10l2 2 6-6"></path>
                </svg>
              )}
            </div>
          </div>
          <p className="px-6 text-xl font-bold leading-[32px] text-black">
            ${price} <span className=""> USD </span>{" "}
            <span className="-ml-1"> /mo </span>
          </p>
          <p className="text-dark-brown mb-3 mt-[5px] px-6 text-xs font-bold">
            All programs included in your subscription
          </p>
          <div className="no-scrollbar mb-5 flex items-center gap-1 overflow-scroll px-6">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative h-20 w-20 flex-shrink-0 rounded-2xl"
              >
                <Image
                  alt={`img${index}`}
                  className="h-full w-full rounded-[10px] object-cover"
                  src={img}
                  layout="fill"
                  objectFit="cover"
                />
                {index >= 5 && (
                  <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                    {challenges[index - 5]}
                  </p>
                )}
                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
              </div>
            ))}
          </div>
          <div className="my-2 px-6">
            <div className="flex items-center gap-2 mb-2">
              <Image src={Design} alt="Design Icon" layout="fixed" />
              <p className="text-darkbrown text-sm font-semibold">
                Access To All Trainers Programs
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Image src={Design} alt="Design Icon" layout="fixed" />
              <p className="text-darkbrown text-sm font-semibold">
                Log Or Scan Your Branded Foods
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Image src={Design} alt="Design Icon" layout="fixed" />
              <p className="text-darkbrown text-sm font-semibold">
                Comprehensive Period Tracking
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image src={Design} alt="Design Icon" layout="fixed" />
              <p className="text-darkbrown text-sm font-semibold">
                Access To Our Grounds Community
              </p>
            </div>
          </div>
        </div>
      </>
    ) : (
      <p className="text-base font-semibold mx-5 text-black">
        <span className="font-medium text-lightgreen">{plan}</span>
        <br />
        <span>Billed at {price} USD/yr</span>
      </p>
    )}
  </div>
);

const CheckoutCards: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);

  const handleCardClick = (card: number) => {
    setSelectedCard(card);
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="absolute left-[31%] top-12 z-20 flex h-6 items-center justify-center rounded-[6px] bg-lightgreen px-2 shadow-md ">
        <p className="text-[8px] font-bold tracking-[1px] text-primary">
          BEST VALUE • 60% OFF
        </p>
      </div>
      <Card
        plan="Annual"
        price="99.99"
        onClick={() => handleCardClick(1)}
        isSelected={selectedCard === 1}
        minimized={selectedCard === 2}
      />
      <Card
        plan="Monthly"
        price="19.99"
        onClick={() => handleCardClick(2)}
        isSelected={selectedCard === 2}
        minimized={selectedCard === 1}
      />
    </div>
  );
};

export default CheckoutCards;
