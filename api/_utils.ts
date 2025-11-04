import { VercelRequest, VercelResponse } from '@vercel/node';
import { apiStorage as storage } from './storage';

export interface ApiHandler {
  (req: VercelRequest, res: VercelResponse): Promise<void>;
}

export function createApiHandler(handler: ApiHandler): ApiHandler {
  return async (req: VercelRequest, res: VercelResponse) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    try {
      await handler(req, res);
    } catch (error: any) {
      console.error('API Error:', error);
      res.status(500).json({ 
        error: error.message || 'Internal Server Error' 
      });
    }
  };
}

export { storage };
