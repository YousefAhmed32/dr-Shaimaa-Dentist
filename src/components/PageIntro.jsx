export default function PageIntro({ kicker, title, lead, aside }) {
  return (
    <section className="page-intro shell">
      <div>
        <p className="section-kicker">01 / {kicker}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
      {aside ? <div className="page-intro-aside">{aside}</div> : null}
    </section>
  );
}
