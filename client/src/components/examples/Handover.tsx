import Handover from '../../pages/Handover';

export default function HandoverExample() {
  localStorage.setItem("userRole", "Supervisor");
  
  return (
    <div className="p-6">
      <Handover />
    </div>
  );
}
