const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageBreak, BorderStyle, WidthType,
  ShadingType, LevelFormat, PageNumber
} = require("docx");

// ============================================================
// HELPERS
// ============================================================

const FONT = "Times New Roman";
const PAGE_WIDTH = 12240;
const PAGE_HEIGHT = 15840;
const MARGIN = 1440;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN; // 9360

function sectionHeader(text) {
  // Bold, all-caps, numbered list style (matching original)
  return new Paragraph({
    spacing: { before: 480, after: 240 },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, font: FONT, size: 24 }),
    ],
  });
}

function subHeader(text) {
  // Bold + underline sub-section header
  return new Paragraph({
    spacing: { before: 360, after: 200 },
    children: [
      new TextRun({ text, bold: true, underline: { type: "single" }, font: FONT, size: 24 }),
    ],
  });
}

function para(text, opts = {}) {
  const runs = [];
  // Parse simple bold markers: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true, font: FONT, size: 24 }));
    } else {
      runs.push(new TextRun({ text: part, font: FONT, size: 24, ...(opts.italic ? { italics: true } : {}) }));
    }
  }
  return new Paragraph({
    spacing: { after: 200 },
    children: runs,
  });
}

function bulletList(items, level = 0) {
  return items.map(item =>
    new Paragraph({
      numbering: { reference: "bullets", level },
      spacing: { after: 120 },
      children: [new TextRun({ text: item, font: FONT, size: 24 })],
    })
  );
}

function numberedList(items, ref = "numbers") {
  return items.map(item =>
    new Paragraph({
      numbering: { reference: ref, level: 0 },
      spacing: { after: 120 },
      children: [new TextRun({ text: item, font: FONT, size: 24 })],
    })
  );
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function emptyLine() {
  return new Paragraph({ spacing: { after: 100 }, children: [] });
}

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };

function tableCell(text, opts = {}) {
  const width = opts.width || 2340;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold: !!opts.bold,
            font: FONT,
            size: opts.size || 20,
            ...(opts.italic ? { italics: true } : {}),
          }),
        ],
      }),
    ],
  });
}

