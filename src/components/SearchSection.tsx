'use client';

import { MessageSquareText, Search, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Database } from '../../types_db';
import { useEffect, useState } from 'react';
import { getSearchReviews } from '@/actions/actions';
import { cn, formatDueDate } from '@/lib/utils';

type Review = Database['public']['Tables']['reviews']['Row'];

export default function SearchSection({ initialReviews }: { initialReviews: Review[] }) {
  const [searchInput, setSearchInput] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>(initialReviews);

  const slideCount = displayedReviews.length;

  const [emblaRef] = useEmblaCarousel(
    {
      loop: slideCount > 5,
      align: 'center',
      slidesToScroll: 1,
    },
    slideCount > 5 ? [Autoplay({ delay: 2500, stopOnInteraction: false })] : [],
  );

  useEffect(() => {
    if (searchInput.trim() === '') {
      setDisplayedReviews(initialReviews);
      return;
    }
    const timerId = setTimeout(async () => {
      try {
        const results = await getSearchReviews({ searchInput });
        setDisplayedReviews(results);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setDisplayedReviews([]);
      }
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchInput, initialReviews]);

  return (
    <>
      <div className="flex flex-col items-center justify-end gap-8 bg-[#F8F1EA] pt-[72px] pb-[100px]">
        <Image src="/quill1.png" alt="quill" width={100} height={100} className="mb-4 aspect-square" />
        <div className="flex w-[720px] flex-col items-center gap-5">
          <p className="font-pretendard self-stretch text-center text-[32px] leading-10 font-bold text-[#911A00]">
            오늘 찾아볼 희곡은 무엇인가요?
          </p>
          <div className="flex w-full border-b-[1.5px] border-solid border-[#D02D01] px-6 py-5">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="#로맨스 #고전주의 #신화 #비극"
              className="w-full text-lg text-[#B28B7A]"
            />
            <Search className="h-6 w-6" stroke="#D65856" />
          </div>
        </div>
      </div>
      <div className="relative z-0 flex flex-col bg-[#911A00] px-30 pt-20 pb-30">
        <div className="flex gap-6 self-stretch">
          <div className="flex flex-1 flex-col justify-end gap-2.5">
            <p className="font-serif text-3xl leading-9 font-bold text-white">지금 뜨는 메모</p>
            <p className="text-lg leading-6 font-light text-white">다른 유저가 남기고 간 메모를 발견해보세요</p>
          </div>
          <h2 className="font-serif text-[80px] leading-[130%] font-bold text-[#CC4B2F]">Memo</h2>
        </div>
      </div>

      <div className="bg-[#F8F1EA]">
        <div className="relative z-10 -mt-24 h-96 pt-10">
          {/* 슬라이드 부분 */}
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className={cn('flex h-full', slideCount <= 5 && 'justify-center')}>
              {displayedReviews.map((review) => (
                <div className="relative ml-5 flex-[0_0_24rem]" key={review.review_id}>
                  <div className="flex h-full w-full flex-col justify-end bg-white p-6">
                    <div className="flex flex-1 flex-col items-start justify-between self-stretch">
                      <div className="flex flex-col items-start gap-2 self-stretch">
                        <div className="flex items-center gap-5 py-2">
                          <p className="font-medium text-[#555]">{review.username}</p>
                          <p className="text-[#A0A0A0]">{formatDueDate(review.created_at)}</p>
                        </div>
                        <p className="line-clamp-5 text-base font-normal text-[#555]">{review.content}</p>
                      </div>
                      <div className="flex h-9 items-end justify-between self-stretch">
                        <div className="flex gap-5 text-[#6D6D6D]">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-6 w-6" /> {review.likes_count}
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquareText className="h-6 w-6" /> {review.comments_count}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="font-medium text-[#6D6D6D]">{review.author}</p>
                          <p className="font-semibold text-[#911A00]">『{review.title}』</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 지금 뜨는 메모 섹션 */}

      <div className="flex h-80 flex-col bg-[#F8F1EA] px-30 pt-20 pb-30">
        <div className="flex flex-1 gap-6">
          <div className="flex flex-1 flex-col items-start justify-center gap-2.5">
            <p className="font-serif text-3xl leading-9 font-bold text-[#911A00]">지금 신청할 수 잇는 프로그램</p>
            <p className="text-lg leading-6 font-medium">인스크립트 프로그램에 참여하세요</p>
          </div>
          <h2 className="text-[80px] text-[#F4E4D6]">Programme</h2>
        </div>
      </div>
    </>
  );
}
