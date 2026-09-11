export default function SectionHeading({ kicker, title, lead }) {
  return (
    <header className="section-heading">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-side">
        {lead ? <p>{lead}</p> : null}
      </div>
    </header>
  );
}
