// require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const FOLDER = "Vision Photos"; // your Cloudinary folder

async function listImages() {
  try {
    const res = await cloudinary.search
      .expression(`folder="${FOLDER}"`)
      .max_results(100)
      .execute();

    const urls = res.resources.map(r =>
      r.secure_url.replace("/upload/", "/upload/q_auto,f_auto,w_800/")
    );

    // Save inside client/src/gallery.json
    const targetPath = path.join(__dirname, "../client/public/gallery.json");

    fs.writeFileSync(targetPath, JSON.stringify(urls, null, 2));
    console.log("✅ Saved gallery.json with", urls.length, "items at:", targetPath);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

listImages();
