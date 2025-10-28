# Digital Shift Handover Platform

A professional web application for managing shift transitions in industrial environments with digital logbooks, real-time monitoring, and supervisor approvals.

## Overview

The Digital Shift Handover Platform streamlines shift transitions by providing:
- Role-based access for Supervisors and Operators
- Real-time dashboard with shift details, tasks, and alerts
- Digital logbook for recording shift activities
- Handover approval workflow for supervisors
- Analytics and reporting with interactive charts

## Project Structure

- **Frontend**: React SPA with TypeScript, Tailwind CSS, and Shadcn UI
- **Backend**: Express.js with in-memory storage
- **Architecture**: Full-stack JavaScript application following modern best practices

## Features Implemented

### 1. Authentication & Role Selection
- Login page with role selection (Supervisor/Operator)
- Simple authentication with mock users
- Role-based access control

### 2. Shift Dashboard
- Current shift information
- Pending tasks counter
- Active alerts notifications
- Real-time machine status cards with progress bars
- Task list with priority indicators
- Alert notifications panel

### 3. Digital Logbook
- Create new log entries with task description
- Priority levels (High, Medium, Low)
- Automatic timestamps
- Remarks/notes field
- Chronological task history
- Status tracking (Pending, In Progress, Completed)

### 4. Handover Approval (Supervisor Only)
- Review operator's handover remarks
- Verification checklist for shift review
- Approve or reject handover requests
- Supervisor remarks for incoming shift

### 5. Reports & Analytics
- KPI cards with trend indicators
- Shift performance bar chart
- Task distribution pie chart
- Machine uptime metrics
- Monthly trends line graph
- Time range filtering

## Test Credentials

The application includes two pre-configured users for testing:

**Supervisor Account:**
- Username: `john.supervisor`
- Password: `password`
- Role: Supervisor
- Full Name: John Davis

**Operator Account:**
- Username: `sarah.operator`
- Password: `password`
- Role: Operator
- Full Name: Sarah Martinez

## Running the Application

The workflow "Start application" runs `npm run dev` which:
1. Starts the Express backend server on port 5000
2. Starts the Vite development server
3. Serves both frontend and backend on the same port

## API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication

### Shifts
- `GET /api/shifts` - Get all shifts
- `GET /api/shifts/current` - Get current active shift

### Log Entries
- `GET /api/log-entries` - Get all log entries
- `GET /api/log-entries?shiftId={id}` - Get entries for specific shift
- `POST /api/log-entries` - Create new log entry

### Machines
- `GET /api/machines` - Get all machines
- `PATCH /api/machines/:id` - Update machine status

### Handovers
- `GET /api/handovers` - Get all handovers
- `GET /api/handovers?status=pending` - Get pending handovers
- `POST /api/handovers` - Create handover request
- `PATCH /api/handovers/:id` - Update handover (approve/reject)

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts?active=true` - Get active alerts only
- `POST /api/alerts` - Create new alert
- `PATCH /api/alerts/:id/resolve` - Mark alert as resolved

## Data Storage

Currently using in-memory storage (`MemStorage`) with pre-populated mock data for demonstration. The storage includes:
- 2 users (supervisor and operator)
- 2 shifts (morning and afternoon)
- 4 log entries
- 4 machines with various statuses
- 1 pending handover
- 3 active alerts

## Design System

The application uses a clean blue-gray color palette following Material Design principles:

- **Primary Color**: Blue (#2563EB range) for CTAs and important elements
- **Neutral Grays**: Multiple shades for backgrounds and text hierarchy
- **Typography**: Roboto for UI, Roboto Mono for timestamps and data
- **Components**: Shadcn UI component library
- **Icons**: Lucide React icon set
- **Charts**: Recharts for data visualization

## User Preferences

- Clean, professional industrial design aesthetic
- Information-dense layouts optimized for operational efficiency
- Real-time status indicators with color coding
- Responsive design for desktop and tablet use

## Recent Changes

- Initial implementation of all five pages
- Backend API routes with full CRUD operations
- Real-time data integration with React Query
- Form validation and error handling
- Toast notifications for user feedback
- Role-based page access control

## Next Steps for Production

1. **Database Integration**: Replace in-memory storage with PostgreSQL
2. **Real Authentication**: Implement secure password hashing and JWT tokens
3. **User Management**: Add ability to create/manage user accounts
4. **Real-time Updates**: Implement WebSocket connections for live updates
5. **PDF Export**: Add ability to export shift reports
6. **Search & Filters**: Enhanced filtering across logbook and reports
7. **Mobile Optimization**: Improve mobile responsiveness
8. **Notifications**: Push notifications for critical alerts
9. **Audit Trail**: Track all changes with timestamps and user attribution
10. **Data Persistence**: Save analytics data for historical reporting
