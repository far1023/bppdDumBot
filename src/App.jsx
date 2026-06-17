import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  ClipboardList,
  Users,
  PlaySquare,
  HelpCircle,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import BotAvatar from "./components/BotAvatar";
import { AnimatePresence, motion } from "framer-motion";

import AdminTab from "./components/AdminTab";
import UserTab from "./components/UserTab";
import GalleryTab from "./components/GalleryTab";
import FaqTab from "./components/FaqTab";
import ChatPage from "./components/ChatPage";
import ExposePresentation from "./components/ExposePresentation";

import "./App.css";

/* ── Per-page table of contents ── */
const TOC_MAP = {
  user: [
    { id: "keunggulan", label: "Keunggulan Pandu" },
    { id: "cara-akses", label: "Cara Mengakses" },
    { id: "cara-interaksi", label: "Cara Berinteraksi" },
    { id: "akses-internal", label: "Akses Data Pegawai" },
    { id: "tips", label: "Tips Terbaik" },
  ],
  admin: [
    { id: "peran", label: "Peran & Tanggung Jawab" },
    { id: "alur-kerja", label: "Alur Kerja" },
    { id: "hal-penting", label: "Hal Penting" },
    { id: "troubleshooting", label: "Troubleshooting" },
  ],
  gallery: [
    { id: "video-promo", label: "Video Promo" },
    { id: "video-tutorial", label: "Video Tutorial" },
  ],
  faq: [
    { id: "faq-umum", label: "Umum" },
    { id: "faq-dokumen", label: "Dokumen & Informasi" },
    { id: "faq-keamanan", label: "Keamanan & Privasi" },
    { id: "faq-teknis", label: "Masalah Teknis" },
    { id: "bantuan", label: "Butuh Bantuan?" },
  ],
};

/* ── TOC Sidebar component with IntersectionObserver ── */
function TocSidebar({ active, scrollRoot }) {
  const toc = TOC_MAP[active] ?? [];
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");
  const observerRef = useRef(null);

  useEffect(() => {
    // Reset to the first item immediately on tab change
    setActiveId(toc[0]?.id ?? "");
    if (observerRef.current) observerRef.current.disconnect();

    // Small delay so the enter animation has started and elements are in the DOM
    const timer = setTimeout(() => {
      const root = scrollRoot?.current ?? null;
      const elements = toc
        .map((t) => document.getElementById(t.id))
        .filter(Boolean);

      if (!elements.length) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Always pick the topmost heading that is currently intersecting
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length) setActiveId(visible[0].target.id);
        },
        {
          root: null, // Viewport
          rootMargin: "-100px 0px -60% 0px", // Offset for sticky header
          threshold: 0,
        }
      );

      elements.forEach((el) => observerRef.current.observe(el));
    }, 220); // long enough for the 180ms enter animation

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    // Add 80px offset for the sticky header
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  if (!toc.length) return null;

  return (
    <>
      <p className="text-[10px] font-mono text-[#888888] uppercase tracking-widest mb-3">
        Di halaman ini
      </p>
      <nav className="flex flex-col gap-0.5">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative text-left text-xs py-1.5 pl-3 rounded transition-colors cursor-pointer ${isActive
                ? "text-[#171717] font-medium"
                : "text-[#888888] hover:text-[#4d4d4d]"
                }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`tocIndicator-${active}`}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-[#171717] rounded-r-full"
                />
              )}
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}

const sections = [
  {
    id: "user",

    label: "Memulai",
    eyebrow: "Get Started",
    icon: Users,
    component: UserTab,
  },
  {
    id: "admin",
    label: "Panduan Admin",
    eyebrow: "Administrator",
    icon: ClipboardList,
    component: AdminTab,
  },
  {
    id: "gallery",
    label: "Galeri Media",
    eyebrow: "Resources",
    icon: PlaySquare,
    component: GalleryTab,
  },
  {
    id: "faq",
    label: "FAQ",
    eyebrow: "Reference",
    icon: HelpCircle,
    component: FaqTab,
  },
];

