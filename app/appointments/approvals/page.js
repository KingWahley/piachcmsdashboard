'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EmptyState from '@/components/shared/EmptyState';
import { useStore } from '@/hooks/useStore';
import { appointmentsStore } from '@/lib/store';

export default function AppointmentApprovalsPage() {
  const { data: appointments } = useStore(appointmentsStore);
  const pendingAppointments = appointments.filter(a => a.status === 'Pending');

  return (
    <DashboardLayout title="Approval Requests" subtitle="Review and approve pending appointment requests">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Pending Approvals</h1>
          <p>These appointments have been requested by clients and require your confirmation.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {pendingAppointments.map(appointment => (
          <div key={appointment.id} style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '4px' }}>{appointment.client}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{appointment.email || 'client@example.com'}</div>
              </div>
              <span className="status-pill s-pending">Pending</span>
            </div>

            <div style={{ background: 'var(--cream)', padding: '12px', borderRadius: '6px', border: '1px solid var(--stone)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', fontWeight: 'bold' }}>Date/Time</span>
                <span style={{ color: 'var(--ink-mid)', fontWeight: 'bold' }}>{appointment.date} @ {appointment.time}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', fontSize: '12px' }}>
                <span style={{ color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', fontWeight: 'bold' }}>Type</span>
                <span style={{ color: 'var(--ink-mid)' }}>{appointment.type}</span>
              </div>
            </div>

            {appointment.notes && (
              <div>
                <div style={{ color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', fontWeight: 'bold', marginBottom: '6px' }}>Client Message</div>
                <p style={{ fontSize: '12px', color: 'var(--ink-mid)', lineHeight: 1.5, margin: 0, fontStyle: 'italic', borderLeft: '2px solid var(--stone-dark)', paddingLeft: '10px' }}>
                  "{appointment.notes}"
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '10px' }}>
              <button className="primary-btn" style={{ flex: 1, justifyContent: 'center' }}>Approve</button>
              <button className="secondary-btn" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--error-red)', color: 'var(--error-red)' }}>Decline</button>
            </div>

          </div>
        ))}

        {pendingAppointments.length === 0 && (
          <EmptyState 
            title="All Caught Up!" 
            message="There are no pending appointment requests to approve." 
          />
        )}
      </div>
    </DashboardLayout>
  );
}
