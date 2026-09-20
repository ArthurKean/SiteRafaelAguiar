import sharp from "sharp";
import { copyFile, mkdir, readdir } from "node:fs/promises";
await mkdir('public/images', { recursive: true });
await copyFile('assets/originals/brand/logo-fundo-escuro.jpeg', 'public/images/marca.jpeg');
for (const file of await readdir("assets/originals/properties")) {
  if (!file.endsWith(".jpg")) continue;
  const name = file.slice(0, -4);
  await sharp(`assets/originals/properties/${file}`)
    .resize(1400, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/images/${name}.webp`);
  await sharp(`assets/originals/properties/${file}`)
    .resize(640, null, { withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`public/images/${name}-640.webp`);
}
await sharp("assets/originals/portraits/rafael-aguiar.jpeg")
  .rotate()
  .resize(800)
  .webp({ quality: 85 })
  .toFile("public/images/rafael.webp");
// Recorte do monograma original fornecido, sem redesenhar a identidade.
await sharp("assets/originals/brand/logo-fundo-branco.jpeg")
  .extract({ left: 700, top: 165, width: 170, height: 235 })
  .resize(85)
  .png()
  .toFile("public/images/monograma.png");
