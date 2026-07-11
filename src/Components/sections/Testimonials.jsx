import { FiStar } from 'react-icons/fi'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { testimonials } from '../../data/siteData'
import { Container } from '../ui/Container'
import { SectionTitle } from '../ui/SectionTitle'

export function Testimonials() {
  return (
    <section className="section-pad bg-white dark:bg-slate-950">
      <Container>
        <SectionTitle eyebrow="Client stories" title="Loved by detail-obsessed teams." text="Founders, marketers, designers, and operators use PrismPrint to make physical brand moments feel exceptional." />
        <Swiper
          className="premium-swiper mt-14"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name}>
              <article className="h-full rounded-[2rem] border border-slate-200 bg-white/80 p-7 shadow-[0_24px_90px_rgba(15,23,42,.08)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => <FiStar key={index} className="fill-current" />)}
                </div>
                <p className="mt-7 text-lg leading-8 text-slate-700 dark:text-slate-200">“{item.quote}”</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-extrabold text-white">
                    {item.avatar}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-950 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}
