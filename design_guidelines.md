# Design Guidelines: Digital Shift Handover Platform

## Design Approach

**Selected Framework:** Material Design 3 with Carbon Design System influences for enterprise-grade industrial applications

**Rationale:** This is a utility-focused, information-dense productivity platform requiring clear data hierarchy, real-time status indicators, and efficient task management. Material Design provides robust component patterns while Carbon's enterprise focus ensures professional polish for industrial operations.

**Core Principles:**
- Clarity over decoration: Every element serves operational efficiency
- Immediate status recognition through visual hierarchy
- Role-appropriate information density
- Scannable data presentation for shift transitions

---

## Typography System

**Font Stack:** Roboto (primary), Roboto Mono (data/timestamps)

**Hierarchy:**
- Page Titles: 2xl to 3xl, font-semibold
- Section Headers: xl to 2xl, font-medium
- Card Titles: lg, font-medium
- Body Text: base, font-normal
- Data Labels: sm, font-medium, uppercase tracking-wide
- Timestamps/Metrics: sm to base, Roboto Mono
- Status Indicators: xs to sm, font-semibold, uppercase

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 3, 4, 6, 8, 12, and 16

**Grid Foundation:**
- Container: max-w-7xl mx-auto with px-4 to px-8
- Dashboard Cards: 12-column responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Side Navigation: Fixed 64 (w-64) with main content ml-64
- Card Padding: p-6 to p-8
- Section Spacing: space-y-6 to space-y-8
- Component Gaps: gap-4 to gap-6

**Page Layouts:**
- Login: Centered card (max-w-md) on full viewport
- Dashboards: Sidebar + main content area with top navigation bar
- Forms: Two-column on desktop (md:grid-cols-2), single on mobile

---

## Component Library

### Navigation
**Sidebar (Supervisor/Operator):**
- Fixed left navigation, full height
- Logo/branding at top (h-16)
- Navigation items with icons (h-12 each, px-4)
- Active state: subtle indicator bar (w-1 left border)
- Role badge near bottom
- Logout at bottom

**Top Bar:**
- Fixed header (h-16)
- Current shift information left-aligned
- Alert counter badge
- User profile dropdown right-aligned

### Cards & Containers
**Dashboard Cards:**
- Rounded corners (rounded-lg)
- Subtle elevation (shadow-sm to shadow-md)
- Consistent padding (p-6)
- Header with icon + title (flex items-center gap-3)
- Divider between header and content (border-b with my-4)

**Status Cards (Machine Status):**
- Compact grid layout (grid-cols-2 lg:grid-cols-4)
- Icon + machine name + status indicator
- Mini progress bar at bottom
- Hover elevation increase

### Data Display
**Task Lists/Logbook Entries:**
- Striped rows for scannability (odd:bg-opacity-5)
- Left accent bar for priority/status
- Compact spacing (py-3 px-4)
- Timestamp right-aligned in muted text
- Expandable rows for remarks

**Tables:**
- Sticky headers (sticky top-0)
- Alternating row backgrounds
- Column widths: timestamp (w-32), status (w-24), flexible content
- Responsive: stack on mobile, horizontal scroll on tablet

### Forms & Inputs
**Digital Logbook Entry Form:**
- Label above input (block mb-2, font-medium, text-sm)
- Input fields: rounded-md, px-4, py-2.5, border
- Textarea for remarks: min-h-24
- Auto-timestamp display (non-editable, Roboto Mono)
- Submit button full-width on mobile, auto width on desktop

**Handover Approval:**
- Checklist items with custom checkboxes
- Signature/confirmation section at bottom
- Two-button layout: Reject (secondary) + Approve (primary)

### Status Indicators
**Progress Bars:**
- Height: h-2 to h-3
- Rounded: rounded-full
- Animated: transition-all duration-300
- Label above bar (flex justify-between mb-2)

**Badges:**
- Pill shape: rounded-full, px-3, py-1
- Text: text-xs, font-semibold, uppercase
- Positioned: absolute top-2 right-2 or inline

**Alert Notifications:**
- Toast-style: fixed top-4 right-4
- Icon + message + dismiss button
- Auto-dismiss with progress indicator
- Stacked alerts with gap-2

### Charts & Analytics
**Reports Page:**
- Chart containers: aspect-video, p-6
- Grid layout: 2x2 on desktop, stacked on mobile
- Chart titles: text-lg font-medium mb-4
- Use Chart.js or Recharts for visualizations
- Filter bar above charts (date range, shift selector)

**Chart Types:**
- Line: Shift performance over time
- Bar: Task completion rates by shift
- Donut: Machine uptime percentages
- KPI Cards: Large numbers (text-4xl font-bold) with trend indicators

### Buttons & Actions
**Primary Actions:**
- Prominent sizing (px-6 py-3)
- Rounded: rounded-lg
- Font: font-medium

**Secondary Actions:**
- Outlined style or ghost variant
- Same sizing as primary

**Icon Buttons:**
- Square: w-10 h-10, rounded-md
- Icon centered

---

## Icons

**Library:** Material Icons via CDN

**Usage:**
- Navigation: 20-24px icons
- Card headers: 20px icons
- Status indicators: 16px icons
- Buttons: 20px icons
- Large feature areas: 32-40px icons

---

## Responsive Breakpoints

**Mobile (base):** Single column, stacked cards, hamburger menu
**Tablet (md: 768px):** Two-column grids, visible sidebar toggle
**Desktop (lg: 1024px):** Full sidebar, three-column grids, expanded data tables
**Wide (xl: 1280px):** Four-column grids for status cards

---

## Animations

**Minimal, purposeful only:**
- Card hover: subtle elevation increase (transition-shadow duration-200)
- Button interactions: standard Material ripple effect
- Page transitions: fade-in for dashboard data refresh
- Alert slide-in: slide-in-right for notifications
- Loading states: skeleton screens or subtle pulse

---

## Images

**No hero images required** - this is a functional dashboard application, not marketing content. Focus entirely on data visualization, icons, and UI components.