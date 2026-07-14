import { generateText } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    if (!query || typeof query !== 'string' || !query.trim()) {
      return Response.json({ error: 'A search query is required.' }, { status: 400 })
    }

    const { text, sources } = await generateText({
      model: 'openai/gpt-4o-mini-search-preview',
      system:
        'You are Synapse, an AI recruiting assistant. Answer the user query using up-to-date web results. ' +
        'Be concise and factual. Use short paragraphs or bullet points. When relevant to hiring, talent, ' +
        'salaries, or the job market, frame the answer for a recruiter audience.',
      prompt: query,
    })

    const cleanSources = (sources ?? [])
      .filter((s) => s.sourceType === 'url' && s.url)
      .map((s) => ({
        url: s.url,
        title: s.title || new URL(s.url).hostname.replace(/^www\./, ''),
      }))

    return Response.json({ text, sources: cleanSources })
  } catch (err) {
    console.log('[v0] search error:', err instanceof Error ? err.message : err)
    return Response.json(
      { error: 'Search failed. Please try again in a moment.' },
      { status: 500 },
    )
  }
}
