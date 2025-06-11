import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing 'id' query parameter" });
  }

  try {
    const filePath = path.resolve("./get.txt");
    let baseUrl = await fs.readFile(filePath, "utf8");
    baseUrl = baseUrl.trim();

    if (!baseUrl) {
      return res.status(500).json({ error: "Base URL not found in get.txt" });
    }

    const replacedUrl = baseUrl.replace("StarSports_2_Hin_HD_voot_MOB", id);
    return res.redirect(302, replacedUrl);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
