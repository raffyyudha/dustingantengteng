const fs = require("fs/promises");
const cheerio = require("cheerio");
const { buildProjectsSection } = require("./build-projects.cjs");

const buildHtml = async () => {
  const template = await fs.readFile("./src/index.html", "utf8");
  const templateCheerio = cheerio.load(template);

  await buildProjectsSection(templateCheerio);

  return templateCheerio;
};

// call the build function
buildHtml()
  .then(($) => {
    // write the html to the src folder
    fs.writeFile("./src/index.html", $.html());
  })
  .catch((err) => {
    console.log(err);
  });
