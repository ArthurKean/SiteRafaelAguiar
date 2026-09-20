import sharp from "sharp";
import { readdir } from "node:fs/promises";
for (const file of await readdir("src/assets/images-source")) {
  if (!file.endsWith(".jpg")) continue;
  const name = file.slice(0, -4);
  await sharp(`src/assets/images-source/${file}`)
    .resize(1400, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/images/${name}.webp`);
  await sharp(`src/assets/images-source/${file}`)
    .resize(640, null, { withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`public/images/${name}-640.webp`);
}
await sharp("IMG_2133.JPEG")
  .rotate()
  .resize(800)
  .webp({ quality: 85 })
  .toFile("public/images/rafael.webp");
// Recorte do monograma original fornecido, sem redesenhar a identidade.
await sharp("WhatsApp Image 2026-09-10 at 12.49.14 (1).jpeg")
  .extract({ left: 700, top: 165, width: 170, height: 235 })
  .resize(85)
  .png()
  .toFile("public/images/monograma.png");
