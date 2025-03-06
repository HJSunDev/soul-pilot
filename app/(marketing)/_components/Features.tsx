// 特性展示组件
const Features = () => {
  const features = [
    {
      title: '灵魂导航',
      description: '根据您的三观与当前场景，提供个性化的心理分析和行动建议，帮助您在人生道路上做出更符合自我的选择。',
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: '情绪档案',
      description: '记录和分析您的情绪变化，帮助您识别情绪模式，找到心理根源，突破心理障碍，实现情绪的健康管理。',
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-sky-500',
    },
    {
      title: '人格建模',
      description: '通过日记记录和AI分析，构建您的性格特征三维模型，帮助您更深入地了解自己，发现潜在的成长空间。',
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      gradient: 'from-sky-500 to-emerald-500',
    },
  ];

  return (
    <div id="features" className="relative h-screen flex items-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-indigo-600">个人成长助手</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            探索自我，引领成长
          </p>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Soul Pilot 融合AI技术与心理学理论，为您提供全方位的个人成长解决方案。
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-16 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-8 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="relative group hover:scale-[1.02] transition-transform duration-300"
              >
                {/* 特性卡片 */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-900/5">
                  {/* 渐变背景 */}
                  <div className="absolute inset-0 -z-10">
                    <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-[0.07] group-hover:opacity-[0.1] transition-opacity duration-300`} />
                  </div>

                  <div className="p-6">
                    {/* 图标 */}
                    <div className="mb-4">
                      <div className={`inline-flex items-center justify-center rounded-lg bg-linear-to-br ${feature.gradient} p-2.5 text-white shadow-md`}>
                        {feature.icon}
                      </div>
                    </div>

                    {/* 标题和描述 */}
                    <dt className="text-lg font-semibold leading-7 text-gray-900 mb-2">
                      {feature.title}
                    </dt>
                    <dd className="text-sm leading-6 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features; 