export default function TheoryScreen({ data }) {
  const { title, explanation, keyRule } = data

  return (
    <div className="py-4 pb-8">
      <h2 className="text-base font-semibold text-gray-100 mb-4">{title}</h2>

      <p className="text-sm text-gray-80 leading-relaxed whitespace-pre-wrap mb-4">
        {explanation}
      </p>

      {keyRule && (
        <div className="border-l-2 border-blue-60 pl-4 py-2 bg-blue-10">
          <p className="text-xs font-medium text-blue-70 uppercase tracking-wide mb-1">
            Главное правило
          </p>
          <p className="text-sm font-semibold text-blue-60">{keyRule}</p>
        </div>
      )}
    </div>
  )
}
