import type { Metadata } from 'next';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Documentation — AMHSTrafficLab',
  description: 'Installation, configuration, extension interfaces, and experiment reproduction for AMHSTrafficLab.',
};

const sections = [
  ['overview', 'Overview'],
  ['release-package', 'Release package'],
  ['installation', 'Installation'],
  ['quickstart', 'Quickstart'],
  ['configuration', 'Configuration'],
  ['maps-and-regions', 'Maps and regions'],
  ['platform-objects', 'Platform objects'],
  ['routing', 'Routing extension'],
  ['regional-control', 'Regional control'],
  ['reproduction', 'Reproduce experiments'],
  ['outputs', 'Outputs and verification'],
  ['troubleshooting', 'Troubleshooting'],
] as const;

const Code = ({ children }: { children: React.ReactNode }) => (
  <pre className="docs-code"><code>{children}</code></pre>
);

export default function DocumentationPage() {
  return <PageShell>
    <header className="documentation-hero">
      <div className="section-label lime">DOCUMENTATION</div>
      <h1>Use the benchmark.</h1>
      <p>Install the packaged platform, run a reference simulation, implement a routing or regional-control method, and reproduce the benchmark protocol.</p>
      <div className="docs-release-line"><span>Release v0.1.2</span><span>Linux x86_64</span><span>CPython 3.11</span></div>
    </header>

    <div className="documentation-shell">
      <aside className="documentation-index" aria-label="Documentation contents">
        <strong>On this page</strong>
        <nav>{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      </aside>

      <article className="documentation-article">
        <section id="overview">
          <p className="docs-lead">AMHSTrafficLab is a packaged simulation benchmark for evaluating complete-path routing and regional traffic-control policies in large-scale, resource-competitive transport networks.</p>
          <p>The public interface exposes the decisions that researchers are expected to change while keeping motion, resource competition, task execution, and measurement inside the same simulator. The seven benchmark scenes vary map scale, fleet size, and operating load.</p>
          <div className="docs-note"><strong>Scope.</strong> The platform supports evaluation and reproduction. Training pipelines, transfer-learning procedures, and editable simulator internals are outside the public contract.</div>
        </section>

        <section id="release-package">
          <h2>Release package</h2>
          <p>The release is organized so that a benchmark run can be inspected from its executable environment through to its final report. The simulator is installed from the wheel; experiment definitions and checkpoints remain separate, auditable inputs.</p>
          <div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Path</th><th>Contents</th></tr></thead><tbody>
            <tr><td><code>wheelhouse/</code></td><td>Compiled AMHSTrafficLab wheel for the supported runtime.</td></tr>
            <tr><td><code>experiments/</code></td><td>Base configuration, seven scenes, maps, and experiment matrices.</td></tr>
            <tr><td><code>models/routing_final/</code></td><td>49 routing checkpoints referenced by the experiment definitions.</td></tr>
            <tr><td><code>docs/</code></td><td>Platform contract, extension interfaces, and reproduction guidance.</td></tr>
            <tr><td><code>outputs/</code></td><td>Local run artifacts, verification records, and aggregate reports.</td></tr>
          </tbody></table></div>
          <p>The wheel exposes the supported public API. A source checkout or editable installation is not required to run the benchmark.</p>
        </section>

        <section id="installation">
          <h2>Installation</h2>
          <p>The current wheel targets Linux x86_64, CPython 3.11, glibc 2.34 or newer, and a C++ runtime providing <code>GLIBCXX_3.4.30</code>. GUI tools additionally require a working display and OpenGL environment.</p>
          <Code>{`python3.11 -m venv .venv
. .venv/bin/activate
python -m pip install --only-binary=:all: \\
  -c requirements-runtime.lock wheelhouse/amhslab-*.whl
python -m pip check
amhslab environment_check`}</Code>
          <p className="docs-caption">Run these commands from the release-package root so that the lock file and wheel path resolve correctly.</p>
        </section>

        <section id="quickstart">
          <h2>Quickstart</h2>
          <p>Validate the supplied configuration first, then run a short headless simulation. The output directory will contain the run result and supporting records.</p>
          <Code>{`amhslab config_validate --config experiments/base_config.json
amhslab headless \\
  --config experiments/base_config.json \\
  --until 2 \\
  --out outputs/quickstart`}</Code>
          <h3>Desktop tools</h3>
          <Code>{`amhslab gui --config experiments/base_config.json
amhslab map_editor --map experiments/maps/small_150.xlsx`}</Code>
          <div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Command</th><th>Use</th></tr></thead><tbody>
            <tr><td><code>environment_check</code></td><td>Checks the supported Python and system runtime.</td></tr>
            <tr><td><code>config_validate</code></td><td>Validates configuration fields and referenced files.</td></tr>
            <tr><td><code>headless</code></td><td>Runs a simulation without the desktop interface.</td></tr>
            <tr><td><code>gui</code></td><td>Runs the traffic simulator with live visualization and monitoring.</td></tr>
            <tr><td><code>map_editor</code></td><td>Inspects maps and edits regional-control definitions.</td></tr>
            <tr><td><code>benchmark</code></td><td>Runs platform microbenchmarks, not the paper experiment matrix.</td></tr>
          </tbody></table></div>
        </section>

        <section id="configuration">
          <h2>Configuration</h2>
          <p>A run configuration selects the map, fleet size, task-generation profile, random seed, routing method, and regional-control policy. Scene defaults define the benchmark operating point; researchers replace only the method under evaluation.</p>
          <div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Field</th><th>Purpose</th></tr></thead><tbody>
            <tr><td><code>filepath</code></td><td>Path to the XLSX rail-network map.</td></tr>
            <tr><td><code>oht_nums</code></td><td>Number of vehicles in the fleet.</td></tr>
            <tr><td><code>task_generation_method</code></td><td>Fixed benchmark workload profile.</td></tr>
            <tr><td><code>seed</code></td><td>Random seed shared across compared methods.</td></tr>
            <tr><td><code>method</code></td><td>Registered complete-path routing strategy.</td></tr>
            <tr><td><code>area_control_policy</code></td><td>Registered regional-control policy.</td></tr>
            <tr><td><code>water_level_area_filepath</code></td><td>Optional external regional-control definition.</td></tr>
          </tbody></table></div>
          <p><code>amhslab config_validate</code> checks unknown keys, enum values, missing files, and field types before a run starts. The command-line <code>--map</code> option overrides <code>filepath</code>.</p>
          <h3>Minimal scene fields</h3>
          <Code>{`{
  "filepath": "experiments/maps/small_150.xlsx",
  "oht_nums": 150,
  "task_generation_method": "fixed_ratio",
  "seed": 2026
}`}</Code>
        </section>

        <section id="maps-and-regions">
          <h2>Maps and regions</h2>
          <p>Maps are XLSX workbooks. At minimum, the platform reads <code>ControlNode</code> and <code>Rail</code> sheets to construct the directed rail network. Regional-control definitions can be embedded in the configuration or loaded from workbook sheets.</p>
          <div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Map family</th><th>Benchmark operating points</th></tr></thead><tbody>
            <tr><td>Small</td><td>2 scenarios · 100–150 OHTs · 2,400–3,120 tasks/hour.</td></tr>
            <tr><td>Medium</td><td>3 scenarios · 175–225 OHTs · 4,850–6,100 tasks/hour.</td></tr>
            <tr><td>Large</td><td>2 scenarios · 275–300 OHTs · 6,850–7,350 tasks/hour.</td></tr>
          </tbody></table></div>
          <p>The same routing strategy and regional-control policy can run on all three map families. Each supplied scene binds its map, fleet size, and workload profile; keep those task-generation defaults fixed when comparing methods.</p>
          <h3>WaterLevelArea definitions</h3>
          <p>An external region workbook uses <code>Areas</code> for IDs and thresholds, <code>AreaTracks</code> for track membership, and <code>AreaNodes</code> for node membership. The map editor can select rails, create or revise an area, set its low-water and high-water levels, configure rebalance stock, and export the updated sheets.</p>
        </section>

        <section id="platform-objects">
          <h2>Platform objects</h2>
          <p>Policies receive read-only live views of the traffic system. These objects expose the state needed for research decisions without allowing a policy to bypass simulator rules.</p>
          <ul className="docs-object-list">
            <li><strong>AMHS</strong><span>Network-level state and approved control actions.</span></li>
            <li><strong>OHT</strong><span>Vehicle state, assigned work, and current route.</span></li>
            <li><strong>RailPath and ControlNode</strong><span>Track topology and resource state.</span></li>
            <li><strong>TransportationTask</strong><span>Observed task state and endpoints.</span></li>
            <li><strong>WaterLevelArea</strong><span>Regional occupancy, thresholds, and admission mode.</span></li>
          </ul>
          <p>Routes, vehicle positions, task lifecycle, graph structure, waiting queues, resource grants, and the simulation clock cannot be mutated directly by a user policy.</p>
        </section>

        <section id="routing">
          <h2>Routing extension</h2>
          <p>A routing strategy returns one complete path between a start node and a target node. It does not select a single next hop, wait action, or candidate-table index.</p>
          <Code>{`class RoutingStrategy:
    def compute_route(
        self,
        start_node,
        target_node,
        max_hops=None,
    ) -> list[str]:
        ...`}</Code>
          <p>The returned route is checked against the network. Invalid route semantics produce a structured error and use the built-in Dijkstra fallback; an unreachable target produces a safe stop or <code>NoRouteError</code>. Optional routing conditions are evaluated at each integer simulation second.</p>
        </section>

        <section id="regional-control">
          <h2>Regional control</h2>
          <p>A <code>WaterLevelArea</code> groups tracks or nodes into a controlled region. Its low-water level defines quota operation; its high-water level defines when new entries are held. The map editor can create regions, set thresholds and rebalance stock, and export the corresponding workbook sheets.</p>
          <Code>{`class RebalanceCountScheme(ABC):
    def compute(self, amhs) -> Mapping[WaterLevelArea, int]: ...

class AreaControlPolicy(ABC):
    def execute(self, amhs, rebalance_scheme) -> None: ...`}</Code>
          <div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Action</th><th>Effect</th></tr></thead><tbody>
            <tr><td><code>set_admission(area, mode)</code></td><td>Sets OPEN, quota, or HOLD_NEW_ENTRIES for a region.</td></tr>
            <tr><td><code>clear_admission_override(area)</code></td><td>Returns a region to its configured admission behavior.</td></tr>
            <tr><td><code>request_rebalance(counts)</code></td><td>Requests empty-vehicle movement between regions.</td></tr>
          </tbody></table></div>
        </section>

        <section id="reproduction">
          <h2>Reproduce experiments</h2>
          <p>The release package supplies a base profile, seven scene definitions, experiment matrices, and 49 model checkpoints. The formal routing study expands the declared scene, method, control, and seed products into 2,730 runs.</p>
          <Code>{`python -m pip install --only-binary=:all: \\
  -c requirements-runtime.lock \\
  -r requirements-reproduction.lock
python -m pip check`}</Code>
          <ol className="docs-steps">
            <li><span>1</span><div><strong>Inspect the matrix</strong><p>Confirm the included scenes, methods, control modes, seeds, and horizon.</p></div></li>
            <li><span>2</span><div><strong>Run a smoke case</strong><p>Check the environment and output pipeline without treating it as a formal paper run.</p></div></li>
            <li><span>3</span><div><strong>Run the declared matrix</strong><p>Use the packaged profiles and checkpoints without changing scene defaults.</p></div></li>
            <li><span>4</span><div><strong>Verify before aggregation</strong><p>Check run coverage, exit status, horizon, required files, and recorded hashes.</p></div></li>
          </ol>
        </section>

        <section id="outputs">
          <h2>Outputs and verification</h2>
          <p>The runner separates execution evidence from aggregated results. This makes it possible to identify missing or invalid runs before comparing methods.</p>
          <div className="docs-files"><div><code>manifest.json</code><p>Package, environment, input, and worker identities.</p></div><div><code>plan.json / plan.csv</code><p>Enumerated cases and effective profiles.</p></div><div><code>results.json / runs.csv</code><p>Per-run status, configuration, hashes, and errors.</p></div><div><code>aggregate.csv</code><p>Metrics aggregated only after validation.</p></div><div><code>reproduction-report.json</code><p>Coverage and verification summary.</p></div></div>
          <p>The paper protocol distinguishes throughput collapse from detected circular waiting. All seeds contribute to event counts; non-collapse runs contribute to the remaining mean metrics.</p>
        </section>

        <section id="troubleshooting">
          <h2>Troubleshooting</h2>
          <div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Symptom</th><th>Check</th></tr></thead><tbody>
            <tr><td>The wheel is unsupported</td><td>Use Linux x86_64 and CPython 3.11.</td></tr>
            <tr><td><code>GLIBCXX</code> symbol missing</td><td>Use a compatible system C++ runtime.</td></tr>
            <tr><td>The GUI does not open</td><td>Check the display server and OpenGL availability.</td></tr>
            <tr><td>A relative input path is missing</td><td>Run from the package root and inspect the manifest.</td></tr>
            <tr><td>A checkpoint is missing</td><td>Confirm all 49 files and their recorded hashes.</td></tr>
            <tr><td>A custom policy is not selected</td><td>Register it and run the simulation in the same process.</td></tr>
          </tbody></table></div>
        </section>
      </article>
    </div>
  </PageShell>;
}
