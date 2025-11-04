import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../_utils';
import { insertLogEntrySchema } from '../validation';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    const { shiftId } = req.query;
    const entries = shiftId 
      ? await storage.getLogEntriesByShift(shiftId as string)
      : await storage.getLogEntries();
    res.json(entries);
    return;
  }

  if (req.method === 'POST') {
    const parsed = insertLogEntrySchema.parse(req.body);
    const entry = await storage.createLogEntry(parsed);
    res.status(201).json(entry);
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
});

export default handler;
