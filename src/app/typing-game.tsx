"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const words = [
  "typescript",
  "react",
  "component",
  "state",
  "effect",
  "props",
  "hook",
  "render",
  "virtual",
  "dom",
];

export default function TypingGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [shake, setShake] = useState(false);

  const currentWord = words[currentWordIndex];

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!startTime) {
        setStartTime(Date.now());
      }

      const char = event.key;
      if (char.length === 1) {
        if (char === currentWord[typedWord.length]) {
          setTypedWord((prev) => prev + char);
          if (typedWord.length + 1 === currentWord.length) {
            if (currentWordIndex === words.length - 1) {
              setEndTime(Date.now());
            } else {
              setCurrentWordIndex((prev) => prev + 1);
              setTypedWord("");
            }
          }
        } else {
          setShake(true);
          setTimeout(() => setShake(false), 300);
        }
      }
    },
    [currentWord, currentWordIndex, typedWord, startTime]
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  const renderWord = () => {
    return currentWord.split("").map((char, index) => (
      <span
        key={index}
        className={index < typedWord.length ? "text-green-500" : ""}
      >
        {char}
      </span>
    ));
  };

  const calculateResults = () => {
    if (startTime && endTime) {
      const totalTime = (endTime - startTime) / 1000; // in seconds
      const wordsPerMinute = Math.round((words.length / totalTime) * 60);
      return `You typed ${words.length} words in ${totalTime.toFixed(
        2
      )} seconds. Your typing speed is ${wordsPerMinute} WPM.`;
    }
    return "";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold mb-8"
      >
        {endTime ? "Game Over!" : renderWord()}
      </motion.div>
      {endTime && (
        <div className="text-xl text-center">{calculateResults()}</div>
      )}
      <div className="mt-8 text-gray-600">
        Type the word above. No need to press Enter.
      </div>
    </div>
  );
}
