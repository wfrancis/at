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
children.push(para("Litigation reporting is integrated with the Legal Risk Tracker and the Legal Risk Dashboard (see Section 10 and Attachment B)."));

children.push(subHeader("Post-Litigation Review"));
children.push(para(
  "Upon resolution of significant matters, the Department conducts a post-litigation review to identify lessons learned and opportunities for process improvement. This review may include evaluation of outside counsel performance, assessment of litigation outcomes relative to initial exposure estimates, and identification of recurring issues that may warrant changes to lease forms, operational procedures, or risk management practices."
));

// ------ SECTION 7: CORPORATE GOVERNANCE & ENTITY MANAGEMENT ------
children.push(pageBreak());
children.push(sectionHeader("7. Corporate Governance & Entity Management"));
children.push(para(
  "The Legal Department is responsible for overseeing the Company\u2019s corporate governance framework, maintaining " +
  "accurate and complete records for all legal entities within the Company\u2019s organizational structure, ensuring " +
  "continuous compliance with the Internal Revenue Code (\u201CIRC\u201D) requirements for real estate investment trust " +
  "(\u201CREIT\u201D) qualification under IRC Sections 856 through 860, and coordinating with Finance and external advisors " +
  "on all SEC reporting obligations. These procedures are designed to satisfy the governance, compliance, and " +
  "reporting standards expected by the Company\u2019s credit facility lenders, joint venture partners, and regulatory authorities."
));
children.push(para("These procedures are intended to:"));
children.push(...bulletList([
  "Ensure continuous compliance with REIT qualification requirements under IRC Sections 856\u2013860",
  "Maintain accurate records of entity structure, authority, and ownership across all jurisdictions",
  "Support financing, transactional, and operational needs, including credit facility covenant compliance",
  "Preserve institutional knowledge of the Company\u2019s legal structure",
  "Coordinate with Finance on SEC periodic reporting obligations (Forms 10-K, 10-Q, and 8-K)",
  "Provide a framework for internal reporting of compliance concerns, including whistleblower protections",
]));

children.push(subHeader("A. Entity Management"));
children.push(para(
  "The Legal Department maintains a centralized record of all Company entities in the Company\u2019s dedicated entity " +
  "management system (\u201CEntity Management System\u201D). The Entity Management System shall be a purpose-built platform " +
  "(e.g., Diligent Entities, CSC Entity Management, or equivalent) and shall serve as the single authoritative " +
  "source for all entity-related data. Spreadsheet-based tracking is not an acceptable primary repository for entity records."
));
children.push(para("The Entity Management System shall contain, at a minimum, the following information for each entity:"));
children.push(...bulletList([
  "Legal entity name, entity type (LLC, LP, corporation, trust, etc.), and EIN/tax identification number",
  "Jurisdiction of formation and date of formation",
  "Current ownership structure, including ownership percentages and organizational charts",
  "Governing documents (e.g., operating agreements, limited partnership agreements, bylaws, declarations of trust)",
  "Registered agent name, address, and contact information for each jurisdiction of qualification",
  "Principal office address and service of process address",
  "Current good standing status in jurisdiction of formation and each jurisdiction of qualification",
  "Officers, managers, directors, and authorized signatories, including dates of appointment and removal",
  "Material intercompany agreements and loans",
]));
children.push(para("The Legal Department is responsible for coordinating the following entity actions:"));
children.push(...bulletList([
  "Entity formation and dissolution, including preparation of all organizational documents and filings",
  "Amendments to governing documents, subject to required approvals under the delegation of authority framework",
  "Intercompany restructuring, mergers, and conversions",
  "Foreign qualification and withdrawal filings",
  "Changes to registered agents or registered offices",
]));

children.push(subHeader("B. Entity Record Annual Review and Attestation"));
children.push(para(
  "The Legal Department shall conduct a comprehensive annual review of all entity records no later than the end " +
  "of the first quarter of each calendar year. The annual review shall include the following procedures:"
));
children.push(...numberedList([
  "The Legal Department shall generate a complete entity register from the Entity Management System, listing " +
  "every active entity, its jurisdiction of formation, jurisdictions of qualification, registered agent, and current good standing status.",
  "The Legal Department shall compare the entity register against the Company\u2019s tax records, organizational charts, " +
  "and financial statements to identify any discrepancies, missing entities, or stale records.",
  "For each entity, the Legal Department shall verify that (a) governing documents on file are current and reflect " +
  "all amendments, (b) ownership records match the Company\u2019s capitalization records and tax filings, (c) officer " +
  "and manager lists are current, and (d) registered agent information is accurate.",
  "The Legal Department shall prepare a written Entity Records Attestation Report summarizing the results of the " +
  "annual review, identifying any deficiencies and corrective actions taken or planned.",
  "The General Counsel shall sign the Entity Records Attestation Report and deliver a copy to the Chief Financial " +
  "Officer and the Board (or applicable governing body) no later than April 30 of each year.",
]));
children.push(para(
  "In addition to the annual review, entity records must be updated promptly upon the occurrence of any material " +
  "event, including but not limited to an acquisition, disposition, financing, refinancing, joint venture formation, " +
  "or restructuring."
));

children.push(subHeader("C. Governance Documentation"));
children.push(para("The Legal Department maintains and organizes governance records, including:"));
children.push(...bulletList([
  "Member, manager, and board approvals and meeting minutes",
  "Written consents and resolutions (including unanimous written consents in lieu of meetings)",
  "Officer, manager, and director appointments and removals",
  "Delegation of authority documentation",
  "Annual conflict-of-interest questionnaires and disclosures",
  "Related-party transaction approvals and documentation",
]));
children.push(para(
  "All governance actions must be properly documented and retained in the Company\u2019s document management system " +
  "(SharePoint). The Department maintains the Governance Calendar described in Section 7.H below to track " +
  "recurring approval requirements, annual meeting obligations, board deliverables, and filing deadlines."
));

children.push(subHeader("D. Authority and Approvals"));
children.push(para(
  "The Legal Department supports the implementation and maintenance of the Company\u2019s delegation of authority " +
  "framework (see Attachment A: Delegation of Authority Matrix)."
));
children.push(para("Responsibilities include:"));
children.push(...bulletList([
  "Confirming authority for execution of contracts, leases, loan documents, and conveyance instruments",
  "Coordinating approvals for material transactions, including transactions that require board-level or member-level consent",
  "Maintaining records of authorized signatories, including specimen signature cards where required by lenders or title companies",
  "Verifying that approval thresholds are followed prior to document execution",
  "Coordinating with the Acquisitions Department and Asset Management on authority requirements for acquisition, disposition, and financing transactions",
]));
children.push(para(
  "The Department will circulate an updated list of authorized signatories to all relevant departments, including " +
  "Finance, Asset Management, the Acquisitions Department, and Property Management, no less than annually and " +
  "within five (5) business days of any change in authorized personnel."
));

children.push(subHeader("E. REIT Compliance Monitoring"));
children.push(para(
  "The Company has elected to be taxed as a REIT under the Internal Revenue Code. Maintenance of REIT qualification " +
  "is an existential requirement. Loss of REIT status would subject the Company to corporate-level federal income " +
  "tax and could trigger defaults under the Company\u2019s credit facilities and joint venture agreements. The Legal " +
  "Department, in coordination with Finance and the Company\u2019s external tax advisors, is responsible for monitoring " +
  "and supporting compliance with the following REIT qualification requirements:"
));
children.push(para("**Asset Tests (IRC Section 856(c)(4)).**"));
children.push(...bulletList([
  "At the close of each calendar quarter, at least 75% of the value of the Company\u2019s total assets must consist of real estate assets, cash, cash items, and government securities (the \u201C75% Asset Test\u201D).",
  "Not more than 25% of the value of the Company\u2019s total assets may consist of securities other than those qualifying under the 75% Asset Test.",
  "Not more than 5% of the value of the Company\u2019s total assets may consist of the securities of any one issuer (other than a TRS or a qualified REIT subsidiary), and the Company may not hold more than 10% of the outstanding voting securities or 10% of the total value of the outstanding securities of any one issuer (the \u201C5%/10% Asset Tests\u201D).",
  "The aggregate value of all taxable REIT subsidiary (\u201CTRS\u201D) securities held by the Company may not exceed 20% of the value of the Company\u2019s total assets.",
]));
children.push(para("**Gross Income Tests (IRC Section 856(c)(2) and (3)).**"));
children.push(...bulletList([
  "At least 75% of the Company\u2019s gross income for each taxable year must be derived from rents from real property, interest on obligations secured by mortgages on real property, gain from the sale of real property, dividends from other REITs, and other qualifying real estate income (the \u201C75% Gross Income Test\u201D).",
  "At least 95% of the Company\u2019s gross income for each taxable year must be derived from sources that satisfy the 75% Gross Income Test plus dividends, interest, and gain from the sale of securities (the \u201C95% Gross Income Test\u201D).",
  "The Legal Department shall coordinate with Finance to ensure that rents from real property satisfy the requirements of IRC Section 856(d), including limitations on impermissible tenant services, related-party rents, and personal property rent components exceeding 15% of total rent.",
]));
children.push(para("**Distribution Requirements (IRC Section 857(a)).**"));
children.push(...bulletList([
  "The Company must distribute to its shareholders at least 90% of its REIT taxable income (determined without regard to the dividends-paid deduction and excluding net capital gains) for each taxable year.",
  "The Legal Department shall coordinate with Finance to verify that distribution calculations are completed no later than sixty (60) days after the close of each taxable year and that required distributions are declared and paid within the time limits prescribed by IRC Section 857.",
  "The Legal Department shall monitor compliance with the preferential dividend rules and consent dividend procedures as applicable.",
]));
children.push(para("**Organizational Requirements (IRC Section 856(a) and (b)).**"));
children.push(...bulletList([
  "The Company must be managed by one or more trustees or directors.",
  "The beneficial ownership of the Company must be evidenced by transferable shares or certificates.",
  "The Company must have at least 100 shareholders for at least 335 days of each taxable year of 12 months (the \u201C100 Shareholder Test\u201D).",
  "No more than 50% of the value of the outstanding shares of the Company may be owned, directly or constructively, by five or fewer individuals during the last half of any taxable year (the \u201C5/50 Test\u201D).",
]));
children.push(para(
  "The Legal Department shall maintain a REIT Compliance Checklist, updated quarterly in coordination with Finance " +
  "and external tax counsel. Any potential or actual REIT compliance failure must be reported immediately to the " +
  "General Counsel and the Chief Financial Officer, and a remediation plan must be developed within five (5) " +
  "business days of identification."
));

