export function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 920 470"
      className="h-auto w-full"
      role="img"
      aria-label="Two-stage aggregation architecture: many Workers per data center report to a per-data-center Durable Object backed by Cache, which reports up to a single Global Durable Object that returns the worldwide waiting-room state."
    >
      <defs>
        <marker id="a2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted-foreground" />
        </marker>
      </defs>

      {/* Global Durable Object */}
      <g>
        <rect x="300" y="24" width="320" height="74" rx="14" className="fill-brand-200" />
        <text x="460" y="55" textAnchor="middle" className="fill-slate-900" fontSize="15" fontWeight="800">Global Durable Object</text>
        <text x="460" y="76" textAnchor="middle" fill="#0f172a" fillOpacity="0.85" fontSize="11">aggregates every data center → worldwide waiting-room state</text>
      </g>

      <text x="635" y="120" className="fill-muted-foreground" fontSize="10.5" fontStyle="italic">global aggregation</text>

      {/* Two data centers */}
      {[{ x: 60, name: "Data center — Dublin" }, { x: 500, name: "Data center — Nairobi" }].map((dc) => (
        <g key={dc.x}>
          <rect x={dc.x} y="150" width="360" height="290" rx="16" className="fill-muted/60 stroke-border" strokeWidth="1.5" />
          <text x={dc.x + 20} y="178" className="fill-foreground" fontSize="13" fontWeight="800">{dc.name}</text>

          {/* DC Durable Object */}
          <rect x={dc.x + 70} y="196" width="220" height="58" rx="10" className="fill-card stroke-brand-300" strokeWidth="1.5" />
          <text x={dc.x + 180} y="219" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">Data Center Durable Object</text>
          <text x={dc.x + 180} y="237" textAnchor="middle" className="fill-muted-foreground" fontSize="10">colo-level aggregation</text>

          {/* Cache */}
          <rect x={dc.x + 110} y="278" width="140" height="40" rx="9" className="fill-card stroke-border" strokeWidth="1.5" />
          <text x={dc.x + 180} y="303" textAnchor="middle" className="fill-foreground" fontSize="11.5" fontWeight="700">Cache (fast sync)</text>

          {/* Workers */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={dc.x + 26 + i * 106} y="360" width="92" height="54" rx="9" className="fill-card stroke-border" strokeWidth="1.5" />
              <text x={dc.x + 72 + i * 106} y="383" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">Worker</text>
              <text x={dc.x + 72 + i * 106} y="399" textAnchor="middle" className="fill-muted-foreground" fontSize="9">user slots</text>
              {/* worker -> cache */}
              <line x1={dc.x + 72 + i * 106} y1="360" x2={dc.x + 180} y2="320" className="stroke-muted-foreground" strokeWidth="1.3" markerEnd="url(#a2)" />
            </g>
          ))}

          {/* cache <-> DO */}
          <line x1={dc.x + 180} y1="278" x2={dc.x + 180} y2="256" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#a2)" />
          {/* DC DO -> Global DO */}
          <line x1={dc.x + 180} y1="196" x2="460" y2="100" className="stroke-brand-400" strokeWidth="2" markerEnd="url(#a2)" />
        </g>
      ))}
    </svg>
  )
}
