import React from 'react';
import AppointmentCard from './AppointmentCard';
import { format } from 'date-fns';

export default function AppointmentDayPanel({ 
  selectedDate, 
  appointments, 
  onViewAppointment,
  onStatusChange 
}) {
  const formattedDate = format(selectedDate, 'd MMMM yyyy');
  const count = appointments.length;

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[rgba(0,0,0,0.05)]">
        <h2 className="text-lg font-bold text-[var(--burgundy)]">{formattedDate}</h2>
        <div className="text-[11px] text-[var(--ink-light)] font-bold uppercase tracking-wider mt-1">
          {count} {count === 1 ? 'appointment' : 'appointments'} scheduled
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--cream)]">
        {count === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
            <div className="w-12 h-12 rounded-full bg-[var(--stone)] flex items-center justify-center mb-4">
              <span className="text-xl">📅</span>
            </div>
            <div className="text-sm font-bold text-[var(--ink-mid)]">No Appointments</div>
            <div className="text-[11px] mt-1">No appointments scheduled for this day.</div>
          </div>
        ) : (
          appointments.map(appt => (
            <AppointmentCard 
              key={appt.id}
              appointment={appt}
              onView={onViewAppointment}
              onApprove={(id) => onStatusChange(id, 'Approved')}
              onReject={(id) => onStatusChange(id, 'Rejected')}
            />
          ))
        )}
      </div>

      <div className="p-4 bg-[var(--gold-light)]/30 border-t border-[var(--gold-light)] text-[11px] text-[var(--burgundy)] italic">
        Click any appointment on the calendar to view full details before approving or rejecting.
      </div>
    </div>
  );
}
