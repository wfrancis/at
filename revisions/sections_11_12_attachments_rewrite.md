PIR INDUSTRIAL LLC
LEGAL DEPARTMENT OPERATIONS MANUAL
SECTIONS 11-12 AND ATTACHMENTS A, B, C — REVISED

================================================================================
SECTION 11. TECHNOLOGY & WORKFLOW OPTIMIZATION
================================================================================

The Legal Department (as defined in Section 12.F) utilizes technology platforms to improve operational efficiency, enhance visibility into legal matters, and support scalable departmental operations. This Section establishes system ownership, governance requirements, procedural standards, and evaluation criteria for the technology infrastructure supporting the Department's functions.

11.A. Core Systems and Ownership

The following systems constitute the Department's core technology infrastructure. System ownership determines which department is responsible for configuration, access provisioning, data integrity, and coordination with IT for maintenance and upgrades.

    System                      | Primary Function                                              | System Owner                      | Authorized Users
    ----------------------------|---------------------------------------------------------------|-----------------------------------|------------------------------------------
    Salesforce (Legal Module)   | Legal matter intake, workflow tracking, pipeline dashboard,   | Legal Department                  | Legal, Asset Management, Executive
                                | Legal Risk Tracker, reporting                                 |                                   | Leadership, CFO
    SharePoint (Legal Sites)    | Document collaboration, version control, active matter        | Legal Department + IT (joint)     | Legal, Asset Management, Finance
                                | storage, privileged material segmentation                     |                                   |
    ShareFile                   | Executed document storage and secure external sharing          | Asset Management                  | Legal, Asset Management
    E-Billing Platform          | Outside counsel invoice submission, review, and payment       | Legal Department + Finance (joint)| Legal, Finance
                                | processing (LEDES 1998B format required)                      |                                   |

11.B. Salesforce Legal Module — Procedural Overview

