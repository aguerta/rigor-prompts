# PROFESSIONAL LATEX/PDF REPORT STANDARD

Every user-facing audit report must be produced from LaTeX and compiled to PDF.

## Required structure
1. Title page: paper title if detectable, audit type, date, project state.
2. **Submission Readiness Verdict** - always first substantive section.
3. **Journal Targeting Research** - ranked targets, current verified fees, requirements, recent comparable papers, verification date, and conditionality if the paper is not ready.
4. Executive diagnosis (maximum one page).
5. Scope and materials reviewed.
6. Coverage statement.
7. Priority findings.
8. Complete findings by audit module.
9. Conditional work program (OPEN only).
10. Scope-reduction register.
11. Unverifiable/unresolved items.
12. Closure status and verification rounds.
13. Appendix: issue ledger / coverage ledger and journal-source verification table when long.

### Journal table standard
Use a booktabs/longtable comparison with at least: rank, journal, fit, submission fee, mandatory publication charge, optional OA APC, key format/length requirement, data/code requirement, and last verified date. Fees must never be collapsed into one ambiguous column.

## Typography/layout
- Academic, restrained, black text on white background.
- US Letter unless user selects A4.
- 1-inch-ish margins.
- Serif body font and clear sans/serif heading hierarchy.
- Booktabs-style tables; no vertical rules by default.
- Hyperlinked TOC for reports longer than 8 pages.
- Page number/footer with report name.
- Equations typeset as mathematics, not screenshots.
- No decorative gradients, cards, emoji, AI branding, or oversized headings.

## Finding box fields
Finding ID; severity; verification/confidence; exact location; claim at risk; problem; why it matters; minimum remedy if permitted; cost/benefit; status.

## Compilation validation
Compile with XeLaTeX/latexmk or equivalent multi-pass workflow. Fail the job if compilation fails. Render the PDF and inspect for clipped text, missing glyphs, broken tables, overlapping elements, or malformed equations before delivery.