children.push(subHeader("F. State Filing Requirements and Remediation"));
children.push(para(
  "The Legal Department, in coordination with the Company\u2019s external registered agent service provider, is responsible " +
  "for ensuring timely filing of all required state-level filings for each Company entity. State filings fall into " +
  "the following categories:"
));
children.push(para("**Annual Reports and Statements of Information.**"));
children.push(...bulletList([
  "Annual reports, biennial reports, or statements of information required by each state in which an entity is formed or qualified to do business.",
  "Deadlines and requirements vary by state. The Legal Department shall maintain a master state filing calendar within the Entity Management System, with automated reminders set no fewer than sixty (60) days and thirty (30) days prior to each filing deadline.",
]));
children.push(para("**Franchise Tax and Business Tax Filings.**"));
children.push(...bulletList([
  "Franchise tax returns, gross receipts tax filings, and similar state-level business tax filings required as a condition of maintaining good standing (e.g., Delaware annual franchise tax, Texas franchise tax, California LLC annual tax).",
  "The Legal Department shall coordinate with Finance and the Company\u2019s external tax advisors to ensure timely preparation and payment of all franchise tax obligations.",
]));
children.push(para("**Foreign Qualification and Withdrawal Filings.**"));
children.push(...bulletList([
  "Applications for authority to transact business in states where a Company entity owns real property, maintains an office, or otherwise conducts activities requiring qualification.",
  "Certificates of withdrawal or cancellation when an entity ceases operations in a state.",
  "The Legal Department shall review foreign qualification requirements whenever the Company acquires or disposes of property in a new jurisdiction or commences operations in a jurisdiction where it is not currently qualified.",
]));
children.push(para("**Registered Agent and Registered Office Changes.**"));
children.push(...bulletList([
  "Filings required to update registered agent or registered office information with the applicable Secretary of State.",
]));
children.push(para(
  "**Procedure for Missed or Late State Filings.** In the event that a state filing deadline is missed or a filing " +
  "is submitted late, the following remediation procedure shall apply:"
));
children.push(...numberedList([
  "The responsible Legal Department team member shall notify the General Counsel immediately upon discovering a missed or late filing.",
  "Within two (2) business days, the Legal Department shall determine the cause of the missed filing, assess whether the entity\u2019s good standing has been affected, and identify any penalties, interest, or other consequences.",
  "Within five (5) business days, the Legal Department shall prepare and submit the delinquent filing, together with any required penalties or late fees.",
  "If the entity\u2019s good standing has been revoked or suspended, the Legal Department shall initiate reinstatement proceedings immediately and shall notify the Chief Financial Officer and any lenders or counterparties who require good standing certifications under applicable loan agreements or contracts.",
  "The Legal Department shall prepare a written incident report documenting the missed filing, root cause, remediation steps taken, and preventive measures implemented. The incident report shall be retained in the Entity Management System and reviewed as part of the quarterly compliance review.",
  "The General Counsel shall report any missed filing that results in loss of good standing or material penalty to executive leadership within five (5) business days of discovery.",
]));

children.push(subHeader("G. SEC Reporting Coordination"));
children.push(para(
  "The Legal Department supports the Company\u2019s SEC reporting obligations in coordination with Finance, external " +
  "auditors, and outside securities counsel. The Legal Department\u2019s responsibilities include:"
));
children.push(...bulletList([
  "Reviewing and providing legal input on the Company\u2019s Annual Report on Form 10-K, including the legal proceedings disclosure (Item 3), risk factor updates (Item 1A), and legal contingency footnotes.",
  "Reviewing and providing legal input on the Company\u2019s Quarterly Reports on Form 10-Q, including updates to legal proceedings and contingency disclosures.",
  "Coordinating preparation and filing of Current Reports on Form 8-K for reportable events, including material definitive agreements, acquisitions and dispositions of assets, creation of direct financial obligations, changes in control, and departure or appointment of directors or principal officers.",
  "Maintaining a log of potential 8-K triggering events and monitoring business activities across departments (including the Acquisitions Department, Finance, and Asset Management) to identify reportable events promptly.",
  "Supporting the preparation and review of proxy statements, information statements, and other SEC filings as required.",
  "Coordinating with outside securities counsel on Section 16 filings (Forms 3, 4, and 5) for directors, officers, and beneficial owners.",
]));
children.push(para(
  "The Legal Department shall participate in the Company\u2019s disclosure committee (or equivalent review process) and " +
  "shall maintain a SEC Reporting Calendar with all periodic filing deadlines, earnings release dates, and " +
  "blackout periods."
));

children.push(subHeader("H. Governance and Compliance Calendars"));
children.push(para(
  "The Legal Department shall maintain two integrated calendars to track all recurring governance and compliance " +
  "obligations: the Governance Calendar and the REIT Compliance Calendar. Both calendars shall be maintained in " +
  "the Entity Management System with automated alerts and shall be reviewed at the quarterly Finance Coordination " +
  "meeting described in Section 9."
));
children.push(para("**Governance Calendar.** The Governance Calendar shall include, at a minimum:"));
children.push(...bulletList([
  "Annual meeting dates (or deadlines for written consents in lieu of meetings) for all entities requiring annual governance actions",
  "Board and committee meeting schedules and deliverable deadlines",
  "Annual officer and manager appointment or reappointment deadlines",
  "Annual conflict-of-interest questionnaire distribution and collection deadlines",
  "Delegation of authority review and recirculation date",
  "Authorized signatory list update and distribution date",
  "Entity Records Attestation Report deadline (April 30)",
  "Annual insurance renewal review coordination with Risk Management",
  "SEC filing deadlines (10-K, 10-Q, 8-K, proxy materials) coordinated with Finance",
]));
children.push(para("**REIT Compliance Calendar.** The REIT Compliance Calendar shall include, at a minimum:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Item", "Frequency", "Responsible Parties", "Deadline / Timing"],
  [
    ["Asset Test Compliance Review (75%, 5%/10%, TRS 20%)", "Quarterly", "Finance + Legal + Tax Advisor",
     "Within 30 days after quarter-end"],
    ["Gross Income Test Review (75% and 95%)", "Quarterly", "Finance + Legal + Tax Advisor",
     "Within 30 days after quarter-end"],
    ["Distribution Requirement Calculation", "Annually", "Finance + Legal + Tax Advisor",
     "Within 60 days after taxable year-end"],
    ["100 Shareholder Test Verification", "Annually", "Finance + Transfer Agent",
     "Prior to year-end (335-day count)"],
    ["5/50 Ownership Concentration Test", "Semi-annually", "Finance + Transfer Agent",
     "Last half of each taxable year"],
    ["TRS Activity and Income Review", "Quarterly", "Finance + Legal + Tax Advisor",
     "Within 30 days after quarter-end"],
    ["Related-Party Rent Review (IRC 856(d))", "Quarterly", "Finance + Legal + Tax Advisor",
     "Within 30 days after quarter-end"],
    ["Impermissible Tenant Service Income Review", "Quarterly", "Finance + Legal + Asset Mgmt",
     "Within 30 days after quarter-end"],
    ["Prohibited Transaction Screen (IRC 857(b)(6))", "Per transaction", "Legal + Tax Advisor",
     "Prior to closing of each disposition"],
    ["Annual REIT Compliance Certification", "Annually", "General Counsel + CFO",
     "Within 90 days after taxable year-end"],
    ["State Filing Compliance Review", "Quarterly", "Legal + Registered Agent",
     "15th day of month following quarter-end"],
    ["Good Standing Certificate Collection", "Annually", "Legal + Registered Agent",
     "No later than March 31"],
  ],
  [3000, 1500, 2200, 2660]
));
children.push(emptyLine());

children.push(subHeader("I. Whistleblower and Internal Compliance Reporting"));
children.push(para(
  "The Company is committed to maintaining an environment in which employees, officers, contractors, and other " +
  "stakeholders can report suspected violations of law, regulation, Company policy, or ethical standards without " +
  "fear of retaliation. The Legal Department administers the following internal reporting mechanisms:"
));
children.push(para("**Reporting Channels.** Reports may be submitted through any of the following channels:"));
children.push(...bulletList([
  "Directly to the General Counsel or any attorney in the Legal Department, in person, by telephone, or by email",
  "Through the Company\u2019s anonymous ethics and compliance hotline (telephone and web-based intake), which is operated by an independent third-party provider",
  "In writing to the Chair of the Audit Committee of the Board (or applicable governing body), delivered via the Company\u2019s registered office address marked \u201CConfidential \u2013 Audit Committee\u201D",
]));
children.push(para("**Scope of Reportable Matters.** The following categories of concerns are reportable under this procedure:"));
children.push(...bulletList([
  "Suspected fraud, embezzlement, or financial irregularities",
  "Violations of securities laws, REIT compliance requirements, or tax laws",
  "Violations of the Company\u2019s Code of Business Conduct and Ethics",
  "Suspected violations of environmental, health, or safety regulations",
  "Suspected violations of Fair Housing laws, the Americans with Disabilities Act (\u201CADA\u201D), or other anti-discrimination laws applicable to the Company\u2019s properties and operations",
  "Conflicts of interest or related-party transactions not properly disclosed",
  "Retaliation against any person who has made a good-faith report under this procedure",
]));
children.push(para("**Investigation and Resolution.**"));
children.push(...numberedList([
  "All reports shall be logged by the Legal Department (or the third-party hotline provider) and assigned a tracking number within one (1) business day of receipt.",
  "The General Counsel shall conduct an initial assessment within five (5) business days to determine the nature, severity, and appropriate scope of investigation.",
  "Matters involving financial reporting, accounting fraud, or auditing concerns shall be referred to the Audit Committee or its designee.",
  "The Legal Department shall oversee or coordinate the investigation, engaging outside counsel or forensic specialists as appropriate.",
  "Upon completion of the investigation, the Legal Department shall prepare a written report of findings and recommended corrective actions.",
  "The General Counsel shall report the status of all open and recently closed investigations to the Audit Committee (or applicable governing body) no less than quarterly.",
]));
children.push(para("**Non-Retaliation.**"));
children.push(para(
  "The Company prohibits retaliation against any individual who makes a good-faith report under this procedure or " +
  "who participates in an investigation. Any employee found to have engaged in retaliation shall be subject to " +
  "disciplinary action, up to and including termination. The Legal Department shall include non-retaliation " +
  "protections in the Company\u2019s employee handbook and shall address whistleblower protections in annual compliance training."
));

// ------ SECTION 8: CONFIDENTIALITY & INFORMATION HANDLING ------
children.push(pageBreak());
children.push(sectionHeader("8. Confidentiality & Information Handling"));
children.push(para(
  "The Legal Department handles sensitive and confidential information, including privileged communications, " +
  "litigation materials, proprietary business information, tenant personal information, and regulatory compliance " +
  "records. Proper handling of such information is critical to protecting the Company\u2019s legal position, maintaining " +
  "confidentiality obligations, and ensuring compliance with applicable privacy, fair housing, and anti-discrimination laws."
));

