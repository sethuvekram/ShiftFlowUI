import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../_utils';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const shifts = await storage.getShifts();
  res.json(shifts);
});

export default handler;