The Salesforce Legal Module serves as the Department's system of record for legal matter management. The General Counsel ("GC," as defined in Section 12.F) is responsible for module configuration, field definitions, and reporting standards. The following procedures govern use of the Salesforce Legal Module.

    11.B.1. Request Submission

    All legal service requests from internal stakeholders are submitted through the Salesforce Legal Module. Each request record captures the following required fields:

        (a) Requestor Name and Department.
        (b) Request Date.
        (c) Request Type (selected from a controlled picklist: Lease Review, Litigation, Corporate Governance, Regulatory, Insurance, Employment, General Inquiry, Other).
        (d) Property or Entity (linked to the Company's master property and entity lists maintained in Salesforce).
        (e) Priority Level (Standard, Expedited, or Emergency, as defined in Section 4 of this Manual).
        (f) Description of Request (free-text narrative describing the legal issue or action requested).
        (g) Requested Completion Date.
        (h) Attachments (supporting documents uploaded directly to the request record).

    Upon submission, the system generates a unique matter number and routes the request to the GC or designee for assignment. The GC or Associate General Counsel assigns the matter to a specific Department member within two (2) business days of receipt. The assignment is recorded in the "Assigned To" field of the matter record, and the assigned attorney or paralegal receives an automated notification.

    11.B.2. Status Tracking

    Each matter record maintains a Status field reflecting the current stage of the matter. Permitted status values are:

        (a) New — Request received, pending assignment.
        (b) Assigned — Matter assigned to Department member, work not yet commenced.
        (c) In Progress — Active work being performed.
        (d) Pending External — Awaiting response from outside counsel, opposing party, or third party.
        (e) Pending Internal — Awaiting input or approval from internal stakeholder.
        (f) Under Review — Draft or deliverable under review by GC or senior Department member.
        (g) Completed — Matter resolved or deliverable provided.
        (h) Closed — Matter administratively closed following completion and any applicable post-matter review.

    The assigned Department member is responsible for updating the Status field within one (1) business day of any status change. Status updates must include a brief narrative note in the Activity Log describing the basis for the status change.

    11.B.3. Reporting

    The Salesforce Legal Module generates the following standard reports:

        (a) Open Matters Report — All matters with a status other than Completed or Closed, sorted by priority and age. Generated weekly and reviewed by the GC.
        (b) Matter Aging Report — Matters open beyond thirty (30), sixty (60), and ninety (90) calendar days, with assigned attorney and current status. Generated monthly.
        (c) Pipeline Dashboard — Real-time summary of active matters by type, priority, assigned attorney, and department of origin. Accessible to Legal, Executive Leadership, and the Chief Financial Officer ("CFO," as defined in Section 12.F).
        (d) Legal Risk Tracker Report — As described in Section 11.C below. Generated monthly.
        (e) Legal Spend Report — Outside counsel spend by matter, firm, and budget category. Generated monthly and reconciled with the e-billing platform.

11.C. Legal Risk Tracker

The Legal Risk Tracker is maintained as a module within the Salesforce Legal Module (not as a separate standalone system). The Legal Risk Tracker records and monitors all litigation matters, material disputes, regulatory inquiries, environmental matters (including matters arising under the Comprehensive Environmental Response, Compensation, and Liability Act ("CERCLA"), the Resource Conservation and Recovery Act ("RCRA"), and analogous state environmental statutes), insurance claims, and other matters presenting material risk exposure.

    11.C.1. Each matter entered in the Legal Risk Tracker includes the following fields:

        (a) Matter Name and Number (linked to the corresponding Salesforce matter record).
        (b) Matter Type (Litigation, Regulatory, Environmental, Insurance, Employment, Other).
        (c) Risk Rating (High, Medium, Low — as defined in Section 10 of this Manual).
        (d) Estimated Exposure Range (low estimate and high estimate, in dollars).
        (e) Insurance Coverage (applicable policy, coverage limits, reservation of rights status).
        (f) Current Reserve Amount (coordinated with Finance).
        (g) Opposing Party.
        (h) Outside Counsel (if retained).
        (i) Key Dates (filing date, answer deadline, discovery cutoff, trial date, statute of limitations).
        (j) Status (Active, Stayed, Settled, Dismissed, Closed).
        (k) Last Update Date and Summary.

    11.C.2. The GC reviews the Legal Risk Tracker no less frequently than monthly and updates risk ratings, exposure estimates, and reserve recommendations as circumstances warrant. Material changes in risk rating or exposure are communicated to the Chief Executive Officer ("CEO," as defined in Section 12.F) and CFO within five (5) business days of the change.

11.D. SharePoint Governance

SharePoint serves as the Department's primary platform for active document collaboration, version control, and storage of work-in-progress materials. The Legal Department and IT share ownership of SharePoint Legal site collections. The following governance standards apply:

    11.D.1. Folder Structure

    SharePoint Legal site collections are organized according to the following hierarchy:

        (a) Top-Level Folders: organized by functional area (Leasing, Litigation, Corporate Governance, Regulatory and Environmental, Insurance, Employment, Outside Counsel, Training, Administrative).
        (b) Second-Level Folders: organized by property, entity, or matter name, as applicable.
        (c) Third-Level Folders: organized by document type (Drafts, Correspondence, Court Filings, Final/Executed, Internal Memoranda).

    Deviations from this folder structure require GC approval.

    11.D.2. Privileged Material Segmentation

    Documents subject to attorney-client privilege or work product protection must be stored in designated "Privileged" sub-folders within the applicable matter folder. Access to Privileged sub-folders is restricted to Department personnel and, where specifically authorized by the GC, outside counsel or executive leadership. IT may not access Privileged sub-folders without prior written authorization from the GC.

    11.D.3. Naming Conventions

    All documents stored in SharePoint must follow the Department's naming convention: [Property/Entity] — [Document Type] — [Version] — [Date (YYYY-MM-DD)]. The GC may establish supplemental naming conventions for specific workstreams.

    11.D.4. Version Control

    SharePoint's native versioning is enabled for all Legal site collections. Draft documents must be saved as new versions (not overwritten) to preserve revision history. Version numbering for documents shared with external parties uses a separate external numbering sequence (e.g., v1, v2, v3) that does not reveal the number of internal drafts or revisions.

    11.D.5. Retention

    Document retention in SharePoint is governed by the Company's records retention policy. The Department coordinates with IT to ensure that automated retention rules are applied to Legal site collections consistent with applicable legal hold obligations and retention schedules.

11.E. ShareFile Governance

ShareFile is owned and administered by Asset Management ("Asset Mgmt," as defined in Section 12.F). ShareFile serves as the repository for executed documents and as the platform for secure external document sharing. The following governance standards apply to the Department's use of ShareFile:

    11.E.1. Scope of Use

    ShareFile is used by the Department for the following purposes only:

        (a) Storage of fully executed leases, amendments, and ancillary lease documents.
        (b) Storage of fully executed contracts, settlement agreements, and other final legal documents.
        (c) Secure sharing of documents with outside counsel, tenants, brokers, and other external parties where SharePoint external sharing is not appropriate.

    Active drafts, work-in-progress documents, privileged materials, and internal memoranda are not stored in ShareFile. Such documents are stored in SharePoint in accordance with Section 11.D.

    11.E.2. Access Controls

    Access to ShareFile folders containing legal documents is provisioned by Asset Management upon written request from the GC or designee. The following access control principles apply:

        (a) Department personnel receive read/write access to Legal-designated folders.
        (b) External parties receive time-limited, read-only access to specific files or folders, granted on a per-matter basis.
        (c) Access grants to external parties expire automatically after ninety (90) calendar days unless renewed by the GC or designee.
        (d) Asset Management provides the GC with a quarterly access report listing all active external access grants to Legal-designated folders. The GC reviews and confirms or revokes each grant within ten (10) business days of receipt.

    11.E.3. Coordination with SharePoint

    Upon full execution of a document, the responsible Department member uploads the executed version to the applicable ShareFile folder and updates the corresponding SharePoint matter folder with a reference link or notation indicating the executed document's ShareFile location. The SharePoint matter folder retains the draft history and negotiation correspondence.

11.F. E-Billing System

The Department, in coordination with Finance, shall implement and maintain an electronic billing ("e-billing") system for the submission, review, and payment of outside counsel invoices. The e-billing system must support the Legal Electronic Data Exchange Standard ("LEDES") 1998B format. All outside counsel retained by the Company are required to submit invoices through the e-billing system in LEDES 1998B format as a condition of engagement, as further specified in Attachment C.

    11.F.1. Invoice Review Workflow

    Outside counsel invoices submitted through the e-billing system are reviewed and approved as follows:

        (a) Initial Review: The assigned Department member (attorney or paralegal) reviews the invoice for compliance with the applicable engagement letter, matter budget, and the Outside Counsel Billing Guidelines (Attachment C). The initial reviewer may not be the same individual who authorized the engagement or approved the matter budget (segregation of duties).
        (b) Approval: Invoices within budget and compliant with billing guidelines are approved by the assigned Department member and routed to Finance for payment.
        (c) Escalation: Invoices exceeding the approved matter budget by more than fifteen percent (15%), invoices containing non-compliant charges, or invoices for matters exceeding two hundred fifty thousand dollars ($250,000) in aggregate fees require GC review and approval prior to payment.
        (d) Payment: Finance processes approved invoices in accordance with the payment terms specified in Attachment C.

    11.F.2. Segregation of Duties

    To ensure appropriate controls over legal spend, the following segregation of duties applies to invoice review:

        (a) The individual who authorized the outside counsel engagement may not serve as the sole reviewer of invoices for that engagement.
        (b) For matters where only one Department member is assigned, the GC serves as the approving reviewer (or, if the GC authorized the engagement, the CFO serves as the approving reviewer).
        (c) Adjustments or write-offs exceeding five thousand dollars ($5,000) on any single invoice require GC approval.

11.G. System Integration

The Department works to ensure that legal workflows are integrated with the Company's operational and financial systems. Integration objectives include:

    (a) Consistent data capture across Salesforce, SharePoint, ShareFile, and the e-billing platform.
    (b) Minimization of duplicate data entry through system integration where feasible.
    (c) Accurate reflection of legal data (e.g., lease milestones, litigation reserves, entity records) in the Company's financial and operational reporting systems.
    (d) Coordination with IT and Finance to maintain data integrity across platforms.

11.H. Evaluation of New Tools

The Department may evaluate additional technology tools to improve legal operations, including but not limited to lease data extraction and analysis, document automation, risk tracking, workflow automation, and contract lifecycle management. New technology evaluations must consider the following criteria:

    (a) Integration capability with existing core systems (Salesforce, SharePoint, e-billing platform).
    (b) Data security and access control standards, including compliance with the Company's information security policies.
    (c) Cost-benefit analysis, including total cost of ownership and projected return on investment.
    (d) Ease of adoption, training requirements, and impact on existing workflows.
    (e) Vendor reliability, financial stability, and support capabilities.
    (f) Scalability to accommodate portfolio growth.

The Department coordinates with IT and Finance before procuring or implementing new technology solutions. Technology investments exceeding fifty thousand dollars ($50,000) in aggregate annual cost require approval by the GC and CFO. Technology investments exceeding two hundred fifty thousand dollars ($250,000) in aggregate annual cost require approval by the GC, CFO, and CEO.

11.I. Data Integrity

Maintaining accurate and consistent data across systems is critical to effective legal operations and reporting. The Department is responsible for:

    (a) Conducting semi-annual audits of data accuracy in Salesforce and SharePoint, with audit results documented and retained.
    (b) Ensuring that lease milestone dates, entity records, and litigation data are current and accurate.
    (c) Reporting data discrepancies to the relevant system owner for correction within five (5) business days of discovery.
    (d) Maintaining consistent naming conventions and folder structures across all platforms in accordance with Section 11.D.3.

11.J. Change Management

System upgrades, migrations, or workflow changes that affect the Department's operations must be coordinated with the Department no fewer than thirty (30) calendar days in advance of implementation. The Department participates in testing and training prior to implementation of material system changes to ensure continuity of legal operations. The GC must approve any system change that affects the Department's access to privileged materials or alters legal workflow processes.

11.K. Training Completion Tracking

The Department tracks completion of all technology-related training (including Salesforce, SharePoint, ShareFile, and e-billing system training) in a training log maintained in the Salesforce Legal Module. The training log records the trainee name, training topic, date of completion, and trainer. The GC reviews the training log quarterly to confirm that all Department personnel and relevant cross-functional users have completed required training. Overdue training is escalated to the trainee's supervisor.


================================================================================
SECTION 12. POLICY REVIEW AND UPDATES
================================================================================

This Manual is intended to serve as a living document that evolves with the Company's operations, legal requirements, and industry practices. This Section establishes the review cadence, approval authority, version control procedures, and defined terms applicable to this Manual.

12.A. Review Cadence

    12.A.1. Annual Comprehensive Review

    The GC shall conduct a comprehensive review of this Manual annually. The annual review cycle is aligned to the Company's fiscal year and must be completed within the first quarter of each fiscal year. The annual review evaluates alignment with:

        (a) Changes in Company structure, strategy, or portfolio composition.
        (b) System implementations, upgrades, or migrations.
        (c) Regulatory and legal developments, including changes in landlord-tenant law, environmental regulations, REIT compliance requirements, and employment law.
        (d) Operational needs and lessons learned from the prior year.
        (e) Feedback from internal stakeholders and outside counsel.

    The GC documents the results of each annual review, including any recommended changes, in a written memorandum retained in the SharePoint Legal Administrative folder.

    12.A.2. Ad Hoc Updates

    The GC may update this Manual at any time between annual reviews to address urgent regulatory changes, material operational developments, new system implementations, or corrections of errors. Ad hoc updates follow the approval and version control procedures described in Sections 12.B and 12.C.

12.B. Approval Authority

    12.B.1. Operational Updates

    The GC has authority to approve updates to this Manual that are operational in nature, including but limited to: procedural clarifications, system documentation updates, form revisions, training schedule changes, and corrections of typographical or formatting errors.

    12.B.2. Authority Changes

    Updates that modify delegation of authority thresholds (Attachment A), approval requirements, reporting lines, or the scope of emergency authority require approval by both the GC and the CEO.

    12.B.3. Board-Level Changes

    Updates that modify Board reporting obligations, Board approval thresholds, or the scope of matters requiring Board action require approval by the GC, the CEO, and the Board of Directors (or a designated Board committee).

    12.B.4. Communication

    Material changes to this Manual are communicated to all Department personnel and affected stakeholders within ten (10) business days of approval. Communication is made via email from the GC with the updated Manual (or relevant excerpts) attached.

12.C. Version Control

Each version of this Manual is assigned a version number, effective date, approver, and summary of changes. The following version control practices apply:

    (a) Version numbers follow a sequential format (e.g., 1.0, 1.1, 2.0). Major revisions (resulting from annual comprehensive reviews or material policy changes) increment the whole number. Minor revisions (operational clarifications, corrections) increment the decimal.
    (b) A change log is maintained as part of this Section, documenting all revisions.
    (c) The current version of this Manual is stored in SharePoint in the Legal Administrative folder, accessible to all Department personnel.
    (d) Superseded versions are archived in a SharePoint sub-folder labeled "Archived Versions" and retained for a minimum of seven (7) years.
    (e) Only the GC may authorize publication of a new version to the SharePoint Legal Administrative folder.

12.D. Change Log

    Version | Effective Date | Description of Change                                              | Approved By
    --------|----------------|---------------------------------------------------------------------|----------------------------
    1.0     | 2026-03-18     | Initial publication of the Legal Department Operations Manual.       | General Counsel; CEO
            |                | Includes Sections 1 through 12 and Attachments A, B, and C.        |
    --------|----------------|---------------------------------------------------------------------|----------------------------
            |                |                                                                     |
    --------|----------------|---------------------------------------------------------------------|----------------------------
            |                |                                                                     |

12.E. Implementation

The GC is responsible for implementing and maintaining compliance with the procedures outlined in this Manual. All Department personnel are expected to review and adhere to the current version of this Manual. New Department personnel must review this Manual in its entirety during the onboarding process described in Section 11.K and the applicable onboarding checklist.

12.F. Definitions and Glossary

The following defined terms apply throughout this Manual unless the context clearly indicates otherwise:

    (a) "Legal Department" or "Legal" means the legal department of PIR Industrial LLC, consisting of the General Counsel and all attorneys, paralegals, legal assistants, and administrative personnel reporting to the General Counsel.

    (b) "General Counsel" or "GC" means the General Counsel of PIR Industrial LLC, or, during a vacancy in that position, the individual designated by the CEO to serve in an acting capacity.

    (c) "Associate General Counsel" or "Associate GC" means any attorney within the Legal Department holding the title of Associate General Counsel or equivalent, reporting to the General Counsel.

    (d) "Asset Management" or "Asset Mgmt" means the asset management department of PIR Industrial LLC, responsible for portfolio strategy, leasing oversight, and property-level operational coordination.

    (e) "Chief Executive Officer" or "CEO" means the Chief Executive Officer of PIR Industrial LLC.

    (f) "Chief Financial Officer" or "CFO" means the Chief Financial Officer of PIR Industrial LLC.

    (g) "Chief Operating Officer" or "COO" means the Chief Operating Officer of PIR Industrial LLC.

    (h) "Board" means the Board of Directors (or Board of Managers, as applicable) of PIR Industrial LLC or its parent entity, as designated in the Company's governing documents.

    (i) "Material" means, unless a specific dollar threshold is stated in the applicable Section or Attachment, any matter, transaction, or exposure with a value, cost, or potential liability exceeding two hundred fifty thousand dollars ($250,000).

    (j) "Near Term" means within ninety (90) calendar days from the date of reference.

    (k) "Periodically" means at the frequency specified in the applicable Section of this Manual. Where no specific frequency is stated, "periodically" means no less frequently than quarterly.

    (l) "Company" means PIR Industrial LLC and its subsidiaries and affiliated entities, unless the context requires reference to a specific entity.

    (m) "Manual" means this Legal Department Operations Manual, as amended from time to time in accordance with this Section 12.

    (n) "LEDES" means the Legal Electronic Data Exchange Standard, specifically the LEDES 1998B format for electronic billing.

    (o) "Standard Procurement Process" means the Company's procurement approval workflow, which requires: (i) written specification of goods or services; (ii) competitive bidding for expenditures exceeding one hundred thousand dollars ($100,000); (iii) approval by the budget owner and, for expenditures exceeding two hundred fifty thousand dollars ($250,000), approval by the CFO; and (iv) execution of a written agreement prior to commencement of services.

12.G. Cross-Reference Index

For ease of reference, the following cross-references identify where key topics are addressed across multiple Sections of this Manual:

    (a) Outside Counsel: Section 6 (engagement and management), Section 10 (risk reporting), Section 11.B (Salesforce tracking), Section 11.F (e-billing), Attachment A (engagement approval authority), Attachment C (billing guidelines).

    (b) Document Storage: Section 2 (centralized document management principles), Section 8 (confidentiality and privilege), Section 11.D (SharePoint governance), Section 11.E (ShareFile governance).

    (c) Legal Risk Tracking: Section 10 (risk tracking and reporting), Section 11.C (Legal Risk Tracker system), Attachment B (Legal Risk Dashboard).

    (d) Delegation of Authority: Section 3 (roles and responsibilities), Section 9 (escalation protocols), Attachment A (Delegation of Authority Matrix).

    (e) Continuous Improvement: Section 2 (operating principles), Section 10 (post-matter review), Section 11.H (new tool evaluation).

    (f) Intake and Prioritization: Section 4 (intake procedures), Section 11.B.1 (Salesforce request submission).


================================================================================
ATTACHMENT A: DELEGATION OF AUTHORITY MATRIX
================================================================================

PRIVILEGED AND CONFIDENTIAL — PREPARED AT DIRECTION OF COUNSEL

A.1. Purpose

This Attachment establishes the delegation of approval authority for legal, transactional, and operational matters within the scope of the Legal Department's responsibilities. All dollar thresholds set forth below are subject to annual review and adjustment by the GC and CEO in conjunction with the annual Manual review described in Section 12.A. Terms used in this Attachment have the meanings set forth in Section 12.F of this Manual.

A.2. Approval Tiers

The following five (5) tiers of approval authority govern the matters described in Section A.3:

    Tier 1 — Paralegal / Senior Paralegal: Routine administrative and procedural actions within the scope defined in the matrix below. No counter-signatory is required for Tier 1 actions.

    Tier 2 — Associate General Counsel: Actions within the dollar thresholds specified below. Tier 2 approvals require documented approval by the Associate GC (email approval or Salesforce system approval is acceptable).

    Tier 3 — General Counsel: Actions within the dollar thresholds specified below. Tier 3 approvals require the GC's documented approval and a counter-signatory. The GC may not self-approve matters at Tier 3 or above without a counter-signatory (CFO or CEO, as applicable). For Tier 3 matters, the counter-signatory is the CFO unless otherwise specified.

    Tier 4 — General Counsel + CEO: Actions within the dollar thresholds specified below. Tier 4 approvals require documented approval by both the GC and the CEO.

    Tier 5 — General Counsel + CEO + Board: Actions exceeding the highest management-level threshold. Tier 5 approvals require documented approval by the GC and CEO, with subsequent ratification or approval by the Board (or a designated Board committee).

A.3. Delegation of Authority Matrix

    Transaction Type               | Tier 1                | Tier 2                  | Tier 3                  | Tier 4                  | Tier 5
                                   | (Paralegal/Sr.        | (Associate GC)          | (GC + Counter-          | (GC + CEO)              | (GC + CEO + Board)
                                   |  Paralegal)            |                         |  signatory)             |                         |
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Lease Execution                | N/A                   | < $500,000              | $500,000 -              | $2,000,000 -            | > $10,000,000
    (new leases, by annual rent)   |                       | annual rent             | $2,000,000              | $10,000,000             | annual rent
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Lease Amendments               | N/A                   | < $100,000              | $100,000 -              | $500,000 -              | > $2,000,000
    (by financial impact)          |                       | impact                  | $500,000                | $2,000,000              | impact
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Lease Termination /            | N/A                   | < $100,000              | $100,000 -              | $500,000 -              | > $2,000,000
    Surrender Agreements           |                       | impact                  | $500,000                | $2,000,000              | impact
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Litigation Settlements         | N/A                   | < $25,000               | $25,000 -               | $100,000 -              | > $500,000
                                   |                       |                         | $100,000                | $500,000                |
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Outside Counsel                | N/A                   | < $25,000               | $25,000 -               | $100,000 -              | > $500,000
    Engagement (by est. budget)    |                       | estimated budget        | $100,000                | $500,000                | estimated budget
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Contracts (non-lease)          | N/A                   | < $50,000               | $50,000 -               | $250,000 -              | > $1,000,000
                                   |                       |                         | $250,000                | $1,000,000              |
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Guarantees                     | N/A                   | N/A                     | < $250,000              | $250,000 -              | > $1,000,000
                                   |                       |                         |                         | $1,000,000              |
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Easements and                  | N/A                   | < $25,000               | $25,000 -               | $100,000 -              | > $500,000
    Encumbrances (by impact)       |                       | impact                  | $100,000                | $500,000                | impact
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Employment Matters             | N/A                   | Routine HR support      | Terminations and        | Severance               | > $500,000 or any
                                   |                       | (offer letters,         | severance packages      | $100,000 -              | executive-level
                                   |                       | standard policies)      | < $100,000              | $500,000                | employment action
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Tax Elections (REIT)           | N/A                   | N/A                     | Routine annual          | Material elections       | Any election with
                                   |                       |                         | elections and filings   | (> $250,000 impact      | potential impact on
                                   |                       |                         |                         | or novel positions)      | REIT qualification
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Insurance Claims               | N/A                   | < $50,000               | $50,000 -               | $250,000 -              | > $1,000,000
                                   |                       |                         | $250,000                | $1,000,000              |
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Entity Formation /             | N/A                   | N/A                     | GC + CFO                | GC + CEO                | Board
    Dissolution                    |                       |                         | (routine entities)      | (material entities)     | (parent-level changes)
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Acquisition /                  | N/A                   | N/A                     | N/A                     | GC + CEO                | Board
    Disposition of Assets          |                       |                         |                         |                         |
    -------------------------------|------------------------|-------------------------|-------------------------|-------------------------|-------------------------
    Financing /                    | N/A                   | N/A                     | GC + CFO                | GC + CEO                | Board
    Loan Documents                 |                       |                         | (refinancing only)      |                         |

A.4. Approval Documentation Requirements

    (a) Tier 1: No counter-signatory required. The Paralegal or Senior Paralegal documents the action taken in the Salesforce matter record.

    (b) Tier 2: Documented approval by the Associate GC is required. Email approval or Salesforce system approval constitutes sufficient documentation. The approval record must identify the transaction, the dollar amount or scope, and the date of approval.

    (c) Tier 3: Documented approval by the GC and a counter-signatory (CFO, unless otherwise specified in the matrix) is required. Approvals must be documented in writing (email exchange or Salesforce system approval). The GC may not self-approve Tier 3 matters without a counter-signatory.

    (d) Tier 4: Documented approval by both the GC and the CEO is required. Approvals must be documented in writing prior to execution of the applicable transaction or commitment.

    (e) Tier 5: Documented approval by the GC and CEO, followed by Board approval (or approval by a designated Board committee), is required. Board approval must be reflected in Board minutes or a written consent.

A.5. Conflict of Interest Provision

    (a) If an individual with approval authority at a given Tier has a personal financial interest, family relationship, or other conflict of interest with respect to the matter requiring approval, that individual must recuse himself or herself and the approval must be escalated to the next higher Tier.

    (b) Any potential conflict of interest must be disclosed to the GC (or, if the GC is the conflicted individual, to the CEO) promptly upon the individual becoming aware of the conflict.

    (c) The GC maintains a record of all conflict-of-interest recusals in a confidential log retained in the Salesforce Legal Module.

A.6. Emergency Authority

    (a) General Counsel Unavailable: When the GC is unavailable (due to absence, incapacity, or unreachable status) and a matter requires action at Tier 3, the CFO may exercise Tier 3 approval authority for time-sensitive matters that cannot reasonably be deferred until the GC's return.

    (b) General Counsel and CEO Unavailable: When both the GC and the CEO are unavailable and a matter requires action at Tier 3 or Tier 4, the COO may exercise Tier 3 approval authority for time-sensitive matters that cannot reasonably be deferred.

    (c) Limitations on Emergency Authority:

        (i) Emergency authority is limited to seventy-two (72) hours per exercise. If the matter remains unresolved after seventy-two (72) hours, the acting authority must obtain approval from the GC or CEO (as applicable) or escalate to the next available authorized individual.

        (ii) Emergency authority may not be exercised for Tier 5 matters (matters requiring Board approval). If a Tier 5 matter requires emergency action, the acting authority must convene an emergency Board meeting or obtain written Board consent.

        (iii) All actions taken under emergency authority must be documented in writing, including the basis for invoking emergency authority, the unavailability of the primary approver(s), and the action taken.

        (iv) All actions taken under emergency authority must be ratified by the primary approver(s) within five (5) business days of the primary approver's return to availability. Ratification is documented in the Salesforce matter record and by countersignature on the emergency authority memorandum.

        (v) The GC reports all exercises of emergency authority to the CEO and CFO within five (5) business days. If the GC exercised emergency authority, the CEO is notified. If the CFO or COO exercised emergency authority, both the GC and CEO are notified upon their return.

A.7. Settlement Approval Procedures

    (a) Matters with exposure or proposed settlement value exceeding one hundred thousand dollars ($100,000) must receive approval at the applicable Tier BEFORE settlement terms are communicated to the opposing party. No binding or conditional offer may be conveyed to an opposing party without the required approval.

    (b) Time-Sensitive Settlements: Where settlement timing is critical (e.g., mediation, court-ordered settlement conference, or expiring settlement offer), the GC may seek conditional approval via email from the required approver(s). Email approval constitutes conditional authorization to communicate settlement terms, provided that:

        (i) The email clearly states the proposed settlement terms, the dollar amount, and the basis for time sensitivity.
        (ii) Formal ratification (via countersignature on a settlement authorization memorandum or Salesforce system approval) is obtained within forty-eight (48) hours of the conditional approval.
        (iii) If formal ratification is not obtained within forty-eight (48) hours, no further settlement discussions may proceed until formal approval is secured.

    (c) All settlement approvals and ratifications are documented in the Salesforce matter record and retained in the SharePoint matter folder.

A.8. Annual Review

This Attachment is reviewed annually in conjunction with the comprehensive Manual review described in Section 12.A. Dollar thresholds are evaluated against portfolio size, transaction volume, and risk tolerance. Adjustments to dollar thresholds require approval as specified in Section 12.B.2.


================================================================================
ATTACHMENT B: LEGAL RISK DASHBOARD
================================================================================

PRIVILEGED AND CONFIDENTIAL — PREPARED AT DIRECTION OF COUNSEL

B.1. Purpose and Distribution

The Legal Risk Dashboard is a summary reporting tool designed for executive leadership and Board-level consumption. It provides a consolidated view of the Company's legal risk profile, including active matter status, financial exposure, legal spend, insurance recovery status, and trend data.

    (a) Preparation: The Legal Risk Dashboard is prepared monthly by the Legal Department, drawing data from the Salesforce Legal Module (including the Legal Risk Tracker) and the e-billing platform.

    (b) Distribution:
        (i) Monthly: GC, CEO, CFO.
        (ii) Quarterly: Board of Directors (or designated Board committee), in conjunction with the quarterly Board reporting package.

    (c) Confidentiality: Each page of the Legal Risk Dashboard bears the legend: "PRIVILEGED AND CONFIDENTIAL — PREPARED AT DIRECTION OF COUNSEL." Distribution beyond the authorized recipients listed above requires GC approval.

B.2. Section 1 — Active Matters Summary

    Category           | High Risk | Medium Risk | Low Risk | Total | Prior Quarter Total | Change (QoQ)
    -------------------|-----------|-------------|----------|-------|---------------------|-------------
    Litigation         | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]
    Tenant Defaults    | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]
    Bankruptcy         | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]
    Insurance Claims   | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]
    Regulatory         | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]
    Environmental      | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]
    Employment         | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]
    TOTAL              | [#]       | [#]         | [#]      | [#]   | [#]                 | [+/- #]

    Trend Notes: Brief narrative identifying quarter-over-quarter trends (e.g., increase in tenant defaults, reduction in litigation inventory, new regulatory matters).

B.3. Section 2 — Financial Exposure Summary

    Risk Level | Number of   | Estimated Exposure    | Current    | Prior Quarter   | Change
               | Matters     | Range                 | Reserves   | Reserves        | (QoQ)
    -----------|-------------|-----------------------|------------|-----------------|--------
    High       | [#]         | $[low] - $[high]      | $[amount]  | $[amount]       | $[+/-]
    Medium     | [#]         | $[low] - $[high]      | $[amount]  | $[amount]       | $[+/-]
    Low        | [#]         | $[low] - $[high]      | $[amount]  | $[amount]       | $[+/-]
    TOTAL      | [#]         | $[low] - $[high]      | $[amount]  | $[amount]       | $[+/-]

B.4. Section 3 — Insurance Recovery Tracking

    Matter Name    | Gross Exposure  | Applicable     | Coverage    | Reservation  | Net Exposure
                   |                 | Policy         | Limit       | of Rights?   | (After Coverage)
    ---------------|-----------------|----------------|-------------|--------------|----------------
    [Matter 1]     | $[amount]       | [Policy ID]    | $[amount]   | Yes / No     | $[amount]
    [Matter 2]     | $[amount]       | [Policy ID]    | $[amount]   | Yes / No     | $[amount]
    ...            |                 |                |             |              |
    TOTAL          | $[amount]       |                |             |              | $[amount]

B.5. Section 4 — Material Matters Detail

This section provides per-matter detail for all matters with estimated exposure exceeding two hundred fifty thousand dollars ($250,000).

    Matter Name    | Matter   | Type         | Risk   | Estimated     | Current  | Outside     | Status /        | Next Key
    and Number     | Type     |              | Rating | Exposure      | Reserve  | Counsel     | Last Update     | Deadline
    ---------------|----------|--------------|--------|---------------|----------|-------------|-----------------|----------
    [Matter 1]     | [Type]   | [Lit/Reg/    | [H/M/L]| $[low]-       | $[amt]   | [Firm]      | [Summary]       | [Date]
                   |          |  Env/Ins]    |        | $[high]       |          |             |                 |
    [Matter 2]     | [Type]   |              | [H/M/L]| $[low]-       | $[amt]   | [Firm]      | [Summary]       | [Date]
                   |          |              |        | $[high]       |          |             |                 |
    ...            |          |              |        |               |          |             |                 |

B.6. Section 5 — Legal Spend Summary

    B.6.1. Aggregate Legal Spend

    Category                | YTD Actual   | YTD Budget   | Variance ($) | Variance (%) | Prior Year YTD | Full Year Forecast
    ------------------------|--------------|--------------|--------------|--------------|----------------|-------------------
    Litigation              | $[X]         | $[X]         | $[X]         | [X]%         | $[X]           | $[X]
    Transactional           | $[X]         | $[X]         | $[X]         | [X]%         | $[X]           | $[X]
    Regulatory/Compliance   | $[X]         | $[X]         | $[X]         | [X]%         | $[X]           | $[X]
    Employment              | $[X]         | $[X]         | $[X]         | [X]%         | $[X]           | $[X]
    Environmental           | $[X]         | $[X]         | $[X]         | [X]%         | $[X]           | $[X]
    General/Administrative  | $[X]         | $[X]         | $[X]         | [X]%         | $[X]           | $[X]
    TOTAL                   | $[X]         | $[X]         | $[X]         | [X]%         | $[X]           | $[X]

    Annual Aggregate Legal Spend Budget: $[Total Annual Budget]. Any projected variance exceeding ten percent (10%) of the annual aggregate legal spend budget requires written notification from the GC to the CFO and CEO, accompanied by a remediation plan identifying (a) the cause of the variance, (b) proposed corrective actions, and (c) projected revised full-year spend. Failure to provide timely notification constitutes a reportable compliance event documented in the GC's annual review of the Manual.

    B.6.2. Top 5 Matters by Spend

    Rank | Matter Name and Number | YTD Spend  | Approved Budget | Variance    | Assigned Firm
    -----|------------------------|------------|-----------------|-------------|---------------
    1    | [Matter]               | $[X]       | $[X]            | $[+/- X]    | [Firm]
    2    | [Matter]               | $[X]       | $[X]            | $[+/- X]    | [Firm]
    3    | [Matter]               | $[X]       | $[X]            | $[+/- X]    | [Firm]
    4    | [Matter]               | $[X]       | $[X]            | $[+/- X]    | [Firm]
    5    | [Matter]               | $[X]       | $[X]            | $[+/- X]    | [Firm]

    B.6.3. Top 5 Firms by Spend

    Rank | Firm Name              | YTD Spend  | Number of Matters | Avg. Blended Rate | Diversity Score
    -----|------------------------|------------|-------------------|-------------------|----------------
    1    | [Firm]                 | $[X]       | [#]               | $[X]/hr           | [X]%
    2    | [Firm]                 | $[X]       | [#]               | $[X]/hr           | [X]%
    3    | [Firm]                 | $[X]       | [#]               | $[X]/hr           | [X]%
    4    | [Firm]                 | $[X]       | [#]               | $[X]/hr           | [X]%
    5    | [Firm]                 | $[X]       | [#]               | $[X]/hr           | [X]%

B.7. Section 6 — Key Developments

This section contains a narrative summary of material developments during the reporting period, including:

    (a) New matters opened.
    (b) Matters resolved, settled, or dismissed.
    (c) Significant changes in risk rating or exposure.
    (d) Upcoming deadlines or decisions requiring executive action.
    (e) Trends or recurring issues warranting attention (with quarter-over-quarter comparison).
    (f) Regulatory or legislative developments affecting the portfolio.

B.8. Section 7 — Action Items

Decisions or approvals requested from executive leadership or the Board, with:

    (a) Description of the action requested.
    (b) Recommended course of action.
    (c) Deadline for decision.
    (d) Applicable Tier of approval authority (per Attachment A).
    (e) Financial impact or exposure.

B.9. Outside Counsel Reporting Compliance

The Dashboard includes a compliance section tracking outside counsel adherence to reporting obligations under Attachment C:

    Firm Name | Monthly Status    | Budget-to-Actual  | Invoice     | Compliance   | Action
              | Report (Y/N/Late) | Report (Y/N/Late) | Timeliness  | Status       |
    ----------|-------------------|--------------------|---------    |--------------|--------
    [Firm 1]  | [Y/N/Late]        | [Y/N/Late]         | [On time/   | [Compliant/  | [None/
              |                   |                    |  Late]      |  Warning/    |  Warning/
              |                   |                    |             |  Non-Compliant| Hold]
    [Firm 2]  | ...               | ...                | ...         | ...          | ...

    Non-compliant firms are subject to the escalation procedures described in Attachment C, Section C.14.


================================================================================
ATTACHMENT C: OUTSIDE COUNSEL BILLING GUIDELINES
================================================================================

These guidelines (the "Billing Guidelines") apply to all outside counsel retained by PIR Industrial LLC (the "Company"). Outside counsel are expected to review and adhere to these Billing Guidelines as a condition of engagement. The Legal Department reserves the right to modify these Billing Guidelines at any time upon thirty (30) calendar days' written notice to affected firms. Terms used in these Billing Guidelines have the meanings set forth in Section 12.F of the Manual.

C.1. Rate Caps

    (a) Maximum hourly rates by timekeeper level are as follows:

        Timekeeper Level            | Maximum Hourly Rate
        ----------------------------|--------------------
        Partner                     | $650.00
        Senior Associate (4+ years) | $475.00
        Junior Associate (< 4 years)| $350.00
        Paralegal / Legal Assistant | $225.00

    (b) Rate schedules must be agreed upon in writing prior to commencement of work and must not exceed the caps set forth in subsection (a).

    (c) Annual rate increases, if any, are capped at three percent (3%) over the prior year's approved rates and require sixty (60) calendar days' advance written notice to the GC. Rate increases exceeding three percent (3%) require GC pre-approval and must be justified in writing.

    (d) Blended or alternative fee arrangements (flat fees, contingent fees, success fees, fee caps) are encouraged for appropriate matters and must be approved in writing by the GC prior to commencement of work.

    (e) Rate schedules and any approved increases are documented in the engagement letter and maintained in the Salesforce matter record.

C.2. Staffing Requirements

    (a) Matters must be staffed efficiently. The Company expects lean staffing appropriate to the complexity and value of the matter.

    (b) The responsible partner must be identified in the engagement letter and may not be changed without prior written approval from the GC.

    (c) Work must be delegated to the lowest-cost timekeeper capable of performing the work competently.

    (d) The Company will not pay for more than two (2) attorneys attending the same deposition, hearing, or meeting without prior written approval from the GC.

    (e) Summer associates and first-year associates may not bill time to Company matters without prior written approval from the GC.

    (f) New attorney staffing changes (additions or replacements of timekeepers) require GC pre-approval. The firm must submit a written request identifying the proposed timekeeper, their rate, and the reason for the staffing change.

    (g) Transition billing and learning time for new timekeepers added to an ongoing matter are non-billable. The Company will not pay for time spent by new attorneys or paralegals to familiarize themselves with the matter file, review prior work product, or otherwise come up to speed, unless the GC approves a specific transition budget in writing.

C.3. Billing Format and Requirements

    (a) All invoices must be submitted through the Company's e-billing platform in LEDES 1998B format. Invoices submitted in any other format will be returned without processing.

    (b) Invoices must be submitted monthly, within forty-five (45) calendar days of the end of the billing period. Invoices submitted more than ninety (90) calendar days after the end of the billing period will not be paid absent GC approval.

    (c) Each invoice must include: matter name and Company matter number, description of services by timekeeper, hours worked, hourly rate, total fees, and itemized disbursements.

    (d) Time entries must be recorded in increments of no greater than one-tenth (0.1) of an hour.

    (e) No single time entry may exceed five-tenths (0.5) of an hour without a sufficiently detailed description that permits the reviewer to assess the reasonableness of the time. Entries exceeding 0.5 hours must describe the specific tasks performed with sufficient particularity to permit line-item review.

    (f) Block billing (grouping multiple discrete tasks into a single time entry without allocating time to each task) is prohibited.

    (g) Vague descriptions (e.g., "research," "review documents," "attend to matter," "correspondence") are not acceptable. Each entry must describe the specific work performed, including identification of the document reviewed, the issue researched, or the party communicated with.

C.4. Daily Hour Caps

    (a) No timekeeper may bill more than ten (10) hours per day to Company matters.

    (b) If a timekeeper bills time to Company matters on a day when the timekeeper also bills time to other clients, the total billed across all clients may not exceed a reasonable workday. The Company reserves the right to request a certification of total daily hours billed if an invoice reflects ten (10) hours on a single day.

C.5. Intra-Firm Conference Limits

    (a) Internal firm conferences (conferences among attorneys or staff within the same firm regarding a Company matter) are limited to a maximum of two (2) attorneys billable per internal conference.

    (b) Internal conferences are capped at five-tenths (0.5) of an hour per conference per timekeeper.

    (c) Routine internal supervisory review and case management conferences are not separately billable.

C.6. Prohibited Charges

The following charges will not be reimbursed:

    (a) Internal administrative and overhead costs (word processing, secretarial support, filing, copying for internal use, local telephone charges, postage for routine correspondence).
    (b) Database or legal research service access fees (e.g., Westlaw, LexisNexis subscription fees). Charges for specific, targeted research projects may be billed with GC pre-approval.
    (c) First-class or business-class airfare.
    (d) Alcohol.
    (e) Charges for internal firm meetings, training, or professional development.
    (f) Rush charges for printing, copying, or courier services not specifically requested by the Company.
    (g) Charges for firm technology infrastructure, practice management software, or cybersecurity (these are firm overhead).
    (h) Interest, late fees, or finance charges.
    (i) Meals exceeding the applicable GSA per diem rate for the locality.

C.7. Travel

    (a) All travel requires written pre-approval from the GC or the assigned Department member.
    (b) Air travel must be economy class. Upgrades are at the firm's expense.
    (c) Lodging and meal per diem rates are governed by the then-current U.S. General Services Administration ("GSA") schedule for the applicable locality.
    (d) Travel time is billed at fifty percent (50%) of the applicable timekeeper's hourly rate.
    (e) Mileage for personal vehicle use is reimbursed at the then-current IRS standard mileage rate.
    (f) Receipts are required for all travel expenses exceeding twenty-five dollars ($25.00).

C.8. Expense Pre-Approval

The following expenses require written pre-approval from the GC or the assigned Department member:

    (a) Expert witnesses and consultants (including selection, scope of engagement, and fee arrangements).
    (b) Travel and lodging (as specified in Section C.7).
    (c) Outsourced discovery, e-discovery vendors, or document review services.
    (d) Filing fees exceeding one thousand dollars ($1,000).
    (e) Any single expense exceeding two thousand five hundred dollars ($2,500).

C.9. Matter Budgets

    (a) A matter budget is required at the outset of each engagement, broken down by phase of work (e.g., initial assessment, discovery, motion practice, trial preparation, trial, appeal).
    (b) The budget must be approved by the GC or the assigned Department member before substantive work begins.
    (c) If actual spend is projected to exceed the approved budget by more than fifteen percent (15%), outside counsel must notify the Department in writing and obtain approval for a revised budget before incurring additional charges. Failure to obtain revised budget approval constitutes a billing guideline violation subject to the consequences described in Section C.14.
    (d) Quarterly budget-to-actual reports must be submitted with each invoice or, at minimum, with each quarterly reporting submission.

C.10. Reporting Requirements

    (a) Monthly Status Reports: Outside counsel must provide a written status report by the fifteenth (15th) calendar day of the month following the reporting period. Each status report must include:

        (i) Summary of activity during the reporting period.
        (ii) Material developments and their impact on case strategy or exposure.
        (iii) Next steps and anticipated activity for the upcoming period.
        (iv) Budget-to-actual comparison (fees and expenses).
        (v) Updated timeline and key upcoming deadlines.

    (b) Prompt Notification: Outside counsel must promptly notify the GC (within twenty-four (24) hours) of any material development, including but not limited to: adverse rulings, settlement demands, significant discovery, deadline changes, and changes in estimated exposure.

    (c) Early Case Assessment: Within thirty (30) calendar days of engagement, outside counsel must provide an early case assessment including estimated exposure range, recommended strategy, and projected timeline and budget.

    (d) Failure to Report: Failure to submit a monthly status report by the fifteenth (15th) of the month results in an automatic hold on invoice processing for that matter until the report is received and accepted by the Department.

    (e) The GC maintains a calendar tracking all outside counsel reporting deadlines. The Department sends reminders to outside counsel five (5) business days before each reporting deadline. Overdue reports are escalated per Section C.14.

C.11. Invoice Review and Payment

    (a) All invoices are subject to review and adjustment by the Department in accordance with the segregation of duties requirements set forth in Section 11.F.2 of the Manual.

    (b) The Company reserves the right to reduce or reject charges that do not comply with these Billing Guidelines. Reductions are documented with a written explanation provided to outside counsel.

    (c) Payment terms are net forty-five (45) calendar days from receipt of a compliant invoice through the e-billing platform. Non-compliant invoices are returned for correction, and the payment period does not commence until a compliant invoice is resubmitted.

    (d) Disputes regarding invoice adjustments are resolved through discussion between the GC and the responsible partner. If the dispute is not resolved within thirty (30) calendar days, the GC's determination is final.

C.12. Audit Rights

    (a) The Company reserves the right to audit outside counsel billing records, time entries, and supporting documentation upon thirty (30) calendar days' written notice.

    (b) Outside counsel must retain complete billing records (including contemporaneous time records) for a minimum of three (3) years following the conclusion of the engagement or the final invoice, whichever is later.

    (c) Outside counsel must cooperate fully with any audit, including providing access to original time records, expense receipts, and staffing records. Failure to cooperate constitutes a material breach of the engagement.

    (d) If an audit reveals systematic overbilling (defined as billing adjustments exceeding five percent (5%) of total fees billed during the audit period), the Company may recover audit costs from outside counsel and pursue additional remedies.

C.13. Panel Selection and Diversity Requirements

    (a) Annual Panel Review: The GC conducts an annual review of the Company's outside counsel panel. The review evaluates each panel firm based on: quality of legal services, responsiveness, billing compliance, budget adherence, matter outcomes, and diversity performance.

    (b) Panel Selection Criteria: Firms are selected for the outside counsel panel based on the following documented criteria:

        (i) Relevant substantive expertise (real estate, REIT, litigation, environmental, employment, as applicable).
        (ii) Geographic coverage for the Company's portfolio.
        (iii) Demonstrated quality of legal work and responsiveness.
        (iv) Competitive rate structures within the caps set forth in Section C.1.
        (v) Diversity of attorneys available to staff Company matters.
        (vi) Billing guideline compliance history.
        (vii) Conflicts clearance.

    (c) Competitive Bidding: For matters with estimated fees exceeding one hundred thousand dollars ($100,000), the GC solicits proposals from a minimum of two (2) qualified firms (from the panel or otherwise) before selecting outside counsel. The GC documents the basis for the selection in the Salesforce matter record. The competitive bidding requirement may be waived by the GC for matters requiring immediate action or specialized expertise not available from multiple firms, provided the waiver is documented.

    (d) Diversity Requirements: The Company is committed to retaining outside counsel firms that reflect the diversity of the communities in which the Company operates. The following diversity requirements apply:

        (i) Panel firms must provide annual diversity data (attorneys by gender, race/ethnicity, LGBTQ+ identification, and disability status, to the extent voluntarily disclosed and permitted by law).
        (ii) The Company expects meaningful staffing of Company matters by diverse attorneys, not merely the inclusion of diverse attorneys on pitch teams. "Meaningful staffing" means that diverse attorneys perform substantive legal work on the matter (not solely administrative or supporting tasks).
        (iii) Diversity performance is a factor in the annual panel review and in the selection of firms for new matters.
        (iv) The GC reports panel diversity metrics to the CEO annually.

C.14. Non-Compliance Escalation

    (a) First Violation: Written notice from the GC identifying the specific billing guideline violation and requesting corrective action. The notice is documented in the Salesforce matter record.

    (b) Second Violation: Invoice adjustment (reduction or rejection of non-compliant charges) and a written warning that further violations may result in panel removal. The adjustment and warning are documented in the Salesforce matter record.

    (c) Third Violation: Panel removal consideration. The GC convenes a review to determine whether the firm should be removed from the outside counsel panel. Factors considered include the severity and pattern of violations, the firm's corrective efforts, the quality of legal services, and the availability of alternative counsel. The GC documents the determination and communicates it to the firm in writing.

    (d) Repeated or egregious violations (including systematic overbilling, failure to comply with audit requests, or unauthorized staffing changes) may result in immediate termination of the engagement, regardless of the number of prior violations.

C.15. Conflicts and Confidentiality

    (a) Outside counsel must disclose any actual or potential conflicts of interest prior to engagement and on an ongoing basis throughout the engagement.

    (b) All Company information must be treated as confidential and may not be disclosed to any third party without prior written authorization from the GC.

    (c) Outside counsel may not issue press releases, publish articles, list the Company as a representative client, or make public statements regarding Company matters without prior written consent from the GC.

    (d) Upon termination of an engagement, outside counsel must promptly return or destroy all Company materials and confirm in writing that no copies have been retained (other than as required by applicable law or professional responsibility rules).

C.16. Representations and Warranties Support

    (a) When outside counsel is engaged in connection with a transaction requiring representations and warranties (including acquisitions, dispositions, financing, and joint ventures), outside counsel must provide a written summary identifying:

        (i) All material exceptions, qualifications, or disclosures to the representations and warranties.
        (ii) Any known or reasonably foreseeable risks associated with the representations and warranties.
        (iii) Recommended bring-down conditions, survival periods, and indemnification provisions.

    (b) The representations and warranties summary must be delivered to the GC no fewer than five (5) business days prior to the scheduled closing date.

C.17. Acknowledgment

By accepting an engagement from the Company, outside counsel acknowledges receipt of and agreement to comply with these Billing Guidelines. A signed acknowledgment must be returned to the GC within ten (10) business days of receipt. Failure to return a signed acknowledgment within such period constitutes acceptance of these Billing Guidelines by continued performance of legal services.

================================================================================
END OF REVISED SECTIONS AND ATTACHMENTS
================================================================================
