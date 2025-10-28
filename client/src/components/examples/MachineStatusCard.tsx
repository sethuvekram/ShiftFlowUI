import MachineStatusCard from '../MachineStatusCard';

export default function MachineStatusCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MachineStatusCard machineName="Machine A-101" status="Running" uptime={98} />
      <MachineStatusCard machineName="Machine B-205" status="Maintenance" uptime={95} />
      <MachineStatusCard machineName="Machine C-310" status="Running" uptime={99} />
      <MachineStatusCard machineName="Machine D-412" status="Idle" uptime={87} />
    </div>
  );
}