function simpleTable(headers, rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  const headerRow = new TableRow({
    children: headers.map((h, i) =>
      tableCell(h, { width: colWidths[i], bold: true, shading: "D9E2F3", center: true })
    ),
  });
  const dataRows = rows.map(
    row =>
      new TableRow({
        children: row.map((cell, i) => tableCell(cell, { width: colWidths[i] })),
      })
  );
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

// ============================================================
// DOCUMENT CONTENT
// ============================================================

const children = [];

// ------ SECTION 1: PURPOSE AND SCOPE ------
children.push(sectionHeader("1. Purpose and Scope"));
children.push(para(
  "The purpose of this Legal Department Operations Manual (the \u201CManual\u201D) is to establish a consistent and scalable framework for the management of legal matters across PIR Industrial LLC (the \u201CCompany\u201D). This Manual is intended to provide guidance to the Legal Department (the \u201CDepartment\u201D) personnel on such activities and responsibilities, particularly in cooperation with other internal and external stakeholders, namely, the Company\u2019s ownership, executive leadership, and personnel in other Company departments."
));
children.push(para(
  "This Manual will define the Department\u2019s oversight and responsibilities necessary to support informed business decision-making."
));
children.push(para(
  "As the Company continues to evolve, implement new technologies, and adjust internal systems and workflows, the Department may update these policies and procedures to ensure continued effectiveness and alignment with organizational objectives."
));

// ------ SECTION 2: OPERATING PRINCIPLES ------
children.push(pageBreak());
children.push(sectionHeader("2. Operating Principles"));
children.push(para(
  "The Department operates in support of the Company\u2019s strategic, operational, and financial objectives. The principles set forth below guide the Department\u2019s approach to delivering legal services, managing risk, and collaborating with stakeholders."
));
children.push(para(
  "These principles are intended to ensure that the Department provides timely, practical, and consistent legal support while maintaining disciplined risk management and operational efficiency."
));

children.push(subHeader("Business Alignment"));
children.push(para(
  "The Legal Department supports the Company\u2019s business strategy by providing practical legal guidance that facilitates (and does not disrupt or interfere with) operations and transactions, while protecting the Company\u2019s legal and financial interests."
));
children.push(para(
  "Legal analysis and recommendations should be grounded in an understanding of the Company\u2019s business priorities, portfolio strategy, and operational realities. The Department strives to balance risk management with the need for efficient execution of business initiatives."
));

children.push(subHeader("Speed with Discipline"));
children.push(para(
  "Leasing and operational matters often require prompt legal support in order to maintain transaction momentum and support tenant relationships."
));
children.push(para(
  "The Department should deliver timely responses while maintaining appropriate legal review standards, including document accuracy, version control, and internal coordination. Efficient processes and clearly defined workflows help ensure that speed does not compromise quality or risk management."
));

children.push(subHeader("Consistency and Standardization"));
children.push(para(
  "Standardized procedures promote efficiency, clarity, and institutional knowledge. Standardization helps ensure that legal work product remains reliable and that internal teams can easily navigate legal workflows."
));

children.push(subHeader("Transparency and Risk Visibility"));
children.push(para(
  "The Legal Department maintains structured reporting tools and communication protocols to ensure that material legal matters are visible to leadership."
));
children.push(para(
  "Legal risks should be identified early, documented appropriately, and communicated to relevant stakeholders in a timely manner. Clear reporting mechanisms help support informed decision-making by executive leadership and facilitate coordinated responses to legal issues affecting the Company."
));

// FIXED: Centralized Document Management (was duplicate of Transparency section)
children.push(subHeader("Centralized Document Management"));
children.push(para(
  "All legal documents, including lease drafts, litigation files, governance records, and outside counsel correspondence, must be stored in the Company\u2019s approved document management systems (currently SharePoint for active collaboration and ShareFile for executed documents)."
));
children.push(para(
  "Centralized document management ensures version control integrity, facilitates institutional knowledge transfer, and supports audit readiness. Documents should not be stored locally or in unapproved platforms. The Department is responsible for maintaining organized folder structures and enforcing naming conventions across all legal workstreams."
));

children.push(subHeader("Effective Collaboration"));
children.push(para(
  "The Legal Department works in close coordination with Asset Management, Finance, Property Management, and executive leadership."
));
children.push(para(
  "Successful collaboration requires clear communication, shared expectations regarding timelines and responsibilities, and mutual understanding of each department\u2019s role in the Company\u2019s operations."
));
children.push(para(
  "Legal supports internal teams by providing guidance, documentation, and risk analysis while respecting the operational ownership of business decisions by the relevant departments."
));

children.push(subHeader("Prudent Use of Outside Counsel"));
children.push(para(
  "Outside counsel are engaged to provide specialized expertise, jurisdictional coverage, or additional capacity when required."
));
children.push(para(
  "The Department is responsible for selecting and supervising outside counsel, defining engagement scope, monitoring performance, and managing legal spend. Outside counsel should operate as an extension of the Department and adhere to the Company\u2019s expectations regarding efficiency, communication, and billing practices."
));

children.push(subHeader("Continuous Improvement"));
children.push(para(
  "The Department seeks to continually improve its processes through the adoption of efficient workflows, technology tools, and standardized practices."
));
children.push(para(
  "This includes evaluating technologies that enhance document management, legal reporting, and access to lease and portfolio data, as well as maintaining internal training and knowledge resources that support consistent legal operations."
));
children.push(para(
  "Continuous improvement helps ensure that the Department can stay competitive as the Company evolves."
));

children.push(subHeader("Accountability"));
children.push(para(
  "Members of the Department are expected to maintain high standards of professional judgment, integrity, and accountability in the performance of their responsibilities."
));
children.push(para(
  "Legal professionals must exercise sound judgment, safeguard confidential information, and ensure that the Company\u2019s legal obligations are fulfilled in accordance with applicable laws and internal policies."
));

// ------ SECTION 3: ROLES AND RESPONSIBILITIES ------
children.push(pageBreak());
children.push(sectionHeader("3. Roles and Responsibilities"));
children.push(para(
  "The Department is responsible for providing legal guidance, documentation, and risk management oversight in support of the Company\u2019s business operations. The Department plays a central role in supporting the Company\u2019s leasing, operational, and governance activities while ensuring that legal risks are appropriately identified, evaluated, and managed."
));
children.push(para(
  "To promote clarity and operational efficiency, the Legal Department\u2019s responsibilities are organized into the categories set forth below. In certain areas, the Department is afforded sole discretion for a given business activity. In other areas, the Department merely provides guidance and support but does not serve as the operational \u201Cowner\u201D of the underlying business activity."
));

children.push(subHeader("Matters Owned and Managed by Legal Department"));

children.push(para("**Lease Documentation and Legal Drafting**"));
children.push(...bulletList([
  "Drafting and reviewing lease agreements, amendments, and related documentation",
  "Maintaining and updating standard lease forms and provisions",
  "Ensuring that lease documents reflect approved business terms and protect the Company\u2019s legal interests",
  "Managing internal document review and version control processes",
]));

children.push(para("**Litigation Oversight**"));
children.push(...bulletList([
  "Managing litigation involving the Company",
  "Coordinating with and supervising outside counsel",
  "Establishing litigation strategy and settlement posture in consultation with executive leadership",
  "Monitoring litigation budgets and controlling legal spending",
]));

children.push(para("**Outside Counsel Management**"));
children.push(...bulletList([
  "Selecting and maintaining a panel of approved outside counsel",
  "Issuing engagement instructions and defining scope of work",
  "Monitoring performance, staffing, and billing practices",
  "Ensuring adherence to the Company\u2019s billing guidelines and reporting expectations",
]));

children.push(para("**Legal Risk Management and Reporting**"));
children.push(...bulletList([
  "Maintaining the Company\u2019s Legal Risk Tracker",
  "Identifying and evaluating legal risks across the portfolio",
  "Reporting material legal matters to executive leadership",
  "Providing recommendations regarding mitigation strategies",
]));

children.push(para("**Corporate Governance and Entity Management**"));
children.push(...bulletList([
  "Maintaining records for corporate entities",
  "Supporting governance processes for the Company and its subsidiaries",
  "Coordinating entity formation, dissolution, and structural changes",
  "Maintaining organizational charts and ownership records",
]));

children.push(para("**Policy Development and Legal Compliance**"));
children.push(...bulletList([
  "Developing and maintaining internal legal policies and procedures",
  "Monitoring legal and regulatory developments relevant to the Company",
  "Advising internal teams regarding compliance obligations",
]));

children.push(subHeader("Matters Where the Legal Department Provides Advisory Support or Collaboration"));

children.push(para("**Lease/Document Negotiation for Asset Management Department**"));
children.push(...bulletList([
  "Advising on legal implications of proposed business terms",
  "Recommending risk mitigation strategies",
  "Reviewing tenant revisions and proposed lease language",
]));

children.push(para("**Tenant Defaults and Dispute Resolution for Executive Department**"));
children.push(...bulletList([
  "Default notice procedures",
  "Enforcement options",
  "Settlement considerations",
  "Litigation strategies if disputes escalate",
]));

children.push(para("**Insurance Claims for Asset Management Department**"));
children.push(...bulletList([
  "Complex insurance coverage issues",
  "Insurer disputes",
  "Litigation arising from claims",
]));

children.push(para("**Transactional Matters for Executive, Finance and Acquisitions Departments**"));
children.push(...bulletList([
  "Acquisitions and dispositions",
  "Financing",
  "Joint ventures",
  "Material contracts",
]));

children.push(subHeader("Matters Outside the Operational Responsibility of the Legal Department"));
children.push(...bulletList([
  "Relationship management concerning tenants, vendors, contractors and third-party property management",
  "Rent collection and accounts receivable",
  "Property operations and maintenance",
  "Leasing strategy and market positioning",
  "Asset management decisions regarding tenant concessions or pricing",
]));

// ------ SECTION 4: INTAKE & PRIORITIZATION ------
children.push(pageBreak());
children.push(sectionHeader("4. Intake & Prioritization Procedures"));
children.push(para(
  "The Department receives requests from multiple internal stakeholders, including Asset Management, Property Management, Finance, and Executive Leadership. To ensure that legal matters are handled efficiently and consistently, all requests for legal services must follow the standardized intake and prioritization procedures outlined in this section."
));
children.push(para("The objectives of these procedures are to:"));
children.push(...numberedList([
  "Ensure that legal requests are captured and tracked through a centralized system",
  "Establish clear and objective criteria for prioritizing work",
  "Provide visibility to leadership regarding legal workflow and capacity",
  "Ensure that matters affecting revenue, deadlines, or legal rights receive timely attention",
]));

children.push(subHeader("Legal Request Intake"));
children.push(para(
  "All requests for legal services related to leasing activities must be submitted through the Company\u2019s lease lifecycle management platform (currently Salesforce)."
));
children.push(para("The system automatically notifies the Legal Department when Asset Management submits a request for:"));
children.push(...bulletList([
  "Drafting a new lease or lease amendment",
  "Reviewing a tenant-proposed lease draft or lease amendment",
  "Drafting notices relating to tenant defaults",
  "Reviewing other property-related legal documents",
]));
children.push(para(
  "Using a centralized intake platform ensures that legal requests are documented, time-stamped, assigned an owner, and tracked through completion."
));
children.push(para("Asset Management or other requesting departments will be prompted for the following information when submitting a request:"));
children.push(...bulletList([
  "Property name and address",
  "Tenant name",
  "Type of document requested",
  "First/Tenant-revised draft",
  "Lease/Renewal commencement date (if applicable)",
  "Lease Rent over the Lease Term",
]));
children.push(para("Providing this information enables the Department to properly prioritize and allocate resources."));

children.push(subHeader("Guidance on Prioritization"));
children.push(para(
  "The head of the Asset Management Department, and other authorized persons, will be given ultimate discretion for the priority of lease requests. However, the Company should aim to provide solutions that can automate these decisions based on a formula factoring in the information provided above. Using this information, the following business and operational considerations should be included in the priority analysis:"
));
children.push(...bulletList([
  "Requests affecting leases scheduled to commence in the near term",
  "Matters involving significant rent or strategic tenants",
  "Requests involving tenant revisions or active negotiations to maintain deal momentum",
  "Matters involving properties that are difficult to lease or strategically important to the portfolio",
  "Matters involving contractual deadlines, regulatory requirements, or litigation deadlines",
]));

children.push(para("**Examples:**"));
children.push(para("**High priority matters:**"));
children.push(...bulletList([
  "New leases tied to upcoming rent commencement",
  "Tenant revisions requiring timely response",
  "Matters involving significant revenue impact",
  "Issues involving legal deadlines or risk of rights waiver",
  "Matters escalated by Executive Leadership",
]));
children.push(para("These matters should generally receive attention within one to two business days, subject to complexity."));

children.push(para("**Medium priority matters:**"));
children.push(...bulletList([
  "Lease amendments that do not affect immediate rent commencement",
  "Ongoing lease negotiations without immediate deadlines",
  "Routine document review requests (e.g., landlord lien waivers, NDAs, collateral access agreements, SNDAs, estoppel certificates, etc.)",
]));
children.push(para("These matters are addressed in the normal legal workflow queue."));

children.push(para("**Low priority matters:**"));
children.push(...bulletList([
  "Housekeeping amendments",
  "Internal document reviews",
  "Informational requests",
  "Long-term projects without time sensitivity",
]));
children.push(para("These matters are handled as capacity permits."));

children.push(subHeader("Legal Workflow Dashboard"));
children.push(para(
  "Salesforce will be programmed to compile legal requests into a centralized dashboard that provides visibility into pending legal requests, priority designations, responsible legal personnel, draft status and expected completion timelines."
));
children.push(para(
  "This dashboard helps ensure transparency across the leasing pipeline and allows leadership to monitor the flow of legal work across the organization."
));

children.push(subHeader("Monitoring and Updates"));
children.push(para(
  "The Department, together with the Asset Management Department, should periodically review the status of open matters to ensure that priorities remain appropriate as circumstances evolve."
));
children.push(para(
  "While priority assignments are generally based on objective criteria noted above, certain matters may require adjustment based on business judgment. As previously noted, certain authorized persons may override the standard priority designation when necessary to reflect the Company\u2019s broader business needs and legal risk considerations."
));

// ------ SECTION 5: LEASING ASSET MANAGEMENT PROCEDURES ------
children.push(pageBreak());
children.push(sectionHeader("5. Leasing Asset Management Procedures"));
children.push(para(
  "Leasing activity represents a core component of the Company\u2019s operations and revenue generation. The Legal Department supports Asset Management in connection with lease negotiations and documentation while ensuring that lease agreements appropriately protect the Company\u2019s legal and financial interests."
));
children.push(para("The procedures described in this section establish standardized workflows for:"));
children.push(...bulletList([
  "Lease drafting and review",
  "Document collaboration between Legal and Asset Management",
  "Document version control",
  "Internal and external circulation of lease drafts",
]));
children.push(para("These procedures are designed to maintain document integrity, efficient collaboration, and clear accountability throughout the leasing process."));

children.push(subHeader("Leasing Workflow Overview"));
children.push(para("The leasing workflow generally involves the following steps:"));
children.push(...numberedList([
  "Asset Management designates a SharePoint workspace to store draft Word documents (e.g., lease analysis, LOIs, etc.) and to allow internal review by the deal team.",
  "Asset Management submits a request for legal drafting or review through Salesforce\u2019s Leasing Process system.",
  "Legal prepares the initial draft or reviews the proposed form. If the request is to review a tenant-proposed or tenant-revised form, Asset Management should first provide internal comments and revisions in the document using the \u201CComment\u201D and \u201CTracked Changes\u201D functions. (See Tracked Changes Protocol below). Legal will (i) revise and provide comments to Asset Management in the Word document using the \u201C@mention\u201D function and (ii) review and incorporate internal comments and revisions, as applicable. Drafting-related communications should be made using these functions, in lieu of e-mail.",
  "Once internal review is completed, Legal or Asset Management will (i) generate a comparison using the \u201CCompare\u201D function in Word of the draft against the tenant-proposed form, if applicable (See Tracked Changes Protocol below), and (ii) download a local copy of the SharePoint draft and circulate the draft to tenant counsel or the tenant\u2019s representative, as applicable. Asset Management will then indicate, through Salesforce\u2019s Leasing Process system, that lease or lease amendment, as applicable, has proceeded to negotiation phase.",
  "Lease drafts are revised as negotiations progress. Every initial and subsequent external draft will be saved as a separate Word document in accordance with applicable naming convention (See Naming Convention below).",
  "Final documents are prepared for signature and distribution by the applicable Leasing Administrator from Asset Management and stored in ShareFile (not to be confused with SharePoint).",
]));

children.push(subHeader("Role of Asset Management"));
children.push(para(
  "Asset Management is responsible for, and has final authority over, the commercial negotiation of lease terms and for maintaining the tenant (and broker, if applicable) relationship throughout the negotiation process."
));
children.push(para("Asset Management responsibilities include:"));
children.push(...bulletList([
  "Negotiating economic terms with tenants",
  "Coordinating with tenants and brokers regarding business terms",
  "Routing drafts between the Legal Department, tenants and brokers",
  "Confirming that negotiated business terms are accurately reflected in the lease documentation",
]));
children.push(para(
  "On some occasions, Asset Management may be permitted to draft or document a business term in a legal document; however, the Department will have final approval of the document. If for any reason, typically due to time-sensitivity, the Department does not have the opportunity to review a document, Asset Management may be permitted to transmit provided, that, in its transmission correspondence, Asset Management expressly reserves the right for final review by the Company\u2019s Legal Department."
));
children.push(para("With respect to documentation, specifically, the Department supports Asset Management by ensuring that negotiated terms are properly documented and that legal risks are appropriately addressed."));
children.push(para("Legal responsibilities include:"));
children.push(...bulletList([
  "Drafting lease agreements and amendments",
  "Reviewing tenant-proposed lease forms",
  "Ensuring consistency with the Company\u2019s standard lease provisions",
  "Advising Asset Management regarding legal implications of revisions made by tenant and/or Asset Management",
  "Maintaining document version control",
  "Coordinating the internal review process prior to external circulation",
]));

children.push(subHeader("SharePoint"));
children.push(para("All lease-related documents must be stored in the designated SharePoint workspace for the applicable transaction."));
children.push(para("The SharePoint workspace enables:"));
children.push(...bulletList([
  "Centralized document storage",
  "Version history tracking for auditing drafting decisions",
  "Internal collaboration",
  "Preservation of document integrity",
]));
children.push(para("Maintaining a centralized repository ensures that all members of the deal team are working from the most current version of the document."));

children.push(subHeader("Document Naming Convention"));
children.push(para("All draft lease documents must follow the Company\u2019s standardized naming convention to ensure consistency and clarity."));
children.push(para("The standard naming format is:"));
children.push(para("**[Document Type] \u2013 [Tenant Name] \u2013 [Property Address] \u2013 PLYM Draft**"));
children.push(para("Subsequent versions, whether or not proposed by the Company, should be numbered sequentially. Tenant-proposed forms will constitute the first version of any draft to be reviewed internally by the deal team. The most recent version of the document, as reflected in the version sequence, shall be deemed the operative draft for external circulation to the tenant or, if finalized, for execution."));
children.push(para("Lease \u2013 ABC Logistics \u2013 100 Industrial Drive \u2013 PLYM Draft v2", { italic: true }));
children.push(para("Lease \u2013 ABC Logistics \u2013 100 Industrial Drive \u2013 PLYM Draft v3", { italic: true }));
children.push(para("Consistent naming conventions help prevent confusion and allow the deal team to easily identify the most recent version of a document."));

children.push(subHeader("Tracked Changes Protocol"));
children.push(para(
  "Tracked changes must remain enabled during the lease negotiation process to preserve visibility into both internal and external revisions and maintain a clear record of document changes. Tracked changes should not be removed before internal review is completed. The Department should ensure that internal comments are resolved prior to approval of external circulation. After deleting resolved comments, the Department will generate a comparison of the initial version of a tenant-proposed form, as applicable, and the most recent version revised by the Department and the deal team."
));
children.push(para("Maintaining tracked changes ensures transparency and facilitates efficient negotiation."));

children.push(subHeader("Continuous Improvement of Lease Documentation"));
children.push(para(
  "The Legal Department periodically reviews leasing activity to identify opportunities to improve the Company\u2019s standard lease forms and negotiation practices."
));
children.push(para("Areas of review may include:"));
children.push(...bulletList([
  "Frequently negotiated provisions",
  "Recurring tenant concerns",
  "Legal developments affecting lease provisions",
  "Operational feedback from Asset Management",
]));
children.push(para("These reviews help ensure that the Company\u2019s leasing documentation evolves to reflect market conditions, operational needs, and risk management priorities."));

// ------ SECTION 6: LITIGATION & OUTSIDE COUNSEL MANAGEMENT ------
children.push(pageBreak());
children.push(sectionHeader("6. Litigation & Outside Counsel Management"));
children.push(para(
  "The Legal Department is responsible for overseeing all litigation and dispute-related matters involving the Company. This includes managing legal risk, coordinating with outside counsel, controlling legal expenses, and ensuring that litigation strategy aligns with the Company\u2019s business objectives."
));
children.push(para("The procedures set forth in this section are designed to:"));
children.push(...bulletList([
  "Ensure consistent and centralized management of litigation",
  "Maintain visibility into legal exposure across the portfolio",
  "Promote cost-effective use of outside counsel",
  "Support timely and informed decision-making by executive leadership",
]));

children.push(subHeader("Litigation Intake and Tracking"));
children.push(para(
  "All litigation and dispute matters must be logged in the Legal Risk Tracker immediately upon receipt of a demand, complaint, or notice of claim. The Department will assign each matter a unique identifier and designate a responsible attorney or legal professional."
));
children.push(para("For each matter, the following information must be documented:"));
children.push(...bulletList([
  "Parties involved",
  "Nature of the claim or dispute",
  "Property or entity affected",
  "Date received and key deadlines",
  "Assigned outside counsel (if applicable)",
  "Estimated financial exposure",
  "Litigation strategy and settlement posture",
]));

children.push(subHeader("Outside Counsel Selection and Engagement"));
children.push(para(
  "The Department maintains a panel of approved outside counsel firms, selected based on relevant expertise, jurisdictional coverage, responsiveness, and cost efficiency. All outside counsel engagements must be initiated by the Department."
));
children.push(para("Prior to engagement, the Department will:"));
children.push(...numberedList([
  "Define the scope of work and expected deliverables",
  "Confirm applicable billing rates and rate caps (see Attachment C: Outside Counsel Billing Guidelines)",
  "Establish a matter budget and obtain required approvals for engagements exceeding established thresholds (see Attachment A: Delegation of Authority Matrix)",
  "Issue a written engagement letter specifying terms, staffing expectations, and reporting requirements",
]));

children.push(subHeader("Litigation Budget and Spend Management"));
children.push(para(
  "Outside counsel must submit matter budgets at the outset of each engagement. The Department monitors actual spend against budgets on a monthly basis."
));
children.push(para("Budget oversight procedures include:"));
children.push(...bulletList([
  "Monthly invoice review and approval by the responsible Department attorney",
  "Comparison of actual spend to approved budget with variance analysis",
  "Quarterly reporting of aggregate legal spend to the CFO",
  "Pre-approval required for expenditures exceeding the original matter budget by more than 15%",
]));

children.push(subHeader("Litigation Strategy and Settlement Authority"));
children.push(para(
  "The Department develops litigation strategy in consultation with executive leadership. Settlement authority is governed by the Delegation of Authority Matrix (Attachment A). All settlement proposals must be documented in writing and include an analysis of the financial and strategic implications of the proposed resolution."
));

children.push(subHeader("Litigation Reporting"));
children.push(para("The Department provides periodic litigation updates to executive leadership, including:"));
children.push(...bulletList([
  "Status of all active matters",
  "Changes in estimated exposure",
  "Key developments and upcoming deadlines",
  "Budget vs. actual spend analysis",
  "Recommended actions or strategic decisions required",
]));
children.push(para("Litigation reporting is integrated with the Legal Risk Tracker and the Legal Risk Dashboard (see Section 9 and Attachment B)."));

children.push(subHeader("Post-Litigation Review"));
children.push(para(
  "Upon resolution of significant matters, the Department conducts a post-litigation review to identify lessons learned and opportunities for process improvement. This review may include evaluation of outside counsel performance, assessment of litigation outcomes relative to initial exposure estimates, and identification of recurring issues that may warrant changes to lease forms, operational procedures, or risk management practices."
));

// ------ SECTION 7: CORPORATE GOVERNANCE & ENTITY MANAGEMENT ------
children.push(pageBreak());
children.push(sectionHeader("7. Corporate Governance & Entity Management"));
children.push(para(
  "The Legal Department is responsible for overseeing the Company\u2019s corporate governance framework and maintaining accurate and complete records for all legal entities within the Company\u2019s organizational structure."
));
children.push(para("These procedures are intended to:"));
children.push(...bulletList([
  "Ensure compliance with applicable corporate and REIT requirements",
  "Maintain accurate records of entity structure and authority",
  "Support financing, transactional, and operational needs",
  "Preserve institutional knowledge of the Company\u2019s legal structure",
]));

children.push(subHeader("A. Entity Management"));
children.push(para("The Legal Department maintains a centralized record of all Company entities in SharePoint, including:"));
children.push(...bulletList([
  "Legal entity names and jurisdictions of formation",
  "Ownership structure and organizational charts",
  "Governing documents (e.g., operating agreements, bylaws)",
  "Registered agents and principal offices",
  "Qualification and good standing status",
]));
children.push(para("Legal is responsible for coordinating:"));
children.push(...bulletList([
  "Entity formation and dissolution",
  "Amendments to governing documents",
  "Intercompany structuring changes",
]));
children.push(para(
  "Entity records must be reviewed and updated at least annually, or upon the occurrence of a material event (e.g., acquisition, disposition, financing, or restructuring). The Department maintains a master entity spreadsheet that serves as the primary reference for all entity-related inquiries."
));

children.push(subHeader("B. Governance Documentation"));
children.push(para("The Legal Department maintains and organizes governance records, including:"));
children.push(...bulletList([
  "Member and board approvals",
  "Written consents and resolutions",
  "Officer and manager appointments",
  "Delegation of authority documentation",
]));
children.push(para(
  "All governance actions must be properly documented and retained in the Company\u2019s document management system (SharePoint). The Department maintains a governance calendar to track recurring approval requirements, annual meeting obligations, and filing deadlines."
));

children.push(subHeader("C. Authority and Approvals"));
children.push(para(
  "The Legal Department supports the implementation and maintenance of the Company\u2019s delegation of authority framework (see Attachment A: Delegation of Authority Matrix)."
));
children.push(para("Responsibilities include:"));
children.push(...bulletList([
  "Confirming authority for execution of contracts and leases",
  "Coordinating approvals for material transactions",
  "Maintaining records of authorized signatories",
  "Verifying that approval thresholds are followed prior to document execution",
]));
children.push(para(
  "The Department will circulate an updated list of authorized signatories to relevant departments no less than annually and upon any change in authorized personnel."
));

children.push(subHeader("D. Compliance and Filings"));
children.push(para("The Legal Department coordinates with internal and external service providers to ensure:"));
children.push(...bulletList([
  "Timely filing of annual reports and required state filings",
  "Maintenance of good standing for all entities",
  "Compliance with REIT-related legal requirements",
]));
children.push(para(
  "The Department utilizes an external registered agent service provider for state filings and good standing maintenance. The Department maintains a compliance calendar with all recurring filing deadlines, organized by entity and jurisdiction. Filing status is reviewed quarterly and reported to the CFO."
));

// ------ SECTION 8: CONFIDENTIALITY & INFORMATION HANDLING ------
children.push(pageBreak());
children.push(sectionHeader("8. Confidentiality & Information Handling"));
children.push(para(
  "The Legal Department handles sensitive and confidential information, including privileged communications, litigation materials, and proprietary business information. Proper handling of such information is critical to protecting the Company\u2019s legal position and maintaining confidentiality obligations."
));

children.push(subHeader("A. Confidential Information"));
children.push(para("Confidential information includes, but is not limited to:"));
children.push(...bulletList([
  "Legal advice and attorney-client communications",
  "Litigation strategy and work product",
  "Tenant disputes and negotiations",
  "Regulatory matters",
  "Transaction-related information",
]));

children.push(subHeader("B. Attorney-Client Privilege"));
children.push(para(
  "Communications involving the Legal Department that are intended to provide or request legal advice may be protected by attorney-client privilege."
));
children.push(para("Employees should:"));
children.push(...bulletList([
  "Limit distribution of privileged communications",
  "Avoid forwarding privileged emails outside the Company without Legal approval",
  "Clearly label privileged communications where appropriate",
]));
children.push(para(
  "Privileged communications should be labeled with the following header: \u201CPRIVILEGED AND CONFIDENTIAL \u2013 ATTORNEY-CLIENT COMMUNICATION.\u201D The Department will periodically remind internal stakeholders of privilege preservation obligations through training and written guidance."
));

children.push(subHeader("C. Document Handling and Retention"));
children.push(para(
  "Legal documents should be stored in approved systems (e.g., SharePoint) and should not be stored locally or outside authorized platforms. Access to sensitive materials should be limited to individuals with a business need."
));
children.push(para("The Department maintains a document retention schedule, organized by category:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Document Category", "Retention Period", "Storage Location"],
  [
    ["Executed Leases", "Life of lease + 7 years", "ShareFile"],
    ["Lease Drafts and Negotiations", "Life of lease + 3 years", "SharePoint"],
    ["Litigation Files", "Resolution + 7 years", "SharePoint / Outside Counsel"],
    ["Corporate Governance Records", "Permanent", "SharePoint"],
    ["Outside Counsel Invoices", "7 years", "SharePoint / Finance"],
    ["General Correspondence", "3 years", "SharePoint"],
    ["Regulatory Filings", "Permanent", "SharePoint"],
  ],
  [3120, 3120, 3120]
));
children.push(emptyLine());

