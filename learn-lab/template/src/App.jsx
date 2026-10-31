import { Sparkles } from 'lucide-react'

export default function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-indigo-50 to-white">
      <div className="text-center">
        <Sparkles className="mx-auto text-indigo-500" size={40} />
        <p className="mt-3 text-xl font-semibold text-slate-800">Ask for a topic</p>
        <p className="mt-1 text-slate-500">Your interactive lesson appears here.</p>
      </div>
    </main>
  )
}
