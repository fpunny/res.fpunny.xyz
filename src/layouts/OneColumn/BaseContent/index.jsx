import { heading, subheading, content } from './BaseContent.module.scss';

export default function BaseContent({
  title,
  subtitle,
  aside,
  body,
  level: Heading = 'h3',
}) {
  return (
    <div>
      <Heading className={heading}>{ title }</Heading>
      {subtitle && <div className={subheading}>
        <p>{ subtitle }</p>
        { aside && <p>&nbsp;| { aside }</p>}
      </div>}
      <div className={content}>
        { body }
      </div>
    </div>
  )
}