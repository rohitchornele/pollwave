import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, Globe, Users, Zap, BarChart2, ArrowRight } from "lucide-react";

import authService from "../../services/authService";
import pollService from "../../services/pollService";
import voteService from "../../services/voteService";
import { getAnonymousId } from "../../utils/anonymousId";

/* ─────────────────────────────────────────────
   POLL VOTE  —  Public-facing voting page
   Matches the dark zinc/orange design system
   from the creator dashboard
───────────────────────────────────────────── */

const PollVote = () => {
  const { pollId } = useParams();

  const [currentUser, setCurrentUser] = useState(null);

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  /* ── Fetch poll on mount ── */
  useEffect(() => {

    const initializePoll = async () => {

      try {

        setLoading(true);

        const pollResponse =
          await pollService.getPollById(
            pollId
          );

        const pollData =
          pollResponse?.data ||
          pollResponse;

        setPoll(pollData);

        if (pollData.status === "upcoming") {

          setError(
            "Voting not started."
          );

          return;
        }

        const user = authService.getUser();

        setCurrentUser(user);

        if (
          !pollData.allowAnonymousVotes &&
          !user
        ) {
          setError(
            "Login required to vote on this poll."
          );

          return;
        }

        // Check if already voted
        const anonymousId =
          getAnonymousId();

        const voteCheck =
          await voteService.checkUserVote(
            pollId,
            anonymousId
          );

        // If poll is closed → show results
        if (pollData.status === "closed") {

          setSubmitted(true);

          if (
            voteCheck?.vote
              ?.selectedOptions
          ) {
            setSelected(
              voteCheck.vote.selectedOptions[0]
            );
          }

          const resultsResponse =
            await voteService.getPollResults(
              pollId
            );

          setResults(
            resultsResponse?.results || []
          );

          return;
        }

        // User already voted
        if (voteCheck?.hasVoted) {

          setSubmitted(true);

          if (
            voteCheck?.vote
              ?.selectedOptions
          ) {
            setSelected(
              voteCheck.vote.selectedOptions[0]
            );
          }

          const resultsResponse =
            await voteService.getPollResults(
              pollId
            );

          setResults(
            resultsResponse?.results || []
          );
        }
        // Fetch live results
        const resultsResponse =
          await voteService.getPollResults(
            pollId
          );

        setResults(
          resultsResponse?.results || []
        );
      }

      catch (err) {

        console.error(
          "Failed to load poll:",
          err
        );

        setError(
          err?.response?.data?.message ||
          "We couldn't load this poll. The link may be invalid or the poll has ended."
        );

      } finally {

        setLoading(false);
      }
    };

    initializePoll();

  }, [pollId]);

  /* ── Submit vote ── */
  const handleSubmit = async () => {

    if (!selected || submitting) {
      return;
    }

    try {

      setSubmitting(true);

      const anonymousId =
        getAnonymousId();

      // Submit vote
      await voteService.castVote(
        pollId,
        [selected],
        anonymousId
      );

      // Fetch real results
      const resultsResponse =
        await voteService.getPollResults(
          pollId
        );

      setResults(
        resultsResponse?.results || []
      );

      // Update local poll votes
      setPoll((prev) => ({
        ...prev,
        totalVotes:
          (prev?.totalVotes || 0) + 1,
      }));

      setSubmitted(true);

    } catch (err) {

      console.error(
        "Vote failed:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Something went wrong while submitting your vote."
      );

    } finally {

      setSubmitting(false);
    }
  };

  /* ─── STATES ─────────────────────────────── */
  if (loading) return <PageShell><LoadingState /></PageShell>;
  if (error) return <PageShell><ErrorState message={error} /></PageShell>;
  if (!poll) return <PageShell><ErrorState message="Poll not found." /></PageShell>;

  return (
    <PageShell>
      {submitted ? (
        <ResultsView poll={poll} results={results} selected={selected} />
      ) : (
        <VotingView
          poll={poll}
          selected={selected}
          onSelect={setSelected}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </PageShell>
  );
};

/* ─────────────────────────────────────────────
   PAGE SHELL  —  full-screen dark backdrop,
   centred card, matches dashboard zinc-950 bg
───────────────────────────────────────────── */
const PageShell = ({ children }) => (
  <div
    style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0c0a09",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}
  >
    {/* Subtle radial glow */}
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(234,88,12,0.07) 0%, transparent 70%)",
      }}
    />
    <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 520 }}>
      {children}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   VOTING VIEW