children.push(subHeader("D. Litigation Hold Procedures"));
children.push(para(
  "Upon identification of a matter that may result in litigation or regulatory investigation, the Department will implement a litigation hold to preserve all potentially relevant documents and communications."
));
children.push(para("Litigation hold procedures include:"));
children.push(...numberedList([
  "The Department issues a written litigation hold notice to all relevant custodians, identifying the matter and the categories of documents to be preserved.",
  "Custodians must acknowledge receipt of the hold notice in writing.",
  "The Department coordinates with IT to suspend any automated deletion or archiving processes for documents within the scope of the hold.",
  "The hold remains in effect until the Department issues a written release notice.",
  "The Department maintains a log of all active and released litigation holds.",
]));

children.push(subHeader("E. External Communications"));
children.push(para("Only authorized personnel may communicate with:"));
children.push(...bulletList([
  "Outside counsel",
  "Opposing counsel",
  "Regulatory authorities",
]));
children.push(para("All external legal communications should be coordinated through the Legal Department."));

// ------ SECTION 9: COMMUNICATION & ESCALATION PROTOCOLS ------
children.push(pageBreak());
children.push(sectionHeader("9. Communication & Escalation Protocols"));
children.push(para(
  "Clear communication and timely escalation are essential to effective legal risk management. This section defines when and how matters should be escalated to the Legal Department and executive leadership."
));

