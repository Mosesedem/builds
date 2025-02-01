"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

interface AnimatedNumberProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function AnimatedNumber({ value, suffix = "", prefix = "", duration = 2000 }: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (inView) {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const progress = timestamp - startTimeRef.current

        if (progress < duration) {
          setCurrent(Math.floor((progress / duration) * value))
          requestAnimationFrame(animate)
        } else {
          setCurrent(value)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  )
}

