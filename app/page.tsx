import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { TrafficDynamicsViewer } from '@/components/interactive-lab';
import { NetworkVisual } from '@/components/network-visual';
import { PageShell } from '@/components/site-chrome';

const scenarios = [
  ['SMALL', '2', '100–150', '2,400–3,120'],
  ['MID', '3', '175–225', '4,850–6,100'],
  ['LARGE', '2', '275–300', '6,850–7,350'],
];

export default function Home() {
  return <PageShell>
    <section className="home-hero"><div className="grid-bg" aria-hidden="true"/><div className="hero-copy"><div className="eyebrow">AMHS TRAFFIC BENCHMARK</div><h1>A testbed for routing and <span>regional traffic control.</span></h1><p>AMHSTrafficLab provides reproducible AMHS traffic simulation for comparing routing methods and regional-control policies across fixed maps and operating scenarios.</p><div className="actions"><a className="button primary" href="/benchmark">View benchmark maps <ArrowRight size={16}/></a><a className="button secondary" href="/validation">Review validation results <ArrowUpRight size={15}/></a></div><div className="proof-row"><span>7 operating scenarios</span><i/><span>13 routing baselines</span><i/><span>20,000 simulated seconds / run</span></div></div><NetworkVisual/></section>

    <section className="light-section home-traffic-section"><div className="section-heading"><h2>Benchmark showcase</h2><p>The recording shows vehicle states and movement being updated during a simulation.</p></div><TrafficDynamicsViewer/></section>

    <section className="light-section research-contract"><div className="section-label">WHAT THE BENCHMARK FIXES</div><div className="split-heading"><h2>Policies can be adapted within a fixed traffic model.</h2><p>Methods are evaluated with the same vehicle dynamics, resource-access rules, task streams, maps, and metric definitions. Researchers replace the routing or regional-control policy without rebuilding the simulator.</p></div><div className="contract-flow"><article><small>01 · INPUT STATE</small><h3>Traffic observations</h3><p>The policy receives tracks, vehicles, assigned tasks, queues, controlled regions, occupancy, and demand.</p></article><i>→</i><article><small>02 · POLICY OUTPUT</small><h3>Routing or regional control</h3><p>A routing method returns a complete path. A regional policy regulates admission and, when studied, empty-vehicle supply.</p></article><i>→</i><article><small>03 · REPORTED METRICS</small><h3>Run-level results</h3><p>The evaluator reports throughput, cycle time, travel-time index, utilization, throughput collapse, and circular waits.</p></article></div></section>

    <section className="dark-section evidence-section"><div className="section-label lime">TWO POLICY LAYERS</div><div className="section-heading"><h2>Routing and regional-control interfaces</h2><div className="descriptive-copy"><p>A routing method selects a complete path between an origin and destination. Alternative routes may be individually feasible, but interacting vehicles can still form a circular waiting dependency.</p><p>Regional admission control observes controlled-area occupancy and waiting queues, then opens, limits, or holds entry. The benchmark records both policy decisions under the same traffic dynamics.</p></div></div><figure className="paper-figure dark-figure"><Image src="/paper/control-surfaces.png" width={1472} height={474} alt="Figure 4: alternative routing paths, circular vehicle waiting dependencies, and regional admission control"/></figure></section>

    <section className="light-section scenario-preview"><div className="section-label">BENCHMARK SCENARIOS</div><div className="section-heading"><h2>Maps and operating scenarios</h2><p>The Small map is a compact production corridor, Medium introduces repeated Bays around a shared spine, and Large extends the network and regional interactions. The same routing method and regional-control policy can be applied to every map. Each map has its own fixed task-generation defaults.</p></div><div className="scenario-band"><div className="scenario-head"><span>MAP FAMILY</span><span>SCENARIOS</span><span>OHTS</span><span>TASKS / HOUR</span></div>{scenarios.map(row=><a href="/benchmark" key={row[0]}>{row.map((value,i)=><span key={value} className={i===0?'scenario-name':''}>{value}</span>)}<ArrowUpRight size={16}/></a>)}</div><a className="text-link" href="/benchmark">View the three map renders <ArrowRight size={15}/></a></section>
  </PageShell>;
}
