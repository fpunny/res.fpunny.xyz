import ReactMarkdown from 'react-markdown';
import { ul } from './Marked.module.scss';

export default function Marked({ className, components = {}, ...props }) {
  return (
    <ReactMarkdown
      components={{
        ul: ({ node, ordered, ...props }) => <ul className={ul} {...props}/>,
        ...components,
      }}
      {...props}
    />
  );
}