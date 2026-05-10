export default function SpecialLettersScreen({ data }) {
  const { note, letters } = data

  return (
    <div className="py-4 pb-8">
      <p className="text-sm text-gray-60 mb-4 leading-relaxed">{note}</p>

      <div className="flex flex-col gap-3">
        {letters.map((letter) => (
          <div key={letter.latin} className="bg-white border border-gray-20 p-4">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono font-semibold text-lg text-blue-60">
                {letter.latin}
              </span>
              <span className="text-sm text-gray-60">→ {letter.transcription}</span>
            </div>
            <div className="flex flex-col gap-1">
              {letter.examples.map((ex) => (
                <span key={ex} className="text-xs text-gray-50">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
