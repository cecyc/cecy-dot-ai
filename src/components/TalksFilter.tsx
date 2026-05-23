import { useState } from "react";

interface Talk {
  title: string;
  conference: string;
  date: string;
  youtubeId?: string;
  description: string;
}

interface Props {
  talks: Talk[];
}

export default function TalksFilter({ talks }: Props) {
  const [selectedConference, setSelectedConference] = useState<string | null>(null);

  const allConferences = [...new Set(talks.map((t) => t.conference))].sort();

  const filtered = talks.filter(
    (talk) => !selectedConference || talk.conference === selectedConference
  );

  return (
    <div>
      {/* Conference filter buttons */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "24px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: "#6b5a85",
            marginRight: "4px",
          }}
        >
          filter:
        </span>
        <button
          onClick={() => setSelectedConference(null)}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            padding: "2px 10px",
            background: !selectedConference ? "#ff3fa4" : "transparent",
            color: !selectedConference ? "#fff" : "#9980c0",
            border: `1px solid ${!selectedConference ? "#ff3fa4" : "#3d1060"}`,
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          all
        </button>
        {allConferences.map((conf) => (
          <button
            key={conf}
            onClick={() =>
              setSelectedConference(selectedConference === conf ? null : conf)
            }
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              padding: "2px 10px",
              background: selectedConference === conf ? "#bf5fff" : "transparent",
              color: selectedConference === conf ? "#fff" : "#9980c0",
              border: `1px solid ${selectedConference === conf ? "#bf5fff" : "#3d1060"}`,
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "all 0.1s",
            }}
          >
            {conf}
          </button>
        ))}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: "#6b5a85",
            marginLeft: "auto",
          }}
        >
          {filtered.length} talk{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Talk cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              fontFamily: "'VT323', monospace",
              fontSize: "20px",
              color: "#3d2860",
            }}
          >
            no talks found
          </div>
        ) : (
          filtered.map((talk) => (
            <div
              key={talk.title}
              style={{
                border: "1px solid #2a1060",
                boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                background: "rgba(14, 3, 36, 0.85)",
                padding: "0",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "3px",
                  background: "linear-gradient(90deg, #3d0070, #bf5fff)",
                }}
              />
              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: "22px",
                    color: "#e8d8ff",
                    marginBottom: "4px",
                    lineHeight: 1.2,
                  }}
                >
                  {talk.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "#bf5fff",
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {talk.conference} · {talk.date}
                </div>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "#9980c0",
                    lineHeight: 1.7,
                    marginBottom: "14px",
                  }}
                >
                  {talk.description}
                </p>
                {talk.youtubeId && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${talk.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "11px",
                        color: "#ff3fa4",
                        textDecoration: "none",
                      }}
                    >
                      [watch on youtube]
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
