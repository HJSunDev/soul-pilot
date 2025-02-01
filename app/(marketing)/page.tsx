import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import Features from './_components/Features';

// 主页组件
export default function Home() {
  return (
    <main className="relative snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
      <Navbar />
      <section className="snap-start">
        <Hero />
      </section>
      <section className="snap-start">
        <Features />
      </section>
    </main>
  );
}