children.push(subHeader("A. Document Classification Levels"));
children.push(para(
  "All documents and communications generated, received, or maintained by the Legal Department shall be classified " +
  "according to one of the following four classification levels. The classification level determines the handling, " +
  "storage, distribution, and disposal requirements applicable to the document."
));
children.push(emptyLine());
children.push(simpleTable(
  ["Classification Level", "Definition", "Handling Requirements"],
  [
    ["PRIVILEGED",
     "Attorney-client privileged communications and attorney work product",
     "Restricted to Legal Department and specifically authorized recipients; must bear privilege header; " +
     "may not be forwarded outside the Company without General Counsel approval; stored in access-controlled " +
     "folders within SharePoint with audit logging enabled"],
    ["CONFIDENTIAL",
     "Non-privileged information that is commercially sensitive, including transaction terms, tenant financial " +
     "data, litigation settlement amounts, REIT compliance data, personnel matters, and whistleblower reports",
     "Distribution limited to individuals with a documented business need; must bear \u201CCONFIDENTIAL\u201D marking; " +
     "stored in access-controlled SharePoint folders; may not be transmitted to external parties without " +
     "General Counsel or authorized officer approval"],
    ["INTERNAL",
     "Information intended for internal Company use that is not publicly available but does not rise to the " +
     "level of Confidential, including internal policies, standard form agreements, and general legal updates",
     "May be shared within the Company without restriction; stored in SharePoint; should not be shared " +
     "externally without department-head approval"],
    ["PUBLIC",
     "Information that has been approved for public disclosure, including SEC filings, press releases, " +
     "and publicly recorded documents",
     "No distribution restrictions; stored in SharePoint and applicable public filing systems"],
  ],
  [2000, 3680, 3680]
));
children.push(emptyLine());
children.push(para(
  "All Legal Department personnel are responsible for applying the appropriate classification level to documents " +
  "and communications at the time of creation. When in doubt as to the proper classification, the document shall " +
  "be treated as CONFIDENTIAL pending review by the General Counsel or a designated attorney."
));

children.push(subHeader("B. Confidential Information"));
children.push(para("Confidential information includes, but is not limited to:"));
children.push(...bulletList([
  "Legal advice and attorney-client communications (classified as PRIVILEGED)",
  "Litigation strategy, work product, and settlement discussions",
  "Tenant disputes, negotiations, and tenant financial information",
  "Regulatory matters, governmental inquiries, and examination materials",
  "Transaction-related information, including acquisition and disposition terms, due diligence materials, and financing documents",
  "REIT compliance data, including asset test calculations, income test analyses, and distribution computations",
  "Employee and personnel matters, including whistleblower reports and investigation files",
  "Fair housing complaint files, ADA accommodation requests, and anti-discrimination investigation records",
  "Tenant personal information, including financial statements, tax returns, and guarantor information submitted in connection with leasing",
]));

children.push(subHeader("C. Attorney-Client Privilege"));
children.push(para(
  "Communications involving the Legal Department that are intended to provide or request legal advice may be " +
  "protected by attorney-client privilege. Preservation of attorney-client privilege is essential to the Company\u2019s " +
  "ability to receive candid legal advice and to protect its legal positions."
));
children.push(para("All employees shall adhere to the following privilege preservation requirements:"));
children.push(...bulletList([
  "Limit distribution of privileged communications to only those individuals who have a need to receive the legal advice",
  "Do not forward privileged emails to any person outside the Company, or to any person inside the Company who is not an intended recipient, without prior approval from the Legal Department",
  "Do not copy or summarize privileged legal advice in non-privileged documents (e.g., board presentations, internal memoranda to non-legal personnel) without first consulting with the Legal Department",
  "Clearly label all privileged communications with the required header at the top of the document or email",
  "Do not discuss privileged legal advice in the presence of third parties, including consultants, vendors, or joint venture partners, unless the Legal Department has confirmed that a common-interest or joint-defense privilege applies",
]));
children.push(para(
  "Privileged communications shall be labeled with the following header: \u201CPRIVILEGED AND CONFIDENTIAL \u2013 " +
  "ATTORNEY-CLIENT COMMUNICATION. This communication is protected by the attorney-client privilege and/or the " +
  "work product doctrine. Do not forward, copy, or disclose without the prior authorization of the Legal Department.\u201D"
));
children.push(para(
  "The Legal Department will conduct privilege preservation training for all employees no less than annually and " +
  "will issue written guidance on privilege protocols to new employees as part of the onboarding process."
));

children.push(subHeader("D. Digital Communications and Information Security"));
children.push(para(
  "The following procedures apply to the handling of Privileged and Confidential information in digital " +
  "communications, including email, instant messaging platforms, video conferencing, and cloud-based collaboration tools:"
));
children.push(...numberedList([
  "**Email.** Privileged and Confidential information shall be transmitted via the Company\u2019s approved email system only. " +
  "Employees shall not use personal email accounts to transmit or receive Privileged or Confidential information. " +
  "Emails containing Privileged information must include the privilege header. Emails containing Confidential " +
  "information must include \u201CCONFIDENTIAL\u201D in the subject line.",
  "**Instant Messaging and Collaboration Platforms.** Privileged legal advice shall not be communicated via instant " +
  "messaging platforms (e.g., Microsoft Teams chat, Slack) unless the platform has been approved by the Legal " +
  "Department and IT for privileged communications and retains messages in accordance with the Company\u2019s retention " +
  "policies. Confidential information may be shared on approved platforms only in channels with access restricted " +
  "to authorized personnel.",
  "**Video Conferencing.** When discussing Privileged or Confidential matters via video conference, participants shall " +
  "verify attendee identity, use password-protected meetings, disable recording unless the Legal Department has " +
  "approved recording for the specific meeting, and ensure that no unauthorized individuals are present in the " +
  "physical meeting space.",
  "**Cloud Storage and File Sharing.** Privileged and Confidential documents shall be stored only in approved, " +
  "access-controlled repositories (SharePoint, ShareFile). Documents shall not be uploaded to personal cloud " +
  "storage accounts (e.g., personal Dropbox, Google Drive) or shared via unapproved file-sharing services. " +
  "Links to Confidential documents shall be set to expire and shall require Company credentials for access.",
  "**Mobile Devices.** Employees who access Privileged or Confidential information on mobile devices must comply with " +
  "the Company\u2019s mobile device management (\u201CMDM\u201D) policy, including device encryption, passcode requirements, and " +
  "remote wipe capability.",
]));

children.push(subHeader("E. Document Handling and Storage"));
children.push(para(
  "All legal documents must be stored exclusively in approved systems (SharePoint or ShareFile, as designated by " +
  "document type) and must not be stored on local hard drives, personal devices, or unauthorized cloud storage " +
  "platforms. Access to sensitive materials must be restricted to individuals with a documented business need, " +
  "and access permissions must be reviewed quarterly by the Legal Department."
));
children.push(para("The Department maintains the following document storage requirements:"));
children.push(...bulletList([
  "All privileged and litigation-related materials must be stored in a segregated SharePoint site collection " +
  "(\u201CPrivileged Legal Site\u201D) with access restricted to Legal Department personnel, authorized executive " +
  "leadership, and engaged outside counsel (see Section 8.5(H) for SharePoint segmentation requirements)",
  "General legal files (non-privileged) are stored in the standard Legal Department SharePoint library with " +
  "department-level access controls",
  "Executed lease documents are stored in ShareFile with access limited to Legal and Asset Management personnel",
  "No legal documents may be stored in personal email folders, desktop folders, USB drives, or personal cloud " +
  "storage accounts (e.g., personal Dropbox, Google Drive, or iCloud)",
]));
children.push(para(
  "Document retention periods and destruction procedures are governed by Section 8.5 of this Manual. All " +
  "personnel must comply with applicable litigation holds, which supersede any retention schedule (see Section 8.5(C))."
));

children.push(subHeader("F. Fair Housing, ADA, and Anti-Discrimination Compliance"));
children.push(para(
  "The Company\u2019s properties and operations are subject to federal, state, and local fair housing, accessibility, " +
  "and anti-discrimination laws, including without limitation the Fair Housing Act (42 U.S.C. \u00a7\u00a7 3601\u20133619), the " +
  "Americans with Disabilities Act (\u201CADA\u201D) (42 U.S.C. \u00a7\u00a7 12101 et seq.), Section 504 of the Rehabilitation Act, " +
  "and applicable state and local human rights laws. The Legal Department is responsible for the following:"
));
children.push(...bulletList([
  "Advising Property Management and Asset Management on fair housing and ADA compliance obligations, including reasonable accommodation and reasonable modification procedures",
  "Reviewing and approving the Company\u2019s fair housing and anti-discrimination policies, marketing materials, and tenant selection criteria to ensure compliance with applicable law",
  "Coordinating the Company\u2019s response to fair housing complaints, HUD complaints, and state or local human rights commission inquiries",
  "Maintaining a log of all fair housing and ADA complaints, requests for accommodation, and related investigations, classified as CONFIDENTIAL",
  "Supporting the Company\u2019s ADA compliance program, including coordination with architects, engineers, and accessibility consultants on ADA surveys, barrier removal plans, and new construction or renovation accessibility requirements",
  "Ensuring that all fair housing and ADA complaint records are retained in accordance with the retention schedule in Section 8.5(A) and are stored in access-restricted SharePoint folders",
  "Including fair housing and anti-discrimination compliance topics in the annual Legal Department training program described in Section 11",
]));

children.push(subHeader("G. External Communications"));
children.push(para("Only personnel authorized by the General Counsel may communicate on behalf of the Company with:"));
children.push(...bulletList([
  "Outside counsel engaged by the Company",
  "Opposing counsel or adverse parties in any legal matter",
  "Regulatory authorities, governmental agencies, and law enforcement",
  "Fair housing agencies, human rights commissions, and the U.S. Department of Housing and Urban Development (\u201CHUD\u201D)",
  "The SEC, state securities regulators, and stock exchange representatives",
  "Media representatives regarding any legal matter or pending litigation",
]));
children.push(para(
  "All external legal communications shall be coordinated through the Legal Department. No employee or officer " +
  "shall respond to a subpoena, civil investigative demand, regulatory inquiry, or governmental request for " +
  "information without first consulting the Legal Department. The Legal Department shall maintain a log of all " +
  "material external legal communications."
));

// ------ SECTION 8.5: DOCUMENT RETENTION & LITIGATION HOLD PROCEDURES ------
children.push(pageBreak());
children.push(sectionHeader("8.5 Document Retention & Litigation Hold Procedures"));
children.push(para(
  "This section establishes the Company\u2019s comprehensive document retention schedule, litigation hold procedures, " +
  "electronic records management requirements, and destruction protocols. These procedures are designed to ensure " +
  "compliance with applicable legal and regulatory obligations, to preserve the Company\u2019s ability to defend its " +
  "interests in litigation, and to protect against spoliation claims."
));

