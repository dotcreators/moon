import { HTMLAttributes, useMemo } from 'react';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

function FormatBio({
  className,
  text,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { text: string }) {
  const regexTags = /(^|\s)(@\w+)/g;
  const regexLinks = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
  const regexEmail = /[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+/g;
  const parts = useMemo(() => {
    return text.split(
      /(https?:\/\/[^\s/$.?#].[^\s]*|@\w+|[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+)/g
    );
  }, [text]);

  return (
    <p className={twJoin('whitespace-pre-line', className)} {...props}>
      {parts.map((part, index) => {
        if (new RegExp(regexEmail).test(part)) {
          return part;
        } else if (new RegExp(regexTags).test(part)) {
          const username = part.trim().slice(1);
          return (
            <Link
              key={`tag-${index}`}
              target="_blank"
              href={`https://x.com/${username}`}
              passHref={true}
              className="text-red-01"
            >
              @{username}
            </Link>
          );
        } else if (new RegExp(regexLinks).test(part)) {
          return (
            <Link
              key={`link-${index}`}
              target="_blank"
              href={part}
              passHref={true}
              className="text-red-01"
            >
              {part.replace(/https?:\/\/(www\.)?|\/$/g, '')}
            </Link>
          );
        }
        return part;
      })}
    </p>
  );
}

export { FormatBio };
