import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApiHandler, storage } from '../_utils';

const handler = createApiHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  const user = await storage.getUserByUsername(username);
  
  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  res.json({ 
    user: { 
      id: user.id, 
      username: user.username, 
      role: user.role, 
      fullName: user.fullName 
    } 
  });
});

export default handler;
