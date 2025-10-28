import TaskItem from '../TaskItem';

export default function TaskItemExample() {
  return (
    <div className="p-6 space-y-4 max-w-3xl">
      <TaskItem 
        task="Completed routine maintenance on Machine A-101"
        timestamp={new Date("2025-10-28T08:30:00")}
        priority="Medium"
        status="Completed"
        remarks="All parameters within normal range. Filter replaced."
      />
      <TaskItem 
        task="Temperature calibration for Machine B-205"
        timestamp={new Date("2025-10-28T11:45:00")}
        priority="High"
        status="In Progress"
        remarks="Calibration in progress. Expected completion at 13:00."
      />
    </div>
  );
}
