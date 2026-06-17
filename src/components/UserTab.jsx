import { MessageSquare, Smartphone, Zap, Search, Bot, ShieldCheck, ArrowRight } from "lucide-react";

/* ── Shared doc primitives ── */
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

function Callout({ type = "note", children }) {
  const styles = {
    note:    { border: "#0070f3", bg: "#f0f7ff", label: "Note",    labelColor: "#0070f3" },
    tip:     { border: "#10b981", bg: "#f0fdf4", label: "Tip",     labelColor: "#059669" },
    warning: { border: "#f5a623", bg: "#fffbeb", label: "Warning", labelColor: "#ab570a" },
    danger:  { border: "#ee0000", bg: "#fef2f2", label: "Danger",  labelColor: "#c50000" },
  };
  const s = styles[type];
  return (
    <div
      className="flex gap-3 rounded-lg px-4 py-3 mb-6 text-sm leading-relaxed"
      style={{ background: s.bg, borderLeft: `3px solid ${s.border}` }}
    >
      <span className="font-mono font-semibold flex-shrink-0" style={{ color: s.labelColor }}>
        {s.label}
      </span>
      <span className="text-[#4d4d4d]">{children}</span>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#171717] text-white text-xs font-semibold flex items-center justify-center">
          {n}
        </div>
        <div className="flex-1 w-px bg-[#ebebeb] mt-2" />
      </div>
      <div className="pb-8 flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[#171717] mb-2" style={{ letterSpacing: "-0.2px" }}>
          {title}
        </h3>
        <div className="text-sm text-[#4d4d4d] leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  );
}

function InlineCode({ children }) {
  return (
    <code className="bg-[#f5f5f5] text-[#171717] text-xs font-mono px-1.5 py-0.5 rounded border border-[#ebebeb]">
      {children}
    </code>
  );
}

function CodeBlock({ children }) {
  return (
    <pre
      className="bg-[#171717] text-[#fafafa] text-xs font-mono leading-relaxed rounded-lg px-5 py-4 overflow-x-auto my-4"
      style={{ boxShadow: "0px 2px 2px rgba(0,0,0,0.1), 0px 8px 16px -4px rgba(0,0,0,0.12)" }}
    >
      <code>{children}</code>
    </pre>
  );
}

/* ── Feature grid card ── */
function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div
      className="bg-white rounded-lg p-5 border border-[#ebebeb]"
      style={{
        boxShadow:
          "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <div className="w-8 h-8 rounded-md bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-[#171717]" />
      </div>
      <h3 className="text-sm font-semibold text-[#171717] mb-1">{title}</h3>
      <p className="text-xs text-[#888888] leading-relaxed">{desc}</p>
    </div>
  );
}

export default function UserTab() {
  return (
    <div>
      {/* Hero */}
      <DocHeading>Memulai dengan Pandu.</DocHeading>
      <DocLead>
        Pandu adalah asisten digital berbasis Telegram yang dikembangkan untuk membantu
        pegawai dan masyarakat mengakses dokumen dan informasi Bappeda Kota Dumai — cepat,
        gratis, dan tersedia 24 jam.
      </DocLead>

      {/* CTA pill */}
      <a
        href="/chat"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-full mb-12 hover:opacity-90 transition-opacity"
      >
        <MessageSquare className="w-4 h-4" />
        Coba demo interaktif
        <ArrowRight className="w-3.5 h-3.5" />
      </a>

      {/* Feature grid */}
      <DocH2 id="keunggulan">Keunggulan Pandu</DocH2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <FeatureCard icon={Smartphone} title="Mudah Diakses" desc="Gunakan Telegram di HP atau desktop kapan saja, di mana saja." />
        <FeatureCard icon={Zap} title="Respons Cepat" desc="Dapatkan jawaban instan tanpa harus menunggu jam kerja." />
        <FeatureCard icon={Search} title="Pencarian Pintar" desc="Cari dokumen hanya dengan kata kunci sederhana dalam bahasa natural." />
        <FeatureCard icon={Bot} title="Ramah Pengguna" desc="Berkomunikasi seperti chat biasa — tidak perlu perintah khusus." />
      </div>

      {/* Step-by-step */}
      <DocH2 id="cara-akses">Cara Mengakses Pandu</DocH2>
      <div className="mt-6">
        <Step n="1" title="Install Telegram">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <p>
                Download aplikasi Telegram di smartphone (Android / iOS) atau gunakan versi
                web/desktop di{" "}
                <a href="https://telegram.org/apps" target="_blank" rel="noreferrer" className="text-[#0070f3] hover:underline">
                  telegram.org/apps
                </a>.
              </p>
              <p className="mt-2">
                Atau langsung{" "}
                <a href="/chat" className="text-[#0070f3] hover:underline font-medium">
                  coba demo Pandu
                </a>{" "}
                di browser Anda tanpa perlu install apapun.
              </p>
            </div>
            <img src="/assets/images/canvas.gif" alt="canvas telegram" className="w-[250px] rounded-lg shadow-sm border border-[#ebebeb] flex-shrink-0" />
          </div>
        </Step>

        <Step n="2" title="Cari Bot Pandu">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <p>Buka Telegram, ketuk ikon pencarian, lalu ketik username berikut:</p>
              <CodeBlock>@bppdDumBot</CodeBlock>
              <p>
                Atau klik tautan langsung:{" "}
                <a href="https://t.me/bppdDumBot" target="_blank" rel="noreferrer" className="text-[#0070f3] hover:underline">
                  t.me/bppdDumBot
                </a>
              </p>
            </div>
            <img src="/assets/images/bot_pandu.webp" alt="bot PANDU" className="w-[250px] rounded-lg shadow-sm border border-[#ebebeb] flex-shrink-0" />
          </div>
        </Step>

        <Step n="3" title="Mulai Chat">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <p>
                Tekan tombol <strong className="font-semibold text-[#171717]">START</strong> atau
                ketik perintah berikut untuk memulai sesi:
              </p>
              <CodeBlock>/start</CodeBlock>
              <p>Pandu akan menyapa dan siap membantu Anda.</p>
            </div>
            <img src="/assets/images/bot_start.webp" alt="bot PANDU" className="w-[250px] rounded-lg shadow-sm border border-[#ebebeb] flex-shrink-0" />
          </div>
        </Step>

        <Step n="4" title="Ajukan Pertanyaan">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <p>Gunakan bahasa natural — tidak perlu sintaks khusus. Contoh:</p>
              <CodeBlock>{`Berikan RKPD 2025
Ada dokumen RPJMD?
Rapat apa hari ini?
Alamat kantor Bappeda?`}</CodeBlock>
            </div>
            <img src="/assets/images/bot_ask.webp" alt="bot PANDU" className="w-[250px] rounded-lg shadow-sm border border-[#ebebeb] flex-shrink-0" />
          </div>
        </Step>
      </div>

      {/* Interaction guide */}
      <DocH2 id="cara-interaksi">Cara Berinteraksi</DocH2>

      <div className="space-y-6">
        <div>
          <p className="text-xs font-mono text-[#888888] uppercase tracking-widest mb-3">Mencari Dokumen</p>
          <div className="border border-[#ebebeb] rounded-lg overflow-hidden divide-y divide-[#ebebeb]">
            {[
              { cmd: "Berikan RKPD 2025", desc: "Pandu memberikan dokumen RKPD tahun 2025." },
              { cmd: "Ada dokumen RPJMD?", desc: "Pandu menampilkan daftar RPJMD yang tersedia." },
              { cmd: "Laporan kinerja tahun lalu", desc: "Pandu mencari LAKIP dari tahun sebelumnya." },
            ].map((row) => (
              <div key={row.cmd} className="flex items-start gap-4 px-4 py-3">
                <InlineCode>{row.cmd}</InlineCode>
                <p className="text-sm text-[#4d4d4d] leading-relaxed">{row.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono text-[#888888] uppercase tracking-widest mb-3">Agenda & Rapat</p>
          <div className="border border-[#ebebeb] rounded-lg overflow-hidden divide-y divide-[#ebebeb]">
            {[
              { cmd: "Rapat apa hari ini?", desc: "Menampilkan jadwal rapat hari ini." },
              { cmd: "Agenda besok", desc: "Memberikan agenda untuk hari berikutnya." },
            ].map((row) => (
              <div key={row.cmd} className="flex items-start gap-4 px-4 py-3">
                <InlineCode>{row.cmd}</InlineCode>
                <p className="text-sm text-[#4d4d4d] leading-relaxed">{row.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal data access */}
      <DocH2 id="akses-internal">Akses Data Pegawai (Internal)</DocH2>

      <Callout type="note">
        Informasi kepegawaian dilindungi. Pandu akan meminta verifikasi identitas sebelum
        memberikan akses ke data internal.
      </Callout>

      <div className="mt-4">
        <Step n="1" title="Request Data Internal">
          <p>Minta informasi yang memerlukan verifikasi kepada Pandu.</p>
        </Step>
        <Step n="2" title="Verifikasi Identitas">
          <p>Pandu akan meminta:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-[#4d4d4d]">
            <li>NIP Anda — 18 digit, tanpa spasi</li>
            <li>Tanggal lahir — format <InlineCode>DD/MM/YYYY</InlineCode></li>
          </ul>
        </Step>
        <Step n="3" title="Akses Diberikan">
          <p>Setelah verifikasi berhasil, Pandu memberikan informasi yang diminta.</p>
        </Step>
      </div>

      {/* Tips */}
      <DocH2 id="tips">Tips untuk Hasil Terbaik</DocH2>
      <Callout type="tip">
        Gunakan bahasa natural, sebutkan kata kunci utama (nama dokumen, tahun, atau jenis
        informasi), dan ajukan satu pertanyaan per pesan agar jawaban lebih akurat.
      </Callout>

      <div className="flex items-center gap-3 mt-8 p-4 rounded-lg border border-[#ebebeb] bg-[#fafafa]">
        <ShieldCheck className="w-5 h-5 text-[#171717] flex-shrink-0" />
        <p className="text-sm text-[#4d4d4d]">
          Pandu hanya menyimpan riwayat percakapan untuk konteks sesi dan tidak membagikan
          data pribadi Anda kepada pihak lain.
        </p>
      </div>
    </div>
  );
}
