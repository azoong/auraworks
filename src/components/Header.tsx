import { Bell, Mail, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex h-20 items-center justify-between px-10">
      <Image src="/inscript2025_newlogotype.png" alt="Logo" width={160} height={35} />

      <nav className="flex h-3 max-w-8/12 items-center justify-center">
        <ul className="flex items-center space-x-10 text-[#6D6D6D]">
          <li>
            <Link href="#">희곡 DB</Link>
          </li>
          <li>
            <Link href="#">작가 DB</Link>
          </li>
          <li>
            <Link href="#">멤버십</Link>
          </li>
          <li>
            <Link href="#">프로그램</Link>
          </li>
          <li>
            <Link href="#">커뮤니티</Link>
          </li>
          <li>
            <Link href="#">인스크립트</Link>
          </li>
          <li>
            <Link href="#">문의</Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-4">
        <button className="relative">
          <Bell className="h-5 w-5" />
          <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-[#911A00]" />
        </button>
        <button className="relative">
          <Mail className="h-5 w-5" />
          <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-[#911A00]" />
        </button>
        <button>
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
