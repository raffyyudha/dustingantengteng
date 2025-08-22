const fs = require('fs');
const path = require('path');
const brands = require('../src/public/brands.json');

const buildBrandsSection = async ($) => {
  const brandsContainer = $('[data-brands-carousel]');
  const allTracks = brandsContainer.find('.brands__track');
  // Use only the first track to avoid duplicated lists
  const brandsTrack = allTracks.first();
  // Remove any additional tracks from the DOM
  allTracks.slice(1).remove();

  // clear the single track
  brandsTrack.empty();

  const brandItems = brands.map((brand) => {
    const brandSlug = brand.slug;
    const brandName = brand.name.toUpperCase();
    const brandUrl = brand.link || '#';

    // Check for files in both assets and public folders for maximum compatibility
    const assetsSvgPath = path.join(__dirname, '..', 'src', 'assets', 'brands', `${brandSlug}.svg`);
    const assetsPngPath = path.join(__dirname, '..', 'src', 'assets', 'brands', `${brandSlug}.png`);
    const publicSvgPath = path.join(__dirname, '..', 'src', 'public', 'brands', `${brandSlug}.svg`);
    const publicPngPath = path.join(__dirname, '..', 'src', 'public', 'brands', `${brandSlug}.png`);

    let logoSrc = '';
    // Prefer SVG over PNG, and assets over public for Vite bundling
    if (fs.existsSync(assetsSvgPath)) {
      logoSrc = `/src/assets/brands/${brandSlug}.svg`;
    } else if (fs.existsSync(assetsPngPath)) {
      logoSrc = `/src/assets/brands/${brandSlug}.png`;
    } else if (fs.existsSync(publicSvgPath)) {
      logoSrc = `/brands/${brandSlug}.svg`;
    } else if (fs.existsSync(publicPngPath)) {
      logoSrc = `/brands/${brandSlug}.png`;
    }

    const brandItem = `
    <a class="brands__item" href="${brandUrl}" target="_blank" rel="noopener noreferrer" aria-label="${brandName}">
      <div class="brands__logo">
        <img src="${logoSrc}" alt="${brandName} logo" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block'">
        <span class="brands__fallback">${brandName}</span>
      </div>
      <div class="brands__name">${brandName}</div>
    </a>
  `;
    return brandItem;
  });

  const trackContent = brandItems.join('\n\n');
  brandsTrack.append(trackContent);
};

module.exports = { buildBrandsSection };
