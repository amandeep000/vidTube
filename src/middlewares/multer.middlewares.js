import * as path from "node:path";
import multer from "multer";
import * as fs from "node:fs";

const tempDir = path.resolve("public", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public/temp"));
  },
  filename: function (req, file, cb) {
    // todo
    const filename = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${filename}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({
  storage,
});