children.push(subHeader("A. Routine Communication"));
children.push(para("The Legal Department works collaboratively with:"));
children.push(...bulletList([
  "Asset Management (leasing and tenant matters)",
  "Property Management (operational issues and incidents)",
  "Finance (reserves, transactions, governance)",
]));
children.push(para("Standing interdepartmental meetings should be held at the following cadence:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Meeting", "Participants", "Frequency", "Purpose"],
  [
    ["Leasing Pipeline Review", "Legal + Asset Mgmt", "Weekly", "Review pending lease requests, priority alignment"],
    ["Litigation/Risk Update", "Legal + Executive Leadership", "Bi-weekly", "Active matters, exposure, strategic decisions"],
    ["Finance Coordination", "Legal + Finance/CFO", "Monthly", "Reserves, legal spend, governance filings"],
    ["Property Operations Sync", "Legal + Property Mgmt", "As needed", "Incidents, insurance claims, vendor disputes"],
  ],
  [2000, 2000, 1680, 3680]
));
children.push(emptyLine());

children.push(subHeader("B. Escalation Criteria"));
children.push(para("Matters must be escalated to the Legal Department when they involve:"));
children.push(...bulletList([
  "Potential or actual litigation",
  "Tenant bankruptcy or insolvency",
  "Material financial exposure",
  "Regulatory or governmental inquiries",
  "Significant personal injury or property damage",
  "Disputes that may impact Company rights or obligations",
]));

