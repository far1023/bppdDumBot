import { ChevronDown } from "lucide-react";
import { useState } from "react";

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

function InlineCode({ children }) {
  return (
    <code className="bg-[#f5f5f5] text-[#171717] text-xs font-mono px-1.5 py-0.5 rounded border border-[#ebebeb]">
      {children}
    </code>
  );
}

/* ── Accordion item ── */
function FaqItem({ question, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#ebebeb] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 px-0 py-4 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium text-[#171717] leading-snug group-hover:text-[#4d4d4d] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 mt-0.5 text-[#888888] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm text-[#4d4d4d] leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

const FAQ_SECTIONS = [
  {
    id: "umum",
    title: "Umum",
    items: [
      {
        q: "Apa itu Pandu?",
        a: "Pandu adalah Asisten Digital berbasis chatbot Telegram yang dikembangkan untuk membantu pegawai dan masyarakat mengakses informasi dan dokumen produk Bappeda Kota Dumai dengan mudah dan cepat.",
      },
      {
        q: "Apakah Pandu gratis?",
        a: "Ya, Pandu sepenuhnya gratis untuk digunakan oleh semua pegawai Bappeda dan masyarakat umum.",
      },
      {
        q: "Apakah Pandu bisa diakses 24/7?",
        a: "Ya, Pandu tersedia 24 jam setiap hari untuk menjawab pertanyaan Anda.",
      },
    ],
  },
  {
    id: "dokumen",
    title: "Dokumen & Informasi",
    items: [
      {
        q: "Dokumen apa saja yang tersedia di Pandu?",
        a: "Pandu menyediakan akses ke dokumen produk Bappeda seperti RPJPD, RPJMD, RKPD, LAKIP, Laporan LKPJ, Renstra OPD, dan dokumen perencanaan lainnya.",
      },
      {
        q: "Bagaimana jika dokumen yang saya cari tidak ditemukan?",
        a: "Pandu akan memberi tahu bahwa dokumen tidak tersedia dan menyarankan untuk menghubungi media sosial resmi Bappeda atau bidang terkait secara langsung.",
      },
      {
        q: "Apakah saya bisa download dokumen langsung dari Pandu?",
        a: "Pandu akan memberikan link Google Drive untuk mengakses dokumen. Anda bisa membuka dan mendownload dokumen melalui link tersebut.",
      },
    ],
  },
  {
    id: "keamanan",
    title: "Keamanan & Privasi",
    items: [
      {
        q: "Apakah data percakapan saya aman?",
        a: "Pandu hanya menyimpan riwayat percakapan untuk konteks sesi dan tidak membagikan data pribadi Anda kepada pihak lain.",
      },
      {
        q: "Mengapa Pandu meminta verifikasi untuk data tertentu?",
        a: "Untuk melindungi data kepegawaian dan informasi internal dari akses yang tidak sah, sesuai dengan protokol keamanan data Bappeda.",
      },
    ],
  },
  {
    id: "teknis",
    title: "Masalah Teknis",
    items: [
      {
        q: "Pandu tidak merespons, apa yang harus dilakukan?",
        children: (
          <ul className="list-disc list-inside space-y-1">
            <li>Periksa koneksi internet Anda</li>
            <li>Restart aplikasi Telegram</li>
            <li>
              Ketik <InlineCode>/start</InlineCode> untuk memulai ulang bot
            </li>
            <li>Jika masih bermasalah, hubungi Tim Sekretariat Bappeda</li>
          </ul>
        ),
      },
      {
        q: "Link dokumen tidak bisa dibuka, kenapa?",
        children: (
          <ul className="list-disc list-inside space-y-1">
            <li>Link sudah tidak aktif atau expired</li>
            <li>Anda tidak memiliki akses ke Google Drive</li>
            <li>Masalah koneksi internet</li>
            <li>Laporkan ke administrator untuk pemeriksaan</li>
          </ul>
        ),
      },
    ],
  },
];

export default function FaqTab() {
  return (
    <div>
      <DocHeading>Pertanyaan yang Sering Diajukan.</DocHeading>
      <DocLead>
        Temukan jawaban atas pertanyaan umum seputar Pandu — mulai dari cara menggunakan,
        keamanan data, hingga troubleshooting teknis.
      </DocLead>

      {FAQ_SECTIONS.map((section) => (
        <div key={section.title}>
      <DocH2 id={`faq-${section.id}`}>{section.title}</DocH2>
          <div className="border border-[#ebebeb] rounded-lg px-4 overflow-hidden"
            style={{
              boxShadow:
                "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.03)",
            }}
          >
            {section.items.map((faq) => (
              <FaqItem key={faq.q} question={faq.q}>
                {faq.children ?? <p>{faq.a}</p>}
              </FaqItem>
            ))}
          </div>
        </div>
      ))}

      {/* Contact */}
      <DocH2 id="bantuan">Butuh Bantuan Lebih Lanjut?</DocH2>
      <div className="border border-[#ebebeb] rounded-lg p-5 bg-[#fafafa] text-sm">
        <p className="text-[#4d4d4d] mb-4">Hubungi Tim Dukungan Pandu melalui:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: "Email", value: "bappeda@dumaikota.go.id" },
            { label: "Telepon", value: "(0765) 441414" },
            { label: "Instagram", value: "@bappeda_kotadumai" },
            { label: "Facebook", value: "Bappeda Dumai" },
            { label: "Alamat", value: "Jl. Tuanku Tambusai, Bagan Besar, Kota Dumai" },
          ].map((c) => (
            <div key={c.label} className="flex gap-2">
              <span className="text-xs font-mono text-[#888888] w-20 flex-shrink-0 pt-0.5">{c.label}</span>
              <span className="text-[#171717] text-xs font-medium">{c.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#ebebeb] text-xs text-[#888888] font-mono">
          Penanggung Jawab Teknis: Subbag Umum dan Kepegawaian Sekretariat Bappeda Kota Dumai
        </div>
      </div>
    </div>
  );
}
