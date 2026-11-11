function formatWebsite(url: string): string {
  return url.replace(/[?#].*$/, '').replace(/^https?:\/\/(www\.)?|\/$/g, '');
}

export { formatWebsite };
