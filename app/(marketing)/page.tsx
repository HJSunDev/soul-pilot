import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import Features from './_components/Features';

// 主页组件
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}
