# AI Agent Research — Legal Ops Manual Remediation
**Date:** 2026-03-18
**Purpose:** Identify 3 AI agents/platforms to address feedback findings

---

## The Problem

Our 5 agent review found 125+ findings across the Legal Ops Manual. They cluster into 3 solvable categories:

1. **Vague policies with no operational teeth** (Sections 6-12, blank DOA, no timelines)
2. **No real risk tracking or board-ready reporting** (no dashboards, no probability-weighted exposure)
3. **Privilege protection gaps across SharePoint/Salesforce** (no segmentation, no litigation hold audit trails)

---

## Recommended 3-Agent Stack

### Agent 1: Onit Unity — Legal Operations Backbone
**Category:** Document Automation, Compliance Workflows, Risk Tracking

**What it solves from our feedback:**
- OT-01: No intake for non-leasing requests → Onit centralizes ALL legal intake with routing rules
- OT-04: No lease execution workflow → Configurable approval chains with authority checks
- CA-16/BA-01: Blank DOA thresholds → Enforces delegation of authority matrices digitally
- OT-28: No SLA consequences → Automated escalation when deadlines pass
- OT-30: Escalation table with no follow-through → Workflow triggers next steps automatically
- BA-02: Budget variance with no escalation → Automated alerts at threshold
- CC-08: Salesforce ownership ambiguity → Single system of record

**Key capabilities:**
- Matter management with risk analytics dashboards
- Spend management and e-billing (addresses BA-03, BA-04, BA-05)
- Legal holds with Microsoft Purview integration (addresses AR-09, AR-10)
- Customizable workflow automation for approval matrices
- AI-enabled contract data extraction (Onit Catalyst)

**Integrations:** Microsoft 365, SharePoint, Salesforce, iManage, NetDocuments
**Pricing:** Tiered (Essentials → Enterprise), custom quotes
**AI approach:** GenAI for extraction + rule-based workflow automation

**Why this over alternatives:**
- Ironclad is contract-only; Onit covers matters, spend, holds, AND contracts
- Streamline AI is intake-only; Onit is end-to-end
- Best SharePoint + Salesforce integration of any platform reviewed

---

### Agent 2: RelativityOne — Privilege Protection & eDiscovery
**Category:** Privilege Management, Litigation Holds, Document Preservation

**What it solves from our feedback:**
- AR-01: SharePoint access destroys privilege → Segments and classifies privileged materials
- AR-02: @mention legal advice = privilege waiver → AI identifies privileged content for segregation
- AR-03: Privilege labels suggested not required → Automated privilege determination with rationale
- AR-09: No litigation hold verification → Legal Hold module with custodian tracking and audit trails
- AR-10: Retention gaps for informal comms → Preserves Slack, Teams, email in-place
- CA-06: No periodic hold re-certification → Automated reminder workflows
- CA-24: Hold doesn't address personal devices → Custodian interview and preservation notices
- CA-12: Retention periods lack regulatory basis → Defensible disposition workflows

**Key capabilities:**
- **aiR for Privilege:** AI-generated privilege determinations with rationale — 200+ customers, 25M+ docs reviewed, up to 3M docs/day
- **Legal Hold:** Automated custodian notifications, in-place preservation (Slack, SharePoint, Teams), compliance tracking with audit trail
- **aiR Assist:** Natural-language search across document sets
- **Processing & Review:** Full eDiscovery pipeline

**Integrations:** SharePoint, OneDrive, Outlook, Microsoft Teams, Slack, Microsoft Purview
**Pricing:** Data-tier licensing (eliminated per-user fees in 2025). Pay-as-you-go or annual subscription based on data volume. Legal Hold included in standard tier.
**AI approach:** Purpose-built ML models for privilege classification + GenAI for rationale generation

**Why this over alternatives:**
- Everlaw's privilege tooling is newer and less proven
- Exterro is more rule-based, less AI-capable
- Relativity is the undisputed market leader — used by 90%+ of AmLaw 200

**Important limitation:** Relativity activates during litigation/investigations. It does NOT provide real-time, ongoing privilege protection in SharePoint during normal business. That gap requires:
- Microsoft Purview sensitivity labels + information barriers
- SharePoint permission architecture redesign
- Training and policy enforcement

---

### Agent 3: Diligent One — Entity Governance & Board Reporting
**Category:** Entity Management, REIT Compliance, CFO/Board Dashboards

