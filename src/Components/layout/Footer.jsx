import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { footerLinks } from '../../data/siteData'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="text-3xl font-extrabold tracking-tight">PrismPrint</div>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
              Premium print, packaging, and brand production for teams who care about every finish, fold, and edge.
            </p>
            <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
              <input className="min-h-12 flex-1 rounded-full border border-white/10 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-blue-300" placeholder="Work email" type="email" />
              <Button variant="glow" type="submit">Subscribe</Button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold">{title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  {links.map((link) => (
                    <li key={link}>
                      <a className="transition hover:text-white" href="#home">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">© 2026 PrismPrint Studio. All rights reserved.</p>
          <div className="flex gap-3">
            {[FiInstagram, FiLinkedin, FiTwitter].map((Icon, index) => (
              <a key={index} href="#home" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:-translate-y-1 hover:bg-white hover:text-slate-950" aria-label="Social link">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
