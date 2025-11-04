import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../../lib/_utils';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'PATCH') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'Machine ID is required' });
    return;
  }

  const machine = await storage.updateMachine(id, req.body);
  
  if (!machine) {
    res.status(404).json({ error: 'Machine not found' });
    return;
  }
  
  res.json(machine);
});

export default handler;
