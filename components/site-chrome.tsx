export function Brand() {
  return (
    <a className="brand" href="/" aria-label="AMHSTrafficLab home">
      <span className="brand-mark" aria-hidden="true"><span/><span/><span/></span>
      <span>AMHS<span className="brand-light">TrafficLab</span></span>
    </a>
  );
}

export function Header() {
  const links = [['/','Home'],['/benchmark','Benchmark'],['/platform','Platform'],['/validation','Validation'],['/documentation','Documentation']] as const;
  return (
    <header className="site-header">
      <Brand/>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map(([href,label])=><a key={href} href={href}>{label}</a>)}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Brand/>
      <p>AMHSTrafficLab benchmark overview.</p>
      <span>Website preview · 2026</span>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><Header/><main>{children}</main><Footer/></>;
}
