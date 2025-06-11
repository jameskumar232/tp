import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "get.txt");
    let url = await fs.readFile(filePath, "utf8");
    url = url.trim();

    if (!url) {
      return res.status(500).json({ error: "MPD URL not found in get.txt" });
    }

    return res.redirect(302, url);
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
}
