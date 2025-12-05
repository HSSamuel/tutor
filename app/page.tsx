"use client";
import { useState } from "react";
// 👇 FIXED: All icons are now in ONE single import line
import {
  BookOpen,
  Sparkles,
  MapPin,
  Search,
  AlertCircle,
  FileText,
  Globe,
  ImageIcon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Helper function to clean up the raw source string
const parseSource = (rawText: string) => {
  if (!rawText) return { content: "", source: "", region: "" };

  // 1. Remove the "Use this local metaphor:" prefix
  let cleanText = rawText.replace("Use this local metaphor:", "").trim();

  // 2. Extract Source and Region using Regex
  const sourceMatch = cleanText.match(/\(Source: (.*?)\)/);
  const regionMatch = cleanText.match(/\(Region: (.*?)\)/);

  const source = sourceMatch ? sourceMatch[1] : "Unknown Source";
  const region = regionMatch ? regionMatch[1] : "General";

  // 3. Remove the tags from the main text so we don't show them twice
  cleanText = cleanText
    .replace(/\(Source: .*?\)/, "")
    .replace(/\(Region: .*?\)/, "")
    .trim();

  return { content: cleanText, source, region };
};

export default function Home() {
  const [subject, setSubject] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!subject) return;
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/teach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });

      if (!res.ok) throw new Error("Could not reach the AI Tutor.");
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // Parse the source data whenever response changes
  const sourceData = response ? parseSource(response.source_data) : null;

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-green-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10 space-y-3">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/20">
              <BookOpen className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                AI Tutor
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                NG
              </span>
            </h1>

            <p className="text-sm md:text-lg text-slate-400 font-light max-w-sm mx-auto md:max-w-none">
              Master complex topics using local African metaphors.
            </p>
          </div>

          {/* Input Section */}
          <div className="relative group mb-8">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
            <div className="relative flex bg-slate-900 rounded-xl p-1 items-center">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Topic (e.g. Kinetic Energy)"
                className="w-full bg-transparent text-white placeholder-slate-500 px-4 py-3 md:px-6 md:py-4 text-base md:text-lg focus:outline-none min-w-0"
              />

              <button
                onClick={handleSearch}
                disabled={loading}
                className="shrink-0 bg-green-600 hover:bg-green-500 text-white 
                           px-4 py-2 text-sm rounded-lg mx-1
                           md:px-8 md:py-3 md:text-base md:mx-0
                           font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-green-900/20"
              >
                {loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    <Search className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden md:inline">Teach Me</span>
                    <span className="inline md:hidden">Teach</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 mb-6 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {response && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Primary AI Response Box */}
              <div className="bg-slate-800/90 border border-slate-600/50 shadow-2xl rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-400 to-blue-500" />

                <div className="flex items-start gap-4">
                  <div className="hidden md:block p-3 bg-slate-700/80 rounded-xl shrink-0 border border-white/5">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>

                  <div className="space-y-3 w-full min-w-0">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400 md:hidden" />
                      The Explanation
                    </h3>

                    <div className="prose prose-invert prose-lg max-w-none text-slate-200 text-justify">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                          p: ({ node, ...props }) => (
                            <p className="mb-8 leading-loose" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li
                              className="mb-3 ml-4 leading-relaxed"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="text-white font-bold"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {response.response}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- NEW: VISUAL AID BOX (ONLY SHOWS IF IMAGE EXISTS) --- */}
              {response.visual_aid && (
                <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <ImageIcon className="w-4 h-4" />
                    <span>Visual Illustration</span>
                  </div>

                  <div className="relative w-full rounded-lg overflow-hidden border border-slate-700 bg-white/5">
                    <img
                      src={response.visual_aid}
                      alt="Visual Explanation"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
              {/* ----------------------------------------------------- */}

              {/* Source / Context Card - PROFESSIONAL UI */}
              {sourceData && (
                <div className="bg-slate-950/60 backdrop-blur-sm rounded-xl p-5 border border-slate-700/60 shadow-inner group transition-all hover:bg-slate-900/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-400 mt-1 shrink-0 drop-shadow-md" />
                    <div className="w-full min-w-0">
                      <span className="block text-green-400 text-xs font-bold uppercase tracking-wider mb-3 pb-2 border-b border-slate-800/50">
                        Context Data
                      </span>

                      {/* Raw Text Content */}
                      <div
                        className="text-sm text-slate-300 text-justify leading-relaxed break-words 
                                      prose prose-invert prose-sm max-w-none 
                                      line-clamp-4 hover:line-clamp-none transition-all cursor-pointer mb-4"
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            p: ({ node, ...props }) => (
                              <p className="mb-4 leading-relaxed" {...props} />
                            ),
                          }}
                        >
                          {sourceData.content}
                        </ReactMarkdown>
                      </div>

                      {/* Metadata Badges */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-300">
                          <FileText className="w-3 h-3" />
                          <span className="truncate max-w-[200px]">
                            {sourceData.source}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">
                          <Globe className="w-3 h-3" />
                          <span>{sourceData.region}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-600 text-sm">
          Powered by Supabase & Cohere
        </div>
      </div>
    </main>
  );
}
