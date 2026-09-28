import { useEffect, useRef } from 'react'

// Measures the marquee track's real pixel width and exposes it as a CSS
// variable (--marquee-distance) so the loop animation can translate by an
// exact, pixel-perfect amount instead of an approximate percentage. This is
// what keeps the loop from visibly jumping/cutting when it restarts.
// `copies` is how many times the content array is duplicated in the track
// (e.g. [...data, ...data, ...data] = 3) — one full lap is 1/copies of the
// track's total scroll width.
export default function useMarqueeLoop(copies = 2) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateDistance = () => {
      const distance = track.scrollWidth / copies
      track.style.setProperty('--marquee-distance', `${distance}px`)
    }

    updateDistance()

    const observer = new ResizeObserver(updateDistance)
    observer.observe(track)

    return () => observer.disconnect()
  }, [copies])

  return trackRef
}