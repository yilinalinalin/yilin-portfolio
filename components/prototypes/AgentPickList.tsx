"use client";
import { useMemo, useState } from "react";

// A speculative prototype: an AI "scout" proposes products for one creator, a human
// (the creator manager) approves, adjusts commission, corrects the agent, and sends.
// All data is made up.

type Confidence = "high" | "medium" | "low";
type Reason = { signal: string; evidence: string };
type Product = {
  id: string;
  name: string;
  merchant: string;
  price: number;
  commission: number; // % the agent proposes
  minCommission: number; // merchant floor
  confidence: Confidence;
  reasons: Reason[];
  risk?: string;
  swatch: string;
};
type Creator = { id: string; handle: string; niche: string; followers: string; products: Product[] };
type Status = "pending" | "approved" | "rejected";

const REJECT_REASONS = [
  "Wrong category for this creator",
  "Commission too low to pitch",
  "Creator already promotes a similar item",
  "Don't trust this merchant",
];

const creators: Creator[] = [
  {
    id: "mia",
    handle: "@mia.glows",
    niche: "Skincare · 18–24 audience",
    followers: "128k",
    products: [
      {
        id: "p1",
        name: "Barrier Repair Gel Cream, 50ml",
        merchant: "Dewlab Skincare",
        price: 18.9,
        commission: 20,
        minCommission: 15,
        confidence: "high",
        swatch: "#d9e8e4",
        reasons: [
          { signal: "Category fit", evidence: "62% of this creator's last 30 days of GMV came from moisturizers." },
          { signal: "Price fit", evidence: "$18.90 sits inside her best-converting band ($12–$25)." },
          { signal: "Merchant reliability", evidence: "4.8 shop rating, 98% on-time shipping, samples in stock." },
        ],
      },
      {
        id: "p2",
        name: "Tinted SPF 50 Fluid",
        merchant: "Sunday Theory",
        price: 24.0,
        commission: 18,
        minCommission: 12,
        confidence: "medium",
        swatch: "#efe2d3",
        reasons: [
          { signal: "Trend", evidence: "SPF searches up 3.1× week over week in her audience's region." },
          { signal: "Category fit", evidence: "Adjacent to skincare, but she has never posted SPF." },
          { signal: "Commission", evidence: "18% is above the category median of 14%." },
        ],
      },
      {
        id: "p3",
        name: "LED Face Mask Pro",
        merchant: "Glowtek (new shop)",
        price: 89.0,
        commission: 25,
        minCommission: 25,
        confidence: "low",
        swatch: "#e4e0ef",
        risk: "New merchant with 11 orders and no return data. Price is 3.5× her usual band.",
        reasons: [
          { signal: "Commission", evidence: "25% is the highest offer in skincare this week." },
          { signal: "Category fit", evidence: "Skincare device: in her niche, not a format she's sold." },
        ],
      },
      {
        id: "p4",
        name: "Hydrating Lip Oil Duo",
        merchant: "Petal & Pine",
        price: 12.5,
        commission: 22,
        minCommission: 15,
        confidence: "high",
        swatch: "#f2dcdc",
        reasons: [
          { signal: "Creator history", evidence: "Her last lip product video converted at 4.2%, about 2× her average." },
          { signal: "Price fit", evidence: "Impulse price point, inside her best band." },
          { signal: "Merchant reliability", evidence: "4.7 shop rating, ships within 24h." },
        ],
      },
    ],
  },
  {
    id: "dev",
    handle: "@kitchenwithdev",
    niche: "Home cooking · 25–34 audience",
    followers: "54k",
    products: [
      {
        id: "k1",
        name: "Pre-seasoned Cast Iron Skillet, 10\"",
        merchant: "Hearth & Co",
        price: 29.0,
        commission: 15,
        minCommission: 10,
        confidence: "high",
        swatch: "#dedbd6",
        reasons: [
          { signal: "Creator history", evidence: "Cookware is 48% of his GMV; skillet videos average 2× his views." },
          { signal: "Merchant reliability", evidence: "4.9 shop rating, samples available this week." },
        ],
      },
      {
        id: "k2",
        name: "Silicone Utensil Set (6 pc)",
        merchant: "Nestware",
        price: 16.0,
        commission: 12,
        minCommission: 8,
        confidence: "medium",
        swatch: "#d9e4ef",
        reasons: [
          { signal: "Category fit", evidence: "Fits his niche, but he posted a similar set 3 weeks ago." },
          { signal: "Price fit", evidence: "Inside his best-converting band ($10–$35)." },
        ],
      },
      {
        id: "k3",
        name: "Smart Air Fryer 6Qt",
        merchant: "Voltio (new shop)",
        price: 79.0,
        commission: 20,
        minCommission: 20,
        confidence: "low",
        swatch: "#e6efd9",
        risk: "New merchant. 2 of 14 reviews mention late delivery.",
        reasons: [
          { signal: "Trend", evidence: "Air fryer recipes are his fastest-growing format (+40% views)." },
          { signal: "Commission", evidence: "20% is high for small appliances (median 11%)." },
        ],
      },
    ],
  },
];