children.push(subHeader("C. Escalation Timelines"));
children.push(para("The following escalation timelines apply:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Event Type", "Escalation Timeline", "Escalate To"],
  [
    ["Receipt of lawsuit or demand letter", "Immediately (same business day)", "General Counsel"],
    ["Regulatory inquiry or subpoena", "Immediately (same business day)", "General Counsel + CEO"],
    ["Tenant bankruptcy filing", "Within 24 hours", "General Counsel + Asset Mgmt Lead"],
    ["Significant personal injury on property", "Immediately", "General Counsel + Property Mgmt Lead"],
    ["Material financial exposure (> $250,000)", "Within 24 hours", "General Counsel + CFO"],
    ["Potential privilege waiver or breach", "Immediately", "General Counsel"],
    ["Insurance coverage dispute", "Within 48 hours", "General Counsel + Asset Mgmt Lead"],
  ],
  [3120, 3120, 3120]
));
children.push(emptyLine());

children.push(subHeader("D. Executive Escalation"));
children.push(para("The Legal Department escalates matters to executive leadership when they involve:"));
children.push(...bulletList([
  "Significant financial exposure",
  "Reputational risk",
  "Portfolio-wide implications",
  "Strategic business impact",
]));
children.push(para(
  "Executive escalation should include a written summary of the matter, current status, recommended course of action, and estimated financial impact. The Department will prepare escalation memoranda using a standardized format to ensure consistency."
));

