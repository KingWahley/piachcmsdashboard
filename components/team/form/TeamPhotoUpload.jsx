'use client';

import React, { useRef, useState } from 'react';

export default function TeamPhotoUpload({ image, onChange }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    // Basic validation
    if (!file.type.startsWith('image/')) return;
    
    // Convert to object URL for preview
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="form-group">
      <label>Profile Photo</label>
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
      />
      <div 
        className={`photo-upload-area ${image ? 'has-image' : ''}`}
        style={{ 
          borderColor: isDragging && !image ? 'var(--gold)' : '',
          backgroundColor: isDragging && !image ? 'var(--gold-light)' : '',
        }}
        onClick={() => { if (!image) fileInputRef.current?.click() }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Preview" className="photo-preview" />
            <button 
              type="button"
              className="photo-remove"
              onClick={handleRemove}
              title="Remove photo"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <svg className="photo-upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <div className="photo-upload-text">Click to upload or drag and drop image here</div>
          </>
        )}
      </div>
    </div>
  );
}
