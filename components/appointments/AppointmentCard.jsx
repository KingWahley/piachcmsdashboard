import React from 'react';
import { Icons } from '@/components/shared/Icons';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import { APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';

export default function AppointmentCard({ appointment, onView, onApprove, onReject }) {
  const isPending = appointment.status === 'Pending';

  return (
    <div className="bg-white p-4 rounded border border-[rgba(0,0,0,0.05)] shadow-sm hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start mb-2">
        <div className="text-[11px] font-bold text-[var(--gold)]">{appointment.preferredTime}</div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>
      
      <div className="text-sm font-bold text-[var(--burgundy)] mb-1">{appointment.clientName}</div>
      <div className="text-[11px] text-[var(--ink-light)] mb-3 line-clamp-2">
        {appointment.notes || 'No notes provided.'}
      </div>
      
      <div className="flex justify-end gap-2 mt-2">
        <button 
          onClick={() => onView(appointment)}
          className="p-1.5 rounded border border-[var(--stone-dark)] text-[var(--ink-light)] hover:bg-[var(--stone)] transition-colors"
          title="View Details"
        >
          <Icons.settings style={{ width: '14px', height: '14px' }} />
        </button>
        
        {isPending && (
          <>
            <button 
              onClick={() => onApprove(appointment.id)}
              className="p-1.5 rounded border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)]/10 transition-colors"
              title="Approve"
            >
              <Icons.check style={{ width: '14px', height: '14px' }} />
            </button>
            <button 
              onClick={() => onReject(appointment.id)}
              className="p-1.5 rounded border border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)]/10 transition-colors"
              title="Reject"
            >
              <Icons.close style={{ width: '14px', height: '14px' }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
