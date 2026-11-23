document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.hero-nav');
  if (!nav) return;

  const surfaces = [...document.querySelectorAll('header, main, section, footer')];

  const parseColor = (value) => {
    const matches = value.match(/[\d.]+/g);
    if (!matches || matches.length < 3) return null;
    return {
      red: Number(matches[0]),
      green: Number(matches[1]),
      blue: Number(matches[2]),
      alpha: matches[3] === undefined ? 1 : Number(matches[3]),
    };
  };

  const isLightColor = (element) => {
    let current = element;
    while (current && current !== document.documentElement) {
      const color = parseColor(getComputedStyle(current).backgroundColor);
      if (color && color.alpha > 0) {
        const luminance = (0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue) / 255;
        return luminance > 0.62;
      }
      current = current.parentElement;
    }
    return true;
  };

  const updateNavigationSurface = () => {
    const rect = nav.getBoundingClientRect();
    const navCenter = rect.top + rect.height / 2;
    const surface = surfaces.filter((element) => {
      const surfaceRect = element.getBoundingClientRect();
      return navCenter >= surfaceRect.top && navCenter <= surfaceRect.bottom;
    }).at(-1);

    // Hero imagery and the footer are intentionally treated as dark surfaces.
    const isLightSurface = surface && !surface.matches('header, footer') && isLightColor(surface);
    nav.classList.toggle('is-on-light-surface', Boolean(isLightSurface));
    nav.classList.remove('dark', 'light');
  };

  let frame;
  const requestUpdate = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateNavigationSurface);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  requestUpdate();
});
