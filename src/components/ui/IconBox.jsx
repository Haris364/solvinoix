import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Blocks,
  Bot,
  BrainCircuit,
  Braces,
  CalendarCheck,
  Check,
  ChevronDown,
  Database,
  FileText,
  Globe,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Monitor,
  Network,
  Phone,
  Plug,
  Quote,
  Send,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
  ChartNoAxesCombined,
  CircleCheck,
  CircleDot,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { brandIcons } from './brandIcons'

/**
 * Icons referenced by name from the data layer. Keeping the map here means
 * data files stay serialisable and the bundle only includes what is listed.
 */
const iconMap = {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Blocks,
  Bot,
  BrainCircuit,
  Braces,
  CalendarCheck,
  Check,
  ChevronDown,
  Database,
  FileText,
  Globe,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Monitor,
  Network,
  Phone,
  Plug,
  Quote,
  Send,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
  ChartNoAxesCombined,
  CircleCheck,
  CircleDot,
  // Social marks come from our own inline set (not part of lucide v1).
  ...brandIcons,
}

/** Renders a Lucide icon by name, falling back to a neutral glyph. */
export function Icon({ name, ...props }) {
  const Component = iconMap[name] ?? Blocks
  return <Component aria-hidden="true" {...props} />
}

/** Square icon container used in cards and lists. */
export function IconBox({ icon, size = 'md', tone = 'signal', className }) {
  const sizes = {
    sm: 'size-9 rounded-md [&_svg]:size-4',
    md: 'size-11 rounded-lg [&_svg]:size-5',
    lg: 'size-14 rounded-xl [&_svg]:size-6',
  }

  const tones = {
    signal: 'border-signal-400/25 bg-signal-400/10 text-signal-300',
    neutral: 'border-line bg-ink-800/80 text-fog-200',
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center border',
        sizes[size],
        tones[tone],
        className,
      )}
    >
      <Icon name={icon} strokeWidth={1.75} />
    </span>
  )
}

export default IconBox
