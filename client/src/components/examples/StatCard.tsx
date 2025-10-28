import StatCard from '../StatCard';
import { Clock } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Current Shift" 
        value="Morning" 
        icon={Clock} 
        subtitle="06:00 - 14:00"
      />
      <StatCard 
        title="Pending Tasks" 
        value="3" 
        icon={Clock} 
        subtitle="2 high priority"
        variant="warning"
      />
    </div>
  );
}
