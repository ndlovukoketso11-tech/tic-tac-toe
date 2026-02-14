// Minimal WebAudio sound utility — no external files required
const ctx = typeof window !== 'undefined' && new (window.AudioContext || window.webkitAudioContext)()

function playTone(freq = 440, type = 'sine', duration = 0.12, volume = 0.08) {
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.value = 0
  o.connect(g)
  g.connect(ctx.destination)
  const now = ctx.currentTime
  g.gain.cancelScheduledValues(now)
  g.gain.setValueAtTime(0, now)
  g.gain.linearRampToValueAtTime(volume, now + 0.005)
  o.start(now)
  g.gain.linearRampToValueAtTime(0.0001, now + duration)
  o.stop(now + duration + 0.02)
}

export function playClick() {
  playTone(880, 'square', 0.06, 0.08)
}

export function playAIMove() {
  playTone(600, 'sawtooth', 0.09, 0.06)
}

export function playWin() {
  // simple ascending arpeggio
  playTone(660, 'sine', 0.12, 0.09)
  setTimeout(() => playTone(880, 'sine', 0.12, 0.09), 120)
  setTimeout(() => playTone(990, 'sine', 0.16, 0.1), 260)
}

export function playDraw() {
  playTone(330, 'triangle', 0.18, 0.06)
}

export function playTimeout() {
  playTone(220, 'sawtooth', 0.32, 0.12)
}

export default { playClick, playAIMove, playWin, playDraw, playTimeout }
