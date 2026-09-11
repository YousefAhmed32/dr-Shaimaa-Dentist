# Dr. Shaimaa Minimal Tech — Design System

## Product thesis

A bilingual clinical portfolio where real dental work is the primary proof. The interface should feel precise, calm, and technically confident. It must not resemble a clinic-booking template or a generic SaaS dashboard.

## Visual language

- **Canvas:** cool clinical paper `#F4F8FA`
- **Primary surface:** white `#FFFFFF`
- **Primary ink:** midnight `#07111F`
- **Secondary ink:** slate `#465568`
- **Clinical accent:** cyan `#0284C7`
- **Divider:** blue-grey `#C9DAE3`
- Use thin lines, controlled contrast, and image-led compositions.
- Radius stays restrained: `10–22px`, never pill-shaped cards.
- Cards group real repeatable entities only: cases and certificates.
- Decorative grids may support the Minimal Tech direction but never reduce image clarity.

## Typography

- Arabic: Alexandria Variable; use real Arabic weights and no letter spacing.
- English: Manrope Variable.
- Arabic display line-height: `1.28–1.35`.
- Arabic body line-height: `1.85–2`.
- English display line-height: `0.98–1.12`; body: `1.65–1.8`.
- Keep mixed Latin strings isolated with `bdi` or `dir="ltr"` when order could become ambiguous.
- Never uppercase Arabic or place it in fixed-height text boxes.

## Composition

1. Hero establishes the doctor, role, visible clinical evidence, and two clear actions.
2. Six real cases appear on the homepage before supporting 3D concepts.
3. A clear archive action sits after the six-card grid.
4. Three credentials appear on the homepage, followed by their archive action.
5. Profile and contact use editorial and contrast compositions, not another repeated card grid.

## Interaction

- Navigation completes on the first click; route animation may not delay or blank content.
- Gallery images open in an accessible dialog with close, zoom, previous, and next controls.
- Filters animate only the content state they change.
- Touch targets are at least `44px`; keyboard focus is always visible.
- Reduced motion renders content in its final state.

## Responsive rules

- Desktop uses three case columns; tablet uses two; mobile uses one.
- Arabic mobile headings are recomposed with comfortable line-height and no forced clipping.
- Primary archive actions become full width on small screens and remain directly after their grids.
- Sticky navigation must not cover focused or destination content.
- No horizontal overflow at `360px` and above.

## Avoid

- numbered section labels that do not communicate sequence;
- identical cards for unrelated content types;
- scattered fade-up animation on every element;
- gratuitous glow, glass, gradients, metrics, or decorative arrows;
- invented clinical claims, testimonials, affiliations, or outcomes;
- hiding the clinical work behind a secondary page.