───────────────────────────────────────────── */
const VotingView = ({ poll, selected, onSelect, onSubmit, submitting }) => (
  <div>
    {/* Branding strip */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
      <span
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.18)",
          color: "#ea580c", fontSize: 10, fontWeight: 900, letterSpacing: "0.12em",
          textTransform: "uppercase", padding: "5px 12px", borderRadius: 99,
        }}
      >
        <Zap size={10} /> Powered by PollWave
      </span>
    </div>

    {/* Card */}
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "28px 28px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h1
          style={{
            color: "#f0ece4",
            fontSize: "clamp(1.25rem, 5vw, 1.75rem)",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            marginBottom: 10,
          }}
        >
          {poll.title}
        </h1>
        {poll.description && (
          <p style={{ color: "#78716c", fontSize: 13.5, lineHeight: 1.6 }}>
            {poll.description}
          </p>
        )}

        {/* Meta row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
          <MetaBadge icon={Globe} label={poll.status} />
          <MetaBadge icon={Users} label={`${poll.totalVotes || 0} votes`} />
          {poll.allowMultipleVotes
            ? <MetaBadge icon={CheckCircle} label="Multiple choice" />
            : <MetaBadge icon={CheckCircle} label="Single choice" />
          }
        </div>
      </div>

      {/* Options */}
      <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ color: "#57534e", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
          Choose your answer
        </p>
        {poll.options.map((opt, i) => {
          const isSelected = selected === opt._id;
          return (
            <button
              key={opt._id}
              onClick={() => onSelect(opt._id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderRadius: 14,
                border: isSelected
                  ? "1.5px solid rgba(234,88,12,0.6)"
                  : "1px solid rgba(255,255,255,0.06)",
                background: isSelected
                  ? "rgba(234,88,12,0.08)"
                  : "rgba(255,255,255,0.02)",
                cursor: "pointer",
                transition: "all 0.18s ease",
                textAlign: "left",
                opacity: submitting ? 0.7 : 1,
                pointerEvents:
                  submitting ? "none" : "auto",
              }}
            >
              {/* Option number / check indicator */}
              <div
                style={{
                  flexShrink: 0,
                  width: 28, height: 28,
                  borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isSelected ? "#ea580c" : "#1c1917",
                  border: isSelected ? "none" : "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.18s ease",
                  fontSize: 10, fontWeight: 900, color: "#fff",
                }}
              >
                {isSelected ? <CheckCircle size={14} /> : i + 1}
              </div>

              {/* Label */}
              <span
                style={{
                  flex: 1,
                  color: isSelected ? "#f0ece4" : "#a8a29e",
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: 14,
                  transition: "color 0.18s ease",
                }}
              >
                {opt.text}
              </span>

              {/* Selection ring on right */}
              <div
                style={{
                  flexShrink: 0,
                  width: 16, height: 16,
                  borderRadius: "50%",
                  border: isSelected ? "4.5px solid #ea580c" : "1.5px solid #44403c",
                  background: "transparent",
                  transition: "all 0.18s ease",
                }}
              />
            </button>
          );
        })}

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={!selected || submitting}
          style={{
            marginTop: 8,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 20px",
            borderRadius: 14,
            border: "none",
            background: selected ? "#ea580c" : "#1c1917",
            color: selected ? "#fff" : "#57534e",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.03em",
            cursor: selected ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          {submitting ? "Submitting…" : (
            <>
              Submit Vote <ArrowRight size={15} />
            </>
          )}
        </button>

        <p style={{ textAlign: "center", color: "#3d3833", fontSize: 11, marginTop: 4 }}>
          Your vote is anonymous and cannot be changed.
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   RESULTS VIEW  —  shown after voting
───────────────────────────────────────────── */
const ResultsView = ({ poll, results, selected }) => (
  <div>
    {/* Success badge */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28, gap: 12 }}>
      <div
        style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <CheckCircle size={24} style={{ color: "#22c55e" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#f0ece4", fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Vote Submitted!</p>
        <p style={{ color: "#57534e", fontSize: 12.5 }}>Here's how the poll stands right now.</p>
      </div>
    </div>

    {/* Card */}
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      {/* Poll title */}
      <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <BarChart2 size={13} style={{ color: "#ea580c" }} />
          <span style={{ color: "#ea580c", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Live Results
          </span>
        </div>
        <h2 style={{ color: "#f0ece4", fontSize: "clamp(1.1rem, 4vw, 1.4rem)", fontWeight: 800, lineHeight: 1.3 }}>
          {poll.title}
        </h2>
      </div>

      {/* Result bars */}
      <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
        {results?.map((opt) => {
          const isYours = opt.optionId === selected;
          const isLeading = opt.leading;

          return (
            <div key={opt.optionId}>
              {/* Label row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span
                    style={{
                      color: isYours ? "#ea580c" : "#a8a29e",
                      fontWeight: isYours ? 700 : 500,
                      fontSize: 13.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt.text}
                  </span>
                  {isYours && (
                    <span
                      style={{
                        flexShrink: 0, fontSize: 9, fontWeight: 900,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        color: "#ea580c", background: "rgba(234,88,12,0.1)",
                        border: "1px solid rgba(234,88,12,0.2)",
                        padding: "2px 6px", borderRadius: 4,
                      }}
                    >
                      Your vote
                    </span>
                  )}
                  {isLeading && !isYours && (
                    <span
                      style={{
                        flexShrink: 0, fontSize: 9, fontWeight: 900,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        color: "#22c55e", background: "rgba(34,197,94,0.07)",
                        border: "1px solid rgba(34,197,94,0.15)",
                        padding: "2px 6px", borderRadius: 4,
                      }}
                    >
                      Leading
                    </span>
                  )}
                </div>
                <span
                  style={{
                    color: "#78716c",
                    fontSize: 11,
                  }}
                >
                  {opt.votesCount} votes
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    color: isYours ? "#ea580c" : "#f0ece4",
                    fontWeight: 900,
                    fontSize: 15,
                  }}
                >

                  {opt.percentage}%
                </span>
              </div>

              {/* Bar track */}
              <div
                style={{
                  height: 6, borderRadius: 99, background: "rgba(255,255,255,0.04)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${opt.percentage}%`,
                    borderRadius: 99,
                    background: isYours
                      ? "linear-gradient(90deg, #ea580c, #fb923c)"
                      : isLeading
                        ? "#44403c"
                        : "#292524",
                    transition: "width 0.7s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Total votes footer */}
        <div
          style={{
            marginTop: 12,
            padding: "12px 16px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span style={{ color: "#57534e", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Total Responses
          </span>
          <span style={{ color: "#f0ece4", fontWeight: 900, fontSize: 14 }}>
            {poll.totalVotes || 0}
          </span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <p style={{ textAlign: "center", color: "#3d3833", fontSize: 11, marginTop: 20 }}>
      Created with <span style={{ color: "#ea580c" }}>PollWave</span>
    </p>
  </div>
);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const MetaBadge = ({ icon: Icon, label }) => (
  <span
    style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      color: "#57534e", fontSize: 10, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.08em",
    }}
  >
    <Icon size={11} />
    {label}
  </span>
);

const LoadingState = () => (
  <div style={{ textAlign: "center", padding: "60px 24px" }}>
    <div
      style={{
        width: 36, height: 36, borderRadius: "50%",
        border: "3px solid rgba(234,88,12,0.15)",
        borderTop: "3px solid #ea580c",
        margin: "0 auto 16px",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    <p style={{ color: "#57534e", fontSize: 13 }}>Loading poll…</p>
  </div>
);

const ErrorState = ({ message }) => (
  <div
    style={{
      textAlign: "center",
      padding: "48px 28px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 24,
    }}
  >
    <div
      style={{
        width: 48, height: 48, borderRadius: "50%",
        background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px",
        color: "#ef4444", fontSize: 22, fontWeight: 900,
      }}
    >
      !
    </div>
    <p style={{ color: "#f0ece4", fontWeight: 700, marginBottom: 8, fontSize: 15 }}>Something went wrong</p>
    <p style={{ color: "#57534e", fontSize: 13, lineHeight: 1.6 }}>{message}</p>
  </div>
);

export default PollVote;