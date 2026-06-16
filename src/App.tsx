import { useEffect, useState, type ReactNode } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Globe,
  Layers,
  Moon,
  Network,
  Quote as QuoteIcon,
  Server,
  ShieldCheck,
  Sun,
  Syringe,
  Trophy,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestFlowDiagram } from "@/components/diagrams/RequestFlow"
import { ArchitectureDiagram } from "@/components/diagrams/Architecture"
import { cn } from "@/lib/utils"

const S = {
  waitingRoom: "https://blog.cloudflare.com/cloudflare-waiting-room/",
  tech: "https://blog.cloudflare.com/building-waiting-room-on-workers-and-durable-objects/",
  fairShot: "https://blog.cloudflare.com/project-fair-shot/",
  fairShotUpdate: "https://blog.cloudflare.com/cloudflare-and-covid-19-project-fair-shot-update/",
  fairShotLanding: "https://www.cloudflare.com/fair-shot/",
  press: "https://www.cloudflare.com/press/press-releases/2021/cloudflare-announces-project-fair-shot/",
  bypass: "https://blog.cloudflare.com/waiting-room-bypass-rules/",
  durableObjects: "https://blog.cloudflare.com/introducing-workers-durable-objects/",
  caseSLO: "https://www.cloudflare.com/case-studies/county-of-san-luis-obispo/",
  caseVerto: "https://www.cloudflare.com/case-studies/verto/",
  caseTicketTailor: "https://www.cloudflare.com/case-studies/tickettailor/",
  caseLatvia: "https://www.cloudflare.com/case-studies/latvia-ministry-of-health/",
}

const NAV = [
  { id: "problem", label: "Problem" },
  { id: "scale", label: "Scale" },
  { id: "solution", label: "Solution" },
  { id: "release", label: "Release" },
  { id: "lessons", label: "Lessons" },
  { id: "impact", label: "Impact" },
  { id: "technical", label: "Technical" },
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="text-muted-foreground"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white">
            <span className="h-2 w-2 rounded-full bg-brand-200" />
          </span>
          <span className="text-sm font-bold tracking-tight">Waiting Room</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">· Case study</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
            <a href={S.fairShot} target="_blank" rel="noreferrer">
              Project Fair Shot <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Cite({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground underline decoration-2 decoration-brand-400 underline-offset-2 transition-colors hover:decoration-brand-500"
    >
      {children}
    </a>
  )
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: ReactNode
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-0.5 w-8 bg-brand-400" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  )
}

function Section({
  id,
  children,
  className,
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("border-b border-border/60 py-20 sm:py-28", className)}>
      <div className="container">{children}</div>
    </section>
  )
}

function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-sm font-semibold">{label}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  )
}

function Quote({
  children,
  who,
  href,
}: {
  children: ReactNode
  who: string
  href?: string
}) {
  return (
    <figure className="rounded-xl border bg-card p-6">
      <QuoteIcon className="h-6 w-6 text-brand-400" />
      <blockquote className="mt-3 text-base leading-relaxed text-foreground">{children}</blockquote>
      <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
        {href ? <Cite href={href}>{who}</Cite> : who}
      </figcaption>
    </figure>
  )
}

const HERO_STATS = [
  { value: "~100M", label: "vaccinations scheduled", sub: "in the first six months" },
  { value: "100+", label: "organizations \u00b7 10+ countries", sub: "in the first six months" },
  { value: "$5M+", label: "ARR today", sub: "1,000+ customers, 15+ countries" },
  { value: "2022", label: "Webby Award", sub: "People's Voice Winner" },
]

