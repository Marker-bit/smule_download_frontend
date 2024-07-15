import { useState } from "react"
import smuleLogo from "./assets/smule.svg"
import { ArrowRight, Loader2 } from "lucide-react"

function App() {
  const [url, setUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [resultLink, setResultLink] = useState<string>("")

  const download = async () => {
    if (!url || loading) return
    setLoading(true)
    const resp = await fetch(`/api?url=${encodeURIComponent(url)}`)
    const body = await resp.json()
    const downloadUrl = body.url
    setLoading(false)
    setResultLink(downloadUrl)
  }

  return (
    <main className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <div>
        <a href="https://smule.com" target="_blank">
          <img
            src={smuleLogo}
            className="size-32 hover:opacity-70"
            alt="Vite logo"
          />
        </a>
      </div>
      <h1 className="font-bold text-3xl">Smule Download</h1>
      <p className="text-zinc-500">
        Provide the link to the song, and we will download it.
      </p>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          download()
        }}
      >
        <input
          type="text"
          placeholder="URL of the song"
          className="rounded-xl p-2 outline-none border border-transparent focus:border-zinc-700 transition-all"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="rounded-xl p-2 bg-purple-700 text-white hover:bg-purple-800 transition-all active:scale-95 disabled:opacity-50 disabled:hover:bg-purple-700 disabled:cursor-not-allowed disabled:active:scale-100"
          disabled={!url || loading}
          // onClick={() => download()}
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </form>
      {resultLink && (
        <a
          href={resultLink}
          className="bg-purple-700 text-white hover:text-white hover:bg-purple-800 px-4 py-2 rounded-full transition-all active:scale-95 flex gap-2 items-center"
          download
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Download
        </a>
      )}
    </main>
  )
}

export default App