children.push(subHeader("E. Legal Updates and Reporting"));
children.push(para("The Legal Department provides periodic updates to executive leadership, including:"));
children.push(...bulletList([
  "Status of significant matters",
  "Litigation exposure",
  "Key risks and developments",
]));
children.push(para("The Legal Risk Tracker and Legal Risk Dashboard (see Section 10 and Attachment B) are used as primary tools for these updates."));

// ------ SECTION 10: LEGAL RISK TRACKING & REPORTING ------
children.push(pageBreak());
children.push(sectionHeader("10. Legal Risk Tracking & Reporting"));
children.push(para(
  "The Legal Department maintains a Legal Risk Tracker to provide visibility into legal matters affecting the Company\u2019s portfolio."
));
children.push(para("The tracker serves as a centralized tool for:"));
children.push(...bulletList([
  "Monitoring litigation and disputes",
  "Tracking tenant defaults and risk exposure",
  "Identifying trends and recurring issues",
  "Supporting executive decision-making",
]));

children.push(subHeader("A. Risk Categories"));
children.push(para("Legal matters are categorized into:"));
children.push(...bulletList([
  "Litigation",
  "Tenant defaults",
  "Bankruptcy",
  "Insurance claims",
  "Regulatory matters",
  "Environmental issues",
]));

children.push(subHeader("B. Risk Assessment Methodology"));
children.push(para("Each matter is evaluated based on a probability-impact framework:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Rating", "Probability", "Financial Impact"],
  [
    ["High", "Likely (>70%)", "> $500,000"],
    ["Medium", "Possible (30\u201370%)", "$100,000 \u2013 $500,000"],
    ["Low", "Unlikely (<30%)", "< $100,000"],
  ],
  [3120, 3120, 3120]
));
children.push(emptyLine());
children.push(para("Each matter also receives a qualitative assessment considering:"));
children.push(...bulletList([
  "Strategic or precedent risk",
  "Potential reputational impact",
  "Insurance coverage availability",
  "Strength of the Company\u2019s legal position",
]));
children.push(para(
  "Risk ratings are reviewed and updated at each reporting cycle. Changes in risk rating must be documented with supporting rationale."
));

children.push(subHeader("C. Reporting Cadence"));
children.push(para("The Legal Risk Tracker is updated on a regular basis:"));
children.push(...bulletList([
  "High priority matters: weekly",
  "Medium priority matters: monthly",
  "Low priority matters: quarterly",
]));
children.push(para(
  "Updated reports are shared with executive leadership in advance of scheduled legal update meetings. The Legal Risk Dashboard (Attachment B) is prepared monthly for the CFO and quarterly for board-level reporting."
));

children.push(subHeader("D. Integration with Reserve Analysis"));
children.push(para(
  "Risk data from the Legal Risk Tracker is used to inform the Company\u2019s reserve analysis, prepared in coordination with Finance. The Department provides estimated exposure ranges for all active matters rated Medium or High, updated quarterly or upon any material change in circumstances."
));

children.push(subHeader("E. Use of Risk Data"));
children.push(para("Risk data is used to:"));
children.push(...bulletList([
  "Inform reserve decisions",
  "Support strategic planning",
  "Identify areas for risk mitigation",
  "Improve lease documentation and processes",
]));

// ------ SECTION 11: TRAINING & CONTINUOUS IMPROVEMENT ------
children.push(pageBreak());
children.push(sectionHeader("11. Training & Continuous Improvement"));
children.push(para(
  "The Legal Department supports ongoing training and development to improve collaboration, reduce risk, and enhance operational efficiency."
));

children.push(subHeader("A. Internal Training Program"));
children.push(para("The Legal Department conducts training for internal stakeholders on the following schedule:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Audience", "Frequency", "Topics"],
  [
    ["Asset Management", "Quarterly", "Lease provisions, negotiation practices, document workflows"],
    ["Property Management", "Quarterly", "Incident reporting, insurance claims, escalation procedures"],
    ["Finance", "Semi-annually", "Legal risk reporting, reserve integration, governance processes"],
    ["All Departments", "Annually", "Confidentiality obligations, privilege preservation, policy updates"],
    ["New Hires (Legal)", "Upon onboarding", "Systems training, standard forms, naming conventions, workflows"],
  ],
  [2340, 2340, 4680]
));
children.push(emptyLine());

children.push(subHeader("B. New Hire Onboarding"));
children.push(para("New Department personnel complete the following onboarding checklist:"));
children.push(...numberedList([
  "Review of this Manual and all attachments",
  "Overview of the Company\u2019s entity structure and portfolio",
  "Salesforce system training (intake, workflow, dashboard)",
  "SharePoint training (document storage, collaboration, naming conventions)",
  "Introduction to standard lease forms and key provisions",
  "Review of active litigation and risk tracker",
  "Introduction to outside counsel panel and billing guidelines",
  "Review of confidentiality and privilege protocols",
], "numbers2"));

children.push(subHeader("C. Training Materials"));
children.push(para(
  "Training materials, including presentation decks, reference guides, and recorded sessions, are stored in a dedicated SharePoint folder maintained by the Department. Materials are updated as procedures, systems, or standard forms change."
));

children.push(subHeader("D. Legal Updates"));
children.push(para(
  "The Legal Department monitors legal and market developments and provides updates to internal stakeholders as appropriate. Updates may be distributed via email memoranda, incorporated into training sessions, or presented at standing interdepartmental meetings."
));

children.push(subHeader("E. Continuous Improvement"));
children.push(para("The Legal Department regularly reviews:"));
children.push(...bulletList([
  "Leasing processes",
  "Litigation outcomes",
  "Recurring issues",
]));
children.push(para("To identify opportunities to:"));
children.push(...bulletList([
  "Improve standard lease forms",
  "Streamline workflows",
  "Reduce legal exposure",
]));
children.push(para(
  "Post-litigation and post-transaction reviews are conducted for significant matters to identify lessons learned. Findings are documented and, where applicable, incorporated into updated procedures, training materials, or standard forms."
));

// ------ SECTION 12: TECHNOLOGY & WORKFLOW OPTIMIZATION ------
children.push(pageBreak());
children.push(sectionHeader("12. Technology & Workflow Optimization"));
children.push(para(
  "The Legal Department utilizes technology to improve efficiency, enhance visibility, and support scalable operations."
));

children.push(subHeader("A. Core Systems"));
children.push(para("The following systems are currently used by the Department:"));
children.push(emptyLine());
children.push(simpleTable(
  ["System", "Primary Function", "Owner", "Users"],
  [
    ["Salesforce", "Lease intake, workflow tracking, pipeline dashboard", "Legal / Asset Mgmt", "Legal, Asset Mgmt, Executive"],
    ["SharePoint", "Document collaboration, version control, storage", "Legal / IT", "Legal, Asset Mgmt, Finance"],
    ["ShareFile", "Executed document storage and external sharing", "Asset Mgmt", "Legal, Asset Mgmt"],
    ["Legal Risk Tracker", "Litigation and risk monitoring, reporting", "Legal", "Legal, Executive, CFO"],
  ],
  [1680, 3120, 2000, 2560]
));
children.push(emptyLine());
children.push(para("System access is provisioned based on role and business need. The Department coordinates with IT to ensure appropriate access controls are maintained."));

