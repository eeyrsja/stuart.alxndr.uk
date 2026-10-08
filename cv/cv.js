(() => {
  const links = [...document.querySelectorAll(".nav a")];
  const sections = links
    .map((a) => document.querySelector(a.hash))
    .filter(Boolean);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-18% 0px -70% 0px", threshold: 0 }
  );

  sections.forEach((section) => io.observe(section));

  const linkFor = (el) => {
    const section = el.closest(".section");
    return section
      ? links.find((link) => link.hash === `#${section.id}`) || null
      : null;
  };

  const clearHover = () =>
    links.forEach((link) => link.classList.remove("is-hover"));

  document.addEventListener("pointerover", (event) => {
    if (!(event.target instanceof Element)) return;
    clearHover();
    const link = linkFor(event.target);
    if (link) link.classList.add("is-hover");
  });

  document.addEventListener("pointerleave", clearHover);

  if (!CSS.supports("animation-timeline", "scroll()")) {
    const bar = document.querySelector(".progress");
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