function DocsLayout() {
  const [active, setActive] = useState("user");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainScrollRef = useRef(null); // passed to TocSidebar as observer root

  const current = sections.find((s) => s.id === active);

  function handleSectionChange(id) {
    setActive(id);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 flex-shrink-0 h-14 bg-white border-b border-[#ebebeb] w-full"
        style={{ boxShadow: "0 1px 0 #ebebeb" }}
      >
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-full flex items-center gap-4">
          {/* Hamburger — only on small screens */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-[#4d4d4d] hover:bg-[#fafafa] transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Logo / Product name */}
          <div className="flex items-center gap-2 flex-shrink-0">
          <BotAvatar size="sm" shape="square" />
            <span className="text-sm font-semibold text-[#171717] tracking-tight">Pandu</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/chat"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#171717] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Coba Pandu
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile sidebar overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-[#ebebeb] flex flex-col pt-6 pb-12 px-4 md:hidden overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-6 px-3">
                <div className="flex items-center gap-2">
                  <BotAvatar size="sm" shape="square" />
                  <span className="text-sm font-semibold text-[#171717] tracking-tight">Pandu</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-[#4d4d4d] hover:bg-[#fafafa] transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] font-mono text-[#888888] uppercase tracking-widest mb-3 px-3">
                Dokumentasi
              </p>
              <nav className="flex flex-col gap-0.5">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSectionChange(s.id)}
                      className={`relative flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-left w-full transition-colors cursor-pointer ${isActive
                        ? "bg-[#fafafa] text-[#171717] font-medium"
                        : "text-[#4d4d4d] hover:bg-[#fafafa] hover:text-[#171717]"
                        }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobileSidebarIndicator"
                          className="absolute left-0 w-0.5 h-5 bg-[#171717] rounded-r-full"
                        />
                      )}
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {s.label}
                    </button>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="mt-auto pt-8 border-t border-[#ebebeb]">
                <p className="text-[10px] font-mono text-[#888888] mb-1"></p>
                <p className="text-[10px] text-[#888888]"></p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main layout (three columns) ── */}
      <div className="flex-1 flex max-w-screen-xl w-full mx-auto relative">

        {/* ── Left Sidebar (Desktop) ── */}
        <aside className="hidden lg:flex flex-col w-56 xl:w-64 flex-shrink-0">
          <div className="fixed top-14 w-56 xl:w-64 h-[calc(100vh-3.5rem)] flex flex-col flex-shrink-0 border-r border-[#ebebeb] bg-[#fafafa] pt-8 pb-12 px-4 overflow-y-auto z-0">
            <p className="text-[10px] font-mono text-[#888888] uppercase tracking-widest mb-3 px-3">
              Dokumentasi
            </p>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s) => {
                const Icon = s.icon;
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`relative flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-left w-full transition-colors cursor-pointer ${isActive
                      ? "bg-[#fafafa] text-[#171717] font-medium"
                      : "text-[#4d4d4d] hover:bg-[#fafafa] hover:text-[#171717]"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebarIndicator"
                        className="absolute left-0 w-0.5 h-5 bg-[#171717] rounded-r-full"
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {s.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── Content area (scrolls independently) ── */}
        <main className="flex-1 min-w-0 bg-white">
          <div className="px-6 md:px-12 pt-10 md:pt-14 pb-[30vh]">
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="max-w-3xl"
              >
                {/* Section eyebrow */}
                <p className="text-[11px] font-mono text-[#888888] uppercase tracking-widest mb-3">
                  {current?.eyebrow}
                </p>
                {current && <current.component />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* ── Right TOC (wide screens only, full-height scroll) ── */}
        <aside className="hidden xl:flex flex-col w-52 flex-shrink-0">
          <div className="fixed top-14 w-52 h-[calc(100vh-3.5rem)] flex flex-col flex-shrink-0 pt-8 pb-12 px-4 overflow-y-auto z-0">
            <TocSidebar active={active} />
          </div>
        </aside>

      </div>

      {/* ── Footer ── */}
      <footer className="relative z-10 flex-shrink-0 border-t border-[#ebebeb] bg-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#171717]">v1.0 · Pandu</span>
            <span className="text-xs text-[#888888]">— Asisten Digital Bappeda Kota Dumai</span>
          </div>
          <p className="text-[11px] font-mono text-[#888888]">
            © 2025 Bappeda Kota Dumai
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocsLayout />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/expose" element={<ExposePresentation />} />
      </Routes>
    </BrowserRouter>
  );
}
