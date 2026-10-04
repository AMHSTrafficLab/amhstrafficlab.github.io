import type { Metadata } from 'next';
import { MapExplorer } from '@/components/interactive-lab';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = { title: 'Benchmark Maps — AMHSTrafficLab', description: 'Explore AMHSTrafficLab benchmark maps at small, medium, and large scales.' };

export default function BenchmarkPage(){return <PageShell>
  <section className="page-hero"><div className="section-label lime">BENCHMARK MAPS</div><h1>Three map families and seven operating scenarios.</h1><p>All maps use the same routing and regional-control interfaces. Each map retains its own fixed task-generation configuration.</p></section>
  <section className="map-section light-section"><div className="section-label">MAP FAMILIES</div><div className="section-heading"><h2>Map families and shared policy interfaces</h2><p>Small represents a compact production corridor; Medium adds repeated Bays around a shared spine; Large increases network scale and regional interaction. Policies can be applied across all three maps without changing the benchmark demand settings.</p></div><MapExplorer/></section>
</PageShell>}
