# ShiftFlowUI - Vercel Deployment Guide

A modern manufacturing shift management system built with React, Express.js, and optimized for Vercel deployment.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/shiftflowui)

## 📋 Prerequisites

- Node.js 18+ (Vercel compatible)
- Neon PostgreSQL database
- Vercel account

## 🔧 Deployment Steps

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd ShiftFlowUI
npm install
```

### 2. Environment Variables

Create a `.env.local` file or set in Vercel dashboard:

```bash
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_super_secret_key
NODE_ENV=production
```

### 3. Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Alternative: Deploy via GitHub

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy automatically

## 🏗️ Project Structure

```
ShiftFlowUI/
├── api/                    # Vercel serverless functions
│   ├── auth/
│   ├── shifts/
│   ├── machines/
│   ├── handovers/
│   ├── alerts/
│   └── _utils.ts          # Shared utilities
├── client/                # React frontend
│   ├── src/
│   ├── dist/              # Build output
│   └── index.html
├── server/                # Original Express server (dev only)
├── shared/                # Shared types and schemas
├── vercel.json           # Vercel configuration
└── deploy.sh            # Deployment script
```

## 🔌 API Routes (Serverless)

All Express.js routes have been converted to Vercel serverless functions:

- `POST /api/auth/login` - Authentication
- `GET /api/shifts` - Get all shifts
- `GET /api/shifts/current` - Get current shift
- `GET/POST /api/log-entries` - Log entries management
- `GET /api/machines` - Get machines
- `PATCH /api/machines/[id]` - Update machine
- `GET/POST /api/handovers` - Handover management
- `PATCH /api/handovers/[id]` - Update handover
- `GET/POST /api/alerts` - Alert management
- `PATCH /api/alerts/[id]/resolve` - Resolve alert

## 🛠️ Build Commands

```bash
# Build client only (for Vercel)
npm run build:client

# Build everything locally
npm run build

# Development
npm run dev

# Type checking
npm run check
```

## 🌍 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `SESSION_SECRET` | Secret for session management | `your-super-secret-key` |
| `NODE_ENV` | Environment mode | `production` |

### Vercel Dashboard Setup

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each required variable
4. Redeploy if needed

## 🗄️ Database Setup

This project uses Drizzle ORM with Neon PostgreSQL:

```bash
# Push schema to database
npm run db:push
```

Make sure your Neon database is configured and accessible.

## 🚨 Troubleshooting

### Common Issues

**Build Errors:**
- Ensure Node.js version is 18+
- Check all environment variables are set
- Verify database connection

**API Not Working:**
- Check Vercel function logs
- Verify environment variables in Vercel dashboard
- Ensure database is accessible from Vercel

**Frontend Issues:**
- Clear browser cache
- Check console for errors
- Verify API endpoints are working

### Debug Commands

```bash
# Check build output
npm run build:client

# Verify types
npm run check

# Test API locally
npm run dev
```

## 📊 Performance Optimization

- ✅ Serverless functions for optimal cold starts
- ✅ Static file serving via Vercel CDN
- ✅ Automatic code splitting
- ✅ Optimized bundle size
- ✅ PostgreSQL connection pooling

## 🔒 Security Features

- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Input validation with Zod
- ✅ Session management
- ✅ SQL injection prevention

## 📱 Features

- 📊 Real-time manufacturing dashboard
- 🏭 Machine status monitoring
- 📝 Shift handover management
- 🚨 Alert system
- 📈 Production analytics
- 👥 User authentication
- 📱 Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test deployment
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**🎉 Your ShiftFlowUI is now ready for production deployment on Vercel!**
