import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../../lib/_utils';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const shift = await storage.getCurrentShift();
  res.json(shift);
});

export default handler;
