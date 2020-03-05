import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY
} from 'http-status-codes';
import { getToken } from 'libs/spotify';
import { NextHttpHandler } from 'types';

const handler: NextHttpHandler = async (req, res) => {
  const code = (req.method === 'POST'
    ? req.body.code
    : req.query.code) as string;
  const redirect_uri = req.body?.redirect_uri ?? process.env.CALLBACK_URL;

  if (!code)
    return res
      .status(BAD_REQUEST)
      .json({ message: 'Missing authorization code' });

  if (typeof code !== 'string')
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message: 'Authorization code should be a string' });

  if (
    req.method === 'POST' &&
    req.body?.client_id !== process.env.SPOTIFY_CLIENT_ID
  )
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message: 'Invalid client id' });

  try {
    const token = await getToken(code, redirect_uri);
    res.setHeader('Authorization', `${token.token_type} ${token.access_token}`);
    res.json(token);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export default handler;
