import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PollRow from "./PollRow";

const RecentPolls = ({ polls, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="panel">

      <div className="panel-header">
        <div>
          <p>Recent Polls</p>
          <p>Your latest 5 polls</p>
        </div>

        <button
          onClick={() => navigate("/dashboard/polls")}
        >
          View all <ChevronRight size={12} />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 80px 80px 90px 28px",
          gap: 16,
          padding: "9px 20px",
        }}
      >
        {["Poll", "Status", "Votes", "Deadline", ""].map(
          (h, i) => (
            <span key={i}>{h}</span>
          )
        )}
      </div>

      {loading ? (
        <div style={{ padding: 20 }}>
          Loading polls...
        </div>
      ) : polls.length === 0 ? (
        <div style={{ padding: 20 }}>
          No polls found
        </div>
      ) : (
        polls.map((poll, index) => (
          <PollRow
            key={poll._id}
            poll={{
              id: poll._id,
              title: poll.title,
              status: poll.status || "draft",
              votes: poll.totalVotes || 0,
              expiresAt: poll.expiresAt,
              visibility:
                poll.visibility || "public",
            }}
            index={index}
          />
        ))
      )}
    </div>
  );
};

export default RecentPolls;