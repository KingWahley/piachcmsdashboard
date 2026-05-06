'use client';

import React from 'react';

export default function TeamFormActions({ onSaveDraft, onSavePublish, isSaving }) {
  return (
    <div className="form-actions">
      <button 
        type="button" 
        className="secondary-btn" 
        onClick={onSaveDraft}
        disabled={isSaving}
        style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
      >
        Save Draft
      </button>
      <button 
        type="button" 
        className="primary-btn" 
        onClick={onSavePublish}
        disabled={isSaving}
        style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
      >
        {isSaving ? 'Saving...' : 'Save and Publish'}
      </button>
    </div>
  );
}