const TIMELINE = [
  {
    date: "Feb 2020",
    title: "The idea",
    body: "A handful of us connected a recurring customer pain — sudden demand that outstrips supply — to the network we already operated. The same primitive that fairly queues shoppers for a sneaker drop or concert could protect any site from a traffic spike.",
  },
  {
    date: "Apr 2020",
    title: "Design & build begins",
    body: "I began designing the product and shaping the customer experience, with the goal of something that 'just works' — no code changes, deployable via a DNS change, configured in minutes.",
  },
  {
    date: "Q3 2020",
    title: "Feature-rich private beta",
    body: "~10 beta customers by the end of Q3 2020 — including Fortune 1000 enterprises — spanning online events, health & health-tech, finance, and retail. The beta taught us an enormous amount about real spike behavior.",
  },
  {
    date: "Q4 2020",
    title: "Re-architecting the core",
    body: "Beta learnings forced us to re-architect the budgeting service — the crux of how Waiting Room decides who waits and who gets in. Painful, but it made the product trustworthy at scale.",
  },
  {
    date: "Jan 22, 2021",
    title: "Launch — Project Fair Shot",
    body: "Planned for February, we pulled the launch forward as vaccine sites crashed worldwide and offered the service free to vaccine distributors. I owned the announcement end-to-end.",
  },
  {
    date: "Mid 2021",
    title: "Business & Enterprise GA",
    body: "Waiting Room rolled out as a paid product on Business and Enterprise plans — the commercial foundation the free campaign had de-risked and proven.",
  },
]

