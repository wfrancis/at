// Polyfill for Node 10
if (typeof globalThis === "undefined") {
  global.globalThis = global;
}

const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  LevelFormat,
  convertInchesToTwip,
  TabStopPosition,
  TabStopType,
  TableOfContents,
} = require("docx");

// ── Configuration ──
const INPUT_FILE = __dirname + "/FINAL_Legal_Department_Operations_Manual_v1.0.md";
const OUTPUT_FILE = __dirname + "/PIR_Legal_Department_Operations_Manual_v1.0.docx";

const FONT = "Arial";
const PAGE_W = 12240; // US Letter width in DXA
const PAGE_H = 15840; // US Letter height in DXA
const MARGIN = convertInchesToTwip(1); // 1 inch

// ── Markdown Parser ──

function parseMarkdown(text) {
  const lines = text.split("\n");
  const tokens = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === "") {
      i++;
      continue;
    }

    // Skip horizontal rules
    if (/^---+$/.test(trimmed)) {
      i++;
      continue;
    }

    // Table detection: line starts with | and next line is separator
    if (trimmed.startsWith("|") && i + 1 < lines.length && /^\|[-| :]+\|$/.test(lines[i + 1].trim())) {
      const tableRows = [];
      // header row
      tableRows.push(parseTableRow(trimmed));
      i++; // skip header
      i++; // skip separator
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableRows.push(parseTableRow(lines[i].trim()));
        i++;
      }
      tokens.push({ type: "table", rows: tableRows });
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length; // 1-4
      tokens.push({ type: "heading", level, text: headingMatch[2] });
      i++;
      continue;
    }

    // Bullet list item
    if (/^[-*]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (/^[-*]\s+/.test(cur)) {
          items.push(cur.replace(/^[-*]\s+/, ""));
          i++;
        } else if (cur === "") {
          break;
        } else {
          // continuation line (not a list item, not empty)
          break;
        }
      }
      tokens.push({ type: "bullet_list", items });
      continue;
    }

    // Numbered list item
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (/^\d+\.\s+/.test(cur)) {
          items.push(cur.replace(/^\d+\.\s+/, ""));
          i++;
        } else if (cur === "") {
          break;
        } else {
          break;
        }
      }
      tokens.push({ type: "numbered_list", items });
      continue;
    }

    // Regular paragraph
    let paraText = trimmed;
    i++;
    // Merge continuation lines (non-empty, not heading, not list, not table, not hr)
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        next === "" ||
        /^---+$/.test(next) ||
        /^#{1,4}\s+/.test(next) ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next) ||
        next.startsWith("|")
      ) {
        break;
      }
      paraText += " " + next;
      i++;
    }
    tokens.push({ type: "paragraph", text: paraText });
  }

  return tokens;
}

function parseTableRow(line) {
  // Remove leading/trailing pipes and split
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

// ── Text Run Builder (handles **bold**) ──

function buildTextRuns(text, options = {}) {
  const runs = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(
        new TextRun({
          text: part.slice(2, -2),
          bold: true,
          font: FONT,
          size: options.size || 22, // 11pt default
          ...options,
        })
      );
    } else if (part.length > 0) {
      runs.push(
        new TextRun({
          text: part,
          font: FONT,
          size: options.size || 22,
          ...options,
        })
      );
    }
  }
  return runs;
}

// ── Build Document Sections ──

function buildTitlePage() {
  return [
    new Paragraph({ spacing: { before: 4000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: "PIR INDUSTRIAL LLC",
          bold: true,
          font: FONT,
          size: 48, // 24pt
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 400 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: "LEGAL DEPARTMENT",
          bold: true,
          font: FONT,
          size: 40, // 20pt
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: "OPERATIONS MANUAL",
          bold: true,
          font: FONT,
          size: 40,
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 400 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: "Version 1.0",
          font: FONT,
          size: 24, // 12pt
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: "Effective Date: March 18, 2026",
          font: FONT,
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: "Approved By: General Counsel; Chief Executive Officer",
          font: FONT,
          size: 24,
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 2000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: "CONFIDENTIAL -- FOR INTERNAL USE ONLY",
          bold: true,
          font: FONT,
          size: 22,
          italics: true,
        }),
      ],
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

function buildTOC() {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "TABLE OF CONTENTS",
          bold: true,
          font: FONT,
          size: 32,
        }),
      ],
    }),
    new TableOfContents("Table of Contents", {
      hyperlink: true,
      headingStyleRange: "1-3",
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

function buildTable(rows) {
  if (rows.length === 0) return [];

  const numCols = rows[0].length;
  const availableWidth = PAGE_W - 2 * MARGIN; // DXA available
  const colWidth = Math.floor(availableWidth / numCols);
  const columnWidths = Array(numCols).fill(colWidth);

  const borders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
  };

  const tableRows = rows.map((row, rowIdx) => {
    const cells = row.map(
      (cellText, colIdx) =>
        new TableCell({
          width: { size: columnWidths[colIdx], type: WidthType.DXA },
          borders,
          shading:
            rowIdx === 0
              ? { type: ShadingType.CLEAR, color: "auto", fill: "D9E2F3" }
              : undefined,
          children: [
            new Paragraph({
              spacing: { before: 40, after: 40 },
              children: buildTextRuns(cellText, {
                size: 18, // 9pt for tables
                bold: rowIdx === 0 ? true : undefined,
              }),
            }),
          ],
        })
    );
    return new TableRow({ children: cells });
  });

  return [
    new Table({
      rows: tableRows,
      width: { size: availableWidth, type: WidthType.DXA },
      columnWidths,
    }),
    new Paragraph({ spacing: { after: 200 } }),
  ];
}

// ── Numbering Config ──
const numberingConfig = {
  config: [
    {
      reference: "bullet-list",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
            },
          },
        },
      ],
    },
    {
      reference: "number-list",
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
            },
          },
        },
      ],
    },
  ],
};

