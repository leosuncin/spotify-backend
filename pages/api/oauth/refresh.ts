import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes';
import { refreshToken } from 'libs/spotify';
import { NextHttpHandler, Token } from 'types';

const handler: NextHttpHandler = async (req, res) => {
  const token = req.body as Token;

  try {
    if (!token || !token.refresh_token)
      return res.status(UNAUTHORIZED).json({ message: 'Invalid token' });

    const newToken = await refreshToken(token);

    res.setHeader(
      'Authorization',
      `${newToken.token_type} ${newToken.access_token}`,
    );
    res.json(newToken);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export default handler;
