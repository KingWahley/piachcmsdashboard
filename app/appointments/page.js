'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAppointments } from '@/hooks/useAppointments';
import AppointmentFilters from '@/components/appointments/AppointmentFilters';
import AppointmentTable from '@/components/appointments/AppointmentTable';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentReviewPanel from '@/components/appointments/AppointmentReviewPanel';

export default function AppointmentsListPage() {
  const {
    filteredAppointments,
    calendarEvents,
    filterConfig,
    setFilterConfig,
    viewMode,
    setViewMode,
    selectedAppointment,
    selectedAppointmentId,
    setSelectedAppointmentId,
    handleStatusChange
  } = useAppointments();

  return (
    <DashboardLayout 
      title="Appointments" 
      subtitle="View, manage, and approve or reject appointment bookings"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="page-head mb-8">
          <div className="page-title-wrap">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--burgundy)] mb-3">Appointments</h1>
            <p className="text-sm text-[var(--ink-light)] font-medium">
              Manage appointment bookings, approvals, and scheduling.
            </p>
          </div>
        </div>


        <AppointmentFilters 
          filterConfig={filterConfig}
          setFilterConfig={setFilterConfig}
        />

        <div className="relative">
          {viewMode === 'list' ? (
            <AppointmentTable 
              appointments={filteredAppointments} 
              onSelectAppointment={setSelectedAppointmentId}
              selectedAppointmentId={selectedAppointmentId}
              onStatusChange={handleStatusChange}
              onToggleView={setViewMode}
            />
          ) : (
            <AppointmentCalendar 
              events={calendarEvents} 
              onSelectAppointment={setSelectedAppointmentId}
              selectedAppointmentId={selectedAppointmentId}
            />
          )}
        </div>


        <AppointmentReviewPanel 
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointmentId(null)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </DashboardLayout>
  );
}
