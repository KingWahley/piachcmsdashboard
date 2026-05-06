'use client';

import React from 'react';

export default function TeamBasicFields({ formData, handleChange, errors }) {
  return (
    <>
      <div className="form-group">
        <label>Title</label>
        <select 
          name="title" 
          value={formData.title || ''} 
          onChange={handleChange}
        >
          <option value="">Select Title</option>
          <option value="Arch.">Arch.</option>
          <option value="Mr.">Mr.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Ms.">Ms.</option>
          <option value="Dr.">Dr.</option>
          <option value="Prof.">Prof.</option>
        </select>
      </div>
      <div className="form-group">
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Name {errors?.name && <span style={{ color: 'var(--red)', textTransform: 'none' }}>Required</span>}
        </label>
        <input 
          name="name" 
          placeholder="Enter full name" 
          value={formData.name || ''} 
          onChange={handleChange}
          style={errors?.name ? { borderColor: 'var(--red)' } : {}}
        />
      </div>
      <div className="form-group">
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Designation {errors?.role && <span style={{ color: 'var(--red)', textTransform: 'none' }}>Required</span>}
        </label>
        <input 
          name="role" 
          placeholder="e.g. Senior Architect" 
          value={formData.role || ''} 
          onChange={handleChange}
          style={errors?.role ? { borderColor: 'var(--red)' } : {}}
        />
      </div>
      <div className="form-group">
        <label>Qualifications</label>
        <input 
          name="qualifications" 
          placeholder="e.g. M.Arch, ARCON, PMP" 
          value={formData.qualifications || ''} 
          onChange={handleChange}
        />
        <div className="form-helper">Separate multiple qualifications with commas.</div>
      </div>
    </>
  );
}
