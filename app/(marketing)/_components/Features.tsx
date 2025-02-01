// 特性展示组件
const Features = () => {
  const features = [
    {
      title: '个性化指导',
      description: '基于您的个人特点和需求，提供量身定制的成长建议和发展路径。',
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: '科学方法论',
      description: '采用心理学和行为科学的前沿研究成果，确保每一步建议都有科学依据。',
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-sky-500',
    },
    {
      title: '持续追踪',
      description: '通过数据分析和定期反馈，帮助您了解成长进度，及时调整发展方向。',
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      gradient: 'from-sky-500 to-emerald-500',
    },
  ];

  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-indigo-600">更快成长</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            一切你需要的成长助手
          </p>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Soul Pilot 集成了多种先进工具和方法，助您在人生道路上披荆斩棘，实现自我提升。
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-[0.07] group-hover:opacity-[0.1] transition-opacity duration-300`} />
                  </div>

                  <div className="p-6">
                    {/* 图标 */}
                    <div className="mb-4">
                      <div className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} p-2.5 text-white shadow-md`}>
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