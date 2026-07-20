export function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Choose Product',
      description: 'Select the product you need from our wide range',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-800">
          {/* Box with arrow / package selector */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: '02',
      title: 'Upload / Design',
      description: 'Upload your design or use our design services',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-800">
          {/* Cloud upload to match screenshot */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
      )
    },
    {
      id: '03',
      title: 'Customize & Preview',
      description: 'Customize your product and preview your order',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-800">
          {/* Settings Sliders */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      )
    },
    {
      id: '04',
      title: 'Place Order',
      description: 'Secure payment and place your order',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-800">
          {/* Credit card */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    },
    {
      id: '05',
      title: 'We Print & Deliver',
      description: 'High quality printing and delivery at your doorstep',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-800">
          {/* Delivery Truck */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3.75h10.5a2.25 2.25 0 012.25 2.25v6.75M2.25 3.75v11.25c0 .621.504 1.125 1.125 1.125h9.75M2.25 15h12m0 0v-3.75m0 3.75h3.375a1.125 1.125 0 001.077-.803l1.83-5.32c.117-.34-.076-.707-.435-.707h-5.845V4.5a2.25 2.25 0 00-2.25-2.25h-5.25" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white font-sans overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section title */}
        <span className="text-[12px] font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
          How It Works
        </span>
        <h2 className="text-[26px] sm:text-[34px] font-black text-slate-800 tracking-tight mb-16">
          Simple Steps to Your Perfect Print
        </h2>

        {/* Steps container */}
        <div className="relative">
          {/* Dashed Connecting Line (rendered behind circles on desktop) */}
          <div className="absolute top-10 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#FAF0D7] -z-10 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6">
            {steps.map((st) => (
              <div key={st.id} className="flex flex-col items-center text-center px-4 group">
                
                {/* Circle Container Badge */}
                <div className="w-20 h-20 rounded-full bg-[#FAF5E6] hover:bg-[#F3E6C6] transition-colors duration-300 flex items-center justify-center border border-[#FAF0D7] mb-5 shadow-sm">
                  {st.icon}
                </div>
                
                {/* Step number */}
                <span className="text-sm font-extrabold text-[#E5AA17] mb-2 font-mono">
                  {st.id}
                </span>
                
                {/* Title */}
                <h3 className="text-[15px] sm:text-base font-black text-slate-800 mb-2">
                  {st.title}
                </h3>
                
                {/* Description */}
                <p className="text-[11.5px] sm:text-xs text-gray-500 font-medium leading-relaxed max-w-[190px]">
                  {st.description}
                </p>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
