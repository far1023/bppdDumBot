import { Link } from "react-router-dom";
import { Bot, Sparkles, Send } from "lucide-react";
import ChatWindow from "./ChatWindow";

/**
 * Full-page chat layout.
 * The page is split into three rows: sticky nav (fixed h-14) → hero header
 * (shrink-0) → chat card (flex-1, fills remaining viewport height).
 * This gives the chat window a true fixed/bounded height without overflow.
 */
export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col bg-[#fafafa]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Sticky top nav (h-14) ── */}
      <header
        className="flex-shrink-0 h-14 bg-white border-b border-[#ebebeb] flex items-center px-4 md:px-8"
        style={{ boxShadow: "0 1px 0 #ebebeb" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#171717] tracking-tight">Pandu</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/"
            className="text-xs font-medium text-[#4d4d4d] hover:text-[#171717] transition-colors"
          >
            ← Kembali ke Panduan
          </Link>
          <a
            href="https://t.me/bppdDumBot"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#229ED9] text-white rounded-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
            Buka di Telegram
          </a>
        </div>
      </header>

      {/* ── Below nav: hero text + chat card ── */}
      <div className="flex-1 flex flex-col items-center overflow-hidden p-4">

        {/* Hero text */}
        <div className="flex-shrink-0 w-full max-w-lg text-center mb-5 md:py-4">
          <div className="inline-block">
            <div className="relative my-2 p-[1.5px] rounded-full overflow-hidden flex items-center justify-center">
              <div
                className="absolute w-[300%] aspect-square animate-[spin_3s_linear_infinite]"
                style={{
                  background: "conic-gradient(from 0deg, #007cf0, #00dfd8, #7928ca, #ff0080, #007cf0)",
                }}
              />
              {/* Inner Badge */}
              <div className="relative flex items-center gap-1.5 bg-white rounded-full px-3 py-1 w-full h-full">
                <Sparkles className="w-3 h-3 text-[#7928ca]" />
                <span className="text-[11px] font-mono text-[#171717] font-medium tracking-tight">AI Powered</span>
              </div>
            </div>
          </div>
          <h1
            className="text-2xl font-semibold text-[#171717] leading-tight mb-1"
            style={{ letterSpacing: "-1px" }}
          >
            Berkenalan dengan Pandu
          </h1>
          <p className="text-xs text-[#4d4d4d] leading-relaxed">
            Asisten digital Bappeda Kota Dumai.
          </p>
        </div>

        {/* Chat card — mobile phone proportions */}
        <div
          className="w-full max-w-lg flex-1 flex flex-col min-h-0 bg-white rounded-2xl overflow-hidden"
          style={{
            border: "1px solid #ebebeb",
            boxShadow:
              "0px 4px 6px rgba(0,0,0,0.04), 0px 12px 32px -4px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          <ChatWindow />
        </div>

        <p className="flex-shrink-0 mt-3 text-[11px] font-mono text-[#888888] text-center">
          © 2025 Bappeda Kota Dumai
        </p>
      </div>
    </div>
  );
}