children.push(subHeader("A. Document Retention Schedule"));
children.push(para(
  "The following retention schedule applies to all Company records, regardless of format (paper, electronic, or " +
  "other media). Retention periods are measured from the applicable trigger date specified below. Where multiple " +
  "retention periods may apply to a single document, the longest applicable period governs. This schedule has " +
  "been established in consideration of applicable statutes of limitation, regulatory requirements, and business " +
  "needs, as identified in the Regulatory Basis column."
));
children.push(emptyLine());
children.push(simpleTable(
  ["Document Category", "Retention Period", "Trigger Date", "Regulatory Basis", "Storage Location"],
  [
    ["Executed Leases", "Life of lease + 7 years", "Lease expiration or termination",
     "State statutes of limitation; IRS record requirements (26 CFR \u00a71.6001-1)", "ShareFile"],
    ["Lease Drafts and Negotiation Files", "Until final version is executed, then destroy",
     "Execution of final lease", "Privilege preservation; work product protection", "SharePoint (Privileged Legal Site)"],
    ["Litigation Files", "Life of matter + 10 years", "Final resolution (judgment, settlement, or dismissal)",
     "State statutes of limitation for malpractice; insurance policy requirements", "SharePoint (Privileged Legal Site)"],
    ["Corporate Governance Records (formation documents, bylaws, operating agreements, resolutions)",
     "Permanent", "N/A", "State corporate/LLC statutes; IRS requirements", "SharePoint"],
    ["Board Minutes and Consents", "Permanent", "N/A",
     "State corporate governance requirements; fiduciary obligations", "SharePoint"],
    ["Tax Records and Returns", "7 years", "Date of filing or payment, whichever is later",
     "26 U.S.C. \u00a76501 (IRS statute of limitations); state equivalents", "SharePoint / Finance"],
    ["Outside Counsel Invoices", "7 years", "Date of payment",
     "IRS record requirements; audit support", "SharePoint / Finance"],
    ["General Business Correspondence", "5 years", "Date of correspondence",
     "Business records retention best practices", "SharePoint"],
    ["Email Communications", "5 years", "Date of email",
     "Business records retention; ESI management obligations", "Exchange / Archive System"],
    ["Microsoft Teams Messages and Channels", "3 years", "Date of message",
     "ESI management; informal communications preservation obligations", "Teams Compliance Archive"],
    ["Slack Messages (if applicable)", "3 years", "Date of message",
     "ESI management; informal communications preservation obligations", "Slack Enterprise Archive"],
    ["Text Messages (SMS/iMessage) \u2013 Business-Related", "3 years", "Date of message",
     "ESI management; BYOD policy compliance", "Mobile Archive Solution"],
    ["Voicemail Recordings \u2013 Business-Related", "1 year", "Date of recording",
     "Business records retention", "Voicemail Archive"],
    ["Regulatory Filings", "Permanent", "N/A",
     "Regulatory compliance requirements", "SharePoint"],
    ["REIT Compliance Records", "Permanent", "N/A",
     "IRC \u00a7856 et seq.; state REIT statutes", "SharePoint"],
    ["SEC Filings and Support", "Permanent", "N/A",
     "Securities Exchange Act of 1934; SEC rules", "SharePoint"],
    ["Insurance Policies and Certificates", "Life of policy + 10 years", "Policy expiration",
     "Long-tail liability coverage; occurrence-based claims", "SharePoint"],
    ["Environmental Records and Assessments", "Permanent", "N/A",
     "CERCLA; state environmental statutes (no statute of limitations for some claims)", "SharePoint"],
    ["Employment Records", "Termination + 7 years", "Date of termination",
     "Title VII (EEOC); ADEA; state employment laws", "HR System / SharePoint"],
    ["Fair Housing / ADA Complaint Files", "Resolution + 7 years", "Date of final resolution",
     "Fair Housing Act; ADA; state human rights laws", "SharePoint (restricted access)"],
    ["Whistleblower Reports and Investigation Files", "Resolution + 7 years", "Date of final resolution",
     "SOX (if applicable); state whistleblower statutes", "SharePoint (restricted access)"],
    ["Contracts (non-lease)", "Expiration + 7 years", "Contract expiration or termination",
     "State statutes of limitation for contract claims", "SharePoint"],
    ["Real Property Records (deeds, title policies, surveys)", "Permanent", "N/A",
     "Real property law; title defense", "SharePoint / Physical Vault"],
    ["Financial Statements and Audit Reports", "Permanent", "N/A",
     "SEC requirements (if applicable); lender covenants; investor obligations", "Finance System / SharePoint"],
    ["Incident Reports and Safety Records", "Event + 7 years", "Date of incident",
     "OSHA requirements; state workers\u2019 compensation statutes", "SharePoint / Property Mgmt"],
    ["Entity Formation and Qualification Documents", "Life of entity + 7 years", "Entity dissolution or withdrawal",
     "State corporate/LLC statutes", "Entity Mgmt System / SharePoint"],
  ],
  [1800, 1400, 1400, 2160, 1200]
));
children.push(emptyLine());
children.push(para(
  "Records not specifically listed above must be retained for a minimum of five (5) years from the date of " +
  "creation unless a shorter or longer period is required by applicable law or regulation. The General Counsel " +
  "must approve the retention period for any unlisted record category, and such approval must be documented in writing."
));

children.push(subHeader("B. Electronic Records Management"));
children.push(para(
  "The Company generates and receives electronic records across multiple platforms. The following requirements " +
  "apply to the management of all electronically stored information (\u201CESI\u201D):"
));
children.push(...bulletList([
  "**Email.** All business email is retained in the Company\u2019s email archiving system for the retention period " +
  "specified in Section 8.5(A). Employees must not delete emails from the archive system. Personal email accounts " +
  "must not be used for Company business.",
  "**Microsoft Teams.** All Teams messages, including direct messages and channel conversations, are captured by the " +
  "Company\u2019s compliance archiving solution and retained per the schedule in Section 8.5(A). Employees must not use " +
  "personal messaging applications for Company business communications.",
  "**Text Messages (SMS/iMessage).** Business-related text messages must be captured using the Company\u2019s approved " +
  "mobile archiving solution. Employees who use personal devices for Company business must enroll in the Company\u2019s " +
  "mobile device management (MDM) program or approved archiving application.",
  "**Cloud Storage.** Company documents must be stored only in approved cloud platforms (SharePoint, ShareFile). " +
  "Use of personal cloud storage (Dropbox, Google Drive, iCloud, OneDrive personal) for Company business is prohibited.",
  "**Voicemail.** Business voicemails are retained per the schedule in Section 8.5(A). The IT Department is responsible " +
  "for configuring voicemail retention settings in accordance with this policy.",
]));
children.push(para(
  "The Legal Department, in coordination with IT, must conduct an annual audit of electronic records management " +
  "compliance to verify that archiving systems are functioning as required and that retention settings are properly " +
  "configured. Audit results must be documented and retained."
));

children.push(subHeader("C. Litigation Hold Procedures"));
children.push(para(
  "Upon identification of a matter that reasonably may result in litigation, arbitration, governmental investigation, " +
  "or regulatory inquiry, the Legal Department must implement a litigation hold to preserve all potentially relevant " +
  "documents, communications, and ESI. A litigation hold supersedes all retention schedules and destruction protocols " +
  "set forth in this Manual. Failure to implement and enforce a litigation hold may result in spoliation sanctions, " +
  "adverse inferences, and other court-imposed penalties."
));

children.push(para("**C.1. First 48 Hours \u2014 Litigation Response Checklist.** Upon identification of a litigation " +
  "trigger event, the following actions must be completed within forty-eight (48) hours:"));
children.push(...numberedList([
  "The General Counsel (or designee) identifies all potentially relevant custodians, data sources, and document repositories.",
  "The General Counsel (or designee) drafts and issues a written Litigation Hold Notice to all identified custodians, " +
  "specifying: (a) the matter giving rise to the hold; (b) the categories of documents and ESI to be preserved; " +
  "(c) the custodian\u2019s obligation to preserve all potentially relevant materials, including materials on personal " +
  "devices and in personal cloud storage; and (d) the prohibition on destruction, alteration, or deletion of any " +
  "potentially relevant materials.",
  "The Legal Department submits a Litigation Hold \u2013 IT Coordination Form (see Section 8.5(F)) to the IT Department, " +
  "requesting suspension of all automated deletion, archiving, or overwrite processes for data within the scope of the hold.",
  "The Legal Department notifies engaged outside counsel (if any) of the hold and coordinates on preservation scope.",
  "The General Counsel notifies executive leadership as required by Section 9 (Communication & Escalation Protocols).",
  "The Legal Department opens an entry in the Litigation Hold Log (see Section 8.5(G)), recording: hold identification " +
  "number, matter name, date of issuance, custodian list, and scope of preservation.",
], "numbers2"));

children.push(para("**C.2. Custodian Acknowledgment.** Each custodian who receives a Litigation Hold Notice must " +
  "acknowledge receipt in writing (email acknowledgment is sufficient) within seventy-two (72) hours of issuance. " +
  "The acknowledgment must confirm that the custodian:"));
children.push(...bulletList([
  "Has received and read the Litigation Hold Notice",
  "Understands the obligation to preserve all potentially relevant materials",
  "Has identified and is preserving all potentially relevant materials in the custodian\u2019s possession, custody, or " +
  "control, including materials on personal devices and in personal cloud storage accounts",
  "Will not destroy, delete, alter, or modify any potentially relevant materials",
]));

children.push(para("**C.3. Escalation for Non-Acknowledgment.** If a custodian does not acknowledge the Litigation " +
  "Hold Notice within seventy-two (72) hours, the following escalation procedure applies:"));
children.push(...numberedList([
  "The Legal Department issues a second written notice to the custodian, copying the custodian\u2019s direct supervisor, " +
  "reiterating the preservation obligation and requesting immediate acknowledgment.",
  "If no acknowledgment is received within an additional forty-eight (48) hours, the Legal Department escalates to " +
  "the custodian\u2019s department head and Human Resources, requesting direct intervention to obtain compliance.",
  "If the custodian remains non-responsive, the General Counsel directs IT to implement technical preservation " +
  "measures (e.g., imaging the custodian\u2019s devices, placing a hold on the custodian\u2019s email account) and documents " +
  "the non-compliance for potential disciplinary action.",
  "All escalation actions and dates must be recorded in the Litigation Hold Log.",
], "numbers2"));

children.push(para("**C.4. Quarterly Re-Certification.** For all active litigation holds, the Legal Department " +
  "must conduct a quarterly re-certification process:"));
