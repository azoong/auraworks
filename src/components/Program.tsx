'use client';

import Image from 'next/image';
import LeftIcon from './icon/LeftIcon';
import RightIcon from './icon/RightIcon';
import { useState } from 'react';

export default function Program({ Images }: { Images: string[] }) {
  const ImagesUrls = Images;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + ImagesUrls.length) % ImagesUrls.length);
  };
  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % ImagesUrls.length);
  };
  return (
    <div className="relative h-[600px] bg-[#f7e8da] px-30 pt-20 pb-30">
      <div className="absolute inset-0 -top-[72px] h-full w-full px-30">
        <Image src={ImagesUrls[currentImageIndex]} alt="image" width={1200} height={600} className="h-full w-full" />
        <div className="absolute right-30 bottom-12 left-30 inline-flex items-end justify-center space-x-4 text-white">
          <button className="cursor-pointer transition-opacity hover:opacity-70" onClick={handlePrevClick}>
            <LeftIcon />
          </button>
          <p className="flex text-center font-serif text-xl font-bold">
            <span>{currentImageIndex + 1}</span> <span className="text-[#911A00]"> / {ImagesUrls.length}</span>
          </p>
          <button className="cursor-pointer transition-opacity hover:opacity-70" onClick={handleNextClick}>
            <RightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
