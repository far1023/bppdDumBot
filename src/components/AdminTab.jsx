import { CheckCircle } from "lucide-react";

/* ── Shared primitives (duplicated locally for self-containment) ── */
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

function Step({ n, title, children, last = false }) {
  return (
    <div className="flex gap-4 mb-0">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#171717] text-white text-xs font-semibold flex items-center justify-center">
          {n}
        </div>
        {!last && <div className="flex-1 w-px bg-[#ebebeb] mt-2" />}
      </div>
      <div className={`pb-8 flex-1 min-w-0 ${last ? "pb-0" : ""}`}>
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

/* ── Metadata table ── */
const METADATA_FIELDS = [
  { col: "id",          desc: "ID unik dokumen — auto-generate atau manual." },
  { col: "type",        desc: "Jenis dokumen: RKPD, RPJMD, LAKIP, dst." },
  { col: "title",       desc: "Judul lengkap dokumen." },
  { col: "owner",       desc: "Bidang penanggung jawab." },
  { col: "period_year", desc: "Tahun periode dokumen." },
  { col: "description", desc: "Deskripsi singkat isi dokumen." },
  { col: "link",        desc: "Link Google Drive yang dapat dibagikan." },
  { col: "published",   desc: "TRUE / FALSE — status publikasi ke Pandu." },
];

export default function AdminTab() {
  return (
    <div>
      <DocHeading>Panduan Administrator.</DocHeading>
      <DocLead>
        Panduan lengkap untuk mengelola dokumen, standarisasi metadata, dan memastikan
        kualitas konten yang tersaji melalui Pandu.
      </DocLead>

      {/* Role overview */}
      <DocH2 id="peran">Peran &amp; Tanggung Jawab</DocH2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {[
          "Mengelola dan mengatur dokumen produk Bappeda",
          "Memastikan standarisasi penamaan dan struktur file",
          "Mengupdate metadata dokumen di Google Sheet",
          "Menjaga kualitas dan akurasi informasi",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-[#4d4d4d]">
            <CheckCircle className="w-4 h-4 text-[#171717] flex-shrink-0 mt-0.5" />
            {item}
          </div>
        ))}
      </div>

      {/* Workflow */}
      <DocH2 id="alur-kerja">Alur Kerja Pengelolaan Dokumen</DocH2>
      <div className="mt-6">
        <Step n="1" title="Persiapan Dokumen">
          <p>
            PIC Bidang menyiapkan dokumen dalam format PDF (jika memungkinkan) lalu mengirimnya
            ke Administrator melalui email:
          </p>
          <CodeBlock>far.bppddum@gmail.com</CodeBlock>
        </Step>

        <Step n="2" title="Standarisasi Nama File">
          <p>
            Ganti nama file sesuai format berikut sebelum upload:
          </p>
          <CodeBlock>JENIS_DOKUMEN-TAHUN-INSTANSI/OPD.pdf</CodeBlock>
          <p className="text-xs font-mono text-[#888888] mb-2">Contoh valid:</p>
          <div className="border border-[#ebebeb] rounded-lg divide-y divide-[#ebebeb] overflow-hidden">
            {[
              "RKPD 2025 Kota Dumai.pdf",
              "Perubahan RPJMD 2025-2029 Kota Dumai pada 2027.pdf",
              "RPJPD 2025-2045 Kota Dumai.pdf",
            ].map((f) => (
              <div key={f} className="px-4 py-2.5 font-mono text-xs text-[#171717] bg-[#fafafa]">
                {f}
              </div>
            ))}
          </div>
        </Step>

        <Step n="3" title="Upload ke Google Drive">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Buka folder <strong className="font-semibold text-[#171717]">Arsip Dokumen</strong></li>
            <li>Pilih subfolder berdasarkan kepemilikan dokumen</li>
            <li>Upload file yang telah distandarisasi</li>
            <li>
              Set akses ke:{" "}
              <InlineCode>Anyone with the link → Viewer</InlineCode>
            </li>
          </ul>
        </Step>

        <Step n="4" title="Update Metadata di Google Sheet">
          <p className="mb-3">Isi kolom-kolom berikut pada database metadata:</p>
          <div className="border border-[#ebebeb] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fafafa] border-b border-[#ebebeb]">
                  <th className="text-left px-4 py-2.5 text-xs font-mono text-[#888888] font-normal w-36">
                    Kolom
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs text-[#888888] font-normal">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebebeb]">
                {METADATA_FIELDS.map((row) => (
                  <tr key={row.col} className="hover:bg-[#fafafa] transition-colors">
                    <td className="px-4 py-2.5">
                      <InlineCode>{row.col}</InlineCode>
                    </td>
                    <td className="px-4 py-2.5 text-[#4d4d4d] text-xs leading-relaxed">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Step>

        <Step n="5" title="Verifikasi & Publikasi" last>
          <p className="mb-3">Lakukan pengecekan akhir sebelum mempublikasikan:</p>
          <div className="space-y-2">
            {[
              "Link dokumen dapat diakses dari browser",
              "Metadata lengkap dan akurat di semua kolom",
              "Nama file mengikuti format standar",
            ].map((check) => (
              <div key={check} className="flex items-center gap-2 text-sm text-[#4d4d4d]">
                <CheckCircle className="w-4 h-4 text-[#171717] flex-shrink-0" />
                {check}
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm text-[#4d4d4d]">
              <CheckCircle className="w-4 h-4 text-[#171717] flex-shrink-0" />
              Ubah kolom <InlineCode>published</InlineCode> menjadi{" "}
              <InlineCode>TRUE</InlineCode>
            </div>
          </div>
        </Step>
      </div>

      {/* Warnings */}
      <DocH2 id="hal-penting">Hal Penting</DocH2>

      <Callout type="warning">
        Jangan mengubah struktur folder yang sudah ada. Pastikan dokumen tidak mengandung
        informasi rahasia. Selalu backup dokumen sebelum menghapus.
      </Callout>

      <Callout type="danger">
        Hanya dokumen dengan{" "}
        <InlineCode>published = TRUE</InlineCode> yang akan ditampilkan oleh Pandu kepada
        pengguna.
      </Callout>

      <Callout type="tip">
        Update metadata segera setelah upload, gunakan deskripsi yang jelas, dan periksa
        link secara berkala untuk memastikan masih aktif.
      </Callout>

      {/* Troubleshooting */}
      <DocH2 id="troubleshooting">Troubleshooting</DocH2>
      <div className="border border-[#ebebeb] rounded-lg divide-y divide-[#ebebeb] overflow-hidden">
        {[
          {
            problem: "Link tidak bisa diakses",
            solution: (
              <>
                Pastikan setting share Google Drive adalah{" "}
                <InlineCode>Anyone with the link → Viewer</InlineCode>.
              </>
            ),
          },
          {
            problem: "Dokumen tidak muncul di Pandu",
            solution: (
              <>
                Periksa apakah kolom <InlineCode>published</InlineCode> sudah diset{" "}
                <InlineCode>TRUE</InlineCode> dan semua metadata terisi.
              </>
            ),
          },
          {
            problem: "Duplikasi data di Sheet",
            solution: (
              <>
                Gunakan ID yang unik untuk setiap dokumen. Periksa kolom{" "}
                <InlineCode>id</InlineCode> untuk duplikat.
              </>
            ),
          },
        ].map((row) => (
          <div key={row.problem} className="px-4 py-4">
            <p className="text-sm font-semibold text-[#171717] mb-1">{row.problem}</p>
            <p className="text-sm text-[#4d4d4d] leading-relaxed">{row.solution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