children.push(...bulletList([
  "The Legal Department issues a Re-Certification Notice to all custodians subject to each active hold, reminding " +
  "them of their ongoing preservation obligations and requesting written confirmation of continued compliance.",
  "Custodians must respond to the Re-Certification Notice within fourteen (14) calendar days.",
  "The Legal Department reviews all re-certification responses and documents compliance status in the Litigation Hold Log.",
  "Non-responsive custodians are subject to the escalation procedures set forth in Section 8.5(C.3) above.",
  "The General Counsel reviews the re-certification results and documents any changes to the hold scope, custodian " +
  "list, or preservation requirements.",
]));

children.push(para("**C.5. Scope of Preservation \u2014 Personal Devices and Cloud Storage.** Litigation holds must " +
  "encompass all potentially relevant materials regardless of storage location, including:"));
children.push(...bulletList([
  "All documents and ESI stored on Company systems (email, SharePoint, ShareFile, shared drives, Teams, Slack)",
  "All documents and ESI stored on Company-issued devices (laptops, desktops, tablets, mobile phones)",
  "All business-related documents and ESI stored on personal devices used for Company business, including text " +
  "messages, voicemails, and messaging application content",
  "All documents and ESI stored in personal cloud storage accounts if used for Company business",
  "All hard-copy documents in the custodian\u2019s possession or control",
  "All backup tapes, disaster recovery media, and archived data within the scope of the hold",
]));

children.push(para("**C.6. Integration with Retention Schedule.** An active litigation hold supersedes all retention " +
  "schedule provisions for documents within the scope of the hold. No documents subject to an active litigation hold " +
  "may be destroyed, deleted, or altered, regardless of whether the applicable retention period has expired. The Legal " +
  "Department must cross-reference the Litigation Hold Log against the retention schedule before authorizing any " +
  "document destruction under Section 8.5(D)."));

children.push(subHeader("D. Hold Release and Document Destruction"));
children.push(para("**D.1. Hold Release.** A litigation hold may be released only upon written authorization of the " +
  "General Counsel, following confirmation that:"));
children.push(...bulletList([
  "The underlying matter has been fully resolved (by final judgment, settlement, regulatory closure, or other disposition)",
  "All applicable appeal periods have expired",
  "Outside counsel (if engaged) has confirmed that preservation is no longer required",
  "The release has been documented in the Litigation Hold Log with the date of release and the authorizing attorney",
]));
children.push(para(
  "Upon release of a hold, the Legal Department issues a written Hold Release Notice to all custodians, confirming " +
  "that the preservation obligation has ended and that normal retention schedules resume for the previously held materials."
));

children.push(para("**D.2. Document Destruction Procedures.** Documents that have reached the end of their applicable " +
  "retention period (and are not subject to any active litigation hold) must be destroyed in accordance with the " +
  "following procedures:"));
children.push(...numberedList([
  "The Legal Department prepares a Destruction Authorization Memorandum listing all documents proposed for " +
  "destruction, organized by category, retention period, and storage location.",
  "The General Counsel reviews the proposed destruction list and cross-references it against the Litigation Hold Log " +
  "and any pending or reasonably anticipated litigation, investigation, or regulatory inquiry.",
  "Upon approval, the General Counsel signs the Destruction Authorization Memorandum.",
  "For electronic records: IT executes permanent deletion from all systems, including backups and archives, and " +
  "provides written confirmation of completion.",
  "For physical records: an approved shredding vendor destroys the documents and provides a Certificate of " +
  "Destruction specifying the date, method of destruction, and categories of documents destroyed.",
  "The Legal Department retains the Destruction Authorization Memorandum and all Certificates of Destruction " +
  "permanently as evidence of compliant disposal.",
], "numbers2"));

children.push(subHeader("E. Privacy and Data Protection"));
children.push(para(
  "The Company\u2019s document retention and destruction practices must comply with all applicable federal, state, and " +
  "local privacy and data protection laws, including but not limited to:"
));
children.push(...bulletList([
  "California Consumer Privacy Act (CCPA), Cal. Civ. Code \u00a7\u00a71798.100 et seq., and the California Privacy Rights " +
  "Act (CPRA), to the extent the Company processes personal information of California residents",
  "State data breach notification laws applicable in jurisdictions where the Company operates or holds real property",
  "State data disposal laws requiring secure destruction of records containing personal information",
  "Health Insurance Portability and Accountability Act (HIPAA), to the extent the Company holds protected health " +
  "information in connection with employee benefits or tenant health-related accommodations",
  "Fair Credit Reporting Act (FCRA), to the extent the Company obtains consumer reports in connection with tenant " +
  "screening or employment",
]));
children.push(para(
  "Before destroying any records containing personally identifiable information (\u201CPII\u201D), the Legal Department must " +
  "confirm that destruction complies with applicable data disposal requirements and that no pending data subject " +
  "access request or regulatory inquiry requires retention. The General Counsel is responsible for monitoring " +
  "changes in applicable privacy and data protection laws and updating this section as necessary."
));

children.push(subHeader("F. Legal-to-IT Litigation Hold Coordination"));
children.push(para(
  "All litigation hold implementation and release actions requiring IT support must be submitted via the Litigation " +
  "Hold \u2013 IT Coordination Form. The following procedures govern the Legal-to-IT coordination process:"
));
children.push(...bulletList([
  "**Submission.** The Legal Department submits the Litigation Hold \u2013 IT Coordination Form to the IT Department via " +
  "the Company\u2019s IT ticketing system (or, if the ticketing system is unavailable, via email to the IT Director with " +
  "the General Counsel copied). The form must specify: (a) hold identification number; (b) matter name; (c) custodian " +
  "list; (d) data sources and systems to be preserved; (e) requested preservation actions (e.g., suspend auto-delete, " +
  "image device, export mailbox); and (f) priority level (Standard or Urgent).",
  "**Service Level Agreement.** IT must acknowledge receipt of the form within four (4) business hours. IT must " +
  "complete all requested preservation actions within twenty-four (24) hours of acknowledgment for Urgent requests " +
  "and within forty-eight (48) hours for Standard requests.",
  "**Confirmation.** Upon completion, IT must provide written confirmation to the Legal Department specifying the " +
  "actions taken, the systems affected, and the date and time of implementation.",
  "**Escalation for Missed SLAs.** If IT does not acknowledge or complete the requested actions within the applicable " +
  "SLA, the Legal Department must escalate as follows: (a) first, to the IT Director; (b) if unresolved within an " +
  "additional four (4) business hours, to the CFO (or the executive to whom IT reports); (c) all escalation actions " +
  "and dates must be documented in the Litigation Hold Log.",
  "**Consequence for SLA Non-Compliance.** Repeated or material failures by IT to meet litigation hold SLAs will be " +
  "reported to executive leadership and addressed through the Company\u2019s performance management process. The General " +
  "Counsel will include IT litigation hold compliance metrics in the quarterly Legal Department report to executive leadership.",
]));

children.push(subHeader("G. Litigation Hold Audit Trail"));
children.push(para(
  "The Legal Department must maintain a comprehensive Litigation Hold Log that serves as the audit trail for all " +
  "hold-related activity. The log must be maintained in a secure, access-restricted location within the Privileged " +
  "Legal Site. The log must contain, at a minimum, the following information for each hold:"
));
children.push(...bulletList([
  "Hold identification number",
  "Matter name and case number (if applicable)",
  "Date of hold issuance",
  "Custodian list (with dates of notice and acknowledgment for each custodian)",
  "Scope of preservation (document categories, data sources, systems)",
  "IT Coordination Form submission date and IT completion confirmation date",
  "Quarterly re-certification dates and compliance status for each custodian",
  "Any escalation actions taken and dates thereof",
  "Date of hold release (if applicable) and authorizing attorney",
  "Cross-reference to the underlying matter in the Legal Risk Tracker (Section 10)",
]));

children.push(subHeader("H. SharePoint Segmentation for Privileged Materials"));
children.push(para(
  "All privileged, litigation-related, and attorney work product materials must be stored in a segregated SharePoint " +
  "site collection (\u201CPrivileged Legal Site\u201D) that is separate from the Company\u2019s general SharePoint environment. " +
  "The following access controls must be maintained:"
));
children.push(...bulletList([
  "Access to the Privileged Legal Site is restricted to: Legal Department personnel, the General Counsel, and " +
  "specifically authorized executive leadership (CEO, CFO) on a documented need-to-know basis",
  "Outside counsel access must be limited to matter-specific document libraries within the Privileged Legal Site, " +
  "with time-limited permissions that expire upon matter conclusion or outside counsel disengagement (see Section 8.5(I))",
  "IT administrators who require access for system maintenance purposes must execute a confidentiality acknowledgment " +
  "and must access the site only upon written request from the General Counsel",
  "Access permissions must be reviewed by the Legal Department quarterly and updated to remove any individuals who " +
  "no longer require access",
  "The Privileged Legal Site must be excluded from Company-wide SharePoint search indexes to prevent inadvertent " +
  "disclosure of privileged materials",
  "All documents stored in the Privileged Legal Site must bear the privilege designation specified in Section 8(C)",
]));

children.push(subHeader("I. Outside Counsel Access Controls"));
children.push(para(
  "Outside counsel engaged on Company matters may be granted access to relevant documents stored in the Privileged " +
  "Legal Site, subject to the following controls:"
));
children.push(...bulletList([
  "Access must be limited to the specific matter-level document library for the engagement and must not extend to " +
  "other matter libraries or the broader Privileged Legal Site",
  "Access permissions must be requested by the responsible Legal Department attorney and approved by the General Counsel",
  "Permissions must include an expiration date not to exceed the expected duration of the engagement plus thirty (30) " +
  "calendar days",
  "Upon conclusion of the engagement or termination of the outside counsel relationship, all access must be revoked " +
  "within five (5) business days",
  "The Legal Department must maintain a log of all outside counsel access grants and revocations as part of the " +
  "Privileged Legal Site administration records",
  "Outside counsel must not download, copy, or transfer Company documents to outside counsel\u2019s own systems without " +
  "prior written authorization from the General Counsel",
]));

// ------ SECTION 9: COMMUNICATION & ESCALATION PROTOCOLS ------
children.push(pageBreak());
children.push(sectionHeader("9. Communication & Escalation Protocols"));
children.push(para(
  "Effective legal risk management requires clear communication channels and timely escalation of matters that may " +
  "affect the Company\u2019s legal, financial, or operational interests. This section establishes when and how matters " +
  "must be communicated to and escalated within the Legal Department and to executive leadership. All timelines in " +
  "this section are intended as guidelines to promote prompt action; the overriding obligation is to communicate " +
  "and escalate as soon as practicable under the circumstances."
));

