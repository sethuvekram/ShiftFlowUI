import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../_utils';
import { insertHandoverSchema } from '../validation';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    const { status } = req.query;
    const handovers = status === "pending"
      ? await storage.getPendingHandovers()
      : await storage.getHandovers();
    res.json(handovers);
    return;
  }

  if (req.method === 'POST') {
    const parsed = insertHandoverSchema.parse(req.body);
    const handover = await storage.createHandover(parsed);
    res.status(201).json(handover);
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
});

export default handler;
