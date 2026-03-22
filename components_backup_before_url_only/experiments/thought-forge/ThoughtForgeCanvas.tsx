"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { TFGraph } from "@/lib/experiments/thoughtForge";

export type ThoughtForgeCanvasProps = {
  graph: TFGraph;
  onNodeClick: (id: string) => void;
  accent?: string;
};

type SimNode = {
  id: string;
  label: string;
  type: "seed" | "concept" | "detail";
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type SimLink = {
  source: string;
  target: string;
  label?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ThoughtForgeCanvas(props: ThoughtForgeCanvasProps) {
  const { graph, onNodeClick, accent = "#A3E635" } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState({ w: 800, h: 520 });

  // Build sim nodes with stable positions (persist per id in a ref map)
  const nodeStateRef = useRef<Map<string, SimNode>>(new Map());

  const sim = useMemo(() => {
    const map = nodeStateRef.current;

    // center
    const cx = size.w / 2;
    const cy = size.h / 2;

    const nextNodes: SimNode[] = graph.nodes.map((n, i) => {
      const existing = map.get(n.id);
      if (existing) {
        // update label/type but keep physics state
        existing.label = n.label;
        existing.type = n.type;
        existing.r = n.type === "seed" ? 18 : n.type === "concept" ? 13 : 10;
        return existing;
      }

      // new node spawn near center with jitter
      const angle = (Math.PI * 2 * (i + 1)) / (graph.nodes.length + 1);
      const radius = 70 + 120 * (i % 5);
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      const created: SimNode = {
        id: n.id,
        label: n.label,
        type: n.type,
        x,
        y,
        vx: 0,
        vy: 0,
        r: n.type === "seed" ? 18 : n.type === "concept" ? 13 : 10,
      };
      map.set(n.id, created);
      return created;
    });

    // Remove stale nodes from map
    const keep = new Set(graph.nodes.map((n) => n.id));
    for (const k of map.keys()) {
      if (!keep.has(k)) map.delete(k);
    }

    const nextLinks: SimLink[] = graph.links.map((l) => ({
      source: l.source,
      target: l.target,
      label: l.label,
    }));

    return { nodes: nextNodes, links: nextLinks };
  }, [graph.nodes, graph.links, size.w, size.h]);

  // Resize to container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: Math.max(320, Math.floor(rect.width)), h: Math.max(320, Math.floor(rect.height)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Physics + draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size.w * devicePixelRatio;
    canvas.height = size.h * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    let raf = 0;

    const tick = () => {
      // ---- physics ----
      const { nodes, links } = sim;

      // gentle centering force
      const cx = size.w / 2;
      const cy = size.h / 2;

      for (const n of nodes) {
        const dx = cx - n.x;
        const dy = cy - n.y;
        n.vx += dx * 0.0008;
        n.vy += dy * 0.0008;
      }

      // repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy + 0.01;
          const f = 900 / d2; // repulsion strength
          const fx = f * dx;
          const fy = f * dy;
          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }

      // springs along links
      for (const l of links) {
        const a = nodes.find((n) => n.id === l.source);
        const b = nodes.find((n) => n.id === l.target);
        if (!a || !b) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const desired = 130;
        const k = 0.01;

        const diff = dist - desired;
        const nx = dx / dist;
        const ny = dy / dist;

        const fx = k * diff * nx;
        const fy = k * diff * ny;

        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      // integrate + damping + bounds
      for (const n of nodes) {
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x += n.vx;
        n.y += n.vy;

        n.x = clamp(n.x, 24, size.w - 24);
        n.y = clamp(n.y, 24, size.h - 24);
      }

      // ---- draw ----
      ctx.clearRect(0, 0, size.w, size.h);

      // background haze
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.fillRect(0, 0, size.w, size.h);

      // links
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      for (const l of links) {
        const a = nodes.find((n) => n.id === l.source);
        const b = nodes.find((n) => n.id === l.target);
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        if (n.type === "seed") ctx.fillStyle = "rgba(255,255,255,0.95)";
        else if (n.type === "concept") ctx.fillStyle = "rgba(163,230,53,0.85)";
        else ctx.fillStyle = "rgba(34,211,238,0.70)";

        // outer glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 8, 0, Math.PI * 2);
        ctx.fillStyle = n.type === "seed" ? "rgba(255,255,255,0.06)" : "rgba(163,230,53,0.05)";
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle =
          n.type === "seed"
            ? "rgba(255,255,255,0.92)"
            : n.type === "concept"
              ? "rgba(163,230,53,0.82)"
              : "rgba(34,211,238,0.72)";
        ctx.fill();

        // label
        ctx.font = "12px ui-sans-serif, system-ui, -apple-system, Segoe UI";
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fillText(n.label, n.x + n.r + 10, n.y + 4);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sim, size.w, size.h]);

  // Click hit-testing
  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // find nearest node within radius
    let hit: SimNode | null = null;
    let best = Infinity;

    for (const n of sim.nodes) {
      const dx = x - n.x;
      const dy = y - n.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d <= n.r + 8 && d < best) {
        best = d;
        hit = n;
      }
    }

    if (hit) onNodeClick(hit.id);
  }

  return (
    <div
      ref={containerRef}
      className="h-[520px] w-full rounded-3xl border border-white/15 bg-black/35 backdrop-blur-xl overflow-hidden"
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 60px 0 rgba(163,230,53,0.06)`,
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="text-xs tracking-widest text-white/70">FORGE CANVAS</div>
        <div className="text-[11px] text-white/55">
          click nodes to expand • accent <span style={{ color: accent }}>{accent}</span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="block w-full h-[calc(520px-44px)] cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
}
