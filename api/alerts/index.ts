import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../_utils';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    const { active } = req.query;
    const alerts = active === "true"
      ? await storage.getActiveAlerts()
      : await storage.getAlerts();
    res.json(alerts);
    return;
  }

  if (req.method === 'POST') {
    const { message, severity } = req.body;
    if (!message || !severity) {
      res.status(400).json({ error: 'Message and severity are required' });
      return;
    }
    const alert = await storage.createAlert(message, severity);
    res.status(201).json(alert);
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
});

export default handler;
