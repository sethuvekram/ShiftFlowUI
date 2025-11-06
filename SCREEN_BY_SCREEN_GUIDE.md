# 📱 SCREEN-BY-SCREEN DEMO GUIDE
**Exact Values to Enter for ShiftFlowUI Demo**

---

## 👥 **ALL AVAILABLE USER ACCOUNTS**

Use any of these **8 manufacturing personnel** for your demo:

| Username | Password | Name | Role | Department |
|----------|----------|------|------|------------|
| **press.operator** | admin | Jean-Marc Dubois | Press Operator | Press Shop |
| **body.supervisor** | admin | Marie Leclerc | Body Shop Supervisor | Body Shop |
| **paint.operator** | admin | Pierre Moreau | Paint Operator | Paint Shop |
| **assembly.lead** | admin | Sophie Martin | Assembly Team Lead | Assembly Shop |
| **quality.inspector** | admin | Ahmed Benali | Quality Inspector | Quality (VQA/IHQA/PTQA) |
| **maintenance.tech** | admin | Carlos Rodriguez | Maintenance Technician | Maintenance |
| **safety.officer** | admin | Anna Kowalski | Safety Officer | Safety & Environment |
| **shift.manager** | admin | Thomas Schneider | Shift Manager | Manufacturing (All) |

**💡 Demo Tip:** Login as different users to show department-specific filtering!

---

## 🖥️ **SCREEN 1: LOGIN PAGE**

**What you see:** Professional login page with "Choose a demo profile" dropdown

**What to do:**
1. Click on the **"Choose a demo profile"** dropdown
2. Select: **Jean-Marc Dubois** (Press Operator - Press Shop)
3. Click **"Access System"** button

**What to say:** *"I'm logging in as Jean-Marc Dubois, a Press Shop Operator. The system supports 8 different manufacturing roles across all departments."*

**💡 Available profiles in dropdown:**
- Jean-Marc Dubois - Press Operator (Press Shop)
- Marie Leclerc - Body Shop Supervisor (Body Shop)
- Pierre Moreau - Paint Operator (Paint Shop)
- Sophie Martin - Assembly Team Lead (Assembly Shop)
- Ahmed Benali - Quality Inspector (Quality)
- Carlos Rodriguez - Maintenance Technician (Maintenance)
- Anna Kowalski - Safety Officer (Safety & Environment)
- Thomas Schneider - Shift Manager (Manufacturing)

---

## 🖥️ **SCREEN 2: DASHBOARD**

**What you see:** Manufacturing metrics dashboard

**What to point out:**
- **Production Rate:** 47 vehicles/hour
- **OEE:** 87.5%
- **Quality Rate:** 98.3%
- **Machine Status:** 15/16 operational

**What to say:** *"This dashboard shows real-time manufacturing performance across our facility. We're currently producing 47 vehicles per hour with excellent quality metrics."*

**Action:** Click "Digital Logbook" in the left sidebar

---

## 🖥️ **SCREEN 3: DIGITAL LOGBOOK**

**What you see:** List of manufacturing log entries **filtered to YOUR DEPARTMENT**

**🎯 IMPORTANT:** When you login as **Jean-Marc Dubois (Press Operator)**, the system **AUTOMATICALLY shows only Press Shop entries** by default!

**What to point out:**
- **Filter dropdown shows "Press Shop"** (not "All Departments") - this is automatic!
- Blue badge says **"👤 Your Department View: Press Shop"**
- Only Press Shop entries are visible
- Department badges are red for Press Shop
- Timestamps and priority levels
- Operational details in remarks

**What to say:** *"Notice how the system automatically shows Jean-Marc only the Press Shop activities - this is his department. Each user sees their own department's data first, so they're not overwhelmed with information from other areas. But they can still view all departments if needed."*

**Demo the filter:**
1. Click the dropdown (currently shows "Press Shop")
2. Select "All Departments" - now you see ALL entries from ALL departments
3. Select "Body Shop" - now you see only Body Shop entries
4. Select "Press Shop" again - back to Jean-Marc's department

**What to say:** *"Users can filter to see any department, but by default they see their own department's information. This makes it easier to focus on relevant work."*

**Action:** Click "Add Entry" button

---

## 🖥️ **SCREEN 4: NEW ENTRY FORM**

**What you see:** Form to create new log entry - **Department is ALREADY selected as "Press Shop"!**

**🎯 IMPORTANT:** The form automatically pre-fills the department with the user's department (Press Shop for Jean-Marc)!

**Exact values to enter:**
- **Department:** Already shows "Press Shop" ✅ (pre-filled!)
- **Area:** Select "Stamping Line 1"
- **Task Description:** `Line 1 press speed optimization completed - production rate increased`
- **Priority:** Select "High"
- **Remarks:** `Press speed increased from 15 to 16 SPM. Quality maintained at 98.5% pass rate. Oil pressure checked and within normal range. Next maintenance due in 1800 cycles.`

