import Image from 'next/image';

// Hero 部分组件
const Hero = () => {
  return (
    <div className="relative isolate min-h-screen flex items-center">
      {/* 背景装饰 */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#ff80b5] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:items-center">
          {/* 左侧文本内容 */}
          <div className="relative z-10">
            <div className="relative">
              <div className="absolute -top-4 -left-8 w-20 h-20 bg-indigo-100 rounded-full blur-2xl opacity-40"></div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                探索心灵的
                <span className="relative">
                  <span className="relative z-10">航行指南</span>
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-indigo-200/60 -rotate-1"></div>
                </span>
              </h1>
            </div>
            <p className="mt-8 text-lg leading-8 text-gray-600 sm:text-xl">
              Soul Pilot 是您的心灵导航仪，帮助您在人生的旅途中找到方向。通过科学的方法和个性化的指导，让每一个人都能找到属于自己的成长道路。
            </p>
            <div className="mt-10 flex items-center gap-x-8">
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="relative z-10">开始探索</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-80"></div>
              </a>
              <a 
                href="#" 
                className="group text-base font-semibold leading-7 text-gray-900 flex items-center gap-x-2 transition-all duration-300 hover:gap-x-3"
              >
                了解更多
                <span aria-hidden="true" className="text-indigo-600 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* 右侧装饰 */}
          <div className="mt-16 lg:mt-0 relative">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply blur-2xl opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-pink-50 rounded-full mix-blend-multiply blur-2xl opacity-70"></div>
              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-indigo-50 to-white p-8 shadow-2xl ring-1 ring-gray-900/10">
                  <div className="absolute inset-0 bg-grid-slate-100/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] rounded-2xl"></div>
                  <div className="h-full w-full rounded-xl bg-gradient-to-br from-indigo-100/40 to-white/80 p-6 flex flex-col justify-between backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                      <div className="h-3 w-20 rounded-full bg-indigo-100"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 w-3/4 rounded-full bg-indigo-100/70"></div>
                      <div className="h-4 w-1/2 rounded-full bg-indigo-100/50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 