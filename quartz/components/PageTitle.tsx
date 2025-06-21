import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

function slugify(title: string): string {
  return title
    .replace(/[^\w\s-]/g, "") // Remove punctuation
    .trim()
    .replace(/\s+/g, "-")     // Replace spaces with dashes
}

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const baseDir = pathToRoot(fileData.slug!)
  const imagePath = `./${slugify(title)}.png`
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={imagePath} alt={title} class="page-title-image" onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            target.src = '{baseDir}static/icon.png'
          }}
        />
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5rem; /* optional: rounded corners */
  display: block;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
