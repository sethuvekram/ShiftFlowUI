import AlertNotification from '../AlertNotification';

export default function AlertNotificationExample() {
  return (
    <div className="p-6 space-y-3 max-w-md">
      <AlertNotification 
        message="Machine B-205 temperature variance detected"
        severity="Warning"
        timestamp={new Date("2025-10-28T11:30:00")}
      />
      <AlertNotification 
        message="Shift handover pending approval"
        severity="Info"
        timestamp={new Date("2025-10-28T13:45:00")}
      />
    </div>
  );
}
