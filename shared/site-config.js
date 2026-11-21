/*
 * The single source of truth for church-wide information.
 * Update these values instead of editing individual pages.
 */
window.CHURCH_SITE = {
  name: 'True Disciples of Christ Tabernacle',
  legalName: 'True Disciples of Christ Tabernacle Church',
  established: '2025',
  address: ['9 Avenue Colonel Mpia', 'Lolo La Crevette'],
  phone: '(+243) 815 797 188',
  email: 'info@terresacree.org',
  directionsUrl: 'https://maps.app.goo.gl/cRkYDUv4JWfB64ZM6',
  assets: {
    logo: '/photos/brand/Logo-removebg-preview.png',
    logoOriginal: '/photos/brand/Logo.jpg'
  }
};

(() => {
  const site = window.CHURCH_SITE;
  const text = (selector, value) =>
    document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });

  // Reusable footer, logo, and page-title content.
  text('.footer-column h4', site.name);
  text('.logo-text', site.name);
  text('[data-site="name"]', site.name);
  text('[data-site="legal-name"]', site.legalName);
  text('[data-site="address-line-1"]', site.address[0]);
  text('[data-site="address-line-2"]', site.address[1]);
  text('[data-site="phone"]', `Phone: ${site.phone}`);
  text('[data-site="email"]', `Email: ${site.email}`);
  text('[data-site="established"]', `EST. ${site.established}`);

  document.querySelectorAll('[data-site="directions"]').forEach((link) => {
    link.href = site.directionsUrl;
  });
  document.querySelectorAll('.logo a').forEach((link) => {
    link.setAttribute('aria-label', `${site.name} Home`);
  });
  document.querySelectorAll('.footer-bottom').forEach((element) => {
    element.textContent = `© ${site.established} ${site.name} – All rights reserved.`;
  });
})();
