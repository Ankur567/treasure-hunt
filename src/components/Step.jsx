import React, { useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { normalize } from "../utils/normalise.js";

export default function Step({
  index,
  data,
  onSolve,
  onHint,
  hintsLeft,
  usedHint,
}) {
  const [value, setValue] = useState("");
  const [giftGuess, setGiftGuess] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | wrong | correct
  const [tries, setTries] = useState(0);
  const [locationSolved, setLocationSolved] = useState(false);
  const [giftSolved, setGiftSolved] = useState(false);

  const canReveal = useMemo(() => tries >= 3, [tries]);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    const ok = data.check
      ? data.check(value, { index })
      : data.accepts.some((a) => normalize(value).includes(normalize(a)));
    if (ok) {
      setLocationSolved(true);
      setStatus("idle");
    } else {
      setStatus("wrong");
      setTries((t) => t + 1);
    }
  };

  const handleGiftSubmit = (e) => {
    e.preventDefault();
    const ok = data.gift.some((g) =>
      normalize(giftGuess).includes(normalize(g))
    );
    if (ok) {
      setGiftSolved(true);
      setStatus("idle");
      toast.success(`🎉 Congratulations! You completed Step ${index + 1}!`); // Trigger toast
    } else {
      setStatus("wrong");
    }
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (normalize(passcodeInput) === normalize(data.passcode)) {
      setStatus("correct");
      toast.success(`🎉 Congratulations! You unlocked the passcode!`); // Trigger toast
      setTimeout(() => onSolve(), 350);
    } else {
      setStatus("wrong");
    }
  };

  return (
    <section className="glass p-6 mt-4">
      <ToastContainer /> {/* Add ToastContainer */}
      <div className="flex items-center gap-2">
        <span className="text-xl">Step {index + 1}</span>
        <span className="px-2 py-1 text-xs rounded-full border border-white/10 bg-white/5">
          Hokage Briefing
        </span>
      </div>
      <h3 className="text-2xl font-bold mt-1">{data.title}</h3>
      <div className="mt-3">
        <p className="text-ink/90 leading-relaxed whitespace-pre-line">
          {data.clue}
        </p>
      </div>
      {!locationSolved ? (
        <form onSubmit={handleLocationSubmit} className="mt-4 space-y-3">
          <label className="block text-sm text-mute">
            Type the location you think this clue points to (e.g., “mirror”,
            “bookshelf”).
          </label>
          <input
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-brand-2"
            placeholder="Your answer…"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-1 hover:brightness-110 font-semibold"
            >
              Check answer
            </button>
            <button
              type="button"
              onClick={onHint}
              className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10"
            >
              {usedHint ? "View hint again" : `Use hint (${hintsLeft} left)`}
            </button>
            {canReveal && (
              <button
                type="button"
                onClick={() => {
                  setValue(data.accepts[0] || "");
                  setStatus("idle");
                }}
                className="px-4 py-2 rounded-xl text-xs border border-red-500/40 text-red-300 bg-red-500/10 hover:bg-red-500/20"
              >
                I’m stuck — auto‑fill
              </button>
            )}
          </div>
        </form>
      ) : !giftSolved ? (
        <form onSubmit={handleGiftSubmit} className="mt-4 space-y-3">
          <label className="block text-sm text-mute">
            You found the location! Now, guess what the gift is.
          </label>
          <input
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-brand-2"
            placeholder="Your gift guess…"
            value={giftGuess}
            onChange={(e) => {
              setGiftGuess(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-1 hover:brightness-110 font-semibold"
            >
              Check gift
            </button>
          </div>
        </form>
      ) : index === 0 && data.passcode ? (
        <form onSubmit={handlePasscodeSubmit} className="mt-4 space-y-3">
          <label className="block text-sm text-mute">
            Passcode unlocked! Enter the passcode to proceed to the next step.
          </label>
          <input
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-brand-2"
            placeholder="Enter passcode…"
            value={passcodeInput}
            onChange={(e) => {
              setPasscodeInput(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-brand-1 hover:brightness-110 font-semibold"
          >
            Submit Passcode
          </button>
        </form>
      ) : (
        <div className="mt-3 text-sm text-green-300">
          Correct! On to the next mission…
        </div>
      )}
      {status === "wrong" && (
        <div className="mt-3 text-sm text-red-300">Not quite. Try again!</div>
      )}
    </section>
  );
}
