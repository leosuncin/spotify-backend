import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes';
import { getProfile } from 'libs/spotify';
import { NextHttpHandler, Token } from 'types';

const handler: NextHttpHandler = async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.status(UNAUTHORIZED).json({ message: 'Invalid token' });

    const [token_type, access_token] = req.headers.authorization?.split(' ');
    const profile = await getProfile({token_type, access_token} as Token);

    res.json(profile);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export default handler;
