import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../../_utils';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'PATCH') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'Alert ID is required' });
    return;
  }

  await storage.resolveAlert(id);
  res.json({ success: true });
});

export default handler;
