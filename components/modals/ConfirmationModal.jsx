'use client';

import React from 'react';
import Modal from './Modal';
import { Icons } from '@/components/shared/Icons';

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?', 
  message = 'This action cannot be undone. Please confirm to proceed.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' (red), 'warning' (gold), 'info' (burgundy)
  isLoading = false
}) {
  const getIcon = () => {
    switch (type) {
      case 'danger': return <Icons.trash style={{ color: 'var(--red)', width: '24px', height: '24px' }} />;
      case 'warning': return <Icons.alert style={{ color: 'var(--gold-dark)', width: '24px', height: '24px' }} />;
      default: return <Icons.info style={{ color: 'var(--burgundy)', width: '24px', height: '24px' }} />;
    }
  };

  const getConfirmClass = () => {
    switch (type) {
      case 'danger': return 'bg-red-600 hover:bg-red-700';
      case 'warning': return 'bg-[var(--gold-dark)] hover:bg-[var(--gold-darker)]';
      default: return 'bg-[var(--burgundy)] hover:bg-black';
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      actions={
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
          <button 
            type="button"
            className="secondary-btn"
            onClick={onClose}
            disabled={isLoading}
            style={{ padding: '8px 20px', fontSize: '12px' }}
          >
            {cancelText}
          </button>
          <button 
            type="button"
            className={`px-6 py-2 text-white rounded-md text-xs font-bold transition-colors uppercase tracking-widest ${getConfirmClass()}`}
            onClick={onConfirm}
            disabled={isLoading}
            style={{ 
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      }
    >
      <div className="confirmation-content" style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
        <div className="confirm-icon-wrap" style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '12px', 
          background: type === 'danger' ? '#FEF2F2' : (type === 'warning' ? '#FFFBEB' : 'var(--cream)'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {getIcon()}
        </div>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', marginBottom: '8px' }}>{title}</h3>
          <p style={{ fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>{message}</p>
        </div>
      </div>
    </Modal>
  );
}
