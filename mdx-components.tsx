import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    p: ({ children }) => <p className="text-gray-01 text-base">{children}</p>,
    h3: ({ children }) => (
      <h3 className="font-mona-sans text-lg">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-gray-01 bg-black-03 rounded-xl px-3 py-2 text-base">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="text-gray-01 list-disc space-y-2 pl-5 text-base">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-gray-01 list-decimal space-y-2 pl-5 text-base">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-01 text-base">{children}</li>
    ),
  };
}
