import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const PRODUCTS = JSON.parse(await readFile('src/data/products.json', 'utf8'));
const OUT_DIR = join('public', 'documenti');

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 48;
const ACCENT = rgb(0.082, 0.502, 0.239); // #15803D
const INK = rgb(0.05, 0.05, 0.05);
const MUTED = rgb(0.373, 0.388, 0.408); // #5F6368
const LINE = rgb(0.88, 0.88, 0.88);
const SOFT = rgb(0.949, 0.949, 0.949);
const WHITE = rgb(1, 1, 1);

const COMPANY = {
  name: 'AF ELEKTRA 2',
  baseline: 'Elettronica industriale · Castenedolo (BS)',
  address: 'Via Artigiani 19, 25014 Castenedolo (BS)',
  phone: '030 2130630',
  email: 'afelektra2@afelektra.com',
  site: 'www.afelektra.com',
};

function wrap(text, font, size, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const safe = (value) => String(value ?? '—');

async function createDatasheet(product) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  pdf.setTitle(`${product.name} — Scheda tecnica | AF Elektra 2`);
  pdf.setAuthor('AF Elektra 2');
  pdf.setSubject(product.tagline);
  pdf.setKeywords([product.category, product.code, 'AF Elektra 2']);
  pdf.setCreator('afelektra.com');

  const { width, height } = PAGE;
  const contentWidth = width - MARGIN * 2;

  let page = pdf.addPage([width, height]);
  let y = height - MARGIN;

  const addPage = () => {
    page = pdf.addPage([width, height]);
    y = height - MARGIN - 8;
    page.drawText(`${product.name} · ${product.code}`, {
      x: MARGIN, y: height - MARGIN + 6, size: 8, font: regular, color: MUTED,
    });
    page.drawLine({
      start: { x: MARGIN, y: height - MARGIN },
      end: { x: width - MARGIN, y: height - MARGIN },
      thickness: 0.7,
      color: LINE,
    });
    y = height - MARGIN - 20;
  };

  const sectionTitle = (title) => {
    if (y < 130) addPage();
    page.drawText(title, { x: MARGIN, y, size: 13, font: bold, color: INK });
    y -= 8;
    page.drawLine({
      start: { x: MARGIN, y }, end: { x: width - MARGIN, y }, thickness: 1, color: ACCENT,
    });
    y -= 20;
  };

  /* ─── Intestazione ─── */
  page.drawRectangle({ x: 0, y: height - 100, width, height: 100, color: ACCENT });
  page.drawText(COMPANY.name, {
    x: MARGIN, y: height - 48, size: 22, font: bold, color: WHITE,
  });
  page.drawText('Scheda tecnica prodotto', {
    x: MARGIN, y: height - 66, size: 10, font: regular, color: WHITE,
  });
  page.drawText(COMPANY.site, {
    x: width - MARGIN - regular.widthOfTextAtSize(COMPANY.site, 9),
    y: height - 48,
    size: 9,
    font: regular,
    color: WHITE,
  });
  page.drawText(COMPANY.baseline, {
    x: width - MARGIN - regular.widthOfTextAtSize(COMPANY.baseline, 8),
    y: height - 64,
    size: 8,
    font: regular,
    color: WHITE,
  });

  /* ─── Titolo e immagine ─── */
  const imageSize = 140;
  const imageX = width - MARGIN - imageSize;
  const imageY = height - 100 - 20 - imageSize;
  const textWidth = contentWidth - imageSize - 24;

  y = height - 100 - 30;

  page.drawText(product.category.toUpperCase(), {
    x: MARGIN, y, size: 8, font: bold, color: MUTED,
  });
  y -= 22;

  for (const line of wrap(product.name, bold, 24, textWidth)) {
    page.drawText(line, { x: MARGIN, y, size: 22, font: bold, color: INK });
    y -= 25;
  }

  page.drawText(product.code, { x: MARGIN, y, size: 10, font: regular, color: MUTED });
  y -= 20;

  for (const line of wrap(product.tagline, regular, 10.5, textWidth)) {
    page.drawText(line, { x: MARGIN, y, size: 10, font: regular, color: INK });
    y -= 14;
  }

  y -= 4;
  for (const line of wrap(product.description, regular, 9, textWidth)) {
    page.drawText(line, { x: MARGIN, y, size: 8.5, font: regular, color: MUTED });
    y -= 12;
  }

  try {
    const imageBytes = await readFile(join('public', product.image.replace(/^\//, '')));
    const image = await pdf.embedJpg(imageBytes);
    page.drawRectangle({
      x: imageX - 6, y: imageY - 6, width: imageSize + 12, height: imageSize + 12, color: SOFT,
    });
    page.drawImage(image, { x: imageX, y: imageY, width: imageSize, height: imageSize });
  } catch {
    page.drawRectangle({
      x: imageX, y: imageY, width: imageSize, height: imageSize, color: SOFT,
    });
  }

  /* ─── Caratteristiche ─── */
  y = Math.min(y, imageY - 34);
  sectionTitle('Caratteristiche tecniche');

  const labelWidth = 190;
  const valueWidth = contentWidth - labelWidth - 24;

  product.details.forEach((detail, index) => {
    const valueLines = wrap(safe(detail.value), bold, 9, valueWidth);
    const rowHeight = Math.max(20, valueLines.length * 12 + 7);

    if (y - rowHeight < 96) {
      addPage();
      sectionTitle('Caratteristiche tecniche (continua)');
    }

    if (index % 2 === 0) {
      page.drawRectangle({
        x: MARGIN, y: y - rowHeight + 4, width: contentWidth, height: rowHeight, color: SOFT,
      });
    }

    let labelY = y - 9;
    for (const line of wrap(detail.label, regular, 9, labelWidth).slice(0, 2)) {
      page.drawText(line, { x: MARGIN + 8, y: labelY, size: 9, font: regular, color: MUTED });
      labelY -= 11;
    }

    let valueY = y - 9;
    for (const line of valueLines) {
      page.drawText(line, {
        x: MARGIN + labelWidth + 8, y: valueY, size: 9, font: bold, color: INK,
      });
      valueY -= 12;
    }

    y -= rowHeight + 2;
  });

  /* ─── Versioni ─── */
  if (product.variants?.length) {
    y -= 18;
    sectionTitle('Versioni disponibili');

    for (const variant of product.variants) {
      if (y < 110) addPage();
      page.drawText(variant.name, { x: MARGIN, y, size: 10.5, font: bold, color: INK });
      y -= 14;

      for (const item of variant.items) {
        if (y < 95) addPage();
        page.drawText(`•  ${item.label}`, {
          x: MARGIN + 4, y, size: 8.5, font: regular, color: MUTED,
        });
        page.drawText(safe(item.value), {
          x: width - MARGIN - bold.widthOfTextAtSize(safe(item.value), 8.5),
          y,
          size: 8.5,
          font: bold,
          color: INK,
        });
        y -= 12;
      }
      y -= 6;
    }
  }

  /* ─── Note ─── */
  if (y < 110) addPage();
  y -= 6;
  page.drawText('Note', { x: MARGIN, y, size: 9, font: bold, color: INK });
  y -= 13;
  const notes = [
    'Tensioni, correnti, contatti e formato possono essere personalizzati su richiesta.',
    'Prezzi e disponibilità aggiornata si confermano con l’ufficio commerciale.',
  ];
  for (const note of notes) {
    for (const line of wrap(note, italic, 8.5, contentWidth)) {
      page.drawText(line, { x: MARGIN, y, size: 8.5, font: italic, color: MUTED });
      y -= 12;
    }
  }

  /* ─── Footer su ogni pagina ─── */
  const stamp = `Documento generato il ${new Date().toLocaleDateString('it-IT')}`;
  for (const current of pdf.getPages()) {
    const footerY = 62;
    current.drawLine({
      start: { x: MARGIN, y: footerY + 16 },
      end: { x: width - MARGIN, y: footerY + 16 },
      thickness: 0.7,
      color: LINE,
    });
    current.drawText(COMPANY.name, { x: MARGIN, y: footerY, size: 9, font: bold, color: INK });
    current.drawText(`${COMPANY.address} · Tel. ${COMPANY.phone}`, {
      x: MARGIN + bold.widthOfTextAtSize(COMPANY.name, 9) + 8,
      y: footerY,
      size: 8,
      font: regular,
      color: MUTED,
    });
    current.drawText(`${COMPANY.email} · ${COMPANY.site}`, {
      x: MARGIN, y: footerY - 12, size: 8, font: regular, color: MUTED,
    });
    current.drawText(stamp, {
      x: width - MARGIN - regular.widthOfTextAtSize(stamp, 7.5),
      y: footerY - 12,
      size: 7.5,
      font: regular,
      color: MUTED,
    });
  }

  return pdf.save();
}

await mkdir(OUT_DIR, { recursive: true });

for (const product of PRODUCTS) {
  const bytes = await createDatasheet(product);
  const file = join(OUT_DIR, `${product.slug}.pdf`);
  await writeFile(file, bytes);
  console.log(`[datasheet] ${file}`);
}

console.log(`[datasheet] ${PRODUCTS.length} PDF generati`);