children.push(subHeader("A. Routine Communication and Interdepartmental Coordination"));
children.push(para("The Legal Department works collaboratively with the following departments on an ongoing basis:"));
children.push(...bulletList([
  "**Asset Management:** Leasing activity, tenant matters, lease administration, and portfolio transactions",
  "**Property Management:** Operational incidents, property-level disputes, insurance claims, and vendor matters",
  "**Finance:** Legal reserves, legal spend management, transaction support, and corporate governance filings",
  "**Human Resources:** Employment matters, workplace incidents, and benefits-related legal issues",
]));
children.push(para("Standing interdepartmental meetings must be held at the following cadence:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Meeting", "Participants", "Frequency", "Trigger for Ad Hoc Session", "Purpose"],
  [
    ["Leasing Pipeline Review", "Legal + Asset Mgmt", "Weekly (scheduled)",
     "New lease request exceeding $[X] annual rent; lease dispute notice",
     "Review pending lease requests, priority alignment, negotiation strategy"],
    ["Litigation/Risk Update", "Legal + Executive Leadership", "Bi-weekly (scheduled)",
     "New litigation filed; matter exceeding Significant risk threshold",
     "Active matters, exposure updates, strategic decisions"],
    ["Finance Coordination", "Legal + Finance/CFO", "Monthly (scheduled)",
     "Reserve adjustment exceeding $100K; new insurance claim exceeding $50K",
     "Reserve reconciliation, legal spend review, governance filings"],
    ["Property Operations Sync", "Legal + Property Mgmt", "Monthly (scheduled)",
     "Any workplace injury requiring medical treatment; property damage exceeding $25K; governmental inspection or citation",
     "Incidents, insurance claims, vendor disputes, regulatory matters"],
    ["HR Legal Coordination", "Legal + Human Resources", "Quarterly (scheduled)",
     "Employment claim filed; termination of employee with access to privileged information",
     "Employment matters, workplace investigations, policy updates"],
  ],
  [1560, 1560, 1400, 2340, 2500]
));
children.push(emptyLine());
children.push(para(
  "Meeting minutes must be prepared for each standing meeting and distributed to attendees within five (5) business " +
  "days. Minutes for meetings involving legal strategy or privileged matters must be marked \u201CPRIVILEGED AND " +
  "CONFIDENTIAL \u2013 ATTORNEY-CLIENT COMMUNICATION\u201D and stored in the Privileged Legal Site."
));

children.push(subHeader("B. Escalation Criteria"));
children.push(para("Matters must be escalated to the Legal Department promptly when they involve any of the following:"));
children.push(...bulletList([
  "Potential or actual litigation, arbitration, or mediation",
  "Receipt of a demand letter, cease and desist notice, or threat of legal action",
  "Tenant bankruptcy or insolvency, or assignment for the benefit of creditors",
  "Actual or potential financial exposure exceeding $50,000",
  "Regulatory or governmental inquiry, investigation, subpoena, or audit",
  "Significant personal injury or death on Company property",
  "Property damage exceeding $25,000 or damage affecting structural integrity or habitability",
  "Disputes that may affect the Company\u2019s rights, obligations, or interests under material contracts",
  "Potential or actual breach of confidentiality, privilege waiver, or data security incident",
  "Environmental contamination or hazardous materials incident",
  "Insurance coverage disputes or denial of coverage",
  "Media inquiries or public relations matters involving legal issues",
]));

children.push(subHeader("C. Escalation Timelines and Response Actions"));
children.push(para(
  "The following table sets forth escalation timelines, responsible parties, and required response actions. All " +
  "timelines represent the outer boundary for escalation; the overriding standard is to escalate as soon as " +
  "practicable under the circumstances."
));
children.push(emptyLine());
children.push(simpleTable(
  ["Event Type", "Escalation Timeline", "Escalate To", "Required Response Actions"],
  [
    ["Receipt of lawsuit, complaint, or petition",
     "Promptly, and no later than the same business day", "General Counsel",
     "GC reviews filing; identifies response deadline; engages outside counsel if warranted; initiates litigation " +
     "hold per Section 8.5(C); notifies insurance carrier if applicable"],
    ["Receipt of demand letter or threat of litigation",
     "Promptly, and no later than the same business day", "General Counsel",
     "GC evaluates merit and exposure; prepares preliminary assessment; determines whether to engage outside counsel; " +
     "initiates litigation hold if preservation warranted"],
    ["Regulatory inquiry, subpoena, or governmental investigation",
     "Promptly, and no later than the same business day", "General Counsel + CEO",
     "GC reviews scope; identifies response deadline and custodians; initiates litigation hold; engages regulatory " +
     "counsel if warranted; prepares board notification if material"],
    ["Tenant bankruptcy filing",
     "As soon as practicable, and no later than the next business day", "General Counsel + Asset Mgmt Lead",
     "GC reviews petition; identifies deadlines for proofs of claim and motions for relief; coordinates with Asset " +
     "Mgmt on lease status and arrears; engages bankruptcy counsel if warranted"],
    ["Significant personal injury or death on property",
     "Immediately upon learning of the event", "General Counsel + Property Mgmt Lead",
     "GC initiates investigation coordination; directs scene preservation; notifies insurance carrier; initiates " +
     "litigation hold; engages outside counsel if warranted"],
    ["Potential financial exposure exceeding $500K",
     "As soon as practicable, and no later than the next business day", "General Counsel + CFO",
     "GC prepares preliminary exposure assessment; coordinates reserve adjustment with Finance; evaluates insurance " +
     "coverage applicability; determines board notification requirement"],
    ["Potential or actual privilege waiver",
     "Immediately upon discovery", "General Counsel",
     "GC evaluates scope of potential waiver; implements remedial measures (clawback demand if applicable); documents " +
     "circumstances; determines whether FRE 502(d) order or similar protection is available"],
    ["Insurance coverage dispute or denial",
     "As soon as practicable, and no later than two (2) business days", "General Counsel + CFO",
     "GC reviews coverage position; prepares response to carrier; evaluates coverage counsel engagement; updates net " +
     "exposure assessment"],
    ["Data security incident or breach",
     "Immediately upon discovery", "General Counsel + CEO + IT Director",
     "GC evaluates notification obligations under applicable state breach notification laws; coordinates forensic " +
     "investigation with IT; initiates litigation hold if warranted; engages privacy counsel if applicable"],
    ["Environmental contamination or hazardous materials event",
     "Immediately upon discovery", "General Counsel + Property Mgmt Lead + CEO",
     "GC evaluates regulatory reporting obligations; coordinates with environmental counsel; initiates litigation " +
     "hold; notifies insurance carrier"],
  ],
  [1800, 1560, 1800, 4200]
));
children.push(emptyLine());

children.push(subHeader("D. Escalation Flowchart"));
children.push(para("The following escalation sequence governs the order of notification for matters requiring escalation:"));
children.push(...numberedList([
  "**Originating Department Contact** identifies the event and immediately notifies the **Legal Department** (General " +
  "Counsel or, if unavailable, the next senior Legal Department attorney).",
  "**General Counsel** evaluates the matter and determines the appropriate response actions and additional notifications.",
  "If the matter involves potential financial exposure exceeding $500,000, reputational risk, portfolio-wide " +
  "implications, or regulatory action, the General Counsel promptly notifies the **CEO**.",
  "If the matter involves financial exposure or reserve implications, the General Counsel promptly notifies the **CFO**.",
  "If the matter meets the threshold for board notification (see Section 10(G)), the General Counsel prepares a " +
  "board notification memorandum for the CEO\u2019s review and transmittal.",
  "If the General Counsel is unavailable, the originating contact must notify the **CEO** directly, who will " +
  "coordinate the legal response.",
], "numbers2"));

children.push(subHeader("E. Executive Escalation Memoranda"));
children.push(para("When escalation to executive leadership is required, the Legal Department must prepare a written " +
  "escalation memorandum containing:"));
children.push(...bulletList([
  "Matter identification and date of escalation",
  "Summary of facts known to date",
  "Preliminary evaluation of legal exposure and risk (framed as a preliminary assessment subject to change as " +
  "additional facts become available)",
  "Identification of applicable insurance coverage and estimated net exposure (gross exposure less reasonably " +
  "anticipated insurance recovery)",
  "Recommended course of action and next steps",
  "Applicable deadlines (court deadlines, regulatory response dates, statute of limitations dates)",
  "Outside counsel engagement status and recommendations",
]));
children.push(para(
  "Escalation memoranda must be marked \u201CPRIVILEGED AND CONFIDENTIAL \u2013 ATTORNEY-CLIENT COMMUNICATION\u201D and must be " +
  "stored in the Privileged Legal Site. Distribution must be limited to the individuals identified in the escalation " +
  "table above."
));

children.push(subHeader("F. Consequence Framework for Missed Escalations"));
children.push(para(
  "Timely escalation is essential to the Company\u2019s ability to protect its legal interests. The Legal Department " +
  "will monitor escalation compliance and address deficiencies as follows:"
));
children.push(...bulletList([
  "The Legal Department will include escalation compliance as a standing item in its quarterly report to executive " +
  "leadership, identifying any instances where escalation timelines were not met and the remedial actions taken",
  "Escalation failures that result in actual or potential prejudice to the Company\u2019s legal position (e.g., missed " +
  "filing deadlines, loss of preservation evidence, waiver of rights) will be reported to the CEO and, where " +
  "applicable, to the Board",
  "Department heads are responsible for ensuring that their personnel understand and comply with escalation " +
  "requirements; repeated failures may be addressed through the Company\u2019s performance management process",
  "The Legal Department will conduct annual escalation protocol training for all departments to reinforce " +
  "compliance (see Section 11(A))",
]));

children.push(subHeader("G. Legal Updates and Reporting"));
children.push(para("The Legal Department provides periodic updates to executive leadership through the following mechanisms:"));
children.push(...bulletList([
  "**Bi-Weekly Litigation/Risk Update:** Status of all active matters rated Significant, High, or Critical; new " +
  "matters; material developments; and updated exposure assessments",
  "**Monthly CFO Report:** Reserve reconciliation, legal spend analysis, insurance claim status, and updated net " +
  "exposure calculations",
  "**Quarterly Board Report:** Comprehensive portfolio-wide legal risk summary, including all matters, exposure " +
  "trends, reserve adequacy, and insurance program status (see Section 10(G))",
  "**Ad Hoc Notifications:** Immediate written notification for any matter rated Critical or any event requiring " +
  "board-level attention",
]));
children.push(para("The Legal Risk Tracker and Legal Risk Dashboard (see Section 10 and Attachment B) are the primary " +
  "tools for these updates."));

