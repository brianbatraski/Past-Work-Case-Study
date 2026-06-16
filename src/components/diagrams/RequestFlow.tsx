export function RequestFlowDiagram() {
  return (
    <svg
      viewBox="0 0 920 380"
      className="h-auto w-full"
      role="img"
      aria-label="Request flow: end-user traffic reaches the nearest Cloudflare data center, where a Worker either admits the request to the origin or places it in a branded waiting-room queue."
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted-foreground" />
        </marker>
        <marker id="arrowBrand" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-brand-500" />
        </marker>
      </defs>

      {/* Users */}
      <g>
        <rect x="20" y="120" width="150" height="140" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="95" y="150" textAnchor="middle" className="fill-foreground" fontSize="15" fontWeight="700">End users</text>
        <text x="95" y="170" textAnchor="middle" className="fill-muted-foreground" fontSize="11">global, all at once</text>
        <circle cx="60" cy="205" r="11" className="fill-brand-400" />
        <circle cx="95" cy="205" r="11" className="fill-brand-500" />
        <circle cx="130" cy="205" r="11" className="fill-slate-400" />
        <circle cx="77" cy="232" r="11" className="fill-brand-300" />
        <circle cx="113" cy="232" r="11" className="fill-slate-300" />
      </g>

      {/* Cloudflare edge */}
      <g>
        <rect x="280" y="90" width="220" height="200" rx="14" className="fill-brand-50 stroke-brand-200" strokeWidth="1.5" />
        <text x="390" y="120" textAnchor="middle" className="fill-brand-700" fontSize="14" fontWeight="800">Cloudflare global network</text>
        <text x="390" y="138" textAnchor="middle" className="fill-brand-700/80" fontSize="10.5">nearest of 300+ data centers (Anycast)</text>

        <rect x="312" y="158" width="156" height="50" rx="10" className="fill-card stroke-brand-300" strokeWidth="1.5" />
        <text x="390" y="180" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="700">Worker</text>
        <text x="390" y="197" textAnchor="middle" className="fill-muted-foreground" fontSize="10">issues encrypted cookie ticket</text>

        <rect x="312" y="220" width="156" height="46" rx="10" className="fill-card stroke-brand-300" strokeWidth="1.5" />
        <text x="390" y="241" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Slots available?</text>
        <text x="390" y="256" textAnchor="middle" className="fill-muted-foreground" fontSize="10">limit − active users</text>
      </g>

      {/* Origin */}
      <g>
        <rect x="700" y="60" width="195" height="110" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="797" y="98" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Origin application</text>
        <text x="797" y="118" textAnchor="middle" className="fill-muted-foreground" fontSize="11">protected, never overwhelmed</text>
        <text x="797" y="144" textAnchor="middle" className="fill-slate-500" fontSize="11" fontWeight="700">≤ configured capacity</text>
      </g>

      {/* Waiting room page */}
      <g>
        <rect x="700" y="210" width="195" height="120" rx="12" className="fill-card stroke-brand-200" strokeWidth="1.5" />
        <text x="797" y="244" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Branded queue page</text>
        <text x="797" y="266" textAnchor="middle" className="fill-muted-foreground" fontSize="11">estimated wait time</text>
        <text x="797" y="284" textAnchor="middle" className="fill-muted-foreground" fontSize="11">auto-refreshes</text>
        <text x="797" y="308" textAnchor="middle" className="fill-brand-700" fontSize="11" fontWeight="700">fair, ordered, no code</text>
      </g>

      {/* Arrows */}
      <line x1="172" y1="190" x2="276" y2="190" className="stroke-muted-foreground" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M468 183 L600 183 L600 115 L696 115" className="fill-none stroke-slate-400" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="540" y="174" textAnchor="middle" className="fill-slate-500" fontSize="10.5" fontWeight="700">admit</text>
      <path d="M468 243 L600 243 L600 270 L696 270" className="fill-none stroke-brand-500" strokeWidth="2" markerEnd="url(#arrowBrand)" />
      <text x="556" y="234" textAnchor="middle" className="fill-brand-700" fontSize="10.5" fontWeight="700">queue</text>
    </svg>
  )
}
