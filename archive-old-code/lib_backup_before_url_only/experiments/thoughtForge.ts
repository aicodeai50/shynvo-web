// lib/experiments/thoughtForge.ts

/* ======================================================
   Types
   ====================================================== */

export type ThoughtForgeNodeType = "seed" | "concept" | "detail";

export type ThoughtForgeNode = {
  id: string;
  label: string;
  type: ThoughtForgeNodeType;
};

export type ThoughtForgeLink = {
  source: string;
  target: string;
  label?: string;
};

export type TFGraph = {
  nodes: ThoughtForgeNode[];
  links: ThoughtForgeLink[];
};

export const TF_STORAGE_KEY = "shynvo:thought-forge:v1";

export type ThoughtForgeEdge = {
  from: string;
  to: string;
  label?: string;
};

export type ThoughtForgeAIResponse = {
  nodes: ThoughtForgeNode[];
  edges: ThoughtForgeEdge[];
};

/* ======================================================
   Phase 1 — Local graph helpers (NO backend)
   ====================================================== */

export function createSeedGraph(seedLabel: string): TFGraph {
  const seed: ThoughtForgeNode = {
    id: "seed",
    label: seedLabel,
    type: "seed",
  };

  return {
    nodes: [seed],
    links: [],
  };
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
}

function uniqueId(base: string, existing: Set<string>): string {
  let id = base;
  let i = 2;
  while (existing.has(id)) {
    id = `${base}-${i}`;
    i += 1;
  }
  existing.add(id);
  return id;
}

export function expandNode(graph: TFGraph, nodeId: string): TFGraph {
  const node = graph.nodes.find((n) => n.id === nodeId);
  if (!node) return graph;

  const existingIds = new Set(graph.nodes.map((n) => n.id));

  const alreadyExpanded = graph.links.some((l) => l.source === nodeId);
  if (alreadyExpanded) return graph;

  const base = slugify(node.label || "node");

  const newNodes: ThoughtForgeNode[] = [
    {
      id: uniqueId(`${base}-detail`, existingIds),
      label: "Example",
      type: "detail",
    },
    {
      id: uniqueId(`${base}-implication`, existingIds),
      label: "Implication",
      type: "detail",
    },
    {
      id: uniqueId(`${base}-next-step`, existingIds),
      label: "Next step",
      type: "detail",
    },
  ];

  const newLinks: ThoughtForgeLink[] = newNodes.map((n) => ({
    source: nodeId,
    target: n.id,
    label: "expands to",
  }));

  return {
    nodes: [...graph.nodes, ...newNodes],
    links: [...graph.links, ...newLinks],
  };
}

/* ======================================================
   Phase 2 — AI helpers (STRICT + SAFE)
   ====================================================== */

function extractJSON(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON found in AI response");
  }
  return JSON.parse(text.slice(start, end + 1));
}

function safeString(x: unknown, fallback = ""): string {
  return typeof x === "string" ? x : fallback;
}

function isNodeType(x: unknown): x is ThoughtForgeNodeType {
  return x === "seed" || x === "concept" || x === "detail";
}

function normalizeAIResponse(raw: unknown): ThoughtForgeAIResponse {
  const obj = raw as Record<string, unknown>;

  const nodesIn = Array.isArray(obj.nodes) ? obj.nodes : [];
  const edgesIn = Array.isArray(obj.edges) ? obj.edges : [];

  /* ---------- Normalize nodes ---------- */
  const nodes: ThoughtForgeNode[] = (nodesIn as unknown[])
    .map((n: unknown): ThoughtForgeNode => {
      const o = n as Record<string, unknown>;
      return {
        id: safeString(o.id).trim(),
        label: safeString(o.label).trim(),
        type: isNodeType(o.type) ? o.type : "detail",
      };
    })
    .filter(
      (n: ThoughtForgeNode) =>
        Boolean(n.id) && Boolean(n.label) && isNodeType(n.type)
    );

  /* ---------- Deduplicate nodes ---------- */
  const used = new Set<string>();
  const dedupedNodes: ThoughtForgeNode[] = [];
  for (const n of nodes) {
    if (!used.has(n.id)) {
      used.add(n.id);
      dedupedNodes.push(n);
    }
  }

  /* ---------- Normalize edges ---------- */
  const edges: ThoughtForgeEdge[] = (edgesIn as unknown[])
    .map((e: unknown): ThoughtForgeEdge => {
      const o = e as Record<string, unknown>;
      return {
        from: safeString(o.from).trim(),
        to: safeString(o.to).trim(),
        label: typeof o.label === "string" ? o.label : undefined,
      };
    })
    .filter(
      (e: ThoughtForgeEdge) =>
        Boolean(e.from) && Boolean(e.to) && used.has(e.from) && used.has(e.to)
    );

  /* ---------- Ensure seed exists ---------- */
  if (!dedupedNodes.some((n) => n.type === "seed")) {
    dedupedNodes.unshift({
      id: "seed",
      label: "Seed",
      type: "seed",
    });
  }

  return { nodes: dedupedNodes, edges };
}

export async function generateThoughtForgeExpansion(params: {
  seed: string;
  mode: "seedToConcepts" | "conceptToDetails";
  focusNodeLabel?: string;
}): Promise<ThoughtForgeAIResponse> {
  const system = `
Return ONLY valid JSON:
{
  "nodes": [{ "id": "string", "label": "string", "type": "seed|concept|detail" }],
  "edges": [{ "from": "string", "to": "string", "label": "string" }]
}
Rules:
- JSON only
- Include a seed node
- Unique ids
- Concepts: 8–12
- Details: 6–10
`.trim();

  const user =
    params.mode === "seedToConcepts"
      ? `Seed: "${params.seed}". Generate concept nodes.`
      : `Seed: "${params.seed}". Expand "${params.focusNodeLabel ?? "this concept"}".`;

  const res = await fetch("/api/public/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}): ${t.slice(0, 200)}`);
  }

  const text = await res.text();
  const parsed = extractJSON(text);
  return normalizeAIResponse(parsed);
}

/* ======================================================
   Utilities
   ====================================================== */

export function aiResponseToGraph(ai: ThoughtForgeAIResponse): TFGraph {
  return {
    nodes: ai.nodes,
    links: ai.edges.map((e) => ({
      source: e.from,
      target: e.to,
      label: e.label,
    })),
  };
}

export function mergeGraphWithAI(
  graph: TFGraph,
  ai: ThoughtForgeAIResponse
): TFGraph {
  const nodeMap = new Map<string, ThoughtForgeNode>();
  for (const n of graph.nodes) nodeMap.set(n.id, n);
  for (const n of ai.nodes) {
    if (!nodeMap.has(n.id)) nodeMap.set(n.id, n);
  }

  const linkKey = (l: ThoughtForgeLink) =>
    `${l.source}::${l.target}::${l.label ?? ""}`;

  const linkSet = new Set<string>(graph.links.map(linkKey));
  const mergedLinks: ThoughtForgeLink[] = [...graph.links];

  for (const e of ai.edges) {
    const l: ThoughtForgeLink = {
      source: e.from,
      target: e.to,
      label: e.label,
    };
    const k = linkKey(l);
    if (!linkSet.has(k)) {
      linkSet.add(k);
      mergedLinks.push(l);
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    links: mergedLinks,
  };
}