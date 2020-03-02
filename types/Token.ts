export type Token = {
  /**
   * An access token that can be provided in subsequent calls, for example to Spotify Web API services.
   *
   * @type {String}
   */
  access_token: string;
  /**
   * How the access token may be used: always “Bearer”.
   *
   * @type {String}
   */
  token_type: string;
  /**
   * A space-separated list of scopes which have been granted for this `access_token`
   *
   * @type {String}
   */
  scope: string;
  /**
   * The time period (in seconds) for which the access token is valid.
   *
   * @type {Integer}
   */
  expires_in: number;
  /**
   * A token that can be sent to the Spotify Accounts service in place of an authorization code.
   * (When the access code expires, send a POST request to the Accounts service /api/token endpoint,
   * but use this code in place of an authorization code. A new access token will be returned.
   * A new refresh token might be returned too.)
   *
   * @type {String}
   */
  refresh_token: string;
};
