export default function VocabularyScreen({ data }) {
  const { words, note } = data

  return (
    <div className="py-4 pb-8">
      {note && (
        <div className="bg-blue-10 border border-blue-20 px-4 py-3 mb-4">
          <p className="text-sm text-blue-70 leading-relaxed">{note}</p>
        </div>
      )}

      <div className="bg-white border border-gray-20 flex flex-col divide-y divide-gray-20">
        {words.map((word) => (
          <div key={word.word} className="flex items-center gap-3 px-4 py-3">
            <span className="text-xl w-8 text-center shrink-0">{word.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-100">{word.stress || word.word}</div>
              <div className="text-xs text-gray-50 mt-0.5">
                {word.transcription}
                <span className="mx-1.5 text-gray-30">·</span>
                {word.translation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
