const nodes = [[8,50],[20,50],[31,24],[44,24],[55,50],[68,50],[79,24],[93,24],[31,77],[44,77],[79,77],[93,77]];

export function NetworkVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`network-card ${compact ? 'compact' : ''}`} aria-label="Illustration of AMHS traffic moving through a rail network">
      <div className="network-top"><span>TRAFFIC DYNAMICS</span><span><i/> moving OHT <b/> regional load</span></div>
      <svg viewBox="0 0 100 100" role="img" aria-label="AMHS rail network">
        <defs><filter id={`glow-${compact}`}><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g className="rails"><path d="M8 50H20L31 24H44L55 50H68L79 24H93"/><path d="M20 50L31 77H44L55 50"/><path d="M68 50L79 77H93"/><path d="M31 24V77M44 24V77M79 24V77M93 24V77"/></g>
        <path className="flow flow-one" d="M8 50H20L31 24H44L55 50H68L79 77H93"/>
        <path className="flow flow-two" d="M31 77H44L55 50H68L79 24H93"/>
        {nodes.map(([x,y],i)=><g key={`${x}-${y}`}><circle className={i===4?'node active':'node'} cx={x} cy={y} r="1.8"/>{i===4&&<circle className="pulse" cx={x} cy={y} r="4"/>}</g>)}
      </svg>
      {!compact && <div className="network-caption"><span>rail sharing</span><span>merge conflicts</span><span>queue formation</span><span>area admission</span></div>}
    </div>
  );
}

export function MiniMap({ variant = 1 }: { variant?: number }) {
  const paths = variant === 1
    ? ['M8 20H38V42H62V20H92','M8 80H38V58H62V80H92','M20 20V80M80 20V80','M38 42V58M62 42V58']
    : ['M6 50H20L30 18H47L57 50H72L82 18H95','M20 50L30 82H47L57 50','M72 50L82 82H95','M30 18V82M47 18V82M82 18V82M95 18V82'];
  return <svg className="mini-map" viewBox="0 0 100 100" aria-hidden="true">{paths.map((d,i)=><path key={i} d={d}/>)}</svg>;
}