**What it solves from our feedback:**
- CA-09: No REIT qualification specifics → Entity-level compliance tracking with regulatory calendar
- CA-10: State filing requirements not listed → Automated filing deadline tracking across jurisdictions
- BA-15: REIT compliance monitoring vague → Structured compliance framework with alerts
- BA-12: Dashboard lacks trend data → Board-ready risk dashboards with historical trends
- BA-13: No board reporting cadence → Templated board reporting with scheduling
- BA-24: Not credit-facility-ready → Auditable entity records for lender requirements
- CA-08: No annual entity record review → Automated review cycles with attestation
- CA-27/28: Governance and compliance calendars undefined → Pre-built calendar frameworks
- CC-07: ShareFile ownership ambiguity → Centralized entity document repository
- BA-16: Entity management via spreadsheet → Purpose-built entity management system

**Key capabilities:**
- **Diligent Entities:** System of record for global entity governance — legal entity names, jurisdictions, ownership structures, officers, registered agents, good standing
- **Board Reporting:** Templatized risk dashboards, ERM reporting, audit-ready data packages
- **Compliance Automation:** Filing deadline tracking, good standing monitoring, annual report management
- **AI Insights:** Flags risks, surfaces anomalies, automates routine compliance checks
- 100,000+ monthly users; Gartner Magic Quadrant Leader for GRC (2025)

**Integrations:** Microsoft 365 ecosystem, API-based integrations
**Pricing:** Enterprise; typically six-figure annual contracts for full platform
**AI approach:** Embedded AI for risk flagging + structured rule-based compliance tracking

**Why this over alternatives:**
- No other platform combines entity management + board reporting at this depth
- Purpose-built for the exact governance problems Sections 6-7 and Attachment B need
- REIT entity structures (dozens of SPEs, TRS entities, operating partnerships) demand specialized tooling
- Makes the manual "credit-facility-ready" — critical for REIT debt covenants

---

## How the 3 Agents Map to Feedback Findings

| Finding Category | Count | Onit | Relativity | Diligent |
|-----------------|-------|:----:|:----------:|:--------:|
| Blank DOA / authority gaps | 8 | PRIMARY | — | SUPPORT |
| No operational procedures (Sections 6-12) | 14 | PRIMARY | — | — |
| Privilege / waiver risks | 7 | — | PRIMARY | — |
| Litigation hold gaps | 6 | SUPPORT | PRIMARY | — |
| REIT compliance gaps | 5 | — | — | PRIMARY |
| Board reporting gaps | 6 | SUPPORT | — | PRIMARY |
| Entity management gaps | 4 | — | — | PRIMARY |
| Risk tracking / reserve integration | 8 | PRIMARY | — | SUPPORT |
| Outside counsel spend management | 5 | PRIMARY | — | — |
| Document management conflicts | 4 | SUPPORT | PRIMARY | — |
| Consistency / formatting issues | 5 | — | — | — |
| **Coverage** | **72/125** | **~45** | **~20** | **~20** |

**Remaining ~53 findings** are manual/editorial issues (typos, inconsistent numbering, duplicate text, missing definitions) that don't require a software platform — they require a document revision pass.

---

## Estimated Total Cost

| Platform | Annual Cost Range | Notes |
|----------|------------------|-------|
| Onit Unity | $75,000 - $200,000 | Depends on modules and users |
| RelativityOne | $50,000 - $150,000 | Data-volume based; lower if minimal litigation |
| Diligent One | $100,000 - $250,000 | Full platform with entities + board reporting |
| **Total** | **$225,000 - $600,000** | Typical mid-market REIT range |

For context: A single significant litigation matter can cost $500K+ in outside counsel fees. These platforms reduce both the likelihood and cost of such matters.

---

## Alternative: The "AI Assistant" Layer

In addition to the 3 operational platforms, an AI research/drafting assistant could accelerate the manual revision itself:

| Tool | Best For | Cost |
|------|----------|------|
| **Harvey AI** | Complex legal drafting, policy generation, REIT regulatory research | ~$1,200/lawyer/month |
| **GC AI** | In-house legal drafting, contract review, document summarization | Starting $500/month |
| **CoCounsel Legal** | Westlaw-grounded compliance research, bulk document review | Part of Thomson Reuters subscription |

These would help WRITE the improved manual sections. The 3 operational platforms above would help ENFORCE them.

---

## Emerging Trend: Convergence (2026-2027)

The market is moving toward unified "AI Legal Operations" platforms:
- **Onit** is adding GenAI (Catalyst) to its operational backbone
- **Relativity** is expanding beyond eDiscovery into broader legal data management
- **Thomson Reuters** is combining CoCounsel + Legal Tracker + Practical Law into an integrated ecosystem

By 2027, the 3-platform stack may consolidate to 2 or even 1. But today, no single platform covers all three categories adequately.

---

*Research conducted 2026-03-18 via web search across vendor sites, G2/Capterra, Legaltech News, Artificial Lawyer, CLOC publications, and analyst reports.*
