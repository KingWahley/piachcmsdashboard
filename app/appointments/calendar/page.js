'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStore } from '@/hooks/useStore';
import { appointmentsStore } from '@/lib/store';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentDayPanel from '@/components/appointments/AppointmentDayPanel';
import AppointmentReviewPanel from '@/components/appointments/AppointmentReviewPanel';
import { format, isSameDay } from 'date-fns';

export default function CalendarPage() {
  const { data: appointments, updateItem } = useStore(appointmentsStore);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppt, setSelectedAppt] = useState(null);

  // Transform appointments for the calendar component
  const events = useMemo(() => {
    return appointments.map(appt => {
      const date = new Date(appt.preferredDate);
      // Construct start/end time for calendar display
      const [hours, minutesPart] = appt.preferredTime.split(':');
      const [minutes, ampm] = minutesPart.split(' ');
      let h = parseInt(hours);
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      
      const start = new Date(date);
      start.setHours(h, parseInt(minutes));
      
      const end = new Date(start);
      end.setHours(start.getHours() + 1);

      return {
        id: appt.id,
        title: appt.clientName,
        start,
        end,
        resource: { status: appt.status }
      };
    });
  }, [appointments]);

  // Filter appointments for the selected day panel
  const dayAppointments = useMemo(() => {
    return appointments.filter(appt => isSameDay(new Date(appt.preferredDate), selectedDate));
  }, [appointments, selectedDate]);

  const handleStatusChange = (id, newStatus, additionalData = {}) => {
    updateItem(id, { 
      status: newStatus,
      updatedAt: new Date().toISOString(),
      ...additionalData
    });
    
    // If the currently reviewed appointment was updated, close the review panel
    if (selectedAppt && selectedAppt.id === id) {
      setSelectedAppt(null);
    }
  };

  return (
    <DashboardLayout title="Calendar View" subtitle="Review appointments by date, status, and schedule availability">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)]">
        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-white rounded-t border border-[rgba(0,0,0,0.05)] border-b-0 p-4 flex justify-between items-center">
            <h2 className="text-[11px] uppercase tracking-widest font-bold text-[var(--ink-light)]">Calendar View</h2>
            <div className="text-[11px] text-[var(--gold)] font-bold cursor-pointer hover:underline">List view →</div>
          </div>
          <div className="flex-1 min-h-0">
            <AppointmentCalendar 
              events={events}
              onSelectAppointment={(id) => setSelectedAppt(appointments.find(a => a.id === id))}
              onSelectDay={(date) => setSelectedDate(date)}
              selectedDate={selectedDate}
              selectedAppointmentId={selectedAppt?.id}
            />
          </div>
        </div>

        {/* Side Panel: Selected Day Schedule */}
        <div className="w-full lg:w-[350px] bg-white rounded border border-[rgba(0,0,0,0.05)] shadow-sm flex flex-col overflow-hidden">
          <div className="bg-[var(--burgundy)] p-3 flex justify-between items-center text-white">
            <h3 className="text-[10px] uppercase tracking-widest font-bold">Selected Day Schedule</h3>
            <span className="text-[10px] opacity-70 cursor-pointer hover:opacity-100">View all →</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <AppointmentDayPanel 
              selectedDate={selectedDate}
              appointments={dayAppointments}
              onViewAppointment={setSelectedAppt}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>

      {/* Detail Review Panel (Drawer) */}
      <AppointmentReviewPanel 
        appointment={selectedAppt}
        onClose={() => setSelectedAppt(null)}
        onStatusChange={handleStatusChange}
      />
    </DashboardLayout>
  );
}
