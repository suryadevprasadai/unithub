import { SitemapStream, streamToPromise } from "sitemap";
import { writeFileSync } from "fs";

const sitemap = new SitemapStream({
  hostname: "https://www.unithub.in",
});

const pages = [
  "/",
  "/products",
  "/companies",
  "/about",
  "/contact",
  "/login",
  "/company-register",
];

async function generate() {
  for (const page of pages) {
    sitemap.write({ url: page });
  }

  sitemap.end();

  const xml = await streamToPromise(sitemap).then(data =>
    data.toString()
  );

  writeFileSync("./public/sitemap.xml", xml);

  console.log("✅ Sitemap generated successfully!");
}

generate();