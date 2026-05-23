import { useState } from "react";

interface Post {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  excerpt: string;
}

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

interface Props {
  posts: Post[];
}

export default function PostsFilter({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  const filtered = posts.filter((post) => {
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
        {allTags.map((tag) => (
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
            <a
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="post-row"
              style={{
                display: "block",
                padding: "16px 20px",
                borderBottom:
                  i < filtered.length - 1
                    ? "1px solid #1c0845"
                    : "none",
                cursor: "pointer",
                transition: "background 0.1s",
                textDecoration: "none",
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
                {post.tags.length > 0 && (
                  <>
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
                  </>
                )}
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
