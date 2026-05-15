import { useState } from "react";

interface Post {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  isNew?: boolean;
}

const POSTS: Post[] = [
  {
    title: "Understanding Distributed Consensus: Raft in Plain English",
    date: "Mar 15, 2024",
    slug: "raft-consensus",
    tags: ["distributed systems", "consensus", "go"],
    excerpt:
      "Raft and Paxos always felt like magic to me until I implemented Raft from scratch. Here's what actually clicked — explained with way fewer Greek letters than the original papers.",
    readTime: "12 min",
    isNew: true,
  },
  {
    title: "How I Set Up My Terminal to Feel Like a Spaceship",
    date: "Feb 28, 2024",
    slug: "terminal-setup",
    tags: ["tooling", "productivity", "terminal"],
    excerpt:
      "A complete walkthrough of my Neovim + kitty + starship + tmux setup. Includes my actual dotfiles and the opinions that got me kicked out of two Slack workspaces.",
    readTime: "8 min",
    isNew: true,
  },
  {
    title: "The Hidden Cost of Abstractions in Go",
    date: "Jan 20, 2024",
    slug: "go-abstractions",
    tags: ["go", "performance", "backend"],
    excerpt:
      "Go's explicit style discourages over-abstraction — but some patterns still carry surprising runtime cost. I benchmarked a bunch of common patterns so you don't have to.",
    readTime: "10 min",
  },
  {
    title: "Building Real-Time Collaboration from Scratch",
    date: "Dec 10, 2023",
    slug: "realtime-collab",
    tags: ["real-time", "websockets", "CRDTs"],
    excerpt:
      "We needed a collaborative editing feature in six weeks. Here's what we built, what we learned about CRDTs, and why we eventually just used Y.js.",
    readTime: "15 min",
  },
  {
    title: "Why I Switched From VS Code to Neovim (Sometimes)",
    date: "Nov 5, 2023",
    slug: "neovim-vscode",
    tags: ["tooling", "neovim", "editors"],
    excerpt:
      "Not the hot take you think it is. I use both. Here's a breakdown of when each one wins, and the surprisingly sane hybrid setup I landed on.",
    readTime: "6 min",
  },
  {
    title: "Everything I Wish I Knew About CSS Grid",
    date: "Oct 12, 2023",
    slug: "css-grid",
    tags: ["css", "frontend", "layout"],
    excerpt:
      "CSS Grid changed how I think about layout at a fundamental level. A deep-dive into implicit grids, subgrid, the auto-fill vs auto-fit distinction, and more.",
    readTime: "9 min",
  },
  {
    title: "Postgres LISTEN/NOTIFY: The Feature You're Not Using",
    date: "Sep 3, 2023",
    slug: "postgres-listen-notify",
    tags: ["postgres", "real-time", "backend"],
    excerpt:
      "You don't need Kafka for basic event streaming. Postgres has had pub/sub baked in for decades and it's surprisingly capable for lightweight use cases.",
    readTime: "7 min",
  },
  {
    title: "A Year of Building in Public: What I Learned",
    date: "Aug 20, 2023",
    slug: "building-in-public",
    tags: ["career", "reflection", "open source"],
    excerpt:
      "I spent a year shipping side projects publicly, writing about my process, and being more transparent than felt comfortable. Here's what happened.",
    readTime: "11 min",
  },
];

const ALL_TAGS = [...new Set(POSTS.flatMap((p) => p.tags))].sort();

// Simple RetroTag component for React
function RetroTag({ children, variant = "purple" }: { children: React.ReactNode; variant?: "purple" | "cyan" | "pink" }) {
  const styles = {
    purple: {
      background: "rgba(191, 95, 255, 0.15)",
      borderColor: "rgba(191, 95, 255, 0.5)",
      color: "#bf5fff",
    },
    cyan: {
      background: "rgba(0, 229, 255, 0.1)",
      borderColor: "#00e5ff80",
      color: "#00e5ff",
    },
    pink: {
      background: "rgba(255, 63, 164, 0.1)",
      borderColor: "#ff3fa480",
      color: "#ff3fa4",
    },
  };

  const style = styles[variant];

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        fontFamily: "'Space Mono', monospace",
        fontSize: "10px",
        background: style.background,
        border: `1px solid ${style.borderColor}`,
        color: style.color,
        borderRadius: "3px",
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </span>
  );
}

export default function PostsFilter() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = POSTS.filter((post) => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div>
      {/* Search + filter bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "12px",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "1px solid #3d1060",
            background: "rgba(14,3,36,0.9)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              color: "#6b5a85",
            }}
          >
            &gt;
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search posts..."
            style={{
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              color: "#e8d8ff",
              width: "100%",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: "#6b5a85",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length} post{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Tag filters */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => setSelectedTag(null)}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            padding: "2px 10px",
            background: !selectedTag ? "#ff3fa4" : "transparent",
            color: !selectedTag ? "#fff" : "#9980c0",
            border: `1px solid ${!selectedTag ? "#ff3fa4" : "#3d1060"}`,
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          all
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              padding: "2px 10px",
              background:
                selectedTag === tag ? "#bf5fff" : "transparent",
              color: selectedTag === tag ? "#fff" : "#9980c0",
              border: `1px solid ${
                selectedTag === tag ? "#bf5fff" : "#3d1060"
              }`,
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "all 0.1s",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div
        style={{
          border: "1px solid #2a1060",
          background: "rgba(14,3,36,0.92)",
        }}
      >
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
            no posts found
          </div>
        ) : (
          filtered.map((post, i) => (
            <div
              key={post.slug}
              className="post-row"
              style={{
                padding: "16px 20px",
                borderBottom:
                  i < filtered.length - 1
                    ? "1px solid #1c0845"
                    : "none",
                cursor: "pointer",
                transition: "background 0.1s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "6px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: "20px",
                    color: "#e8d8ff",
                    lineHeight: 1.2,
                    flex: 1,
                    minWidth: "200px",
                  }}
                >
                  {post.title}
                </div>
                {post.isNew && (
                  <span
                    style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: "12px",
                      color: "#ffd700",
                      background: "#1a0a00",
                      border: "1px solid #ffd70060",
                      padding: "1px 6px",
                      animation: "blink-cursor 1.5s step-end infinite",
                      whiteSpace: "nowrap",
                    }}
                  >
                    NEW
                  </span>
                )}
              </div>

              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  color: "#9980c0",
                  lineHeight: 1.7,
                  marginBottom: "10px",
                }}
              >
                {post.excerpt}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "#6b5a85",
                  }}
                >
                  {post.date}
                </span>
                <span style={{ color: "#3d2860" }}>·</span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "#6b5a85",
                  }}
                >
                  {post.readTime} read
                </span>
                <span style={{ color: "#3d2860" }}>·</span>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {post.tags.map((t) => (
                    <RetroTag
                      key={t}
                      variant={
                        selectedTag === t
                          ? "pink"
                          : (["purple", "cyan"][t.length % 2] as "purple" | "cyan")
                      }
                    >
                      {t}
                    </RetroTag>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
