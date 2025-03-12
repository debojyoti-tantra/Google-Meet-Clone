import Image from "next/image";
import MainPageLeftPart from '@/components/MainPageLeftPart';
import MainPageRightPart from '@/components/MainPageRightPart';

export default function Home() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 p-5 gap-5 min-h-[90vh]">
      <MainPageLeftPart />
      <MainPageRightPart />
    </main>
  );
}
