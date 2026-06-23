import { motion, type Variants } from "framer-motion";



export default function Hero36() {
  // Nav bar: drops from top with blur
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -22, filter: 'blur(7px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 22, stiffness: 180, delay: 0.05 },
    },
  };

  // Title: container staggers children line-by-line
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.32 },
    },
  };

  // Each title line: rises from below with heavy blur
  const titleLineVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(16px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 30, stiffness: 82, mass: 1.25 },
    },
  };

  // Subtitle: fades up after both title lines settle
  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 26, stiffness: 110, delay: 0.92 },
    },
  };

  // CTA button: scale-in from slightly small after subtitle
  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 22, stiffness: 130, delay: 1.12 },
    },
  };

  // Background image: gentle fade + very subtle scale-down reveal
  // Reveals the meadow image as the content is building
  const bgVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0 },
    },
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden antialiased selection:bg-stone-300/50 selection:text-stone-900"
      style={{
        backgroundColor: '#faf9f7',
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none"
      >
        <img
          src="https://assets.watermelon.sh/bg-hero-36.avif"
          alt="Wildflower meadow with colorful flowers"
          className="h-full w-full object-cover object-bottom outline -outline-offset-1 outline-black/[0.06]"
        />
      </motion.div>
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* ── Navigation ────────────────────────────────────────────────────── */}
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="show"
          className="flex w-full items-center justify-between px-8 py-5 md:px-12 lg:px-16"
        >
          <span
            className="text-lg font-normal tracking-[0.14em] text-teal-900"
            style={{ fontFamily: 'sans-serif', letterSpacing: '0.06em' }}
          >
            WATERMELON
          </span>

          <div
            className="hidden items-center gap-8 md:flex"
            style={{ fontFamily: 'sans-serif' }}
          >
            {[
              'Bouquets',
              'Subscription',
              'About Us',
              'Features',
              'Contact',
            ].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="flex min-h-10 items-center text-sm font-normal text-stone-700 transition-colors duration-200 hover:text-stone-900"
              >
                {link}
              </a>
            ))}
          </div>

          <button
            className="flex min-h-10 items-center rounded-sm bg-teal-900 px-6 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_2px_rgba(255,255,255,0.10),inset_0_-1px_0_2px_rgba(0,0,0,0.12)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-teal-800 hover:shadow-[0_2px_4px_rgba(20,83,45,0.25),0_6px_18px_rgba(20,83,45,0.22)] active:scale-[0.96]"
            style={{ fontFamily: 'sans-serif' }}
          >
            Contacts
          </button>
        </motion.nav>

        <main className="flex flex-1 flex-col items-center justify-start px-6 pt-12 pb-8 text-center md:pt-16">
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate="show"
            className="max-w-5xl text-4xl leading-[1.07] font-extralight tracking-[-0.01em] text-balance text-teal-900 lg:text-[4.75rem] xl:text-[5.5rem] 2xl:text-[6rem]"
          >
            <motion.span
              variants={titleLineVariants}
              className="block will-change-transform"
            >
              Wildflower Inspired
            </motion.span>
            <motion.span
              variants={titleLineVariants}
              className="block will-change-transform"
            >
              Bouquet Studio
            </motion.span>
          </motion.h1>

          {/* Subtitle — sans-serif, muted stone, text-pretty prevents orphans */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="show"
            className="text-md mt-5 max-w-100 leading-[1.7] font-normal text-pretty text-teal-900/80 will-change-transform md:max-w-110"
            style={{ fontFamily: 'sans-serif' }}
          >
            Elegant bouquets for beautiful everyday moments, crafted to elevate
            your mood and style.
          </motion.p>
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="show"
            className="mt-8 will-change-transform"
          >
            <button
              className="text-md flex min-h-12 items-center rounded-sm bg-teal-900 px-10 py-3.5 font-medium tracking-[0.01em] text-white shadow-[inset_0_2px_0_2px_rgba(255,255,255,0.10),inset_0_-2px_0_2px_rgba(0,0,0,0.12)] transition-[transform,background-color,box-shadow] duration-150 ease-out text-shadow-2xs hover:bg-teal-800 hover:shadow-[0_2px_6px_rgba(20,83,45,0.22),0_8px_24px_rgba(20,83,45,0.28)] active:scale-[0.96]"
              style={{ fontFamily: 'sans-serif' }}
            >
              Order Now
            </button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