children.push(subHeader("B. System Integration"));
children.push(para("The Legal Department works to ensure that:"));
children.push(...bulletList([
  "Legal workflows are integrated with operational systems",
  "Data is captured consistently across platforms",
  "Information is accessible to relevant stakeholders",
  "Duplicate data entry is minimized through system integration where feasible",
]));
children.push(para(
  "The Department collaborates with IT and Finance to ensure that legal data (e.g., lease milestones, litigation reserves, entity records) is accurately reflected in the Company\u2019s financial and operational reporting systems."
));

children.push(subHeader("C. Evaluation of New Tools"));
children.push(para("The Legal Department may evaluate additional tools to improve:"));
children.push(...bulletList([
  "Lease data extraction and analysis",
  "Document automation",
  "Risk tracking and reporting",
  "Workflow automation",
]));
children.push(para("New technology evaluations should consider the following criteria:"));
children.push(...bulletList([
  "Integration capability with existing systems (Salesforce, SharePoint)",
  "Data security and access control standards",
  "Cost-benefit analysis and return on investment",
  "Ease of adoption and training requirements",
  "Vendor reliability and support",
]));
children.push(para(
  "The Department will coordinate with IT and Finance before procuring or implementing new technology solutions. Material technology investments require approval in accordance with the Company\u2019s standard procurement process."
));

children.push(subHeader("D. Data Integrity"));
children.push(para(
  "Maintaining accurate and consistent data across systems is critical to effective legal operations and reporting. The Department is responsible for:"
));
children.push(...bulletList([
  "Periodic audits of data accuracy in Salesforce and SharePoint",
  "Ensuring that lease milestone dates, entity records, and litigation data are current",
  "Reporting data discrepancies to the relevant system owner for correction",
  "Maintaining consistent naming conventions and folder structures across all platforms",
]));

children.push(subHeader("E. Change Management"));
children.push(para(
  "System upgrades, migrations, or workflow changes that affect the Department\u2019s operations must be coordinated with the Department in advance. The Department will participate in testing and training prior to implementation of material system changes to ensure continuity of legal operations."
));

// ------ SECTION 13: POLICY REVIEW AND UPDATES ------
children.push(pageBreak());
children.push(sectionHeader("13. Policy Review and Updates"));
children.push(para(
  "This Manual is intended to serve as a living document that evolves with the Company\u2019s operations and legal requirements."
));

children.push(subHeader("A. Periodic Review"));
children.push(para("The Legal Department will review this Manual annually, with the review cycle aligned to the Company\u2019s fiscal year. Reviews should ensure alignment with:"));
children.push(...bulletList([
  "Changes in Company structure or strategy",
  "System implementations or upgrades",
  "Regulatory developments",
  "Operational needs",
]));
children.push(para("The annual review should be completed within the first quarter of each fiscal year."));

children.push(subHeader("B. Updates and Revisions"));
children.push(para(
  "The Legal Department may update this Manual as necessary. Material changes must be approved by the General Counsel and communicated to relevant stakeholders."
));
children.push(para("The following version control practices apply:"));
children.push(...bulletList([
  "Each revision is assigned a version number and effective date",
  "A change log is maintained documenting all material revisions (see below)",
  "The current version of the Manual is stored in SharePoint in a designated location accessible to Department personnel",
  "Superseded versions are archived but retained for reference",
]));

