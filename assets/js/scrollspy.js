// Resalta el link del nav (desktop + menú mobile) correspondiente a la
// sección que está actualmente visible en pantalla mientras se scrollea.

(function () {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Si esta página no tiene secciones con id (ej. productos.html) o no hay
  // links de este tipo en el nav, no hacemos nada.
  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("text-fg-brand", isActive);
      link.classList.toggle("text-heading", !isActive);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      // Reduce el "área de detección" a una franja angosta cerca de la
      // parte superior del viewport (justo debajo del nav fijo). Una sección
      // se considera "activa" cuando cruza esa franja, no con solo asomar
      // un pixel abajo o arriba.
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
})();
