## Operations Stress-Tester -- Re-Review (Loop 1)
**Date:** 2026-03-18
**Document:** revision_2026-03-18_v1.md

### Original Finding Resolution Status

| Original ID | Original Severity | Status | Notes |
|---|---|---|---|
| OT-01 | CRITICAL | RESOLVED | Fix 6 adds Non-Leasing Legal Request Intake covering all five non-leasing workstreams with category definitions, triage assignment, and cross-references. A day-1 paralegal can now identify the correct intake channel for any request type. |
| OT-02 | HIGH | RESOLVED | Legal Operations Coordinator role defined for triage; GC assigns based on workload, expertise, complexity. Assignment mechanism is now clear. |
| OT-03 | MEDIUM | RESOLVED | Fix 1 and Fix 17 reconcile the conflict: temporary local copies permitted with mandatory deletion after upload/transmission. Both Section 2 and Section 5 now say the same thing. |
| OT-04 | CRITICAL | RESOLVED | Fix 10 adds a four-step Lease Execution Workflow (authority verification, GC sign-off, signature routing via DocuSign, post-execution filing). Actionable by a new hire. |
| OT-05 | CRITICAL | RESOLVED | Section 8.5(C.1) provides a six-step First 48 Hours checklist with specific actions, responsible persons, and deliverables. This is genuinely executable. |
| OT-06 | HIGH | RESOLVED | Section 8.5(C.3) adds three-tier escalation for non-acknowledgment (second notice with supervisor copy, department head + HR escalation, technical preservation). Clear fallback chain. |
| OT-07 | HIGH | RESOLVED | Section 7.B requires escalation to GC within 1 business day with defined remedial actions (expedited filing, reinstatement, outside counsel). Actionable. |
| OT-08 | HIGH | RESOLVED | Legal Operations Coordinator (or GC designee) now explicitly identified as the triage person. No ambiguity remains. |
| OT-09 | MEDIUM | RESOLVED | Fix 16 clarifies: Asset Management generates the initial comparison; Legal reviews for legal sufficiency. Responsibility is now unambiguous. |
| OT-10 | MEDIUM | RESOLVED | Attachment A five-tier structure distinguishes Paralegal, Associate GC, GC, GC+CEO, and Board. Each tier has defined transaction authority. |
| OT-11 | MEDIUM | RESOLVED | Section 9.A sets Property Ops Sync to Monthly with three specific ad hoc triggers (workplace injury requiring medical treatment, property damage >$25K, governmental inspection/citation). |
| OT-12 | LOW | RESOLVED | Section 11.A Core Systems table assigns single owners: Salesforce to Legal, SharePoint to Legal+IT, ShareFile to Asset Management, E-Billing to Legal+Finance. |
| OT-13 | HIGH | RESOLVED | Section 1.5 defines "Material" as exceeding $250,000 individually or in aggregate. Clear and usable. |
| OT-14 | HIGH | RESOLVED | Section 1.5 defines "Periodically" as no less than quarterly; revised sections replace vague language with specific frequencies (weekly, monthly, etc.). |
| OT-15 | MEDIUM | RESOLVED | Section 1.5 defines "Authorized Persons" with cross-reference to Attachment A. Fix 7 replaces vague references in Section 4. |
| OT-16 | CRITICAL | RESOLVED | Attachment A fully populated with specific dollar thresholds for 14 transaction types across 5 tiers. The authority framework is now operative. |
| OT-17 | LOW | RESOLVED | Section 12.F defines Standard Procurement Process with competitive bidding for >$100K, CFO approval for >$250K, written agreement required. |
| OT-18 | MEDIUM | RESOLVED | Section 1.5 defines "Near Term" as 90 calendar days. Fix 7 adds parenthetical in Section 4. |
| OT-19 | HIGH | PARTIALLY RESOLVED | Section 11.B provides field-by-field required fields (a)-(h), defined status values, and standard report list. However, no screenshots or click-by-click navigation instructions are provided. For a day-1 paralegal unfamiliar with Salesforce, there is still a gap between "these are the fields" and "here is how to navigate the UI." The feedbackaddressed log acknowledges this and categorizes screenshots as implementation detail. Acceptable for a policy manual; a separate Salesforce Quick Reference Guide would close this gap. |
| OT-20 | MEDIUM | RESOLVED | Section 11.D.1 defines three-level folder hierarchy (functional area / property-entity-matter / document type). Usable by a new hire. |
| OT-21 | MEDIUM | RESOLVED | Section 11.E adds ShareFile Governance with scope (3 permitted purposes), access controls (time-limited, read-only external, quarterly review), and coordination with SharePoint. |
| OT-22 | HIGH | RESOLVED | Section 11.C identifies Legal Risk Tracker as a Salesforce module with 11 enumerated fields. Section 10 defines risk categories and PWEL methodology. No ambiguity about what system it lives in or what data it captures. |
| OT-23 | HIGH | RESOLVED | Fix 6 requires confirmation within 1 business day: Salesforce status update to "Received -- Pending Assignment" for leasing; email confirmation for non-leasing. |
| OT-24 | HIGH | RESOLVED | Fix 18 adds GC sign-off before first external circulation. Fix 10 adds GC sign-off in Lease Execution Workflow. Two independent enforcement points. |
| OT-25 | MEDIUM | RESOLVED | Section 10.E establishes bilateral reserve reconciliation: monthly reviews, quarterly formal meetings, defined adjustment thresholds ($50K/$250K/$1M), and Finance-to-Legal feedback. |
| OT-26 | HIGH | RESOLVED | Section 8.5(F) defines Litigation Hold -- IT Coordination Form with SLAs (4 hours acknowledgment, 24/48 hours completion) and escalation for missed SLAs. |
| OT-27 | MEDIUM | RESOLVED | Attachment C, Section C.10(d) adds automatic invoice hold for missed reports. Section C.14 adds graduated non-compliance escalation. Attachment B, Section B.9 adds compliance tracking to Dashboard. |
| OT-28 | HIGH | PARTIALLY RESOLVED | Section 9.F adds a Consequence Framework (quarterly reporting, CEO/Board notification, performance management, annual training). This addresses the gap through management process rather than automatic penalties. For an internal operations manual this is appropriate -- automatic penalties for internal SLA misses would be unusual. The remaining gap: no specific person is designated to monitor and report on SLA compliance (who pulls the data?). |
| OT-29 | MEDIUM | RESOLVED | Attachment C, Section C.9(c) makes budget overruns without pre-approval a billing guideline violation subject to graduated consequences in C.14 (written notice, adjustment, panel removal). |
| OT-30 | HIGH | RESOLVED | Section 9.C adds a Required Response Actions column to the escalation table with concrete steps for each event type (e.g., "initiate litigation hold; engage outside counsel; notify insurance carrier"). |
| OT-31 | MEDIUM | RESOLVED | Section 12.D populates change log with Version 1.0, effective date 2026-03-18, GC and CEO approval. |
| OT-32 | CRITICAL | RESOLVED | Attachment C, Section C.1 populates rate caps: Partner $650/hr, Senior Associate $475/hr, Junior Associate $350/hr, Paralegal $225/hr. 3% annual increase cap included. |

