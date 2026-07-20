import { useState } from 'react'
import { FiDownload, FiSearch, FiCheck } from 'react-icons/fi'

export function TemplatesPage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [downloadingId, setDownloadingId] = useState(null)
  const [downloadedId, setDownloadedId] = useState(null)

  const templates = [
    {
      id: 1,
      title: 'Standard Business Card Template',
      category: 'Cards',
      size: '3.5" x 2.0" (89 x 51mm)',
      formats: ['.AI', '.PSD', '.PDF'],
      specs: '3mm Bleed margin, outline safe borders, CMYK calibrated'
    },
    {
      id: 2,
      title: 'Trifold Brochure A4 Template',
      category: 'Folders',
      size: 'A4 folded to DL (210 x 99mm)',
      formats: ['.AI', '.PDF'],
      specs: 'Exact fold line indicators included, CMYK profile'
    },
    {
      id: 3,
      title: 'Rollup Banner Stand Template',
      category: 'Banners',
      size: '2.5ft x 6ft (762 x 1828mm)',
      formats: ['.AI', '.PSD', '.PDF'],
      specs: 'Includes top mounting clip-safe margin & bottom wrap margins'
    },
    {
      id: 4,
      title: 'Standard Mailer Packaging Box',
      category: 'Packaging',
      size: '8" x 6" x 3" (Interior)',
      formats: ['.AI', '.PDF'],
      specs: 'Structural folding die-cut boundaries included'
    },
    {
      id: 5,
      title: 'A5 Flyer/Pamphlet Template',
      category: 'Folders',
      size: 'A5 (148 x 210mm)',
      formats: ['.AI', '.PSD', '.PDF'],
      specs: 'Standard marketing leaflet guidelines, CMYK format'
    },
    {
      id: 6,
      title: 'Square Greeting Card Template',
      category: 'Cards',
      size: '5.5" x 5.5" Folded',
      formats: ['.AI', '.PDF'],
      specs: 'Crease folds and alignment coordinates included'
    }
  ]

  const categories = ['All', 'Cards', 'Folders', 'Packaging', 'Banners']

  const handleDownload = (id) => {
    setDownloadingId(id)
    setTimeout(() => {
      setDownloadingId(null)
      setDownloadedId(id)
      setTimeout(() => {
        setDownloadedId(null)
      }, 1500)
    }, 1200) // 1.2s mock loading speed
  }

  const filteredTemplates = templates.filter((temp) => {
    const matchesCat = filter === 'All' || temp.category === filter
    const matchesSearch = temp.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <section className="bg-[#FAF8F5] py-14 font-sans text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-gray-150 p-8 sm:p-10 mb-10 text-center sm:text-left">
          <span className="text-xs font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
            Design Assets
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-black text-slate-800 tracking-tight leading-none mb-4">
            Free Artwork Blank Templates
          </h1>
          <p className="text-gray-550 text-sm sm:text-base max-w-2xl leading-relaxed">
            Download print-ready layouts configured with appropriate dimensions and bleed offsets. Open these vectors directly in Illustrator or Photoshop.
          </p>
        </div>

        {/* Filters and Search Bar Section */}
        <div className="bg-white border border-gray-150 rounded-xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-xs font-black transition ${
                  filter === c
                    ? 'bg-[#E5AA17] text-slate-950 shadow-md shadow-amber-500/10'
                    : 'bg-slate-50 border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search bar input container */}
          <div className="relative w-full md:w-80 flex items-center bg-slate-50 border border-gray-250 rounded-lg py-2.5 px-3">
            <FiSearch className="text-gray-400 mr-2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search layout blueprints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-800 placeholder-gray-500 focus:outline-none w-full font-medium"
            />
          </div>
        </div>

        {/* Templates Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((temp) => (
            <div
              key={temp.id}
              className="bg-white rounded-xl border border-gray-150 p-6 flex flex-col justify-between hover:shadow-md hover:border-gray-250 transition-all duration-300 group"
            >
              <div>
                {/* Visual Representation box */}
                <div className="h-28 bg-[#FAF7F2] rounded-lg border border-gray-100 mb-5 flex items-center justify-center p-4 relative">
                  {/* Grid overlay background to represent design canvas */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                  
                  {/* Vector box bounding line outlines */}
                  <div className="w-[85%] h-[80%] border border-dashed border-[#E5AA17]/70 rounded flex items-center justify-center relative p-1.5 bg-white">
                    {/* Bsafe margin representation */}
                    <div className="w-full h-full border border-dotted border-gray-300 rounded flex flex-col justify-between p-2 select-none">
                      <span className="text-[7.5px] font-black text-amber-500 uppercase tracking-widest leading-none">SAFE AREA</span>
                      <span className="text-[6.5px] font-bold text-gray-450 uppercase text-right leading-none select-none">
                        {temp.category}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-2 py-0.5 rounded inline-block mb-2">
                  {temp.category}
                </span>
                <h3 className="text-[14.5px] sm:text-base font-black text-slate-850 group-hover:text-[#E5AA17] transition-colors leading-snug">
                  {temp.title}
                </h3>
                
                {/* Meta details */}
                <div className="space-y-2 mt-4 text-xs font-semibold text-gray-500 text-left border-t border-gray-50 pt-4">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Dimensions:</span>
                    <span className="text-slate-700">{temp.size}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Technical Info:</span>
                    <span className="text-slate-650 leading-relaxed text-right line-clamp-1">{temp.specs}</span>
                  </p>
                </div>
              </div>

              {/* Formats and download action row */}
              <div className="mt-8 flex justify-between items-center text-left">
                {/* Formats badges pill */}
                <div className="flex gap-1.5">
                  {temp.formats.map((f) => (
                    <span key={f} className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Downloader Button */}
                <button
                  onClick={() => handleDownload(temp.id)}
                  disabled={downloadingId !== null || downloadedId !== null}
                  className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-all ${
                    downloadedId === temp.id
                      ? 'bg-emerald-500 text-white'
                      : downloadingId === temp.id
                      ? 'bg-slate-200 text-slate-400 cursor-wait'
                      : 'bg-slate-900 hover:bg-[#E5AA17] hover:text-slate-950 text-white'
                  }`}
                >
                  {downloadedId === temp.id ? (
                    <>
                      <FiCheck className="w-3.5 h-3.5 mr-0.5 stroke-[3]" /> Saved
                    </>
                  ) : downloadingId === temp.id ? (
                    'Saving...'
                  ) : (
                    <>
                      <FiDownload className="w-3.5 h-3.5 mr-0.5" /> Download
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
