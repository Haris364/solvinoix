import { GithubIcon, LinkedinIcon, XIcon } from './BrandIcon'

/**
 * Brand-mark lookup keyed by the icon names referenced in the data layer, so
 * `site.js` and `team.js` can stay serialisable plain data.
 */
export const brandIcons = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: XIcon,
}

export default brandIcons
