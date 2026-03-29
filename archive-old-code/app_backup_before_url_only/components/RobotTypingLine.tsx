"use client";

import { useEffect, useState } from "react";

const LINES = [
  "Welcome to Shynvo. Your structured intelligence platform.",
  "Explore University Hub, Shynvo Academy, and Frontier Lab.",
  "Build systems. Learn knowledge. Train skills.",
  "Discover Shynvo OS, Experiments, and Enterprise Suite.",
  "Challenge yourself in Arcade Sim.",
  "I'm here whenever you're ready. Click to enter the Shynvo Robot world.",
];

export default function RobotTypingLine() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = LINES[lineIndex];
    const typingSpeed = isDeleting ? 18 : 34;
    const pauseAfterTyping = 1500;
    const pauseAfterDeleting = 250;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < fullText.length) {
          setDisplayed(fullText.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseAfterTyping);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(fullText.slice(0, displayed.length - 1));
        } else {
          setIsDeleting(false);
          setTimeout(() => {
            setLineIndex((prev) => (prev + 1) % LINES.length);
          }, pauseAfterDeleting);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, lineIndex]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/85 min-h-[92px]">
      {displayed}
      <span className="ml-1 inline-block h-4 w-[2px] animate-pulse rounded bg-emerald-400 align-middle" />
    </div>
  );
}