children.push(subHeader("C. Change Log"));
children.push(emptyLine());
children.push(simpleTable(
  ["Version", "Date", "Description of Change", "Approved By"],
  [
    ["1.0", "[Date]", "Initial publication", "[Name/Title]"],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  [1200, 1560, 4680, 1920]
));
children.push(emptyLine());

children.push(subHeader("D. Implementation"));
children.push(para(
  "The Legal Department is responsible for implementing and maintaining compliance with the procedures outlined in this Manual. All Department personnel are expected to review and adhere to the current version of this Manual."
));

// ============================================================
// ATTACHMENT A: DELEGATION OF AUTHORITY MATRIX
// ============================================================
children.push(pageBreak());
children.push(sectionHeader("Attachment A: Delegation of Authority Matrix"));
children.push(para(
  "The following matrix establishes approval authority for legal and transactional matters. All dollar thresholds are subject to review and adjustment by executive leadership. Amounts exceeding the highest tier require Board approval."
));
children.push(emptyLine());
children.push(simpleTable(
  ["Action / Document Type", "Tier 1: General Counsel", "Tier 2: GC + CFO", "Tier 3: GC + CEO", "Tier 4: Board"],
  [
    ["New Lease Execution", "< $[X] annual rent", "$[X] \u2013 $[Y]", "$[Y] \u2013 $[Z]", "> $[Z]"],
    ["Lease Amendment", "< $[X] impact", "$[X] \u2013 $[Y]", "$[Y] \u2013 $[Z]", "> $[Z]"],
    ["Lease Termination / Surrender", "< $[X]", "$[X] \u2013 $[Y]", "$[Y] \u2013 $[Z]", "> $[Z]"],
    ["Litigation Settlement", "< $[X]", "$[X] \u2013 $[Y]", "$[Y] \u2013 $[Z]", "> $[Z]"],
    ["Outside Counsel Engagement", "< $[X] budget", "$[X] \u2013 $[Y]", "> $[Y]", "N/A"],
    ["Vendor / Service Contracts", "< $[X]", "$[X] \u2013 $[Y]", "$[Y] \u2013 $[Z]", "> $[Z]"],
    ["Entity Formation / Dissolution", "GC approval", "GC + CFO", "GC + CEO", "Board"],
    ["Acquisition / Disposition", "N/A", "N/A", "GC + CEO", "Board"],
    ["Financing / Loan Documents", "N/A", "GC + CFO", "GC + CEO", "Board"],
    ["Insurance Claim Settlement", "< $[X]", "$[X] \u2013 $[Y]", "> $[Y]", "N/A"],
  ],
  [2200, 1790, 1790, 1790, 1790]
));
children.push(emptyLine());
children.push(para("**Notes:**"));
children.push(...bulletList([
  "Dollar thresholds denoted as $[X], $[Y], and $[Z] are to be established by executive leadership and populated prior to implementation.",
  "All approvals must be documented in writing (email confirmation is acceptable for Tier 1 matters).",
  "Emergency authority: In the absence of the General Counsel, the CEO may exercise Tier 1 and Tier 2 authority for time-sensitive matters, with subsequent documentation.",
  "This matrix should be reviewed annually in conjunction with the Manual review (Section 13).",
]));

// ============================================================
// ATTACHMENT B: LEGAL RISK DASHBOARD
// ============================================================
children.push(pageBreak());
children.push(sectionHeader("Attachment B: Legal Risk Dashboard"));
children.push(para(
  "The Legal Risk Dashboard is a summary reporting tool designed for executive leadership and board-level consumption. It is prepared monthly by the Legal Department and distributed in advance of scheduled legal update meetings."
));
children.push(emptyLine());

children.push(para("**Section 1: Active Matters Summary**"));
children.push(simpleTable(
  ["Category", "High Risk", "Medium Risk", "Low Risk", "Total"],
  [
    ["Litigation", "[#]", "[#]", "[#]", "[#]"],
    ["Tenant Defaults", "[#]", "[#]", "[#]", "[#]"],
    ["Bankruptcy", "[#]", "[#]", "[#]", "[#]"],
    ["Insurance Claims", "[#]", "[#]", "[#]", "[#]"],
    ["Regulatory", "[#]", "[#]", "[#]", "[#]"],
    ["Environmental", "[#]", "[#]", "[#]", "[#]"],
    ["TOTAL", "[#]", "[#]", "[#]", "[#]"],
  ],
  [2200, 1790, 1790, 1790, 1790]
));
children.push(emptyLine());

children.push(para("**Section 2: Financial Exposure Summary**"));
children.push(simpleTable(
  ["Risk Level", "Number of Matters", "Estimated Exposure Range", "Current Reserves"],
  [
    ["High", "[#]", "$[X] \u2013 $[Y]", "$[amount]"],
    ["Medium", "[#]", "$[X] \u2013 $[Y]", "$[amount]"],
    ["Low", "[#]", "$[X] \u2013 $[Y]", "$[amount]"],
    ["TOTAL", "[#]", "$[X] \u2013 $[Y]", "$[amount]"],
  ],
  [2340, 2340, 2340, 2340]
));
children.push(emptyLine());

children.push(para("**Section 3: Key Developments**"));
children.push(para("This section contains a narrative summary of material developments during the reporting period, including:"));
children.push(...bulletList([
  "New matters opened",
  "Matters resolved or settled",
  "Significant changes in risk rating or exposure",
  "Upcoming deadlines or decisions requiring executive action",
  "Trends or recurring issues warranting attention",
]));

children.push(para("**Section 4: Legal Spend Summary**"));
children.push(simpleTable(
  ["Category", "YTD Actual", "YTD Budget", "Variance", "Forecast"],
  [
    ["Litigation", "$[X]", "$[X]", "$[X]", "$[X]"],
    ["Transactional", "$[X]", "$[X]", "$[X]", "$[X]"],
    ["Regulatory/Compliance", "$[X]", "$[X]", "$[X]", "$[X]"],
    ["TOTAL", "$[X]", "$[X]", "$[X]", "$[X]"],
  ],
  [2200, 1790, 1790, 1790, 1790]
));
children.push(emptyLine());

children.push(para("**Section 5: Action Items**"));
children.push(para("Decisions or approvals requested from executive leadership or the Board, with recommended actions and deadlines."));

// ============================================================
// ATTACHMENT C: OUTSIDE COUNSEL BILLING GUIDELINES
// ============================================================
children.push(pageBreak());
children.push(sectionHeader("Attachment C: Outside Counsel Billing Guidelines"));
children.push(para(
  "These guidelines apply to all outside counsel retained by PIR Industrial LLC (the \u201CCompany\u201D). Outside counsel are expected to review and adhere to these guidelines as a condition of engagement. The Legal Department reserves the right to modify these guidelines at any time."
));

children.push(subHeader("1. Billing Rates"));
children.push(...bulletList([
  "Rate schedules must be agreed upon in writing prior to commencement of work.",
  "Annual rate increases, if any, must be approved in advance by the General Counsel.",
  "Maximum hourly rates by level: Partner: $[X]/hr; Senior Associate: $[X]/hr; Associate: $[X]/hr; Paralegal: $[X]/hr.",
  "Blended or alternative fee arrangements are encouraged for appropriate matters and must be approved by the General Counsel.",
]));

children.push(subHeader("2. Staffing Requirements"));
children.push(...bulletList([
  "Matters must be staffed efficiently. The Company expects lean staffing appropriate to the complexity of the matter.",
  "The responsible partner must be identified in the engagement letter and may not be changed without prior approval.",
  "Work should be delegated to the lowest-cost attorney capable of performing it competently.",
  "The Company will not pay for more than two attorneys attending the same deposition, hearing, or meeting without prior approval.",
  "Summer associates and first-year associates may not bill time to Company matters without prior approval.",
]));

children.push(subHeader("3. Billing Format and Requirements"));
children.push(...bulletList([
  "Invoices must be submitted monthly, within 45 days of the end of the billing period.",
  "Each invoice must include: matter name and number, description of services by timekeeper, hours worked, hourly rate, and total fees.",
  "Time entries must be recorded in increments of no greater than one-tenth (0.1) of an hour.",
  "Block billing (grouping multiple tasks into a single time entry) is prohibited.",
  "Vague descriptions (e.g., \u201Cresearch,\u201D \u201Creview documents,\u201D \u201Cattend to matter\u201D) are not acceptable. Each entry must describe the specific work performed.",
]));

children.push(subHeader("4. Prohibited Charges"));
children.push(para("The following charges will not be reimbursed:"));
children.push(...bulletList([
  "Internal administrative and overhead costs (word processing, secretarial support, filing, copying for internal use)",
  "Database or legal research service access fees (e.g., Westlaw, LexisNexis subscriptions)",
  "Travel time (unless pre-approved in writing for out-of-jurisdiction matters)",
  "First-class or business-class airfare",
  "Alcohol",
  "Charges for internal firm meetings, training, or professional development",
  "Rush charges for printing, copying, or courier services not requested by the Company",
]));

children.push(subHeader("5. Expense Pre-Approval"));
children.push(para("The following expenses require written pre-approval from the Department:"));
children.push(...bulletList([
  "Expert witnesses and consultants",
  "Travel and lodging",
  "Outsourced discovery or document review services",
  "Filing fees exceeding $1,000",
  "Any single expense exceeding $2,500",
]));

children.push(subHeader("6. Matter Budgets"));
children.push(...bulletList([
  "A matter budget is required at the outset of each engagement, broken down by phase of work.",
  "The budget must be approved by the Department before substantive work begins.",
  "If actual spend is projected to exceed the approved budget by more than 15%, outside counsel must notify the Department in writing and obtain approval for a revised budget before incurring additional charges.",
  "Quarterly budget-to-actual reports must be submitted with each invoice.",
]));

children.push(subHeader("7. Reporting Requirements"));
children.push(para("Outside counsel must provide:"));
children.push(...bulletList([
  "Monthly status reports summarizing activity, developments, and next steps",
  "Prompt notification of any material development (adverse ruling, settlement demand, deadline change)",
  "Quarterly budget-to-actual analysis",
  "Early case assessment within 30 days of engagement, including estimated exposure range, recommended strategy, and projected timeline",
]));

children.push(subHeader("8. Invoice Review and Payment"));
children.push(...bulletList([
  "All invoices are subject to review and adjustment by the Department.",
  "The Company reserves the right to reduce or reject charges that do not comply with these guidelines.",
  "Payment terms are net 60 days from receipt of a compliant invoice.",
  "Disputes regarding invoice adjustments will be resolved through discussion between the General Counsel and the responsible partner.",
]));

children.push(subHeader("9. Conflicts and Confidentiality"));
children.push(...bulletList([
  "Outside counsel must disclose any actual or potential conflicts of interest prior to engagement.",
  "All Company information must be treated as confidential and may not be disclosed without written authorization.",
  "Outside counsel may not issue press releases, publish articles, or make public statements regarding Company matters without prior written consent.",
]));

// ============================================================
// BUILD DOCUMENT
// ============================================================

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
          {
            level: 1,
            format: LevelFormat.BULLET,
            text: "\u2013",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "numbers2",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "PIR Industrial LLC \u2013 Legal Department Operations Manual",
                  font: FONT,
                  size: 18,
                  italics: true,
                  color: "666666",
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", font: FONT, size: 18 }),
                new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18 }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = "/Users/william/Downloads/Legal Department Operations Manual - Complete.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log("Document created: " + outputPath);
});
