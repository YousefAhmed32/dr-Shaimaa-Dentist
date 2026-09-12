# Dashboard page override

The dashboard follows the master identity but uses a denser operational layout.

- Keep the same Alexandria/Manrope pairing and clinical paper, ink, cyan, surface, and divider tokens.
- Use a two-column desktop workspace: the case editor is primary; the database case library is secondary and sticky.
- Number the form groups `01` and `02` to communicate a real sequence: case details, then ordered images.
- Every image row must show its sequence number, preview, bilingual stage titles, move controls, and remove action.
- Lead with MongoDB-backed totals for registered users, visitor accounts, cases, and clinical images.
- Support draft/published and featured states. Only dashboard-created cases can be deleted from this screen.
- Show the latest registered accounts in a compact secondary panel.
- Require an explicit patient-privacy confirmation before saving.
- Controls remain at least 44px high, keyboard reachable, visibly focused, and stacked into one column on mobile.
- Motion is limited to existing route transitions and immediate list reordering; no decorative dashboard animation.
