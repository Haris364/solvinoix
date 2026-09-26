import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { useMediaQuery } from '../../lib/useMediaQuery'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Node layout for the hero visualisation, authored in a 520x520 viewBox.
 * `core` sits at the centre; the four disciplines orbit it.
 */
const NODES = [
  { id: 'ai', label: 'AI', x: 260, y: 96, r: 30, core: false },
  { id: 'software', label: 'Software', x: 424, y: 216, r: 32, core: false },
  { id: 'data', label: 'Data', x: 372, y: 396, r: 30, core: false },
  { id: 'automation', label: 'Automation', x: 148, y: 396, r: 34, core: false },
  { id: 'core', label: 'Solvionix', x: 260, y: 258, r: 46, core: true },
]

const EDGES = [
  ['core', 'ai'],
  ['core', 'software'],
  ['core', 'data'],
  ['core', 'automation'],
  ['ai', 'software'],
  ['software', 'data'],
  ['data', 'automation'],
  ['automation', 'ai'],
]

function point(id) {
  return NODES.find((node) => node.id === id)
}

/** Quadratic curve between two nodes, bowed away from the centre. */
function edgePath(from, to) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cx = mx - dy * 0.16
  const cy = my + dx * 0.16
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

export function HeroNetwork({ className }) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { amount: 0.35 })
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const animate = inView && !reduceMotion
  const activeEdges = isDesktop ? EDGES : EDGES.slice(0, 4)
  const activeNodes = isDesktop ? NODES : NODES.filter((node) => node.core || node.id === 'ai' || node.id === 'data')

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox="0 0 520 520"
        className="size-full"
        role="img"
        aria-label="Diagram of a connected Solvionix system linking AI, software, data and automation."
      >
        <defs>
          <radialGradient id="hn-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hn-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <g aria-hidden="true">
          {[96, 148, 200, 252].map((radius, index) => (
            <circle
              key={radius}
              cx="260"
              cy="258"
              r={radius}
              fill="none"
              stroke="#ffffff"
              strokeOpacity={0.05 - index * 0.008}
              strokeWidth="1"
            />
          ))}
        </g>

        <g aria-hidden="true">
          {activeEdges.map(([fromId, toId], index) => {
            const from = point(fromId)
            const to = point(toId)
            return (
              <g key={`${fromId}-${toId}`}>
                <path
                  id={`hn-edge-${fromId}-${toId}`}
                  d={edgePath(from, to)}
                  fill="none"
                  stroke="url(#hn-line)"
                  strokeWidth="1.25"
                />
                <circle r="3" fill="#7dd3fc">
                  <animateMotion
                    dur="3.4s"
                    begin={animate ? `${index * 0.42}s` : '0s'}
                    repeatCount="indefinite"
                    path={edgePath(from, to)}
                    keyPoints="0;1;0"
                    keyTimes="0;0.5;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                    opacity={animate ? 0.9 : 0}
                  />
                </circle>
              </g>
            )
          })}
        </g>

        <g aria-hidden="true">
          <circle cx="260" cy="258" r="150" fill="url(#hn-core)" />
        </g>

        {activeNodes.map((node, index) => {
          const isCore = node.core
          return (
            <g key={node.id}>
              {animate ? (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  opacity="0"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  <animate
                    attributeName="r"
                    from={node.r}
                    to={node.r + 34}
                    dur="3.6s"
                    begin={`${index * 0.5}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0"
                    dur="3.6s"
                    begin={`${index * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ) : null}

              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.2 + index * 0.09, ease: EASE }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                fill={isCore ? 'rgba(56,189,248,0.14)' : 'rgba(10,13,20,0.86)'}
                stroke={isCore ? 'rgba(56,189,248,0.7)' : 'rgba(255,255,255,0.14)'}
                strokeWidth={isCore ? 1.5 : 1}
              />

              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isCore ? '#7dd3fc' : '#c8ced8'}
                fontFamily="'JetBrains Mono Variable', ui-monospace, monospace"
                fontSize={isCore ? 13 : 11}
                fontWeight="500"
                letterSpacing="0.5"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default HeroNetwork