const confStyle: Record<Confidence, string> = {
  high: "bg-teal-tile text-ink",
  medium: "bg-[#efe8d6] text-ink",
  low: "bg-[#fbeeeb] text-[#a8463a]",
};

export function AgentPickList() {
  const [creatorId, setCreatorId] = useState(creators[0].id);
  const creator = creators.find((c) => c.id === creatorId)!;

  const [status, setStatus] = useState<Record<string, Status>>({});
  const [commission, setCommission] = useState<Record<string, number>>({});
  const [openWhy, setOpenWhy] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [learned, setLearned] = useState<{ product: string; reason: string }[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [sent, setSent] = useState<Record<string, string[]>>({});

  const sentHere = sent[creator.id] ?? [];
  const visible = creator.products.filter((p) => !sentHere.includes(p.id));
  const approved = visible.filter((p) => status[p.id] === "approved");
  const rateOf = (p: Product) => commission[p.id] ?? p.commission;

  const set = (id: string, s: Status) => setStatus((m) => ({ ...m, [id]: s }));

  const reject = (p: Product, reason: string) => {
    set(p.id, "rejected");
    setRejecting(null);
    setLearned((l) => [{ product: p.name, reason }, ...l]);
  };

  const send = () => {
    setSent((m) => ({ ...m, [creator.id]: [...sentHere, ...approved.map((p) => p.id)] }));
    setConfirming(false);
  };

  const counts = useMemo(
    () => ({
      pending: visible.filter((p) => (status[p.id] ?? "pending") === "pending").length,
      approved: approved.length,
    }),
    [visible, approved, status]
  );

  return (
    <div className="overflow-hidden rounded-[6px] border border-rule bg-white text-ink">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-rule px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">Scout agent · suggestions</p>
          <p className="mt-1 text-[15px]">
            Picks for <span className="font-medium">{creator.handle}</span>{" "}
            <span className="text-muted">
              · {creator.niche} · {creator.followers}
            </span>
          </p>
        </div>
        <div role="tablist" aria-label="Creator" className="flex gap-1 rounded-full bg-well p-1 text-[13px]">
          {creators.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === creatorId}
              onClick={() => {
                setCreatorId(c.id);
                setOpenWhy(null);
                setRejecting(null);
                setConfirming(false);
              }}
              className={`rounded-full px-3 py-1 transition-colors ${
                c.id === creatorId ? "bg-white shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              {c.handle}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px]">
        {/* Suggestions */}
        <ul className="divide-y divide-rule">
          {visible.length === 0 && (
            <li className="px-5 py-10 text-center text-[14px] text-muted">
              All picks sent. The agent will scout again tomorrow.
            </li>
          )}
          {visible.map((p) => {
            const st = status[p.id] ?? "pending";
            const rate = rateOf(p);
            const belowFloor = rate < p.minCommission;
            return (
              <li key={p.id} className={`px-4 py-4 sm:px-5 ${st === "rejected" ? "opacity-45" : ""}`}>
                <div className="flex gap-3">
                  <div
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[4px] font-serif text-[20px] text-ink/60"
                    style={{ background: p.swatch }}
                  >
                    {p.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className={`text-[14px] ${st === "rejected" ? "line-through" : ""}`}>{p.name}</p>
                      <span className={`rounded-full px-2 py-[1px] text-[11px] ${confStyle[p.confidence]}`}>
                        {p.confidence} fit
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-muted">
                      {p.merchant} · ${p.price.toFixed(2)}
                    </p>

                    {p.risk && st !== "rejected" && (
                      <p className="mt-2 rounded-[3px] bg-[#fbeeeb] px-2.5 py-1.5 text-[12px] leading-[1.35] text-[#a8463a]">
                        Needs your review: {p.risk}
                      </p>
                    )}

                    {/* Controls */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 text-[12px] text-muted">
                        Commission
                        <span className="flex items-center rounded-full border border-rule">
                          <button
                            aria-label="Lower commission"
                            disabled={st !== "pending"}
                            onClick={() => setCommission((m) => ({ ...m, [p.id]: Math.max(0, rate - 1) }))}
                            className="px-2 py-0.5 text-ink disabled:text-subtle"
                          >
                            −
                          </button>
                          <span className={`w-9 text-center tabular-nums ${belowFloor ? "text-[#a8463a]" : "text-ink"}`}>
                            {rate}%
                          </span>
                          <button
                            aria-label="Raise commission"
                            disabled={st !== "pending"}
                            onClick={() => setCommission((m) => ({ ...m, [p.id]: Math.min(50, rate + 1) }))}
                            className="px-2 py-0.5 text-ink disabled:text-subtle"
                          >
                            +
                          </button>
                        </span>
                      </label>

                      <button
                        onClick={() => setOpenWhy(openWhy === p.id ? null : p.id)}
                        aria-expanded={openWhy === p.id}
                        className="rounded-full border border-rule px-3 py-1 text-[12px] hover:border-ink"
                      >
                        Why this?
                      </button>

                      <span className="ml-auto flex gap-2">
                        {st === "pending" ? (
                          <>
                            <button
                              onClick={() => setRejecting(rejecting === p.id ? null : p.id)}
                              className="rounded-full border border-rule px-3 py-1 text-[12px] hover:border-ink"
                            >
                              Reject
                            </button>
                            <button
                              disabled={belowFloor}
                              onClick={() => set(p.id, "approved")}
                              className="rounded-full bg-ink px-3 py-1 text-[12px] text-white disabled:bg-subtle"
                            >
                              Approve
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="py-1 text-[12px] text-muted">
                              {st === "approved" ? "✓ Approved" : "Rejected"}
                            </span>
                            <button
                              onClick={() => {
                                set(p.id, "pending");
                                if (st === "rejected") setLearned((l) => l.filter((x) => x.product !== p.name));
                              }}
                              className="py-1 text-[12px] underline underline-offset-2"
                            >
                              Undo
                            </button>
                          </>
                        )}
                      </span>
                    </div>

                    {belowFloor && st === "pending" && (
                      <p className="mt-1.5 text-[12px] text-[#a8463a]">
                        Below the merchant&apos;s floor of {p.minCommission}%. They&apos;d decline this offer.
                      </p>
                    )}

                    {openWhy === p.id && (
                      <ul className="mt-3 space-y-1.5 rounded-[3px] bg-well px-3 py-2.5">
                        {p.reasons.map((r) => (
                          <li key={r.signal} className="text-[12px] leading-[1.4]">
                            <span className="text-ink">{r.signal}:</span> <span className="text-muted">{r.evidence}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {rejecting === p.id && (
                      <div className="mt-3">
                        <p className="text-[12px] text-muted">What did the agent get wrong?</p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {REJECT_REASONS.map((r) => (
                            <button
                              key={r}
                              onClick={() => reject(p, r)}
                              className="rounded-full border border-rule px-2.5 py-1 text-[12px] hover:border-ink hover:bg-well"
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Side rail: send gate + what the agent learned */}
        <aside className="flex flex-col gap-5 border-t border-rule bg-canvas/60 px-4 py-4 sm:px-5 lg:border-l lg:border-t-0">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">Ready to send</p>
            <p className="mt-1 text-[13px] text-muted">
              {counts.approved} approved · {counts.pending} waiting on you
            </p>
            {!confirming ? (
              <button
                disabled={approved.length === 0}
                onClick={() => setConfirming(true)}
                className="mt-3 w-full rounded-full bg-accent px-3 py-2 text-[13px] text-white disabled:bg-rule disabled:text-muted"
              >
                Send {approved.length || ""} to {creator.handle}
              </button>
            ) : (
              <div className="mt-3 rounded-[4px] border border-rule bg-white p-3">
                <p className="text-[12px] leading-[1.4]">
                  Send these offers? {creator.handle} will see them in their inbox.
                </p>
                <ul className="mt-2 space-y-1 text-[12px] text-muted">
                  {approved.map((p) => (
                    <li key={p.id} className="flex justify-between gap-2">
                      <span className="truncate">{p.name}</span>
                      <span className="tabular-nums text-ink">{rateOf(p)}%</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setConfirming(false)} className="flex-1 rounded-full border border-rule py-1 text-[12px]">
                    Back
                  </button>
                  <button onClick={send} className="flex-1 rounded-full bg-accent py-1 text-[12px] text-white">
                    Confirm send
                  </button>
                </div>
              </div>
            )}
            {sentHere.length > 0 && (
              <p className="mt-2 text-[12px] text-muted">✓ {sentHere.length} sent to {creator.handle}</p>
            )}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">What the agent learned</p>
            {learned.length === 0 ? (
              <p className="mt-1 text-[12px] leading-[1.4] text-muted">
                Reject a pick and say why. Your corrections change tomorrow&apos;s suggestions.
              </p>
            ) : (
              <ul className="mt-2 space-y-2">
                {learned.slice(0, 4).map((l, i) => (
                  <li key={i} className="text-[12px] leading-[1.35]">
                    <span className="text-ink">{l.reason}</span>
                    <span className="block text-muted">from “{l.product}”: similar picks ranked lower</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