// ------ SECTION 10: LEGAL RISK TRACKING & REPORTING ------
children.push(pageBreak());
children.push(sectionHeader("10. Legal Risk Tracking & Reporting"));
children.push(para(
  "The Legal Department maintains a Legal Risk Tracker and Legal Risk Dashboard to provide structured visibility " +
  "into legal matters affecting the Company\u2019s portfolio. All risk assessments, exposure estimates, and related " +
  "analyses set forth in this section and in the Legal Risk Tracker and Dashboard are preliminary evaluations " +
  "prepared at the direction of counsel for the purpose of providing legal advice to the Company. These assessments " +
  "are subject to change as additional facts and circumstances become known and do not constitute final " +
  "determinations of liability or loss."
));
children.push(para("The Legal Risk Tracker serves as a centralized tool for:"));
children.push(...bulletList([
  "Monitoring litigation, disputes, and regulatory matters",
  "Tracking tenant defaults, bankruptcies, and credit risk exposure",
  "Calculating probability-weighted expected losses for reserve recommendations",
  "Differentiating gross and net exposure (before and after insurance recoveries)",
  "Identifying trends, recurring issues, and systemic risks across the portfolio",
  "Supporting executive and board-level decision-making",
]));

children.push(subHeader("A. Risk Categories"));
children.push(para("Legal matters are categorized into the following risk categories for tracking and reporting purposes:"));
children.push(...bulletList([
  "**Litigation:** Active and threatened lawsuits, arbitrations, and mediations",
  "**Tenant Defaults:** Payment defaults, lease violations, and abandonment matters",
  "**Bankruptcy:** Tenant and counterparty bankruptcy proceedings",
  "**Insurance Claims:** Property damage claims, liability claims, and coverage disputes",
  "**Regulatory Matters:** Governmental investigations, inspections, citations, and compliance matters",
  "**Environmental:** Environmental contamination, remediation obligations, and compliance matters",
  "**Employment:** Employment disputes, workers\u2019 compensation claims, and workplace investigations",
  "**Contract Disputes (Non-Lease):** Vendor disputes, construction claims, and service agreement disputes",
  "**Corporate/Governance:** Entity compliance, governance matters, and fiduciary issues",
  "**Data Privacy/Security:** Data breach incidents, privacy compliance matters, and cybersecurity issues",
]));

children.push(subHeader("B. Risk Assessment Methodology"));
children.push(para(
  "Each matter in the Legal Risk Tracker is evaluated using a five-tier probability-impact framework. All risk " +
  "assessments are preliminary evaluations subject to revision as facts and circumstances develop."
));
children.push(emptyLine());
children.push(simpleTable(
  ["Rating", "Probability of Adverse Outcome", "Gross Financial Impact Range", "Update Frequency"],
  [
    ["Critical", "Probable (> 80%)", "> $2,000,000", "Weekly (or upon any material development)"],
    ["High", "Likely (60% \u2013 80%)", "$500,000 \u2013 $2,000,000", "Bi-weekly"],
    ["Significant", "Possible (40% \u2013 60%)", "$150,000 \u2013 $500,000", "Monthly"],
    ["Moderate", "Unlikely (20% \u2013 40%)", "$50,000 \u2013 $150,000", "Monthly"],
    ["Low", "Remote (< 20%)", "$0 \u2013 $50,000", "Quarterly"],
  ],
  [1560, 2340, 2340, 3120]
));
children.push(emptyLine());
children.push(para("Each matter also receives a qualitative assessment considering:"));
children.push(...bulletList([
  "Strategic or precedent-setting risk to the Company\u2019s business operations",
  "Potential reputational impact",
  "Insurance coverage availability and likelihood of recovery",
  "Strength of the Company\u2019s legal position based on facts and applicable law",
  "Jurisdictional considerations and venue risk",
  "Complexity and anticipated duration of the matter",
]));

children.push(para("**B.1. Risk Rating Changes.** Any change in risk rating must be:"));
children.push(...bulletList([
  "Approved by the General Counsel, with documented rationale for the change",
  "Supported by a written explanation of the factual or legal developments that warrant the change",
  "Recorded in the Legal Risk Tracker with the date of change, prior rating, new rating, and the General Counsel\u2019s approval",
  "Communicated to executive leadership at the next scheduled reporting cycle (or immediately if the change results " +
  "in a Critical rating)",
]));

children.push(subHeader("C. Probability-Weighted Expected Loss Methodology"));
children.push(para(
  "For each matter rated Moderate or above, the Legal Department must calculate a probability-weighted expected " +
  "loss (\u201CPWEL\u201D) to inform reserve recommendations. The PWEL methodology is as follows:"
));
children.push(...numberedList([
  "**Identify Potential Outcomes.** For each matter, identify the reasonably possible outcomes (e.g., full adverse " +
  "judgment, partial adverse judgment, settlement at various ranges, favorable dismissal).",
  "**Assign Probability Weights.** Assign a probability percentage to each identified outcome, based on the " +
  "responsible attorney\u2019s assessment of the facts, applicable law, and litigation dynamics. All probability " +
  "weights for a given matter must sum to 100%.",
  "**Estimate Financial Impact.** For each outcome, estimate the gross financial impact to the Company (including " +
  "damages, attorneys\u2019 fees, costs, and any other reasonably foreseeable expenses).",
  "**Calculate PWEL.** Multiply each outcome\u2019s financial impact by its probability weight, then sum the products. " +
  "The resulting figure is the PWEL for the matter.",
  "**Determine Net PWEL.** Subtract reasonably anticipated insurance recoveries (see Section 10(D)) from the gross " +
  "PWEL to arrive at the net PWEL.",
  "**Document Assumptions.** All PWEL calculations must include a written summary of the assumptions underlying " +
  "the probability assignments and financial estimates. These calculations are privileged attorney work product and " +
  "must be stored in the Privileged Legal Site.",
], "numbers2"));
children.push(para(
  "PWEL calculations must be updated at each reporting cycle for the applicable risk rating tier, or upon any " +
  "material change in circumstances."
));

children.push(subHeader("D. Gross vs. Net Exposure Tracking"));
children.push(para(
  "The Legal Risk Tracker must separately track gross exposure and net exposure for each matter:"
));
children.push(...bulletList([
  "**Gross Exposure:** The total estimated financial impact to the Company before consideration of any insurance " +
  "recoveries, indemnification rights, or other offsets",
  "**Insurance Recovery Estimate:** The amount the Company reasonably expects to recover under applicable insurance " +
  "policies, net of deductibles, self-insured retentions, and coverage limitations. The estimate must identify the " +
  "applicable policy, policy period, coverage type (occurrence vs. claims-made), and any coverage defenses or " +
  "exclusions asserted by the carrier",
  "**Other Offsets:** Any indemnification, contribution, or subrogation rights that may reduce the Company\u2019s net exposure",
  "**Net Exposure:** Gross exposure minus reasonably anticipated insurance recoveries and other offsets",
]));
children.push(para(
  "The Legal Department must coordinate with the Company\u2019s insurance broker and/or risk management function to " +
  "validate insurance recovery estimates. Net exposure figures must be clearly distinguished from gross exposure in " +
  "all reports and dashboards to ensure that executive leadership and the Board understand the Company\u2019s actual " +
  "risk position."
));

children.push(subHeader("E. Reserve Reconciliation with Finance"));
children.push(para(
  "The Legal Department and Finance must conduct a bilateral reserve reconciliation process to ensure that legal " +
  "reserves accurately reflect current exposure assessments. The following procedures govern the reconciliation:"
));
children.push(...numberedList([
  "**Monthly Reserve Review.** The Legal Department provides Finance with updated PWEL calculations and net exposure " +
  "estimates for all matters rated Moderate or above. Finance compares these estimates against currently booked " +
  "reserves and identifies any discrepancies.",
  "**Quarterly Reserve Reconciliation Meeting.** The General Counsel and CFO (or their designees) conduct a formal " +
  "quarterly reconciliation meeting to review all active reserves, discuss any discrepancies between Legal\u2019s " +
  "exposure estimates and Finance\u2019s booked reserves, and agree on reserve adjustments.",
  "**Reserve Adjustment Process.** Reserve increases or decreases exceeding $50,000 for any single matter require " +
  "written concurrence from both the General Counsel and the CFO. Adjustments exceeding $250,000 require CEO " +
  "notification. Adjustments exceeding $1,000,000 require Board notification.",
  "**Finance-to-Legal Feedback.** Finance must promptly notify the Legal Department of any external inquiries " +
  "regarding legal reserves (e.g., auditor inquiries, lender questions, investor due diligence requests) so that " +
  "the Legal Department can coordinate the response and ensure privilege protection.",
  "**Documentation.** All reserve reconciliation activities, adjustment approvals, and related communications must " +
  "be documented and retained in accordance with the Company\u2019s retention schedule. Reserve-related communications " +
  "between Legal and Finance should be structured as requests for legal advice or as legal advice to maintain " +
  "privilege protection where appropriate.",
], "numbers2"));

children.push(subHeader("F. Insurance Program Integration"));
children.push(para(
  "The Legal Department must maintain current knowledge of the Company\u2019s insurance program and integrate insurance " +
  "considerations into all risk tracking and reporting activities. The following requirements apply:"
));
children.push(...bulletList([
  "The Legal Department must maintain a current summary of the Company\u2019s insurance program, including policy types, " +
  "carriers, policy periods, coverage limits, deductibles/self-insured retentions, and key exclusions",
  "For each new matter entered in the Legal Risk Tracker, the responsible attorney must evaluate applicable insurance " +
  "coverage and document the coverage analysis in the matter file",
  "All notices to insurance carriers must be prepared or reviewed by the Legal Department to ensure compliance with " +
  "policy notice requirements and preservation of coverage rights",
  "The Legal Department must track insurer reserving positions and compare them against the Department\u2019s own exposure " +
  "assessments; material discrepancies must be documented and addressed with the carrier",
  "Gross and net exposure must be separately reported in all dashboards and reports provided to executive leadership " +
  "and the Board (see Section 10(D))",
]));

children.push(subHeader("G. Reporting Cadence and Dashboard Distribution"));
children.push(para("**G.1. Reporting Cadence.** The Legal Risk Tracker must be updated at the frequency specified in " +
  "the Risk Assessment Methodology table (Section 10(B)) for each risk rating tier. In addition:"));
children.push(...bulletList([
  "The Legal Risk Dashboard (Attachment B) must be prepared monthly for distribution to the General Counsel, CEO, and CFO",
  "A comprehensive Legal Risk Report must be prepared quarterly for the Board of Directors (or the Board\u2019s designated " +
  "committee), covering all active matters, exposure trends, reserve adequacy, insurance program status, and any " +
  "matters requiring Board action or awareness",
  "Ad hoc reports must be prepared and distributed immediately for any new matter rated Critical or any material " +
  "development in an existing matter that changes the risk rating to Critical",
  "The General Counsel must present the quarterly Legal Risk Report to the Board (or designated committee) in person " +
  "or by teleconference, with an opportunity for questions and discussion",
]));

children.push(para("**G.2. Dashboard Distribution Controls.** The Legal Risk Dashboard and all related risk reports " +
  "are privileged and confidential attorney-client communications and attorney work product. Distribution must be " +
  "controlled as follows:"));
