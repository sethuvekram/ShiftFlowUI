import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../_utils';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'PATCH') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'Handover ID is required' });
    return;
  }

  const handover = await storage.updateHandover(id, req.body);
  
  if (!handover) {
    res.status(404).json({ error: 'Handover not found' });
    return;
  }
  
  res.json(handover);
});

export default handler;
