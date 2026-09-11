export default function SectionHeading({ index, kicker, title, lead, action }) {
  return (
    <header className="section-heading">
      <div>
        <p className="section-kicker">{index} / {kicker}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-side">
        {lead ? <p>{lead}</p> : null}
        {action}
      </div>
    </header>
  );
}
