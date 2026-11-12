const NEW_ARTIST_PERIOD_MS = 7 * 24 * 60 * 60 * 1000;

function isNewArtist(createdAt: Date | string): boolean {
  const addedAt = new Date(createdAt).getTime();
  return (
    Number.isFinite(addedAt) && Date.now() - addedAt <= NEW_ARTIST_PERIOD_MS
  );
}

export { isNewArtist };
