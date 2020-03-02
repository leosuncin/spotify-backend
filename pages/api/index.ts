import { NextHttpHandler } from 'types';

const handler: NextHttpHandler = (_, res) => {
  res.json(process.env);
};

export default handler