### Remaining Findings

| ID | Finding | Severity | Section |
|---|---|---|---|
| OT-R1-01 | **Salesforce procedural gap persists for non-technical users.** Section 11.B lists required fields and status values but provides no navigation path (e.g., "click New Request on the Legal Module home page"). A day-1 paralegal unfamiliar with Salesforce cannot execute intake from this text alone. Recommend a companion Salesforce Quick Reference Guide (separate document, not policy content). | MEDIUM | 11.B |
| OT-R1-02 | **SLA compliance monitoring has no designated owner.** Section 9.F establishes consequences for missed escalations but does not specify who monitors SLA compliance, who pulls the data, or what system produces the quarterly compliance report. A new hire reading this section cannot determine who is responsible for enforcement. | MEDIUM | 9.F |
| OT-R1-03 | **Leasing Pipeline Review trigger threshold is a placeholder.** Section 9.A Leasing Pipeline Review includes "$[X] annual rent" as the ad hoc trigger. This is an unfilled placeholder in the revision, making the trigger inoperative for that specific condition. | HIGH | 9.A |
| OT-R1-04 | **No procedure for onboarding a new Legal Operations Coordinator.** The Legal Operations Coordinator role is now central to triage (OT-08 fix) but there is no succession or cross-training requirement. If that person is absent or leaves, the intake process has a single point of failure. Section 11 new hire onboarding covers Legal Department personnel generally but does not address LOC-specific knowledge transfer. | MEDIUM | 4, 11.C |
| OT-R1-05 | **E-Billing platform not named.** Section 11.F requires an e-billing system supporting LEDES 1998B but does not identify the specific platform (e.g., CounselLink, Brightflag, SimpleLegal). A day-1 paralegal processing invoices cannot determine which system to log into. Section 11.A lists "E-Billing Platform" as a system but does not name it. | LOW | 11.A, 11.F |
| OT-R1-06 | **Mobile archiving solution not named or deployed.** Section 8.5(B) requires business text messages to be captured using an "approved mobile archiving solution" and employees to enroll in "the Company's mobile device management (MDM) program or approved archiving application." Neither the archiving solution nor the MDM program is identified by name. A day-1 employee cannot comply because there is no system to enroll in. | HIGH | 8.5(B) |
| OT-R1-07 | **Litigation Hold -- IT Coordination Form referenced but not provided.** Section 8.5(F) defines SLAs and required fields for this form but the form itself is not attached or templated. A paralegal issuing a litigation hold cannot locate or complete this form without further guidance. | MEDIUM | 8.5(F) |
| OT-R1-08 | **Destruction Authorization Memorandum format undefined.** Section 8.5(D.2) requires GC-approved Destruction Authorization Memoranda and Certificates of Destruction but provides no template, required fields, or format guidance. | LOW | 8.5(D) |
| OT-R1-09 | **Whistleblower reporting channel not operationalized.** Section 7.E says the Company "maintains a confidential reporting channel (hotline or web-based portal)" but does not name the vendor, URL, phone number, or point of contact. An employee seeking to make a report cannot determine how to access the channel from this manual. | MEDIUM | 7.E |
| OT-R1-10 | **Entity Management System not named.** Section 7.A and Section 1.5 reference "purpose-built platform (e.g., Diligent Entities, CSC Entity Management, or equivalent)" but do not state which one the Company actually uses. A paralegal tasked with updating entity records cannot determine which system to log into. | LOW | 7.A, 1.5 |
| OT-R1-11 | **No procedure for when the GC is on extended leave.** Attachment A Section A.6 covers emergency authority when GC is "unavailable" (CFO, then COO as fallback). However, there is no provision for extended GC absence (e.g., medical leave, vacancy). Many procedures require "GC approval" or "GC sign-off" with no permanent delegation mechanism beyond the emergency 72-hour window. | MEDIUM | Att. A |
| OT-R1-12 | **Sections 1-6 retain original numbering style while Sections 7-13 use letter prefixes.** CC-11 was partially addressed. From a day-1 usability perspective, this means a paralegal reading "Section 7.A" and then being told to cross-reference "the entity management subsection of Section 7" in older text has to mentally map between two numbering conventions. Not a blocker but increases navigation friction. | LOW | All |
| OT-R1-13 | **"Coordinate with Finance" appears 15+ times with no contact method specified.** While the revision defines what Legal and Finance do together (reserve reconciliation, REIT testing, SEC reporting), it never specifies the practical coordination mechanism -- is it email to a Finance inbox, a shared Slack channel, a standing meeting request, or a named Finance liaison? A new paralegal told to "coordinate with Finance" has no starting point. | MEDIUM | 7, 9, 10 |
| OT-R1-14 | **Quarterly re-certification notice template not provided.** Section 8.5(C.4) requires quarterly Litigation Hold Re-Certification Notices but does not provide a template or specify required content. The First 48 Hours checklist (C.1) is detailed, but the ongoing re-certification step is under-specified by comparison. | LOW | 8.5(C.4) |
| OT-R1-15 | **Post-resolution review trigger unclear for matters that settle before reaching "Significant" rating.** Section 11.E requires post-resolution reviews for matters rated Significant or above. But a matter could settle early at a Moderate rating yet involve $200K+ in spend. The trigger is rating-based rather than spend-based, potentially missing high-cost matters that were resolved before escalation. | LOW | 11.E |

