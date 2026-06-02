import { PlaySquare } from "lucide-react";

function DocHeading({ children }) {
  return (
    <h1
      className="text-3xl md:text-4xl font-semibold text-[#171717] mb-4 leading-tight"
      style={{ letterSpacing: "-1.5px" }}
    >
      {children}
    </h1>
  );
}

function DocLead({ children }) {
  return <p className="text-base text-[#4d4d4d] leading-relaxed mb-10 max-w-2xl">{children}</p>;
}

function DocH2({ id, children }) {
  return (
    <h2
      id={id}
      className="text-lg font-semibold text-[#171717] mt-12 mb-4 pb-2 border-b border-[#ebebeb] scroll-mt-20"
      style={{ letterSpacing: "-0.4px" }}
    >
      {children}
    </h2>
  );
}

/* ── Video card ── */
function VideoCard({ src, title, desc }) {
  return (
    <div
      className="bg-white rounded-xl border border-[#ebebeb] overflow-hidden"
      style={{
        boxShadow:
          "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.06), 0px 8px 8px -8px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      {/* Aspect-ratio video container */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <video
          controls
          className="absolute inset-0 w-full h-full object-cover bg-[#171717]"
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          {/* Fallback placeholder when video missing */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#171717] text-[#888888]">
            <PlaySquare className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-xs font-mono">Video tidak tersedia</p>
          </div>
        </video>
        {/* Fallback shown by browser if <video> not supported */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#171717] text-[#888888] pointer-events-none select-none"
          style={{ display: "none" }}
        >
          <PlaySquare className="w-10 h-10 mb-2 opacity-40" />
          <p className="text-xs font-mono">Browser Anda tidak mendukung tag video.</p>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-5 py-4 border-t border-[#ebebeb] bg-[#fafafa]">
        <h3 className="text-sm font-semibold text-[#171717] mb-1" style={{ letterSpacing: "-0.2px" }}>
          {title}
        </h3>
        {desc && <p className="text-xs text-[#888888] leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}

export default function GalleryTab() {
  return (
    <div>
      <DocHeading>Galeri Media.</DocHeading>
      <DocLead>
        Kumpulan video panduan dan promosi tentang Pandu — asisten digital Bappeda Kota Dumai.
      </DocLead>

      <DocH2 id="video-promo">Video Promo</DocH2>
      <p className="text-sm text-[#4d4d4d] mb-6">
        Video pengenalan singkat tentang Pandu dan fitur-fitur unggulannya.
      </p>
      <div className="grid grid-cols-1 gap-6">
        <VideoCard
          src="/assets/videos/pandu-promo.mp4"
          title="Kenalan dengan Pandu"
          desc="Pengenalan singkat tentang Pandu dan fitur-fitur unggulannya."
        />
      </div>

      <DocH2 id="video-tutorial">Video Tutorial</DocH2>
      <div
        className="rounded-xl border border-dashed border-[#ebebeb] flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-10 h-10 rounded-full bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center mb-3">
          <PlaySquare className="w-5 h-5 text-[#888888]" />
        </div>
        <p className="text-sm font-medium text-[#171717] mb-1">Video tutorial akan segera hadir.</p>
        <p className="text-xs text-[#888888] max-w-xs">
          Tutorial cara menggunakan Pandu untuk mengakses dokumen dan informasi Bappeda sedang
          dalam proses produksi.
        </p>
      </div>

      <div className="mt-10 p-4 rounded-lg border border-[#ebebeb] bg-[#fafafa] text-sm text-[#4d4d4d]">
        <p className="text-xs font-mono text-[#888888] mb-1">Info</p>
        <p>
          Untuk pertanyaan tentang konten media, hubungi Tim Sekretariat Bappeda melalui
          email <span className="font-mono text-[#171717]">bappeda@dumaikota.go.id</span>.
        </p>
      </div>
    </div>
  );
}
