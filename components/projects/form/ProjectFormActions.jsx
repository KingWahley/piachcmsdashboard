import React from 'react';

export default function ProjectFormActions({ isSaving, isPublishing, handleSaveDraft, handlePublish }) {
  return (
    <div className="form-actions">
      <button 
        type="button" 
        className="secondary-btn"
        onClick={handleSaveDraft}
        disabled={isSaving || isPublishing}
        style={{ opacity: (isSaving || isPublishing) ? 0.7 : 1 }}
      >
        {isSaving ? 'Saving...' : 'Save Draft'}
      </button>
      <button 
        type="button" 
        className="primary-btn"
        onClick={handlePublish}
        disabled={isSaving || isPublishing}
        style={{ opacity: (isSaving || isPublishing) ? 0.7 : 1 }}
      >
        {isPublishing ? 'Publishing...' : 'Save and Publish'}
      </button>
    </div>
  );
}
