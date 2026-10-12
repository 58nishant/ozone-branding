import { ArrowDownRight, ArrowUpRight, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import LeadForm from "./components/LeadForm";

const services = [
  {
    number: "01",
    title: "PAID ADVERTISING",
    description:
      "Reach the right property buyers through strategic, performance-focused campaigns.",
  },
  {
    number: "02",
    title: "CREATIVE STRATEGY",
    description:
      "Turn your property's strongest selling points into compelling marketing creative.",
  },
  {
    number: "03",
    title: "LANDING PAGES",
    description:
      "Create focused digital experiences designed to turn interest into enquiries.",
  },
  {
    number: "04",
    title: "LEAD OPTIMIZATION",
    description:
      "Understand campaign performance and continuously improve lead quality.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="min-h-screen bg-[#F1EFE8] text-[#242424]">
      <nav className="flex items-center justify-between border-b border-black/10 px-6 py-5 md:px-12">
        <a href="#" className="text-xl font-black tracking-tight">
          OZONE<span className="text-[#77766A]">.</span>
          <span className="ml-1 text-sm font-medium tracking-[0.15em]">
            BRANDING
          </span>
        </a>

        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-wider md:flex">
          <a href="#services" className="hover:opacity-60">
            Services
          </a>
          <a href="#approach" className="hover:opacity-60">
            Our approach
          </a>
          <a
            href="#contact"
            className="bg-[#D5FF66] px-5 py-3 transition hover:bg-black hover:text-white"
          >
            Let's talk ↗
          </a>
        </div>

        <button
          aria-label="Open navigation"
          className="md:hidden"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-b border-black/10 bg-[#F1EFE8] px-6 py-5 md:hidden">
          {[
            { label: "Services", href: "#services" },
            { label: "Our approach", href: "#approach" },
            { label: "Let's talk", href: "#contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-black/10 py-4 text-sm font-semibold uppercase tracking-wider last:border-0"
            >
              {item.label} ↗
            </a>
          ))}
        </div>
      )}

      <section className="grid min-h-[650px] md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24">
          <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
            <span className="h-2 w-2 rounded-full bg-[#91B833]" />
            REAL ESTATE GROWTH & MARKETING
          </p>

          <h1 className="max-w-xl text-6xl font-black leading-[0.91] tracking-[-0.055em] sm:text-7xl lg:text-[clamp(4rem,6vw,6.5rem)]">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl text-6xl font-black leading-[0.91] tracking-[-0.055em] sm:text-7xl lg:text-[clamp(4rem,6vw,6.5rem)]"
            >
              MORE
              <br />
              QUALIFIED
              <br />
              PROPERTY
              <br />
              <span className="text-[#77766A]">ENQUIRIES.</span>
            </motion.h1>
          </h1>

          <p className="mt-8 max-w-md text-base leading-7 text-[#64635D]">
            Strategic campaigns, compelling creative and conversion-focused
            digital experiences built for real estate businesses ready to grow.
          </p>

          <div className="mt-9">
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              whileHover={{ y: -3 }}
              className="inline-flex items-center gap-8 bg-[#D5FF66] px-6 py-4 text-sm font-bold transition hover:bg-black hover:text-white"
            >
              DISCUSS YOUR PROJECT
              <ArrowUpRight size={18} />
            </motion.a>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.15em] text-[#77766A]">
            BUILT AROUND STRATEGY. FOCUSED ON CONVERSION.
          </p>
        </div>

        <div className="relative min-h-[420px] overflow-hidden bg-[#D8D4CB] md:min-h-full">
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
            alt="Contemporary luxury residential architecture"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white md:bottom-10 md:left-10 md:right-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em]">
                PROPERTY MEETS POSSIBILITY
              </p>
              <p className="mt-2 text-sm text-white/80">
                Marketing with a clearer direction.
              </p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60">
              <ArrowDownRight size={22} />
            </span>
          </div>
        </div>
      </section>

      <section className="bg-[#242424] px-6 py-12 text-[#F1EFE8] md:px-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5FF66]">
            NOT JUST MORE TRAFFIC.
          </p>
          <h2 className="text-2xl font-bold leading-tight md:text-3xl">
            Better targeting.
            <br />
            Better creative.
            <br />
            Better opportunities.
          </h2>
          <p className="max-w-sm text-sm leading-7 text-white/60 md:justify-self-end">
            Every campaign should have a purpose. We bring strategy, creative
            and conversion together to help property businesses move forward.
          </p>
        </div>
      </section>

      <section id="services" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#77766A]">
              WHAT WE DO
            </p>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">
              BUILT TO MOVE
              <br />
              <span className="text-[#77766A]">BUSINESS FORWARD.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#64635D]">
            A considered approach to real estate marketing, from the first
            impression to the enquiry that follows.
          </p>
        </div>

        <div className="border-t border-black/15">
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group grid gap-4 border-b border-black/15 py-8 transition md:grid-cols-[80px_1fr_1fr_32px] md:items-center"
            >
              <span className="text-sm text-[#77766A]">{service.number}</span>

              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                {service.title}
              </h3>

              <p className="max-w-md text-sm leading-6 text-[#64635D]">
                {service.description}
              </p>

              <ArrowUpRight
                size={22}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </motion.article>
          ))}
        </div>
      </section>

      <section
        id="approach"
        className="bg-[#D8D4CB] px-6 py-24 md:px-12 md:py-28"
      >
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#64635D]">
          OUR APPROACH
        </p>
        <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          ATTENTION ISN'T THE SAME AS INTENT.
        </h2>
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#64635D]">
          Property marketing is about more than being seen. The right message
          must reach the right audience, communicate real value and make the
          next step clear.
        </p>

        <div className="mt-16 grid gap-10 border-t border-black/15 pt-8 sm:grid-cols-3">
          {[
            [
              "01",
              "UNDERSTAND",
              "Get clear on your property, audience and goals.",
            ],
            ["02", "LAUNCH", "Bring strategy and creative into the market."],
            [
              "03",
              "OPTIMIZE",
              "Learn from performance and refine the approach.",
            ],
          ].map(([number, title, description]) => (
            <div key={number}>
              <span className="text-sm text-[#77766A]">{number}</span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#64635D]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#D5FF66] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em]">
              HAVE A PROPERTY PROJECT?
            </p>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              LET'S MAKE
              <br />
              IT COUNT.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-black/70">
              Tell us a little about your business and what you want to achieve.
              Let's explore the right direction for your next campaign.
            </p>
          </div>
<LeadForm />
          {/* <form
            className="bg-[#242424] p-6 text-white sm:p-9"
            onSubmit={(event) => {
              event.preventDefault();
              alert(
                "The form design is ready. Database integration is our next step.",
              );
            }}
          >
            <label
              htmlFor="name"
              className="mb-2 block text-xs uppercase tracking-wider text-white/70"
            >
              Your name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Full name"
              className="mb-6 w-full border-b border-white/25 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-white/40 focus:border-[#D5FF66]"
            />

            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-wider text-white/70"
            >
              Business email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="mb-6 w-full border-b border-white/25 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-white/40 focus:border-[#D5FF66]"
            />

            <label
              htmlFor="company"
              className="mb-2 block text-xs uppercase tracking-wider text-white/70"
            >
              Company or project
            </label>
            <input
              id="company"
              name="company"
              required
              placeholder="Your company name"
              className="mb-8 w-full border-b border-white/25 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-white/40 focus:border-[#D5FF66]"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-between bg-[#D5FF66] px-5 py-4 text-sm font-bold text-[#242424] transition hover:bg-white"
            >
              START A CONVERSATION
              <ArrowUpRight size={19} />
            </button>
            <p className="mt-4 text-xs leading-5 text-white/45">
              This demo form does not send or store your information yet.
            </p>
          </form> */}
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-5 bg-[#242424] px-6 py-8 text-[#F1EFE8] sm:flex-row sm:items-center md:px-12">
        <a href="#" className="text-lg font-black tracking-tight">
          OZONE<span className="text-[#D5FF66]">.</span> BRANDING
        </a>
        <p className="text-xs text-white/50">
          STRATEGY. CREATIVE. PROPERTY GROWTH.
        </p>
        <a
          href="#contact"
          className="text-xs uppercase tracking-wider hover:text-[#D5FF66]"
        >
          Start a project ↗
        </a>
      </footer>
    </main>
  );
}

export default App;
