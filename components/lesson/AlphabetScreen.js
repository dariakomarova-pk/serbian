export default function AlphabetScreen({ data }) {
  const { note, letters } = data

  return (
    <div className="py-4 pb-8">
      <p className="text-sm text-gray-60 mb-4 leading-relaxed">{note}</p>

      <div className="flex flex-col gap-px">
        {letters.map((letter) => (
          <div
            key={letter.latin}
            className={`flex items-center gap-3 px-3 py-2.5 border border-gray-20 ${
              letter.isNew ? 'bg-blue-10 border-blue-20' : 'bg-white'
            }`}
          >
            <span
              className={`font-mono font-semibold text-sm w-12 shrink-0 ${
                letter.isNew ? 'text-blue-60' : 'text-gray-100'
              }`}
            >
              {letter.latin}
            </span>
            <span className="text-sm text-gray-60 w-28 shrink-0">{letter.sound}</span>
            <span className="text-sm text-gray-40 italic">{letter.example}</span>
            {letter.isNew && (
              <span className="ml-auto text-xs font-medium text-blue-60 bg-blue-20 px-1.5 py-0.5 shrink-0">
                NEW
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
