import fetch from 'cross-fetch';
import { Token } from 'types';

function encodeBody(body: Object): string {
  return Object.entries(body)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
}

class SpotifyError extends Error {
  public code: string;

  constructor(error: Record<string, string>) {
    super(error.error_description);
    this.name = 'SpotifyError';
    this.code = error.error;
  }
}

/**
 * Get authorization token
 *
 * @export
 * @param {string} code Authorization code
 * @returns {Promise<Token>} Spotify token
 */
export async function getToken(code: string): Promise<Token> {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`,
  ).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeBody({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.CALLBACK_URL,
    }),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new SpotifyError(error);
  }

  return response.json();
}