### Summary

- Original findings: 32
- Resolved: 30
- Partially resolved: 2 (OT-19, OT-28)
- Unresolved: 0
- New findings: 15
- CRITICAL remaining: 0
- HIGH remaining: 2 (OT-R1-03, OT-R1-06)
- MEDIUM remaining: 7 (OT-R1-01, OT-R1-02, OT-R1-04, OT-R1-07, OT-R1-09, OT-R1-11, OT-R1-13)
- LOW remaining: 6 (OT-R1-05, OT-R1-08, OT-R1-10, OT-R1-12, OT-R1-14, OT-R1-15)

### Assessment

The revision is a substantial improvement. All 5 original CRITICAL findings and all 14 original HIGH findings have been resolved or adequately addressed. The two partially resolved items (OT-19 and OT-28) were handled appropriately for a policy-level document -- screenshots belong in a training guide, and management-based SLA consequences are standard for internal manuals.

The 15 new findings are predominantly operationalization gaps: the revision defines *what* must happen but in several places does not name the specific system, template, or contact point needed for execution. The two HIGH findings are actionable: OT-R1-03 is a literal placeholder ($[X]) that was missed during drafting, and OT-R1-06 identifies a compliance requirement (mobile archiving) that cannot be followed because no system has been named or deployed.

**Bottom line from a day-1 perspective:** A new paralegal could now follow 90%+ of procedures in this manual without asking clarifying questions. The remaining gaps are mostly "which specific tool do I log into?" rather than "what am I supposed to do?" -- a meaningful shift from the original document where entire workstreams had no procedure at all.
