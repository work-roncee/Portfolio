/* ============================================================
   PD POSITIONING INTERVIEW — QUESTION DATA
   Ron Cueto · Senior Product Designer · Aug 2026
   Edit this file to change questions. app.js renders whatever
   is here; ids must stay stable once answering has begun.
   Types: single · multi · scale · short · long
   note:true adds an optional "add detail" textarea to a choice.
   ============================================================ */

const SECTIONS = [
  { id: "snapshot",   num: "01", title: "Snapshot",                    hue: "#4C8DFF",
    blurb: "The recruiter-screener layer — how you introduce yourself, logistics, and the awkward questions, answered once so they never surprise you." },
  { id: "origin",     num: "02", title: "Origin & Career Arc",         hue: "#5D2227",
    blurb: "How you got here and which eras shaped you. Hiring managers hire arcs, not bullet lists." },
  { id: "corus",      num: "03", title: "Corus / Global TV",           hue: "#61461F",
    blurb: "Story-mining your 2021–2024 streaming work: the design system, Continue Watching, Show Detail, and the conflicts behind the bullets." },
  { id: "tier1",      num: "04", title: "Tier1 Fintech",               hue: "#1E4334",
    blurb: "Enterprise complexity, dense data, and the compliance-vs-usability tension. 2018–2021." },
  { id: "palsio",     num: "05", title: "Palsio & Early Years",        hue: "#453168",
    blurb: "The startup era, 2014–2017 — where the 0→1 evidence starts." },
  { id: "ai",         num: "06", title: "AI-Native Practice",          hue: "#693E21",
    blurb: "The deepest section. Every engagement, the real workflow, and honest speed/quality claims with their measurement basis. This is raw case-study material." },
  { id: "philosophy", num: "07", title: "Philosophy & Working Style",  hue: "#1F4C48",
    blurb: "How you think about process, craft, feedback, and where design is going — the culture-and-seniority-fit layer." },
  { id: "zero",       num: "08", title: "Building From The Ground Up", hue: "#F24E4E",
    blurb: "Direct probes on the 0→1 angle. Answer honestly — this section decides whether the positioning is true, not whether it sounds good." },
  { id: "goals",      num: "09", title: "Goals & Preferences",         hue: "#9CA0A8",
    blurb: "Who we pitch you to, and on what terms." }
];

const NOTE_LABEL = "Add detail — optional, but stories here become case-study material";

