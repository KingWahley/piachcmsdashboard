import React, { useEffect, useRef } from 'react';
import { Icons } from '@/components/shared/Icons';
import gsap from 'gsap';

export default function Modal({ isOpen, onClose, title, children, actions }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(backdropRef.current, { opacity: 0, display: 'none' }, { opacity: 1, display: 'flex', duration: 0.2 });
      gsap.fromTo(modalRef.current, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { opacity: 0, y: 10, scale: 0.95, duration: 0.2, ease: 'power2.in' });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, onComplete: () => {
        if (backdropRef.current) backdropRef.current.style.display = 'none';
        document.body.style.overflow = '';
      }});
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className="modal-backdrop" ref={backdropRef} onClick={onClose} style={{ display: 'none' }}>
      <div className="appointment-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {actions && (
          <div className="modal-actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