children.push(...bulletList([
  "All dashboards and risk reports must bear the designation: \u201CPRIVILEGED AND CONFIDENTIAL \u2013 ATTORNEY-CLIENT " +
  "COMMUNICATION \u2013 ATTORNEY WORK PRODUCT\u201D",
  "Distribution of the monthly Dashboard is limited to: General Counsel, CEO, and CFO",
  "Distribution of the quarterly Board Report is limited to: Board members, General Counsel, CEO, and CFO",
  "No dashboard or risk report may be distributed to any person not on the approved distribution list without the " +
  "prior written approval of the General Counsel",
  "Electronic copies must be stored exclusively in the Privileged Legal Site; hard copies (if any) must be collected " +
  "after meetings and securely destroyed",
  "The General Counsel must maintain a distribution log recording the date, recipients, and version of each dashboard " +
  "and report distributed",
]));

children.push(subHeader("H. Use of Risk Data"));
children.push(para("Risk data from the Legal Risk Tracker is used to:"));
children.push(...bulletList([
  "Inform reserve decisions through the PWEL methodology and bilateral reconciliation process",
  "Support strategic planning and portfolio management decisions",
  "Identify areas for proactive risk mitigation and loss prevention",
  "Improve standard lease forms, contract templates, and operational procedures based on claims experience",
  "Evaluate outside counsel performance and litigation management effectiveness",
  "Support insurance program renewals and coverage negotiations through claims history analysis",
]));

// ------ SECTION 11: TRAINING & CONTINUOUS IMPROVEMENT ------
children.push(pageBreak());
children.push(sectionHeader("11. Training & Continuous Improvement"));
children.push(para(
  "The Legal Department is responsible for maintaining a comprehensive training program to ensure that all Company " +
  "personnel understand their obligations under this Manual and applicable law, and for implementing a continuous " +
  "improvement framework to enhance the Department\u2019s effectiveness over time."
));

children.push(subHeader("A. Training Schedule and Requirements"));
children.push(para("The Legal Department must conduct training for internal stakeholders in accordance with the " +
  "following schedule:"));
children.push(emptyLine());
children.push(simpleTable(
  ["Audience", "Frequency", "Topics", "Completion Requirement"],
  [
    ["Legal Department Personnel", "Quarterly",
     "Litigation hold procedures, privilege preservation, risk assessment updates, regulatory developments, " +
     "new case law, Manual updates",
     "Attendance record and sign-off sheet required"],
    ["Asset Management", "Quarterly",
     "Lease provisions and negotiation practices, document workflows, escalation protocols, privilege preservation " +
     "in lease negotiations",
     "Attendance record and sign-off sheet required"],
    ["Property Management", "Quarterly",
     "Incident reporting and escalation procedures, insurance claims process, safety and environmental compliance, " +
     "litigation hold obligations for property-level personnel",
     "Attendance record and sign-off sheet required"],
    ["Finance", "Semi-annually",
     "Legal risk reporting and reserve integration, privilege preservation in financial reporting, governance " +
     "processes, insurance program overview",
     "Attendance record and sign-off sheet required"],
    ["Human Resources", "Semi-annually",
     "Employment law updates, workplace investigation procedures, data privacy obligations, document retention " +
     "for employment records",
     "Attendance record and sign-off sheet required"],
    ["All Departments (Company-wide)", "Annually",
     "Confidentiality obligations, privilege preservation, document retention and litigation hold overview, " +
     "escalation protocols, data privacy fundamentals, Manual updates",
     "Attendance record and sign-off sheet required; completion tracked by HR"],
    ["New Hires (All Departments)", "Within 30 days of hire",
     "Overview of escalation protocols, confidentiality obligations, document retention requirements, privilege " +
     "preservation basics",
     "Sign-off sheet required; tracked by HR"],
    ["New Hires (Legal Department)", "Within 30 days of hire",
     "Comprehensive Manual review, systems training, standard forms, naming conventions, active matter overview",
     "Completion checklist signed by supervisor and new hire"],
  ],
  [1560, 1200, 3600, 3000]
));
children.push(emptyLine());

children.push(subHeader("B. Training Completion Tracking"));
children.push(para("The Legal Department must maintain records of all training activities, including:"));
children.push(...bulletList([
  "**Attendance Records:** Sign-in sheets (physical or electronic) for each training session, recording the names " +
  "and departments of all attendees",
  "**Sign-Off Sheets:** Each attendee must sign a training acknowledgment confirming that the attendee attended the " +
  "session, understood the material presented, and agrees to comply with the applicable policies and procedures",
  "**Completion Reports:** The Legal Department must prepare a quarterly Training Completion Report summarizing all " +
  "training sessions conducted, attendance rates by department, and any departments or individuals with outstanding " +
  "training requirements",
  "**Deficiency Follow-Up:** If any department\u2019s training completion rate falls below 90% for any required training, " +
  "the Legal Department must notify the department head and coordinate make-up sessions within thirty (30) calendar days",
  "**Records Retention:** All training attendance records, sign-off sheets, and completion reports must be retained " +
  "for a minimum of five (5) years",
]));

children.push(subHeader("C. New Hire Onboarding"));
children.push(para("New Legal Department personnel must complete the following onboarding checklist within thirty (30) " +
  "calendar days of their start date:"));
children.push(...numberedList([
  "Review of this Manual and all attachments in their entirety",
  "Overview of the Company\u2019s entity structure, portfolio, and organizational chart",
  "Salesforce system training (intake workflows, pipeline dashboard, reporting)",
  "SharePoint training (document storage, naming conventions, Privileged Legal Site access and protocols)",
  "Introduction to standard lease forms and key commercial provisions",
  "Review of the Legal Risk Tracker and active matter status",
  "Introduction to the outside counsel panel, billing guidelines, and engagement procedures",
  "Review of confidentiality, privilege preservation, and litigation hold protocols",
  "Review of document retention schedule and destruction procedures",
  "Review of escalation protocols and communication procedures",
], "numbers2"));
children.push(para("The onboarding checklist must be signed by both the new hire and the supervising attorney upon " +
  "completion and retained in the Department\u2019s personnel files."));

children.push(subHeader("D. Legal Updates and Continuing Education"));
children.push(para(
  "The Legal Department monitors legal, regulatory, and market developments and provides updates to internal " +
  "stakeholders through the following channels:"
));
children.push(...bulletList([
  "**Legal Alerts:** Written memoranda distributed to relevant departments upon the occurrence of significant legal " +
  "or regulatory developments affecting the Company\u2019s operations (e.g., changes in landlord-tenant law, new " +
  "environmental regulations, data privacy law developments)",
  "**Training Session Integration:** Significant legal developments are incorporated into the next scheduled training " +
  "session for affected departments",
  "**Standing Meeting Updates:** The Legal Department includes a \u201CLegal Developments\u201D agenda item in standing " +
  "interdepartmental meetings to communicate relevant updates",
  "**External CLE and Professional Development:** Legal Department personnel are encouraged to attend continuing " +
  "legal education programs relevant to the Company\u2019s operations and must complete any minimum CLE requirements " +
  "mandated by their bar admission jurisdiction",
]));

children.push(subHeader("E. Post-Litigation and Post-Transaction Reviews"));
children.push(para(
  "For all matters rated Significant or above at any point during their lifecycle, and for any other matter " +
  "designated by the General Counsel, the Legal Department must conduct a post-resolution review. To preserve " +
  "the privileged nature of these reviews, the following requirements apply:"
));
children.push(...bulletList([
  "All post-litigation and post-transaction reviews must be conducted at the direction of the General Counsel for " +
  "the express purpose of obtaining legal advice regarding the Company\u2019s legal strategies, risk management practices, " +
  "and litigation preparedness",
  "Review memoranda must be captioned: \u201CPRIVILEGED AND CONFIDENTIAL \u2013 PREPARED AT THE DIRECTION OF COUNSEL FOR " +
  "THE PURPOSE OF PROVIDING LEGAL ADVICE\u201D",
  "Review memoranda must be prepared by or under the supervision of an attorney and must contain legal analysis and " +
  "recommendations, not merely factual summaries of outcomes",
  "Distribution must be limited to Legal Department personnel, the General Counsel, and specifically authorized " +
  "executive leadership on a need-to-know basis",
  "Review memoranda must be stored exclusively in the Privileged Legal Site",
  "The General Counsel must approve the distribution list for each review memorandum before distribution",
]));
children.push(para("Post-resolution reviews must address the following topics:"));
children.push(...bulletList([
  "Legal analysis of the outcome in light of the Company\u2019s litigation strategy",
  "Assessment of outside counsel performance and recommendations regarding future engagements",
  "Identification of legal or contractual provisions that contributed to the Company\u2019s exposure, with " +
  "recommendations for amendments to standard forms or procedures",
  "Evaluation of the effectiveness of the Company\u2019s escalation, litigation hold, and document preservation procedures",
  "Recommendations for training or policy changes to reduce the likelihood of similar matters in the future",
]));

children.push(subHeader("F. Continuous Improvement Metrics"));
children.push(para(
  "The Legal Department must track and report on the following performance metrics to drive continuous improvement. " +
  "These metrics must be included in the quarterly Legal Department report to executive leadership:"
));
children.push(emptyLine());
children.push(simpleTable(
  ["Metric", "Measurement", "Target", "Reporting Frequency"],
  [
    ["Litigation Hold Compliance Rate",
     "Percentage of custodians acknowledging hold within 72 hours", "\u2265 95%", "Quarterly"],
    ["Litigation Hold Re-Certification Rate",
     "Percentage of custodians completing quarterly re-certification", "\u2265 95%", "Quarterly"],
    ["IT Litigation Hold SLA Compliance",
     "Percentage of IT coordination forms completed within SLA", "\u2265 90%", "Quarterly"],
    ["Escalation Timeliness",
     "Percentage of matters escalated within applicable timeline", "\u2265 90%", "Quarterly"],
    ["Training Completion Rate",
     "Percentage of required training sessions completed by department", "\u2265 90%", "Quarterly"],
    ["Reserve Accuracy",
     "Variance between PWEL estimate and actual resolution amount", "Within 25% for matters > $100K", "Annually"],
    ["Outside Counsel Budget Adherence",
     "Percentage of matters resolved within approved budget", "\u2265 80%", "Quarterly"],
    ["Average Matter Resolution Time",
     "Average elapsed time from matter opening to resolution, by category", "Trend improvement year-over-year", "Annually"],
    ["Post-Resolution Review Completion",
     "Percentage of eligible matters with completed post-resolution review", "100%", "Quarterly"],
    ["Document Retention Compliance",
     "Annual audit findings on retention schedule adherence", "Zero material findings", "Annually"],
  ],
  [1800, 2700, 2340, 1560]
));
children.push(emptyLine());
children.push(para(
  "The General Counsel must review these metrics quarterly and identify areas requiring corrective action. Material " +
  "deficiencies must be addressed through updated procedures, additional training, or resource allocation adjustments, " +
  "as appropriate."
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