// ── Main ──

async function main() {
  const raw = fs.readFileSync(INPUT_FILE, "utf8");

  // Split off the title page content (first ~8 lines before first ---)
  // We'll build the title page manually, so skip initial lines
  const firstHrIdx = raw.indexOf("\n---\n");
  const bodyText = firstHrIdx >= 0 ? raw.substring(firstHrIdx + 5) : raw;

  const tokens = parseMarkdown(bodyText);

  // Identify major section boundaries (# SECTION or # ATTACHMENT or # TABLE OF CONTENTS)
  // We'll create page breaks before each Heading 1 except the very first one (TOC)
  const bodyParagraphs = [];
  let isFirstH1 = true;
  let skipTOCContent = false;

  for (let t = 0; t < tokens.length; t++) {
    const token = tokens[t];

    if (token.type === "heading" && token.level === 1) {
      // Skip the markdown TOC section entirely - we generate our own
      if (token.text.toUpperCase().includes("TABLE OF CONTENTS")) {
        skipTOCContent = true;
        continue;
      }

      // End of TOC skip zone when we hit a non-TOC heading 1
      skipTOCContent = false;

      // Page break before each major section (except first)
      if (!isFirstH1) {
        bodyParagraphs.push(
          new Paragraph({ children: [new PageBreak()] })
        );
      }
      isFirstH1 = false;

      bodyParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 200 },
          children: [
            new TextRun({
              text: token.text,
              bold: true,
              font: FONT,
              size: 32, // 16pt
            }),
          ],
        })
      );
      continue;
    }

    // Skip content belonging to the TOC section
    if (skipTOCContent) continue;

    if (token.type === "heading" && token.level === 2) {
      bodyParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: token.text,
              bold: true,
              font: FONT,
              size: 28, // 14pt
            }),
          ],
        })
      );
      continue;
    }

    if (token.type === "heading" && (token.level === 3 || token.level === 4)) {
      bodyParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 100 },
          children: [
            new TextRun({
              text: token.text,
              bold: true,
              font: FONT,
              size: 24, // 12pt
            }),
          ],
        })
      );
      continue;
    }

    if (token.type === "paragraph") {
      bodyParagraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 120 },
          children: buildTextRuns(token.text),
        })
      );
      continue;
    }

    if (token.type === "bullet_list") {
      for (const item of token.items) {
        bodyParagraphs.push(
          new Paragraph({
            numbering: { reference: "bullet-list", level: 0 },
            spacing: { before: 40, after: 40 },
            children: buildTextRuns(item),
          })
        );
      }
      continue;
    }

    if (token.type === "numbered_list") {
      for (const item of token.items) {
        bodyParagraphs.push(
          new Paragraph({
            numbering: { reference: "number-list", level: 0 },
            spacing: { before: 40, after: 40 },
            children: buildTextRuns(item),
          })
        );
      }
      continue;
    }

    if (token.type === "table") {
      bodyParagraphs.push(...buildTable(token.rows));
      continue;
    }
  }

  // ── Assemble Document ──
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: FONT,
            size: 32,
            bold: true,
          },
          paragraph: {
            spacing: { before: 240, after: 200 },
            outlineLevel: 0,
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: FONT,
            size: 28,
            bold: true,
          },
          paragraph: {
            spacing: { before: 200, after: 120 },
            outlineLevel: 1,
          },
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: FONT,
            size: 24,
            bold: true,
          },
          paragraph: {
            spacing: { before: 160, after: 100 },
            outlineLevel: 2,
          },
        },
      ],
      default: {
        document: {
          run: {
            font: FONT,
            size: 22, // 11pt
          },
        },
      },
    },
    numbering: numberingConfig,
    features: {
      updateFields: true,
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: PAGE_H, orientation: "portrait" },
            margin: {
              top: MARGIN,
              right: MARGIN,
              bottom: MARGIN,
              left: MARGIN,
            },
          },
          titlePage: true,
          pageNumberStart: 1,
          pageNumberFormatType: NumberFormat.DECIMAL,
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "PIR Industrial LLC \u2014 Legal Department Operations Manual",
                    font: FONT,
                    size: 18,
                    italics: true,
                    color: "666666",
                  }),
                ],
              }),
            ],
          }),
          first: new Header({
            children: [new Paragraph({ children: [] })],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100 },
                children: [
                  new TextRun({
                    text: "CONFIDENTIAL \u2014 FOR INTERNAL USE ONLY",
                    font: FONT,
                    size: 16,
                    bold: true,
                    color: "999999",
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Page ",
                    font: FONT,
                    size: 16,
                    color: "999999",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: FONT,
                    size: 16,
                    color: "999999",
                  }),
                ],
              }),
            ],
          }),
          first: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "CONFIDENTIAL \u2014 FOR INTERNAL USE ONLY",
                    font: FONT,
                    size: 16,
                    bold: true,
                    color: "999999",
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          ...buildTitlePage(),
          ...buildTOC(),
          ...bodyParagraphs,
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT_FILE, buffer);
  console.log("Generated: " + OUTPUT_FILE);
  console.log("Size: " + (buffer.length / 1024).toFixed(1) + " KB");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
