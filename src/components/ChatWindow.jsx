import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2, Sparkles, SendHorizonal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WEBHOOK_URL = "https://n8n-tq7lebytvmnn.arman.sumopod.my.id/webhook/ask-for";

const QUICK_ACTIONS = [
  { label: "RKPD 2025", message: "Berikan RKPD 2025" },
  { label: "RPJMD", message: "Ada dokumen RPJMD?" },
  { label: "Agenda Hari Ini", message: "Rapat apa hari ini?" },
  { label: "Info Kontak", message: "Alamat kantor Bappeda?" },
];

function getCurrentTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f5f5f5] border border-[#ebebeb] flex items-center justify-center">
        <Bot className="w-4 h-4 text-[#888888]" />
      </div>
      <div
        className="px-4 py-3 rounded-lg rounded-tl-sm border border-[#ebebeb] bg-white"
        style={{
          boxShadow:
            "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#888888]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
    >
      {/* Avatar + Bubble row — both aligned to bottom of bubble */}
      <div className={`flex items-end gap-2 w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${isUser ? "bg-[#171717]" : "bg-[#f5f5f5] border border-[#ebebeb]"}`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-[#888888]" />
          )}
        </div>

        {/* Bubble — user grows right-to-left (ml-auto), bot left-to-right (mr-auto) */}
        <div
          className={`${isUser ? "ml-auto" : "mr-auto"} max-w-[75%] break-words px-4 py-3 rounded-xl text-sm leading-relaxed ${isUser
            ? "bg-[#171717] text-white rounded-br-sm"
            : "bg-white text-[#171717] rounded-bl-sm border border-[#ebebeb]"
            }`}
          style={
            !isUser
              ? {
                boxShadow:
                  "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }
              : {}
          }
        >
          {isUser ? (
            <p>{msg.text}</p>
          ) : (
            <div
              className="prose prose-sm max-w-none text-[#171717]
                [&_a]:text-[#0070f3] [&_a:hover]:underline [&_a]:font-medium
                [&_p]:mb-2 [&_p:last-child]:mb-0
                [&_ul]:pl-5 [&_ul]:mb-2 [&_li]:mb-1
                [&_ol]:pl-5 [&_ol]:mb-2
                [&_code]:bg-[#f5f5f5] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:text-[#171717]
                [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          )}
        </div>
      </div>

      {/* Timestamp — indented to sit below the bubble (not the avatar) */}
      <span
        className={`text-[11px] text-[#888888] font-mono ${isUser ? "pr-10" : "pl-10"
          }`}
      >
        {msg.time}
      </span>
    </motion.div>
  );
}


export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId] = useState(() => Date.now() + "-" + Math.random().toString(36).substr(2, 9));
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  const sendMessage = useCallback(
    async (textOverride) => {
      const text = (textOverride ?? input).trim();
      if (!text || isProcessing) return;

      setInput("");
      // Reset textarea height when clearing input
      if (inputRef.current) inputRef.current.style.height = "auto";
      setIsProcessing(true);

      setMessages((prev) => [...prev, { role: "user", text, time: getCurrentTime() }]);

      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, message: text }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        const botText =
          data && data[0] && data[0].code === 200
            ? data[0].message
            : "<p>Maaf, terjadi kesalahan dalam memproses permintaan Anda. Silakan coba lagi.</p>";

        setMessages((prev) => [...prev, { role: "bot", text: botText, time: getCurrentTime() }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: '<p style="color:#ee0000">❌ Maaf, tidak dapat terhubung ke server. Silakan coba lagi nanti.</p>',
            time: getCurrentTime(),
          },
        ]);
      } finally {
        setIsProcessing(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [input, isProcessing, sessionId]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isProcessing) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* ── Chat header ── */}
      <div className="px-6 py-4 border-b border-[#ebebeb] flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#171717] tracking-tight leading-tight">
            Pandu — Asisten Digital Bappeda
          </h2>
          <p className="text-[11px] font-mono text-[#888888] leading-tight">Tanyakan dokumen & informasi Bappeda</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-[#fafafa] border border-[#ebebeb] rounded-full px-3 py-1">
          <Sparkles className="w-3 h-3 text-[#888888]" />
          <span className="text-[11px] font-mono text-[#888888]">AI Powered</span>
        </div>
      </div>

      {/* ── Message list ── */}
      <div className="scrollbar-hide flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-4 bg-[#fafafa]">
        {/* Welcome / Empty state */}
        {messages.length === 0 && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-6 h-full min-h-[280px] text-center"
          >
            {/* Brand gradient orb */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #007cf0, #00dfd8 33%, #7928ca 66%, #ff0080)",
              }}
            >
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#171717] tracking-tight mb-1">
                Halo! Saya Pandu 👋
              </h3>
              <p className="text-sm text-[#4d4d4d] max-w-sm">
                Asisten digital Bappeda Kota Dumai. Saya siap membantu Anda mencari dokumen
                dan informasi.
              </p>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_ACTIONS.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => sendMessage(action.message)}
                  className="px-4 py-2 text-sm font-medium text-[#171717] bg-white border border-[#ebebeb] rounded-full hover:border-[#a1a1a1] transition-colors cursor-pointer"
                  style={{
                    boxShadow: "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.06)",
                  }}
                >
                  {action.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isProcessing && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div className="bg-white border-t border-[#ebebeb] px-3 py-3">
        <div className="flex items-center gap-3">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-resize: collapse then expand to scrollHeight
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            placeholder="Ketik pertanyaan Anda…"
            className="scrollbar-hide flex-1 resize-none overflow-y-auto pl-3 text-sm text-[#171717] bg-transparent outline-none placeholder:text-[#888888] disabled:opacity-50 max-h-32"
            style={{ lineHeight: "1.5" }}
          />
          <motion.button
            whileHover={!isProcessing && input.trim() ? { scale: 1.05 } : {}}
            whileTap={!isProcessing && input.trim() ? { scale: 0.95 } : {}}
            onClick={() => sendMessage()}
            disabled={isProcessing || !input.trim()}
            aria-label="Send message"
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[#171717] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SendHorizonal className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
