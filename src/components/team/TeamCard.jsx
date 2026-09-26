import { MonogramAvatar } from '../ui/MonogramAvatar'
import { Icon } from '../ui/IconBox'
import { cn } from '../../lib/cn'

/**
 * One team member. Entrance animation is owned by the parent RevealGroup so the
 * grid staggers as a unit; this component only handles hover states.
 *
 * Social buttons render only when a real profile URL exists, so the card never
 * shows a link that goes nowhere.
 */
export function TeamCard({ member, onViewProfile }) {
  const { name, role, summary, skills, initials, image, location, linkedin, github } = member
  const visibleSkills = skills.slice(0, 4)
  const overflow = skills.length - visibleSkills.length

  return (
    <article className="group surface-card relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-signal-400/35">
      {/* Accent hairline that draws in on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-400 via-signal-400/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-ink-850 sm:aspect-[16/10]">
        <MonogramAvatar
          name={name}
          initials={initials}
          image={image}
          rounded="rounded-none"
          className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-fog-50">{name}</h3>
            <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.12em] text-signal-300 uppercase">
              {role}
            </p>
          </div>

          {location ? (
            <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-ink-900/80 px-2 py-1 text-[0.6875rem] text-fog-400">
              <Icon name="MapPin" className="size-3" strokeWidth={1.75} />
              {location}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-fog-400">{summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {visibleSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-line bg-ink-850/80 px-2.5 py-1 text-xs text-fog-300"
            >
              {skill}
            </li>
          ))}
          {overflow > 0 ? (
            <li className="rounded-md border border-line-soft bg-ink-850/50 px-2.5 py-1 text-xs text-fog-600">
              +{overflow}
            </li>
          ) : null}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onViewProfile(member)}
            className="group/btn relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-lg border border-line bg-ink-800 px-3.5 text-[0.8125rem] font-medium text-fog-50 transition-colors hover:border-signal-400/50 hover:text-signal-300"
          >
            View Profile
            <Icon
              name="ArrowRight"
              className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
              strokeWidth={2}
            />
          </button>

          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${name} on LinkedIn — opens in a new tab`}
              className={cn(
                'inline-flex size-9 items-center justify-center rounded-lg border border-line',
                'bg-ink-800 text-fog-300 transition-colors hover:border-signal-400/50 hover:text-signal-300',
              )}
            >
              <Icon name="Linkedin" className="size-3.5" strokeWidth={1.75} />
            </a>
          ) : null}

          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${name} on GitHub — opens in a new tab`}
              className={cn(
                'inline-flex size-9 items-center justify-center rounded-lg border border-line',
                'bg-ink-800 text-fog-300 transition-colors hover:border-signal-400/50 hover:text-signal-300',
              )}
            >
              <Icon name="Github" className="size-3.5" strokeWidth={1.75} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default TeamCard
