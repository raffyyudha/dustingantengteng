const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const https = require("https");
const cheerio = require("cheerio");
const { buildProjectsSection } = require("./build-projects.cjs");
const { buildBrandsSection } = require("./build-brands.cjs");
const brands = require("../src/public/brands.json");

// --- Start of fetch-logos logic ---
// Copy logos to both src/public/brands (for dev) and public/brands (for build)
const OUT_DIR = path.join(__dirname, '../src/public/brands');
const ROOT_OUT_DIR = path.join(__dirname, '../public/brands');

function toCandidates(brand) {
  const name = brand.name || '';
  const slug = brand.slug || '';
  const cleanedName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const cleanedSlug = slug.toLowerCase();
  const variants = new Set([
    cleanedSlug,
    cleanedSlug.replace(/_/g, '-'),
    cleanedSlug.replace(/-/g, ''),
    cleanedName,
    cleanedName.replace(/-/g, ''),
  ]);
  return Array.from(variants).filter(Boolean);
}

function fetchSvg(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        if (statusCode && statusCode >= 300 && statusCode < 400 && res.headers.location) {
          return resolve(fetchSvg(res.headers.location));
        }
        if (statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${statusCode}`));
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    await fsp.mkdir(dir, { recursive: true });
  }
}

async function copyFile(src, dest) {
  try {
    await fsp.copyFile(src, dest);
  } catch (err) {
    // Ignore if source doesn't exist
  }
}

async function fetchLogos() {
  console.log('Checking for missing brand logos...');
  await ensureDir(OUT_DIR);
  await ensureDir(ROOT_OUT_DIR);
  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const brand of brands) {
    const outSvg = path.join(OUT_DIR, `${brand.slug}.svg`);
    const outPng = path.join(OUT_DIR, `${brand.slug}.png`);
    const rootSvg = path.join(ROOT_OUT_DIR, `${brand.slug}.svg`);
    const rootPng = path.join(ROOT_OUT_DIR, `${brand.slug}.png`);

    // Copy existing files from src/public to public if they exist
    if (fs.existsSync(outSvg) && !fs.existsSync(rootSvg)) {
      await copyFile(outSvg, rootSvg);
    }
    if (fs.existsSync(outPng) && !fs.existsSync(rootPng)) {
      await copyFile(outPng, rootPng);
    }

    // If either SVG or PNG already exists in both locations, skip downloading
    if ((fs.existsSync(outSvg) || fs.existsSync(outPng)) && (fs.existsSync(rootSvg) || fs.existsSync(rootPng))) {
      skipped++;
      continue;
    }

    const candidates = toCandidates(brand);
    let downloaded = false;
    for (const cand of candidates) {
      const url = `https://cdn.simpleicons.org/${cand}`;
      try {
        const svg = await fetchSvg(url);
        if (svg && svg.includes('<svg')) {
          await fsp.writeFile(outSvg, svg, 'utf8');
          await fsp.writeFile(rootSvg, svg, 'utf8');
          console.log(`  ✓ Downloaded: ${brand.name}`);
          success++;
          downloaded = true;
          break;
        }
      } catch (err) {
        // ignore and try next candidate
      }
    }
    if (!downloaded) {
      // Only warn if the file truly doesn't exist in either location
      if (!(fs.existsSync(outSvg) || fs.existsSync(outPng) || fs.existsSync(rootSvg) || fs.existsSync(rootPng))) {
        failed++;
        console.warn(`  ⚠ Could not find logo for: ${brand.name}`);
      } else {
        skipped++;
      }
    }
  }
  
  // Final sync: ensure all files exist in both locations
  console.log('Syncing brand logos between directories...');
  for (const brand of brands) {
    const outSvg = path.join(OUT_DIR, `${brand.slug}.svg`);
    const outPng = path.join(OUT_DIR, `${brand.slug}.png`);
    const rootSvg = path.join(ROOT_OUT_DIR, `${brand.slug}.svg`);
    const rootPng = path.join(ROOT_OUT_DIR, `${brand.slug}.png`);
    
    // Copy from src/public to public
    if (fs.existsSync(outSvg) && !fs.existsSync(rootSvg)) {
      await copyFile(outSvg, rootSvg);
    }
    if (fs.existsSync(outPng) && !fs.existsSync(rootPng)) {
      await copyFile(outPng, rootPng);
    }
    
    // Copy from public to src/public (in case files were manually added to public)
    if (fs.existsSync(rootSvg) && !fs.existsSync(outSvg)) {
      await copyFile(rootSvg, outSvg);
    }
    if (fs.existsSync(rootPng) && !fs.existsSync(outPng)) {
      await copyFile(rootPng, outPng);
    }
  }
  if (success > 0 || failed > 0) {
    console.log(`Logo check complete. Downloaded: ${success}, Skipped: ${skipped}, Failed: ${failed}.`);
  }
}
// --- End of fetch-logos logic ---

const buildHtml = async () => {
  await fetchLogos();

  const template = await fsp.readFile("./src/index.html", "utf8");
  const templateCheerio = cheerio.load(template);

  await buildProjectsSection(templateCheerio);
  await buildBrandsSection(templateCheerio);

  return templateCheerio;
};

// call the build function
buildHtml()
  .then(($) => {
    // write the html to the src folder
    fsp.writeFile("./src/index.html", $.html());
  })
  .catch((err) => {
    console.log(err);
  });
