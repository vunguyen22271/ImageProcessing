import express from "express";
import util from "../util/util.js";
export const router = express.Router();

// Get image links
router.get("/", async (req, res) => {
  let { image_url } = req.query;

  // Check if image_url is valid
  const urlRegex = /^(http|https):\/\/[^ "]+\.(jpg|jpeg|png|gif)$/i;

  if (!urlRegex.test(image_url)) {
    return res.status(400).send("Image URL is not valid");
  }
  
  let filteredpath;
  
  console.log('image_url', image_url)

  if (image_url) {
    filteredpath = await util.filterImageFromURL(image_url);
    await console.log('filteredpath', filteredpath);
  }

  await res.status(200).sendFile(filteredpath);
  setTimeout(async () => {
    util.deleteLocalFiles([filteredpath]);
  }, 10000); // 10 seconds timeout
});