const CASE_STUDIES = [
  {
    name: "County of San Luis Obispo",
    metric: "23,000-user surges",
    body: "Our first official onboarding — completed in a couple of days right before launch — regularly handled 20,000+ appointments a day.",
    href: S.caseSLO,
  },
  {
    name: "Verto Health (Canada)",
    metric: "4M+ served",
    body: "Served over four million people across Canadian vaccination programs working with the federal government and partners.",
    href: S.caseVerto,
  },
  {
    name: "Ticket Tailor",
    metric: "70% → 10%",
    body: "Cut peak origin resource utilization from 70% down to 10% during high-demand on-sales.",
    href: S.caseTicketTailor,
  },
  {
    name: "Latvia — Ministry of Health",
    metric: "Stayed online",
    body: "Kept a national vaccination system available through surges of thousands of requests per second.",
    href: S.caseLatvia,
  },
  {
    name: "Japan (with Classmethod)",
    metric: "40M+ vaccinated",
    body: "Cities across Japan vaccinated tens of millions, on track across 317 municipalities.",
    href: S.fairShotUpdate,
  },
  {
    name: "A European country",
    metric: "3M+ in <24h",
    body: "More than three million people passed through the Waiting Room in under a day — smoothly.",
    href: S.fairShotUpdate,
  },
]

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-radial-fade opacity-70" aria-hidden />
        <div className="container relative py-20 sm:py-28">
          <div className="mx-auto max-w-4xl animate-fade-up">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge variant="brand">Product case study</Badge>
              <Badge variant="muted">0 → 1</Badge>
              <Badge variant="muted">Shipped at scale</Badge>
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-foreground underline decoration-brand-300 decoration-4 underline-offset-8">Waiting Room</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
              A virtual Waiting Room helping organizations manage peak traffic by routing excess users to a custom-branded waiting room. This ensures a seamless online experience and protects origin servers from being overwhelmed. Conceived and built from zero to one, then launched into the middle of a global pandemic.
            </p>
            <p className="mt-6 text-base text-muted-foreground">
              <span className="font-semibold text-foreground">Brian Batraski</span> — Product owner
              (0→1). Owned the concept, drove the technical design and customer experience, and led
              the <Cite href={S.fairShot}>Project Fair Shot</Cite> launch across marketing, sales,
              and customer success.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <a href="#problem">
                  Read the case study <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={S.waitingRoom} target="_blank" rel="noreferrer">
                  Launch blog (authored)
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href={S.tech} target="_blank" rel="noreferrer">
                  Engineering deep-dive
                </a>
              </Button>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section id="problem" className="bg-muted/30">
        <SectionHeading
          eyebrow="01 · The problem"
          title="When COVID-19 hit, the web buckled under demand it was never sized for"
          intro={
            <>
              As the pandemic pushed the world online overnight, web applications saw traffic spikes
              far outside any seasonal pattern or peak they'd ever measured. Sites went down — not
              from attackers, but from sheer simultaneous demand — eroding brand trust, losing
              revenue, and driving customers away.
            </>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Activity className="h-7 w-7 text-foreground" />
              <CardTitle className="text-lg">Demand with no warning</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Infrastructure is budgeted for expected load. Overnight, registration and scheduling
              sites faced crushes of users all at once and simply fell over.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Syringe className="h-7 w-7 text-foreground" />
              <CardTitle className="text-lg">Acute in healthcare</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              The pain was sharpest in health and health-tech: people couldn't book vaccine
              appointments, see doctors, or schedule follow-ups. A global need affecting billions.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-7 w-7 text-foreground" />
              <CardTitle className="text-lg">An equity problem</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              When sites crashed and reloaded, scarce appointments went to whoever had the fastest
              reflexes and connection — not those who needed them most.
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Quote who="Project Fair Shot launch blog — Matthew Prince, Cloudflare CEO" href={S.fairShot}>
            “When the time came for the site to open, it immediately crashed. The cause wasn't
            hackers or malicious activity. It was merely that so many people were trying to access
            the site at once. ‘Why doesn't Cloudflare build a service that organizes a queue into an
            orderly fashion so these sites don't get overwhelmed?’”
          </Quote>
        </div>
      </Section>

      {/* SCALE */}
      <Section id="scale">
        <SectionHeading
          eyebrow="02 · Scale & impact of the problem"
          title="A worldwide failure mode, repeating everywhere at once"
          intro={
            <>
              This wasn't one site on one bad day. As offices and government services closed,
              billions of people shifted to online channels that had been sized for a pre-pandemic
              world — and vaccine rollouts guaranteed demand would exceed supply, over and over, in
              every region.
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-4 rounded-xl border bg-card p-5">
              <Globe className="mt-0.5 h-6 w-6 shrink-0 text-foreground" />
              <div>
                <div className="font-semibold">Built for yesterday's peak</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Health and government infrastructure was provisioned for loads that never
                  anticipated COVID-19, so every new vaccine batch became a fresh outage risk.{" "}
                  <Cite href={S.waitingRoom}>(launch blog: “Why now?”)</Cite>
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border bg-card p-5">
              <Zap className="mt-0.5 h-6 w-6 shrink-0 text-foreground" />
              <div>
                <div className="font-semibold">Demand &gt; supply, on repeat</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Appointments opened at a fixed moment to a region-wide audience — the textbook
                  recipe for a thundering-herd crash. <Cite href={S.fairShot}>(Fair Shot blog)</Cite>
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border bg-card p-5">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-foreground" />
              <div>
                <div className="font-semibold">Stakes measured in lives</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Keeping a registration page up wasn't a convenience metric — it determined whether
                  people could get a vaccine at all.
                </p>
              </div>
            </div>
          </div>
          <Card className="bg-slate-900 text-white">
            <CardContent className="flex h-full flex-col justify-center gap-6 p-8">
              <div>
                <div className="text-5xl font-extrabold tracking-tight text-brand-400">Billions</div>
                <div className="mt-1 text-sm text-white/80">
                  of people newly dependent on online health & government services
                </div>
              </div>
              <Separator className="bg-white/20" />
              <div>
                <div className="text-5xl font-extrabold tracking-tight text-brand-400">Global</div>
                <div className="mt-1 text-sm text-white/80">
                  not a single market — a simultaneous need across countries and continents
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* SOLUTION */}
      <Section id="solution" className="bg-muted/30">
        <SectionHeading
          eyebrow="03 · The solution"
          title="A fair, automatic queue that sits in front of any site — no code required"
          intro={
            <>
              Waiting Room sits in front of any application and, during a spike, routes excess users to a custom-branded page that acts as a seamless extension of the customer's own product — turning a potential outage into a stellar customer experience. It admits people only as fast as the origin can safely handle, holding everyone else on that page with an accurate, auto-refreshing wait time. The hard constraints: respect the customer's limits, keep latency low, and keep
              the experience seamless. <Cite href={S.tech}>(engineering deep-dive)</Cite>
            </>
          }
        />
        <Card className="mb-10">
          <CardContent className="p-6 sm:p-8">
            <RequestFlowDiagram />
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Network className="h-7 w-7 text-foreground" />
              <CardTitle className="text-lg">Zero code changes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Deploy via a single DNS change and configure in minutes — name, hostname, total active
              users, new users per minute, and session duration. It just works.{" "}
              <Cite href={S.waitingRoom}>(launch blog)</Cite>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-7 w-7 text-foreground" />
              <CardTitle className="text-lg">Fair by design</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Users are admitted in order using FIFO, random, or lottery strategies, suited to different needs.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-7 w-7 text-foreground" />
              <CardTitle className="text-lg">Already-global network</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Rather than build new infrastructure, we turned our existing Anycast network —
              300+ data centers — into the queue, removing single points of failure.
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* RELEASE */}
      <Section id="release">
        <SectionHeading
          eyebrow="04 · Release process"
          title="From private beta to a global launch — pulled forward when it mattered most"
          intro={
            <>
              The path to GA ran through a feature-rich beta, a hard re-architecture, and a testing
              breakthrough — then a tightly coordinated launch that I owned end-to-end.
            </>
          }
        />
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Timeline */}
          <ol className="relative space-y-8 border-l border-border pl-8">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative">
                <span className="absolute -left-[37px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-400 bg-background" />
                <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t.date}
                </div>
                <div className="mt-0.5 font-bold">{t.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ol>

          {/* Side cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Badge variant="brand" className="mb-1 w-fit">
                  The unlock
                </Badge>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-foreground" /> A traffic generator we could trust
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Realistically simulating customer traffic — the patterns and spike shapes a real
                event produces — is a genuinely hard problem in itself. Over the year we built a
                generator that let us test the product accurately: measure real impact, find the
                limits, and surface bottlenecks. That confidence is what let us go to market with a
                major announcement at the top of 2021.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="muted" className="mb-1 w-fit">
                  Go-to-market
                </Badge>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5 text-foreground" /> One coordinated launch
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                I drafted the launch blogs and built the rollout plan, working hand-in-hand with
                marketing, sales, customer success, solution engineers, and support. Every
                customer-facing artifact landed in lockstep with the PR moment: dev docs, API docs,
                blog posts, the internal support playbook, technical documentation, and sales &
                technical enablement.
              </CardContent>
            </Card>
            <div className="rounded-xl border-l-4 border-brand-400 bg-muted/60 p-5">
              <p className="text-sm leading-relaxed text-foreground">
                <span className="font-semibold">The call to move fast:</span> the product was planned
                for February. Watching vaccine sites crash in real time, we pulled the launch forward
                and made it free to distributors — and <Cite href={S.fairShot}>Project Fair Shot</Cite>{" "}
                was born.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* LESSONS */}
      <Section id="lessons" className="bg-muted/30">
        <SectionHeading
          eyebrow="05 · Where it went wrong — and what we learned"
          title="A Super Bowl break-glass, stale state, and the features failure created"
          intro={
            <>
              The most useful lessons came from the hardest moments. Two stand out — one operational,
              one deep in the architecture — and both made the product materially better.
            </>
          }
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-destructive/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <Badge variant="destructive">Incident</Badge>
              </div>
              <CardTitle className="pt-2 text-lg">The Super Bowl break-glass</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                We let a Fortune 1000 food-delivery app run on the still-beta product during the
                Super Bowl — an event we simply shouldn't have allowed at that stage. A bug in the
                queueing and cookie-handling logic caused repeated re-queueing: users were stuck in
                limbo, unable to pay for orders, and our own engineers were locked out of the app
                they needed to debug.
              </p>
              <p>
                We had to <span className="font-semibold text-foreground">break glass</span> and
                disable Waiting Room for the event.
              </p>
            </CardContent>
          </Card>
          <Card className="border-destructive/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <Badge variant="destructive">Architecture</Badge>
              </div>
              <CardTitle className="pt-2 text-lg">Stale state, inaccurate queues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Support-ticket patterns revealed the queue wasn't honoring its own rules
                (FIFO/random/lottery) and estimated wait times were off. The root causes:
                optimizations the budgeting system still needed, and a dependency —{" "}
                <Cite href={S.durableObjects}>Durable Objects</Cite> — that was too slow, creating
                global aggregation latency.
              </p>
              <p>
                Stale state drove queueing decisions per time bucket, which meant under-queuing,
                over-queuing, and inaccurate waits.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            What those failures produced
          </h3>
          <Accordion type="single" collapsible className="rounded-xl border bg-card px-5">
            <AccordionItem value="bypass">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" /> Waiting Room Bypass Rules
                </span>
              </AccordionTrigger>
              <AccordionContent>
                The incident proved some traffic must always reach the app — admins, internal
                debugging, payment and other critical paths. That directly motivated{" "}
                <Cite href={S.bypass}>Bypass Rules</Cite>, letting customers exempt specific users or
                routes from the queue, no matter what.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="killswitch">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" /> A real kill switch & beta
                  guardrails
                </span>
              </AccordionTrigger>
              <AccordionContent>
                Break-glass shouldn't be improvised. We hardened the ability to instantly disable a
                room, and set firm guardrails on which event scales a beta product is allowed to
                take on.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="rearch">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" /> The budgeting re-architecture &
                  fresh state
                </span>
              </AccordionTrigger>
              <AccordionContent>
                We rebuilt the budgeting service and moved to two-stage aggregation — colo-level plus
                global — with caching, so state stays fresh enough to make accurate queueing
                decisions without overloading any single coordinator.{" "}
                <Cite href={S.tech}>(how it works)</Cite>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bet">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" /> Betting on beta tech is a
                  trade-off
                </span>
              </AccordionTrigger>
              <AccordionContent>
                Building on Durable Objects while it was still in closed beta was a calculated bet
                that paid off — but it introduced early latency we had to engineer around. Dogfooding
                accelerates the platform and exposes you to its rough edges at the same time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* IMPACT */}
      <Section id="impact">
        <SectionHeading
          eyebrow="06 · Reach, revenue & adoption"
          title="Adoption spread like wildfire — and turned a free campaign into a business"
          intro={
            <>
              Project Fair Shot gave Waiting Room (plus bot management and security) away free to any
              organization distributing the vaccine. The result was extraordinary reach — and a
              durable commercial product underneath it.
            </>
          }
        />
        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat value="~100M" label="Vaccinations scheduled" sub="in the first six months" />
          <Stat value="100+" label="Organizations \u00b7 10+ countries" sub="in the first six months" />
          <Stat value="1,000+" label="Customers today" sub="15+ countries" />
          <Stat value="$5M+" label="Annual recurring revenue" sub="commercial product line" />
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <Quote who="CEO, Verto Health — Project Fair Shot update" href={S.fairShotUpdate}>
            “Our relationship with Cloudflare went from ‘Let's try Waiting Room’ to ‘Unless you have
            this, we're not going live with that public-facing site.’”
          </Quote>
          <Quote who="Web Services Administrator, County of San Luis Obispo" href={S.fairShotUpdate}>
            “The bottom line is Cloudflare saved lives today. Our County will forever be grateful for
            your participation in getting the vaccine to those that need it most in an elegant,
            efficient and ethical manner.”
          </Quote>
        </div>

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Proof in the field
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <Card key={c.name} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="text-2xl font-extrabold tracking-tight text-foreground">
                  {c.metric}
                </div>
                <CardTitle className="text-base">{c.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3 text-sm text-muted-foreground">
                <p className="leading-relaxed">{c.body}</p>
                <Cite href={c.href}>
                  Read more <ArrowUpRight className="inline h-3.5 w-3.5" />
                </Cite>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border bg-card p-6">
            <Trophy className="mt-0.5 h-7 w-7 shrink-0 text-foreground" />
            <div>
              <div className="font-semibold">Recognized with a 2022 Webby Award</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Project Fair Shot won the People's Voice Award, recognizing its impact on fair,
                efficient vaccine distribution. <Cite href={S.fairShotLanding}>(Fair Shot page)</Cite>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border bg-card p-6">
            <Layers className="mt-0.5 h-7 w-7 shrink-0 text-foreground" />
            <div>
              <div className="font-semibold">From launch to a scaling product org</div>
              <p className="mt-1 text-sm text-muted-foreground">
                After establishing the product, I hired a dedicated PM to grow it further —
                integrating Waiting Room with bot management and other security products.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* TECHNICAL */}
      <Section id="technical" className="bg-muted/30">
        <SectionHeading
          eyebrow="07 · Technical design"
          title="A centralized view of demand, built on a decentralized network"
          intro={
            <>
              The core challenge: maintain one accurate, near-real-time picture of global demand
              across 300+ independent data centers — fast enough to react to a spike that can erupt in
              any region — without adding latency to a single request.{" "}
              <Cite href={S.tech}>(full engineering deep-dive)</Cite>
            </>
          }
        />

        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-bold">How the queue actually works</h3>
            {[
              {
                icon: Server,
                t: "User slots",
                d: "Available slots = the customer's limit minus active users. When slots reach zero, the room starts queueing.",
              },
              {
                icon: Network,
                t: "Per-data-center budgets from history",
                d: "Each data center's share is derived from its traffic ratio two minutes in the past. Historical data can't change, so it stays accurate even when live data is still propagating — and avoids constant cross-DC chatter.",
              },
              {
                icon: Clock,
                t: "Time buckets & fair ordering",
                d: "Users are clustered into time buckets instead of tracked individually; the oldest buckets get the next available slots first, which is what makes the queue fair.",
              },
              {
                icon: ShieldCheck,
                t: "Encrypted cookie ticket",
                d: "Each visitor carries an encrypted ticket (arrival bucket, accepted time, last-seen). Estimated wait = people ahead of your bucket ÷ average admitted per minute.",
              },
            ].map((row) => (
              <div key={row.t} className="flex gap-4 rounded-xl border bg-card p-5">
                <row.icon className="mt-0.5 h-6 w-6 shrink-0 text-foreground" />
                <div>
                  <div className="font-semibold">{row.t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{row.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-4 font-bold">The architecture we shipped</h3>
            <Card>
              <CardContent className="p-6">
                <ArchitectureDiagram />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Two-stage aggregation. Workers report to a per-data-center Durable Object (backed by
                  Cache for fast, in-colo sync), which reports up to a single Global Durable Object.
                  The global object assembles the worldwide state and hands it back — so every colo
                  acts on a fresh picture without overwhelming any one coordinator.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <h3 className="mb-4 font-bold">The key design decision: how to coordinate state</h3>
        <Tabs defaultValue="do">
          <TabsList>
            <TabsTrigger value="kv">Workers KV</TabsTrigger>
            <TabsTrigger value="db">Centralized DB</TabsTrigger>
            <TabsTrigger value="do">Durable Objects ✓</TabsTrigger>
          </TabsList>
          <TabsContent value="kv">
            <Card>
              <CardContent className="space-y-2 p-6 text-sm leading-relaxed text-muted-foreground">
                <Badge variant="muted">Considered</Badge>
                <p className="pt-2">
                  KV is globally available but eventually consistent and tuned for read-heavy
                  workloads. Waiting Room is the opposite — extremely write-heavy and intolerant of
                  stale data. The proof-of-concept was both too costly and too slow to reflect a spike
                  happening simultaneously across the globe.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="db">
            <Card>
              <CardContent className="space-y-2 p-6 text-sm leading-relaxed text-muted-foreground">
                <Badge variant="muted">Considered</Badge>
                <p className="pt-2">
                  Running our own in-memory stores (e.g. Redis) in core data centers would give
                  fine-grained control, but at the cost of heavy operational overhead and a hard
                  dependency on those core locations. If core had issues, the product would fail
                  globally — the opposite of an edge-resilient design.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="do">
            <Card className="border-brand-300">
              <CardContent className="space-y-2 p-6 text-sm leading-relaxed text-muted-foreground">
                <Badge variant="brand">Chosen</Badge>
                <p className="pt-2">
                  One global <Cite href={S.durableObjects}>Durable Object</Cite> instance per waiting
                  room gave us sharding for free, edge residency, and per-customer isolation — one
                  customer's spike can't spill into another's. We accepted the risk of building on a
                  closed-beta platform, then engineered around its early latency with the colo-level
                  cache and adaptive write rates above.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>

      {/* FOOTER */}
      <footer className="py-14">
        <div className="container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white">
                  <span className="h-2 w-2 rounded-full bg-brand-200" />
                </span>
                <span className="font-bold">Waiting Room — case study</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Prepared by Brian Batraski. Every figure and quote on this page is drawn from public
                Cloudflare blogs, press releases, and case studies, linked inline and below.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
              <Cite href={S.waitingRoom}>Waiting Room launch</Cite>
              <Cite href={S.tech}>Engineering deep-dive</Cite>
              <Cite href={S.fairShot}>Project Fair Shot</Cite>
              <Cite href={S.fairShotUpdate}>Fair Shot update</Cite>
              <Cite href={S.press}>Press release</Cite>
              <Cite href={S.bypass}>Bypass Rules</Cite>
              <Cite href={S.caseSLO}>San Luis Obispo</Cite>
              <Cite href={S.caseVerto}>Verto Health</Cite>
              <Cite href={S.caseLatvia}>Latvia</Cite>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-xs text-muted-foreground">
            Cloudflare, Waiting Room, and Project Fair Shot are products and trademarks of Cloudflare,
            Inc. This page is a personal portfolio case study describing work done on the product and
            is not an official Cloudflare publication.
          </p>
        </div>
      </footer>
    </div>
  )
}
