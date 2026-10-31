// Learn Lab UI kit. Polished building blocks for visual, interactive lessons.
// Claude uses these in src/App.jsx so every lesson looks good and feels the same.
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, X } from 'lucide-react'

// ---------- Page and steps ----------

// steps: [{ title: 'Prophase', content: <Step ... /> }]
export function Lesson({ title, subtitle, steps }) {
  const [i, setI] = useState(0)
  const last = i === steps.length - 1
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1 text-lg text-slate-600">{subtitle}</p>}
          <nav className="mt-5 flex flex-wrap gap-2">
            {steps.map((s, n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                  n === i
                    ? 'bg-indigo-600 text-white shadow'
                    : n < i
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:ring-indigo-300'
                }`}
              >
                {n + 1}. {s.title}
              </button>
            ))}
          </nav>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full bg-indigo-500"
              animate={{ width: `${((i + 1) / steps.length) * 100}%` }}
            />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {steps[i].content}
          </motion.section>
        </AnimatePresence>

        <footer className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setI(i - 1)}
            disabled={i === 0}
            className="inline-flex items-center gap-1 rounded-xl px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-30"
          >
            <ChevronLeft size={18} /> Back
          </button>
          {!last && (
            <div className="flex gap-2">
              <button onClick={() => setI(i + 1)} className="rounded-xl px-4 py-2 font-medium text-slate-500 hover:bg-slate-100">
                Skip
              </button>
              <button
                onClick={() => setI(i + 1)}
                className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-indigo-700"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  )
}

// One step: a big visual on top, short text and controls below.
export function Step({ visual, children }) {
  return (
    <div className="grid gap-6">
      <Stage>{visual}</Stage>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  )
}

// The card that holds a visual (SVG, chart, animation).
export function Stage({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 ${className}`}>
      {children}
    </div>
  )
}

// ---------- Text ----------

export function Explain({ children }) {
  return <div className="space-y-3 text-lg leading-relaxed text-slate-700">{children}</div>
}

export function KeyIdea({ children }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-200">
      <Lightbulb className="mt-0.5 shrink-0" size={20} />
      <div className="leading-relaxed">{children}</div>
    </div>
  )
}

// ---------- Controls ----------

export function Slider({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) {
  return (
    <label className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="mb-2 flex justify-between text-sm font-medium text-slate-700">
        <span>{label}</span>
        <span className="tabular-nums text-indigo-600">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </label>
  )
}

// options: ['Plant', 'Animal'] or [{ label: 'Plant', value: 'plant' }]
export function Choice({ label, options, value, onChange }) {
  const items = options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o))
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      {label && <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>}
      <div className="flex flex-wrap gap-2">
        {items.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium transition ${
              value === o.value ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Toggle({ label, checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200"
    >
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-indigo-600' : 'bg-slate-300'}`}>
        <motion.span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          animate={{ left: checked ? 22 : 2 }}
        />
      </span>
    </button>
  )
}

// ---------- Quiz: every question has a visual ----------

// Two kinds of questions:
// 1. Interactive: the student changes the visual, then presses Check.
//    { prompt, initial, render: (value, setValue, { checked }) => <svg/>, isCorrect: (value) => bool, explain }
// 2. Visual choice: each option is a small picture (or one shared picture above the options).
//    { prompt, visual?: <svg/>, options: [{ label, visual? }], answer: 1, explain }
export function Quiz({ questions }) {
  const [n, setN] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Your score</p>
        <p className="mt-2 text-5xl font-bold text-slate-900">
          {score} / {questions.length}
        </p>
        <p className="mt-2 text-slate-600">{score === questions.length ? 'Perfect! 🎉' : 'Nice work. Try again to get them all.'}</p>
        <button
          onClick={() => {
            setN(0)
            setScore(0)
            setDone(false)
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-indigo-700"
        >
          <RotateCcw size={18} /> Try again
        </button>
      </div>
    )
  }

  return (
    <Question
      key={n}
      q={questions[n]}
      index={n}
      total={questions.length}
      onNext={(correct) => {
        if (correct) setScore((s) => s + 1)
        if (n + 1 < questions.length) setN(n + 1)
        else setDone(true)
      }}
    />
  )
}

function Question({ q, index, total, onNext }) {
  const isChoice = Array.isArray(q.options)
  const [value, setValue] = useState(isChoice ? null : q.initial)
  const [checked, setChecked] = useState(false)
  const correct = isChoice ? value === q.answer : q.isCorrect(value)

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        Try it · Question {index + 1} of {total}
      </p>
      <h3 className="mt-1 text-xl font-semibold text-slate-900">{q.prompt}</h3>

      {isChoice ? (
        <>
          {q.visual && <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">{q.visual}</div>}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {q.options.map((o, i) => {
              const state = !checked
                ? value === i
                  ? 'ring-2 ring-indigo-500 bg-indigo-50'
                  : 'ring-1 ring-slate-200 hover:ring-indigo-300'
                : i === q.answer
                  ? 'ring-2 ring-emerald-500 bg-emerald-50'
                  : value === i
                    ? 'ring-2 ring-rose-400 bg-rose-50'
                    : 'ring-1 ring-slate-200 opacity-60'
              return (
                <button
                  key={i}
                  disabled={checked}
                  onClick={() => setValue(i)}
                  className={`rounded-2xl p-3 text-left transition ${state}`}
                >
                  {o.visual && <div className="mb-2">{o.visual}</div>}
                  <span className="font-medium text-slate-800">{o.label}</span>
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          {q.render(value, checked ? () => {} : setValue, { checked })}
        </div>
      )}

      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 flex gap-3 rounded-2xl p-4 ${correct ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}
          >
            {correct ? <Check className="shrink-0" /> : <X className="shrink-0" />}
            <div>
              <p className="font-semibold">{correct ? 'Correct!' : 'Not quite.'}</p>
              {q.explain && <p className="mt-1 leading-relaxed">{q.explain}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex justify-end">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={isChoice && value === null}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-40"
          >
            Check
          </button>
        ) : (
          <button
            onClick={() => onNext(correct)}
            className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white shadow hover:bg-slate-800"
          >
            {index + 1 < total ? 'Next question' : 'See score'} <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
