'use client';

import Image from 'next/image';
import LeftIcon from './icon/LeftIcon';
import RightIcon from './icon/RightIcon';
import { useState } from 'react';

export default function Hero({ Images }: { Images: string[] }) {
  const ImagesUrls = Images;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + ImagesUrls.length) % ImagesUrls.length);
  };
  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % ImagesUrls.length);
  };
  return (
    <div className="relative h-96 w-full overflow-hidden">
      <Image
        src={ImagesUrls[currentImageIndex]}
        alt="Logo"
        width={1200}
        height={600}
        className="h-full w-full"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-x-0 bottom-25 z-10 flex flex-col items-center space-y-3 text-white">
        <h1 className="font-parisienne text-6xl text-white xl:text-8xl">Playscripts, Playwrights - and Us</h1>
        <p className="mt-5 text-xl text-[#868686] xl:text-3xl">
          Archiving playscripts, shaping a new theatre community
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center space-x-4 pb-10 text-white">
        <button className="cursor-pointer transition-opacity hover:opacity-70" onClick={handlePrevClick}>
          <LeftIcon />
        </button>
        <p className="text-center font-serif text-xl font-bold">
          <span>{currentImageIndex + 1}</span>
          <span className="text-[#911A00]"> / {ImagesUrls.length}</span>
        </p>
        <button className="cursor-pointer transition-opacity hover:opacity-70" onClick={handleNextClick}>
          <RightIcon />
        </button>
      </div>
    </div>
  );
}