const QUESTIONS = [

  /* ── 01 · SNAPSHOT ──────────────────────────────────────── */
  { id:"s1q1", section:"snapshot", type:"single", note:true,
    text:"On a screener call, which one-line intro feels most like you?",
    hint:"Pick the one you could say without rehearsing.",
    options:[
      "Senior product designer, 10+ years across streaming, fintech and SaaS — since 2024 I run an AI-native independent practice.",
      "Product designer who builds products from zero — research to brand to shipped code — most recently solo, AI-accelerated.",
      "Design systems specialist who has shipped cross-platform systems at scale — web, iOS, Android, tvOS.",
      "End-to-end generalist: comfortable owning everything from user research to front-end implementation." ] },

  { id:"s1q2", section:"snapshot", type:"long",
    text:"Say your 30-second elevator pitch out loud, then type it here exactly as you'd say it.",
    hint:"Spoken language, not resume language. Contractions allowed." },

  { id:"s1q3", section:"snapshot", type:"single", note:true,
    text:"What role level are you targeting?",
    options:[
      "Senior IC — deep craft, strong scope",
      "Staff / Principal IC — org-level influence",
      "Lead / Manager — small team leadership",
      "Senior first, Staff when the fit is right" ] },

  { id:"s1q4", section:"snapshot", type:"multi", note:true,
    text:"Which environments could you honestly join Monday and add value by Friday?",
    hint:"Select all that apply — this is a confidence map, not a wish list.",
    options:[
      "Streaming / media / entertainment",
      "Fintech / enterprise finance",
      "B2B SaaS dashboards & tools",
      "E-commerce / retail",
      "Early-stage startup, 0→1",
      "AI tooling / AI-first products" ] },

  { id:"s1q5", section:"snapshot", type:"single", note:true,
    text:"Availability if an offer landed tomorrow?",
    options:[
      "Immediately",
      "Two weeks — wrapping client commitments",
      "A month — need to wind down engagements properly",
      "Depends on the offer" ] },

  { id:"s1q6", section:"snapshot", type:"short",
    text:"What salary range will you state when asked? Base and total, real numbers.",
    hint:"This tool is private — write what you'd actually say, and your walk-away floor." },

  { id:"s1q7", section:"snapshot", type:"single", note:true,
    text:"Which screener question worries you most right now?",
    options:[
      "“Why did you leave Corus?”",
      "“What have you been doing since 2024?”",
      "“Why return to full-time after founding a practice?”",
      "None of them worry me" ] },

  { id:"s1q8", section:"snapshot", type:"scale",
    text:"Comfort presenting your work to executives / C-suite, today.",
    low:"Rusty", high:"Do it in my sleep" },

  { id:"s1q9", section:"snapshot", type:"single", note:true,
    text:"Will you keep the agency running alongside a full-time role?",
    hint:"Screeners ask this. The answer shapes how we frame the practice.",
    options:[
      "Yes, quietly — small commitments only",
      "Yes, openly — I'd disclose it up front",
      "No — winding it down for the right role",
      "Undecided" ] },

  /* ── 02 · ORIGIN & CAREER ARC ───────────────────────────── */
  { id:"s2q1", section:"origin", type:"long",
    text:"How did you get into design? The real story.",
    hint:"What were you doing before, what pulled you in, what was the first thing you made that felt like design?" },

  { id:"s2q2", section:"origin", type:"single", note:true,
    text:"What keeps you in product design — versus brand, art direction, or engineering?",
    options:[
      "Solving real user problems",
      "Craft — the pursuit of visual and interaction excellence",
      "Systems — how the pieces fit and scale",
      "Shipping — seeing things go live and move numbers" ] },

  { id:"s2q3", section:"origin", type:"single", note:true,
    text:"Which era shaped you most as a designer?",
    options:[
      "Palsio startup years (2014–2017)",
      "Tier1 fintech (2018–2021)",
      "Corus streaming (2021–2024)",
      "Independent AI practice (2024–present)" ] },

  { id:"s2q4", section:"origin", type:"long",
    text:"Describe one inflection point — a project, person, or failure that permanently changed how you work." },

  { id:"s2q5", section:"origin", type:"multi",
    text:"Your strongest muscles. Pick your honest top 3–4.",
    options:[
      "Visual craft & UI polish",
      "Design systems & token architecture",
      "UX research & synthesis",
      "Prototyping & product storytelling",
      "Front-end code",
      "Brand identity",
      "Stakeholder management",
      "Mentoring & teaching" ] },

  { id:"s2q6", section:"origin", type:"scale",
    text:"How much do you identify as a “designer who codes”?",
    low:"Designer, full stop", high:"True hybrid" },

  { id:"s2q7", section:"origin", type:"long",
    text:"Proudest moment of your career so far — and why that one over everything else." },

  { id:"s2q8", section:"origin", type:"single", note:true,
    text:"Why full-time employment now, after two years of independence?",
    hint:"Every hiring manager will ask a version of this. The honest core, not the polished answer.",
    options:[
      "I want a team and bigger problems than solo work allows",
      "Income stability — the practice is real but uneven",
      "Tired of business ops; I want to spend my hours on design",
      "Scale of impact — one client at a time caps what I can affect" ] },

  /* ── 03 · CORUS / GLOBAL TV ─────────────────────────────── */
  { id:"s3q1", section:"corus", type:"short",
    text:"Set the scene at Corus: design team size, who you reported to, what you owned.",
    hint:"Two or three sentences of org context — interviewers always ask for it." },

  { id:"s3q2", section:"corus", type:"single", note:true,
    text:"The design system rebuild — what was most broken before it?",
    options:[
      "Inconsistent components across the four platforms",
      "No tokens — hardcoded values everywhere",
      "Design–engineering drift: specs existed, builds ignored them",
      "Velocity — every screen designed from scratch" ] },

  { id:"s3q3", section:"corus", type:"single", note:true,
    text:"What was the hardest part of the design system work?",
    options:[
      "Technical — variables/token architecture across platforms",
      "Engineering adoption",
      "Aligning web, iOS, Android and tvOS behaviors",
      "Stakeholder buy-in and resourcing" ] },

  { id:"s3q4", section:"corus", type:"multi", note:true,
    text:"Which tactics actually got engineering to adopt the tokens and variables?",
    hint:"Select what you really did — then tell the best specific moment in the note.",
    options:[
      "Paired reviews / office hours with engineers",
      "Named tokens to mirror the code structure",
      "Piloted on one platform, then expanded",
      "Embedded with the eng team during the build",
      "Leadership mandate helped force the issue" ] },

  { id:"s3q5", section:"corus", type:"long",
    text:"Design system outcomes: what measurably improved, and how do you know?",
    hint:"Every number needs its measurement basis — e.g. “~25%, tracked QA ticket counts.” Numbers without a basis get dropped from positioning, per your own rules." },

  { id:"s3q6", section:"corus", type:"single", note:true,
    text:"Continue Watching — what kind of decision was that, at its core?",
    options:[
      "Removing a failing feature and owning the case for it",
      "Consolidation — simplifying overlapping surfaces",
      "Data-driven cleanup of low-engagement UI",
      "A strategy shift from above that I turned into good design" ] },

  { id:"s3q7", section:"corus", type:"multi", note:true,
    text:"What evidence backed the Continue Watching decision?",
    options:[
      "Behavioral / analytics data",
      "Usability testing",
      "Competitive audit",
      "Support / QA signals" ] },

  { id:"s3q8", section:"corus", type:"long",
    text:"Continue Watching: what shipped, and what happened after?",
    hint:"Post-ship metrics with their basis if you have them; “we never measured it” is also a valid, honest answer." },

  { id:"s3q9", section:"corus", type:"long",
    text:"Show Detail redesign — the research pivot. Walk through what the research revealed and how the project changed.",
    hint:"This is your best “strong opinions, loosely held” story. Unshipped is fine; the pivot is the point." },

  { id:"s3q10", section:"corus", type:"single", note:true,
    text:"The honest reason the unshipped projects (Show Detail, responsive web) didn't ship:",
    options:[
      "Org priorities shifted",
      "Resourcing / layoffs",
      "Research said don't — and we listened",
      "Leadership disagreement" ] },

  { id:"s3q11", section:"corus", type:"single", note:true,
    text:"When you disagreed with a PM or engineer at Corus, your go-to move was:",
    hint:"Pick your real default, then tell the best specific instance in the note.",
    options:[
      "Bring data and let it argue for me",
      "Prototype the alternative and demo it",
      "Concede the small thing to win the big thing",
      "Escalate — rarely, but deliberately" ] },

  { id:"s3q12", section:"corus", type:"single", note:true,
    text:"The hardest stakeholder situation at Corus involved:",
    options:[
      "An executive with strong design opinions",
      "Broadcast-era legacy thinking vs. streaming-product thinking",
      "Misalignment across distributed teams",
      "Marketing / brand pulling against product" ] },

  { id:"s3q13", section:"corus", type:"single", note:true,
    text:"Why did you leave Corus in October 2024?",
    hint:"The note matters here: write the two-sentence version you'd say in an interview.",
    options:[
      "Restructuring / layoffs",
      "Chose to leave and build the practice",
      "The role had stopped growing",
      "Team or product direction dissolved" ] },

  { id:"s3q14", section:"corus", type:"short",
    text:"Reference-check preview: what would your Corus PM or engineering lead actually say about you?",
    hint:"Include the mild criticism they'd add — it makes the praise credible." },

  /* ── 04 · TIER1 FINTECH ─────────────────────────────────── */
  { id:"s4q1", section:"tier1", type:"short",
    text:"Tier1 context: what the product did, who used it, and the team around you." },

  { id:"s4q2", section:"tier1", type:"single", note:true,
    text:"Your go-to strategy for dense enterprise data — deal pipelines, compliance views, CRM screens:",
    options:[
      "Progressive disclosure — layers, not walls",
      "Typographic hierarchy doing the work chrome usually does",
      "Role-based defaults — show each user their slice",
      "Ruthless removal — fight for what leaves the screen" ] },

  { id:"s4q3", section:"tier1", type:"single", note:true,
    text:"When regulatory accuracy fought usability, you usually:",
    hint:"Tell the single best instance in the note — this is a signature enterprise story.",
    options:[
      "Found a third option that satisfied both",
      "Made the constraint visible and legible in the UI",
      "Pushed back with user evidence — and sometimes won",
      "Accepted the constraint and polished within it" ] },

  { id:"s4q4", section:"tier1", type:"single", note:true,
    text:"Unifying web, mobile and Outlook add-ins into one design system — what was hardest?",
    options:[
      "Wildly different platform constraints (Outlook especially)",
      "Legacy debt in the existing screens",
      "Engineering bandwidth",
      "No precedent — first real system the company had" ] },

  { id:"s4q5", section:"tier1", type:"single", note:true,
    text:"How did you validate designs with capital-markets users?",
    options:[
      "Direct sessions with end users",
      "Through client-facing teams as proxies",
      "Internal subject-matter experts",
      "Mostly shipped-and-learned, honestly" ] },

  { id:"s4q6", section:"tier1", type:"long",
    text:"The Tier1 work you're proudest of — the full arc, from problem to what it changed." },

  { id:"s4q7", section:"tier1", type:"long",
    text:"A mistake or failure at Tier1 and what it taught you.",
    hint:"“Tell me about a time you failed” is guaranteed in interviews. Bank the answer now." },

  { id:"s4q8", section:"tier1", type:"short",
    text:"Any Tier1 outcomes or metrics you can claim with a defensible basis?",
    hint:"If nothing was measured, say so — we'll position on complexity instead of numbers." },

  { id:"s4q9", section:"tier1", type:"single", note:true,
    text:"Biggest difference working with business stakeholders versus product teams:",
    options:[
      "They think in revenue, not users",
      "Consensus is slower and more political",
      "They know the domain far deeper than you — respect it",
      "Demos persuade them; specs don't" ] },

  { id:"s4q10", section:"tier1", type:"short",
    text:"One thing Tier1 taught you that you still use every week." },

  /* ── 05 · PALSIO & EARLY YEARS ──────────────────────────── */
  { id:"s5q1", section:"palsio", type:"short",
    text:"Palsio: what it was, the company stage, team size, and your actual scope." },

  { id:"s5q2", section:"palsio", type:"long",
    text:"What did you build there from literally nothing? Your best 0→1 story from that era.",
    hint:"Blank canvas → shipped. What existed on day one, what existed when you were done." },

  { id:"s5q3", section:"palsio", type:"single", note:true,
    text:"The onboarding work — which lever turned out most powerful?",
    options:[
      "Progressive profiling — ask less, earlier",
      "Empty states that teach",
      "A guided first task to the “aha” moment",
      "Contextual education over upfront tours" ] },

  { id:"s5q4", section:"palsio", type:"single", note:true,
    text:"Pitch decks, investor presentations, launch collateral — that work was:",
    options:[
      "Some of my favorite — persuasion is design",
      "A useful stretch beyond product",
      "Honestly, a distraction from product work",
      "Just part of startup life — you do everything" ] },

  { id:"s5q5", section:"palsio", type:"short",
    text:"What did the startup era teach you that the corporate years couldn't?" },

  { id:"s5q6", section:"palsio", type:"long",
    text:"Anything from before 2014 — education, first jobs, side projects — that still shapes how you work? Optional.",
    hint:"Positioning stays “10+ years,” but background texture helps me write your story." },

  /* ── 06 · AI-NATIVE PRACTICE ────────────────────────────── */
  { id:"s6q1", section:"ai", type:"long",
    text:"August 2024: why start the practice? The honest founding story.",
    hint:"Circumstances and motivation — what made this the move, and what did the first month look like?" },

  { id:"s6q2", section:"ai", type:"single", note:true,
    text:"How did you land your first client?",
    options:[
      "Existing network",
      "Referral",
      "Outbound / cold outreach",
      "They found me" ] },

  { id:"s6q3", section:"ai", type:"multi", note:true,
    text:"The Real McCoy — WordPress theme redesign. What did the engagement actually include?",
    hint:"Check everything you did, then use the note for the story: state before, what shipped, client reaction.",
    options:[
      "Custom theme built from my own Figma designs",
      "AI-assisted theme development (Claude Code)",
      "Content strategy & copy",
      "Performance / SEO work",
      "Ongoing iteration & support" ] },

  { id:"s6q4", section:"ai", type:"multi", note:true,
    text:"Child Solutions — branding + website direction. What did the engagement include?",
    hint:"Same treatment: scope boxes, story in the note.",
    options:[
      "Brand strategy & positioning",
      "Logo / identity design",
      "Website direction & design",
      "Copy & content",
      "Research & discovery" ] },

  { id:"s6q5", section:"ai", type:"multi", note:true,
    text:"Dats Hot Mang — brand foundations + visual style guide. What did the engagement include?",
    options:[
      "Brand foundations (positioning, voice, values)",
      "Visual style guide",
      "Applied brand assets (packaging, social, web)",
      "Naming / verbal identity",
      "Research & discovery" ] },

  { id:"s6q6", section:"ai", type:"long",
    text:"The e-commerce platform project: the full arc — competitive research, user flows, wireframes, annotated dev-ready specs.",
    hint:"This is your strongest end-to-end UX evidence. What was the business, what did you deliver, what happened to it?" },

  { id:"s6q7", section:"ai", type:"long",
    text:"Walk through your actual workflow on a typical project, start to finish, naming where Claude, Claude Code and Figma MCP enter.",
    hint:"Kickoff → research → concept → design → build → handoff/launch. Be specific about tools at each stage; this becomes the case-study workflow diagram." },

  { id:"s6q8", section:"ai", type:"single", note:true,
    text:"Where does AI accelerate you MOST?",
    options:[
      "Research & synthesis",
      "Content & copy generation",
      "Prototyping & iteration speed",
      "Design-to-code handoff" ] },

  { id:"s6q9", section:"ai", type:"single", note:true,
    text:"Where do you stay fully manual — where does AI not touch the work?",
    options:[
      "Visual craft & final polish",
      "Client relationships & strategy",
      "Brand & creative direction",
      "Information architecture & flows" ] },

  { id:"s6q10", section:"ai", type:"long",
    text:"Honest speed claim: pick one deliverable — say, a custom WordPress theme. How long with your AI workflow versus before, and how do you know?",
    hint:"“Basis:” line required — tracked hours, invoice dates, project logs. This claim will be printed in a case study, so it has to survive scrutiny." },

  { id:"s6q11", section:"ai", type:"multi", note:true,
    text:"How do you keep AI output at your quality bar? Your actual QC process includes:",
    options:[
      "I review every line / every pixel personally",
      "Side-by-side comparison against my Figma source",
      "Device & browser passes",
      "Accessibility checks",
      "Client review loops",
      "Iterating prompts until output matches intent" ] },

  { id:"s6q12", section:"ai", type:"long",
    text:"Best concrete Figma MCP design-to-code example: what went from Figma to shipped code, and what would that handoff have lost before?" },

  { id:"s6q13", section:"ai", type:"single", note:true,
    text:"Do clients know AI is central to your process?",
    options:[
      "Yes — it's part of the pitch",
      "They know; they don't particularly care",
      "I don't lead with it",
      "Varies by client" ] },

  { id:"s6q14", section:"ai", type:"long",
    text:"A project or moment that went wrong in the practice — the hardest founder moment, and what you learned.",
    hint:"Failure stories from the founder era are gold in interviews: they show judgment, not just capability." },

  { id:"s6q15", section:"ai", type:"short",
    text:"What have you learned about pricing and packaging this kind of work?" },

  { id:"s6q16", section:"ai", type:"single", note:true,
    text:"A design team hires you partly to bring these AI workflows in-house. Your first 90 days start with:",
    options:[
      "Auditing their workflow for the highest-friction stage",
      "Piloting with one willing designer and publishing the results",
      "Building the design-to-code bridge first — it's the flashiest win",
      "Training: prompt patterns and a shared playbook" ] },

  { id:"s6q17", section:"ai", type:"multi", note:true,
    text:"Which engagements are the strongest case-study material?",
    hint:"Where's the best before/after evidence, client permission, and story shape?",
    options:[
      "The Real McCoy",
      "Child Solutions",
      "Dats Hot Mang",
      "The e-commerce platform",
      "The portfolio rebuild itself",
      "The agency's own brand & systems" ] },

  { id:"s6q18", section:"ai", type:"single", note:true,
    text:"The biggest misconception design leaders have about AI-assisted design:",
    hint:"Your counter-argument in the note — this is a talking point you'll reuse constantly.",
    options:[
      "That the output is inherently low quality",
      "That it replaces designers instead of compounding them",
      "That it's only good for faster wireframes",
      "That it's a prompt trick, not a redesigned workflow" ] },

  /* ── 07 · PHILOSOPHY & WORKING STYLE ────────────────────── */
  { id:"s7q1", section:"philosophy", type:"single", note:true,
    text:"Which best describes your natural process?",
    options:[
      "Research-first — evidence before pixels",
      "Prototype-first — make it real fast, learn from the artifact",
      "Systems-first — structure and rules, then screens",
      "Context-driven — the problem picks the process" ] },

  { id:"s7q2", section:"philosophy", type:"multi", note:true,
    text:"Where do you refuse to compromise, even under deadline?",
    options:[
      "Typography",
      "Spacing & rhythm",
      "Interaction details & states",
      "Accessibility",
      "Copy quality",
      "Data honesty — no invented numbers" ] },

  { id:"s7q3", section:"philosophy", type:"long",
    text:"The hardest piece of feedback you've ever received — and what you did with it." },

  { id:"s7q4", section:"philosophy", type:"single", note:true,
    text:"Your critique style when reviewing others' work:",
    options:[
      "Direct and specific — kind, but no hedging",
      "Questions-first — let them find it",
      "Strengths first, then the gaps",
      "Calibrated to the person and the stakes" ] },

  { id:"s7q5", section:"philosophy", type:"single", note:true,
    text:"Your realistic relationship with user research:",
    options:[
      "I run it myself, end to end",
      "I run scrappy versions; partner with researchers for rigor",
      "I mostly consume and synthesize others' research",
      "Depends entirely on what the org gives me" ] },

  { id:"s7q6", section:"philosophy", type:"short",
    text:"Describe your ideal PM relationship in a sentence or two." },

  { id:"s7q7", section:"philosophy", type:"short",
    text:"What makes a designer-to-engineer handoff great, in your experience?" },

  { id:"s7q8", section:"philosophy", type:"long",
    text:"Four years of weekly Springboard mentoring: your favorite mentoring story — a student you turned around, or a lesson mentoring taught YOU.",
    hint:"Leadership-without-the-title evidence. Managers love this question." },

  { id:"s7q9", section:"philosophy", type:"single", note:true,
    text:"Remote work — your honest self-assessment:",
    options:[
      "Thrive fully remote; years of proof",
      "Prefer remote, enjoy occasional in-person",
      "Genuinely flexible either way",
      "Remote by necessity; I miss office energy" ] },

  { id:"s7q10", section:"philosophy", type:"scale",
    text:"How opinionated are you?",
    low:"Consensus-builder", high:"Strong POV, loosely held" },

  { id:"s7q11", section:"philosophy", type:"long",
    text:"Where does product design actually go in the next five years with AI? Your real take — the one you'd give in a final round.",
    hint:"Not the safe answer. The one that makes a design VP lean forward." },

  { id:"s7q12", section:"philosophy", type:"short",
    text:"Three words former teammates would use to describe you — and one they'd use behind your back." },

  /* ── 08 · BUILDING FROM THE GROUND UP ───────────────────── */
  { id:"s8q1", section:"zero", type:"single", note:true,
    text:"Which genuinely energizes you more?",
    options:[
      "0→1 — blank canvas, ambiguity, invention",
      "1→n — scaling and systematizing something live",
      "The handoff zone — take it 0→1, then systematize it",
      "Depends entirely on the product" ] },

  { id:"s8q2", section:"zero", type:"multi",
    text:"Which of your projects were TRULY built from nothing?",
    hint:"“Nothing” means no existing designs, patterns, or brand to extend.",
    options:[
      "Palsio onboarding & launch work",
      "Tier1 design system — first one the company had",
      "The e-commerce platform UX",
      "Client brand identities",
      "Custom WordPress themes from my own designs",
      "The agency itself — brand, site, systems, pipeline",
      "The portfolio rebuild" ] },

  { id:"s8q3", section:"zero", type:"long",
    text:"Your single best “from nothing to shipped” story across your whole career — the one you'd tell a founder-CEO.",
    hint:"What existed on day one. What existed at the end. What only happened because you were there." },

  { id:"s8q4", section:"zero", type:"multi", note:true,
    text:"Blank canvas method: a client hands you nothing but a business goal. Week one, you actually:",
    options:[
      "Interview the founder / stakeholders until the real goal surfaces",
      "Tear down competitors",
      "Draft a positioning / brand hypothesis fast",
      "Sketch lo-fi flows immediately — think by making",
      "Define what success will be measured by",
      "Scan technical constraints & platform realities" ] },

  { id:"s8q5", section:"zero", type:"scale",
    text:"Ambiguity tolerance:",
    low:"I need defined problems", high:"Give me fog and a deadline" },

  { id:"s8q6", section:"zero", type:"single", note:true,
    text:"Would you join an early-stage startup as the first or only designer?",
    options:[
      "Yes — seed stage, that's the dream",
      "Series A–B is the sweet spot",
      "Prefer growth-stage with some structure",
      "Enterprise scale genuinely suits me better" ] },

  { id:"s8q7", section:"zero", type:"single", note:true,
    text:"About 0→1 roles — the honest worry:",
    options:[
      "No research resources — flying blind",
      "Lonely — no design peers to sharpen against",
      "Scope sprawl and burnout",
      "Compensation risk — equity over salary",
      "None — it's all upside for me" ] },

  { id:"s8q8", section:"zero", type:"single", note:true,
    text:"Gut check: “a product designer who builds products from the ground up.” Does that feel like you?",
    hint:"This answer plus the evidence above decides the positioning recommendation.",
    options:[
      "Yes — that's the truest framing of my career",
      "True, but AI-acceleration is the bigger differentiator",
      "Both, equally — they're the same story told twice",
      "Not quite — I'm strongest systematizing what exists" ] },

  /* ── 09 · GOALS & PREFERENCES ───────────────────────────── */
  { id:"s9q1", section:"goals", type:"single", note:true,
    text:"Target company stage:",
    options:[
      "Seed → Series A",
      "Series B–D growth",
      "Public / enterprise",
      "Agnostic — the product decides" ] },

  { id:"s9q2", section:"goals", type:"multi",
    text:"Industries that genuinely pull you:",
    options:[
      "Streaming / media / entertainment",
      "Fintech",
      "B2B SaaS",
      "E-commerce / retail",
      "AI & developer tools",
      "Health",
      "Climate / impact",
      "Open to anything with a good team" ] },

  { id:"s9q3", section:"goals", type:"single", note:true,
    text:"IC or leadership, on a three-year horizon?",
    options:[
      "Deep IC craft — that's the career",
      "Player-coach lead",
      "Manager track",
      "IC now, genuinely open later" ] },

  { id:"s9q4", section:"goals", type:"single", note:true,
    text:"Design org size preference:",
    options:[
      "Only designer — I own it all",
      "Small team, 2–5",
      "Mid-size, 6–20",
      "Large org, 20+" ] },

  { id:"s9q5", section:"goals", type:"multi", note:true,
    text:"Dealbreakers — what would make you decline or leave?",
    options:[
      "No design voice at the leadership table",
      "Feature factory — no research, no measurement",
      "Meeting-heavy, low-trust culture",
      "Return-to-office mandate",
      "Below-market compensation",
      "AI-hostile environment — tools banned or feared" ] },

  { id:"s9q6", section:"goals", type:"long",
    text:"It's 2029 and your career went right. Paint the picture — what are you doing, at what kind of company, known for what?" },

  { id:"s9q7", section:"goals", type:"long",
    text:"Last one: anything I didn't ask that I need to know to position you well?",
    hint:"Skeletons, superpowers, constraints, ambitions, half-finished ideas — anything." }
];
