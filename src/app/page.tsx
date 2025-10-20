import { getHero, getProgramImages, getSearchReviews } from '@/actions/actions';
import Hero from '@/components/Hero';
import Layer1 from '@/components/icon/layer1';
import Program from '@/components/Program';

import SearchSection from '@/components/SearchSection';

export default async function HomePage() {
  const heroImages = await getHero();
  const programImages = await getProgramImages();
  const initialReviews = await getSearchReviews({});
  return (
    <main className="bg-[#F8F1EA]">
      <Hero Images={heroImages} />
      {/* 마키 부분 */}
      <div className="h-10 w-full overflow-hidden bg-[#911A00] whitespace-nowrap">
        <div className="flex h-full animate-[marquee_30s_linear_infinite] items-center space-x-4">
          <div className="text-[#D65856]">
            <Layer1 />
          </div>
          <p className="flex items-center !font-serif text-3xl font-semibold text-[#D65856]">
            A home for words and scripts. Spoken & Written, Together
          </p>
          <div className="text-[#D65856]">
            <Layer1 />
          </div>
          <p className="flex items-center !font-serif text-3xl font-semibold text-[#D65856]">
            A home for words and scripts. Spoken & Written, Together
          </p>
          <div className="text-[#D65856]">
            <Layer1 />
          </div>
          <p className="flex items-center !font-serif text-3xl font-semibold text-[#D65856]">
            A home for words and scripts. Spoken & Written, Together
          </p>
        </div>
      </div>
      {/* 검색 섹션 */}
      <SearchSection initialReviews={initialReviews} />

      {/* 하단 프로그램 섹션 */}
      <Program Images={programImages} />
    </main>
  );
}