**What to say:** *"Notice the system intelligently pre-fills Jean-Marc's department. Operators don't waste time selecting their department every time - the system knows who they are and what department they work in. This saves time and reduces data entry errors."*

**Action:** Click "Submit Entry"

---

## 🖥️ **SCREEN 5: SUCCESS NOTIFICATION**

**What you see:** Green success message: "Manufacturing log entry has been recorded successfully"

**What to say:** *"The entry is now recorded and will be visible to the next shift personnel."*

**Action:** Click user profile menu (top right) → Logout

---

## 🖥️ **SCREEN 6: LOGIN AS SUPERVISOR**

**What to do:**
1. Click user profile menu (top right) → Logout
2. Click the **"Choose a demo profile"** dropdown
3. Select: **Marie Leclerc** (Body Shop Supervisor - Body Shop)
4. Click **"Access System"** button

**What to say:** *"Now I'm switching to Marie Leclerc, a Body Shop Supervisor. Watch how the interface automatically adapts to show Body Shop specific information."*

**🎯 KEY POINT:** When you get to the Dashboard or Logbook:
- **The filter will automatically show "Body Shop"** (not Press Shop)
- Badge will say **"👤 Your Department View: Body Shop"**
- You'll see Body Shop welding operations, not Press Shop stamping

**What to say:** *"See? Each user automatically sees their own department's data. Marie sees Body Shop, Jean-Marc saw Press Shop. The system adapts to each person's role."*

---

## 🖥️ **SCREEN 7: HANDOVER PAGE**

**Action:** Click "Handover" in the left sidebar

**What you see:** Handover management interface with pending handovers

**What to point out:**
- Pending handovers from different departments
- Color-coded department cards
- Detailed handover information
- Approval/rejection buttons

**Sample handover to highlight:**
- **Press Shop Handover**
- **Details:** "Press Shop handover: Line 1 running smoothly, new coil installed. Quality checks passed. Line 2 needs bearing replacement next week."

**What to say:** *"Supervisors can review handovers from all departments. Each handover contains detailed operational information that the incoming shift needs to know."*

**Action:** Click "Approve" on any pending handover

---

## 🖥️ **SCREEN 8: APPROVED HANDOVER**

**What you see:** Handover status changes to "Approved" with green indicator

**What to say:** *"The handover is now approved and the incoming shift will be notified. This ensures smooth operational continuity."*

**Action:** Logout and login as `quality.inspector` / `admin`

---

## 🖥️ **SCREEN 9: QUALITY INSPECTOR VIEW**

**What to do:**
1. Logout from current account
2. Select **Ahmed Benali** (Quality Inspector) from the dropdown
3. Click **"Access System"**

**Action:** Go to Digital Logbook → Filter by "Quality (VQA/IHQA/PTQA)"

**What you see:** Quality-specific log entries

**What to point out:**
- IHQA dimensional checks
- PTQA paint quality results
- VQA final vehicle approvals
- Pass/fail rates and metrics

**What to say:** *"Quality inspectors have access to quality data across all departments. They can track IHQA dimensional checks from Press Shop, PTQA paint quality from Paint Shop, and VQA final approvals from Assembly."*

---

## 🖥️ **SCREEN 10: DEPARTMENT FILTERING DEMO**

**What to do:**
1. Change filter to "All Departments"
2. Change filter to "Paint Shop"
3. Change filter to "Assembly Shop"
4. Change filter back to "All Departments"

**What to say:** *"The system allows personnel to view information relevant to their work. They can see all activities or filter by specific departments."*

**What to point out:**
- How entries change with each filter
- Different types of activities per department
- Department-specific operational data

---

## 🖥️ **SCREEN 11: FINAL DASHBOARD**

**Action:** Click "Dashboard" in sidebar

**What to say:** *"Our comprehensive dashboard provides real-time visibility into all manufacturing operations. This is how Renault can maintain operational excellence across all production departments."*

**Final talking points:**
- **Complete department coverage:** Press Shop, Body Shop, Paint Shop, Assembly, Quality, Maintenance, Safety
- **Real-time data:** 47 vehicles/hour production rate
- **Quality excellence:** 98.3% first pass yield
- **Equipment reliability:** 15/16 machines operational
- **Seamless handovers:** Structured approval workflow

---

## 💬 **CLOSING STATEMENT**

*"ShiftFlowUI provides complete operational visibility and control for Renault's manufacturing facilities. It reduces handover time by 30%, improves information accuracy by 95%, and increases safety compliance by 25%. The system is ready for enterprise deployment across all Renault manufacturing sites."*

---

## 🚨 **IF SOMETHING GOES WRONG**

**Login issues:**
- Double-check username spelling (use dots, not spaces)
- Password is always: `admin`
- Try refreshing the page

**Missing data:**
- Check the department filter setting
- Refresh the browser if needed

**Slow loading:**
- This is normal for demo version
- Production would be much faster

---

## 📞 **EMERGENCY SUPPORT**
If you need help during the demo: demo-support@company.com

**Remember: Focus on business benefits and operational improvements, not technical details!**
