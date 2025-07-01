import { Artist } from '@/shared/types/artist';
import { Response } from '@/shared/types/response';
import { API } from './api.config';
import { SearchParams } from '@/shared/types/search-params';

async function getArtistsPaginated(
  params: SearchParams
): Promise<Response<Artist[]>> {
  const query = new URLSearchParams();

  if (params.page) query.append('page', params.page.toString());
  if (params.perPage) query.append('perPage', params.perPage.toString());
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.q) query.append('username', params.q);
  if (params.country) query.append('country', params.country);
  if (params.tags && Array.isArray(params.tags)) {
    params.tags.forEach(tag =>
      query.append('tags', tag.toLowerCase().replace(/ /g, ''))
    );
  }

  try {
    const response = await fetch(
      `${API.URL}/artists/search?${query.toString()}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.items || data.errors) {
      throw new Error('Invalid response data');
    }

    return data as Response<Artist[]>;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
}

async function getArtistProfile(twitterUserId: string): Promise<Artist> {
  try {
    const response = await fetch(`${API.URL}/artists/search/${twitterUserId}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error('Invalid response data');
    }

    return data as Artist;
  } catch (error) {
    console.error('Error fetching artist profile:', error);
    throw error;
  }
}

async function getArtistProfileByUsername(username: string): Promise<Artist> {
  try {
    const response = await fetch(
      `${API.URL}/artists/search/username/${username}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error('Invalid response data');
    }

    return data as Artist;
  } catch (error) {
    console.error('Error fetching artist profile:', error);
    throw error;
  }
}

async function getArtistUsernames() {
  try {
    const response = await fetch(
      `${API.URL}/artists/search/username/usernames`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error('Invalid response data');
    }

    return data as { items: string[] };
  } catch (error) {
    console.error('Error fetching artist usernames:', error);
    throw error;
  }
}

export const $API = {
  getArtistsPaginated,
  getArtistProfile,
  getArtistProfileByUsername,
  getArtistUsernames,
};
