import { useEffect, useState } from "react";

const phrases = [
  "Simplify the Legal Docs",
  "Understand the Legal Jargons",
  "Write a Bail Application",
  "Know your Rights",
  "Decode Contracts Easily",
];

export default function TypewriterPlaceholder({
  speed = 100,
  pause = 2000,
  onUpdate,
}) {
  const [placeholder, setPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timer;

    if (!isDeleting) {
      if (charIndex < current.length) {
        timer = setTimeout(() => {
          const newText = current.slice(0, charIndex + 1);
          setPlaceholder(newText);
          onUpdate?.(newText);
          setCharIndex((prev) => prev + 1);
        }, speed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          const newText = current.slice(0, charIndex - 1);
          setPlaceholder(newText);
          onUpdate?.(newText);
          setCharIndex((prev) => prev - 1);
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting]);

  return null;
}
