import React, { useEffect, useMemo, useState, } from "react";

import { useNavigate } from "react-router-dom";

import { Plus, BarChart2, Users, Eye, Activity, } from "lucide-react";

import DashboardGreeting from "../../components/dashboard/DashboardGreeting";
import DashboardStats from "../../components/dashboard/DashboardStats";
import RecentPolls from "../../components/dashboard/RecentPolls";
import QuickAction from "../../components/dashboard/QuickAction";
import { useAuth } from "../../context/AuthContext";
import "../../components/dashboard/dashboard.css";

import pollService from "../../services/pollService";

const DashboardHome = () => {

  const navigate = useNavigate();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  console.log("user in dashbhome= ", user)


  const [polls, setPolls] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  console.log("user data = ", user)
  const firstName = user?.name?.split(" ")[0];

  console.log("firstname = ", firstName)


  const fetchPolls = async () => {

    try {
      setLoading(true);
      setError("");
      const response = await pollService.getAllPolls();

      console.log("poll response = ", response);

      const pollsData =
        response?.data ||
        response ||
        [];

      setPolls(
        Array.isArray(pollsData)
          ? pollsData
          : []
      );

    } catch (error) {

      console.error(
        "Failed to fetch polls",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to load polls"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPolls();

  }, []);

  /*
    ───────────────────────────────
    STATS
    ───────────────────────────────
  */

  const stats = useMemo(() => {

    const totalPolls = polls.length;

    const activePolls =
      polls.filter(
        (poll) =>
          poll.status === "active"
      ).length;

    const totalVotes =
      polls.reduce((acc, poll) => {

        return (
          acc +
          (
            poll.totalVotes ||
            poll.votes ||
            0
          )
        );

      }, 0);

    const avgResponse =
      totalPolls > 0
        ? Math.round(
          totalVotes / totalPolls
        )
        : 0;

    return [

      {
        id: "polls",
        label: "Total Polls",
        value: totalPolls,
      },

      {
        id: "votes",
        label: "Total Votes",
        value:
          totalVotes.toLocaleString(),
      },

      {
        id: "active",
        label: "Active Polls",
        value: activePolls,
      },

      {
        id: "rate",
        label: "Avg. Response",
        value: `${avgResponse}%`,
      },

    ];

  }, [polls]);

  /*
    ───────────────────────────────
    LOADING STATE
    ───────────────────────────────
  */

  if (authLoading) {

    return (
      <div
        className="overview-page"
        style={{
          color: "#fff",
          padding: 40,
        }}
      >
        Loading user...
      </div>
    );
  }

  /*
    ───────────────────────────────
    MAIN UI
    ───────────────────────────────
  */

  return (

    <div className="overview-page w-full">

      {/* Greeting */}

      <DashboardGreeting
        firstName={firstName}
        onCreate={() =>
          navigate(
            "/dashboard/polls/create"
          )
        }
      />

      {/* Stats */}

      <DashboardStats
        stats={stats}
      />

      {/* Main Grid */}

      <div className="content-grid">

        {/* LEFT SIDE */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >

          {/* Recent Polls */}

          <RecentPolls
            polls={polls.slice(0, 5)}
            loading={loading}
          />

          {/* Error */}

          {error && (

            <div
              style={{
                padding: 16,
                borderRadius: 12,
                background:
                  "rgba(239,68,68,0.1)",
                border:
                  "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444",
                fontSize: 14,
              }}
            >
              {error}
            </div>

          )}

          {/* Empty State */}

          {!loading &&
            polls.length === 0 &&
            !error && (

              <div
                className="panel"
                style={{
                  padding: 40,
                  textAlign: "center",
                }}
              >

                <Activity
                  size={42}
                  style={{
                    color: "#57534e",
                    marginBottom: 12,
                  }}
                />

                <h3
                  style={{
                    color: "#f0ece4",
                    marginBottom: 8,
                  }}
                >
                  No polls yet
                </h3>

                <p
                  style={{
                    color: "#57534e",
                    marginBottom: 20,
                  }}
                >
                  Create your first poll
                  to get started.
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/dashboard/polls/create"
                    )
                  }
                  style={{
                    background: "#ea580c",
                    color: "#fff",
                    border: "none",
                    padding:
                      "10px 18px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Create Poll
                </button>

              </div>

            )}

        </div>

        {/* RIGHT SIDE */}

        <div>

          {/* Quick Actions */}

          <div
            className="section-title"
          >
            Quick Actions
          </div>

          <div
            style={{
              display: "grid",
              gap: 10,
            }}
          >

            <QuickAction
              icon={Plus}
              label="Create Poll"
              desc="Build a new poll"
              color="#f97316"
              onClick={() =>
                navigate(
                  "/dashboard/polls/create"
                )
              }
            />

            <QuickAction
              icon={BarChart2}
              label="View Analytics"
              desc="Charts & response data"
              color="#a78bfa"
              onClick={() =>
                navigate(
                  "/dashboard/analytics"
                )
              }
            />

            <QuickAction
              icon={Users}
              label="Manage Team"
              desc="Invite & manage members"
              color="#22c55e"
              onClick={() =>
                navigate(
                  "/dashboard/team"
                )
              }
            />

            <QuickAction
              icon={Eye}
              label="Browse Results"
              desc="See all poll outcomes"
              color="#f59e0b"
              onClick={() =>
                navigate(
                  "/dashboard/polls"
                )
              }
            />

          </div>

          {/* USER CARD */}

          <div
            className="panel"
            style={{
              marginTop: 20,
              padding: 20,
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >

              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#ea580c,#fb923c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {user?.name?.charAt(0)}
              </div>

              <div>

                <h3
                  style={{
                    color: "#f0ece4",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {user?.name}
                </h3>

                <p
                  style={{
                    color: "#78716c",
                    fontSize: 13,
                    marginTop: 2,
                  }}
                >
                  {user?.email}
                </p>

                <p
                  style={{
                    color: "#57534e",
                    fontSize: 12,
                    marginTop: 6,
                    textTransform:
                      "capitalize",
                  }}
                >
                  Role: {user?.role}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardHome;