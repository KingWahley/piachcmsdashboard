'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectBasicFields from './ProjectBasicFields';
import AdditionalDescriptionFields from './AdditionalDescriptionFields';
import GalleryUpload from './GalleryUpload';
import ProjectFormActions from './ProjectFormActions';
import '@/app/projects/new/project-form.css';

export default function ProjectForm({ mode = 'create', initialData = null, onSubmit }) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    status: initialData?.status || 'Ongoing',
    city: initialData?.city || '',
    state: initialData?.state || '',
    country: initialData?.country || '',
    category: initialData?.category || '',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || ''
  });

  const [additionalFields, setAdditionalFields] = useState(
    initialData?.additionalFields || [
      { id: 'desc-1', title: 'Design Approach', body: 'Describe the architectural thinking, materials, and planning considerations.' },
      { id: 'desc-2', title: 'Key Features', body: 'Add custom project highlights such as floor planning, lighting, landscape, or finishes.' }
    ]
  );

  const [galleryFiles, setGalleryFiles] = useState({
    existingImages: initialData?.gallery || [],
    newImages: [],
    removedImageIds: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = async (actionType) => {
    if (!validate()) {
      return;
    }

    if (actionType === 'draft') {
      setIsSaving(true);
    } else {
      setIsPublishing(true);
    }

    try {
      if (onSubmit) {
        await onSubmit({
          ...formData,
          additionalFields,
          galleryFiles
        }, actionType);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSuccessMessage(`Project successfully ${mode === 'create' ? 'created' : 'updated'}! Redirecting...`);
      
      setTimeout(() => {
        router.push('/projects');
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

  return (
    <div className="form-drawer">
      <div className="card-header" style={{ padding: '14px 18px', borderBottom: '1px solid var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--cream)' }}>
        <span className="card-title" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {mode === 'create' ? 'Add New Project Form' : 'Edit Project Form'}
        </span>
        {successMessage && (
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--green)', background: 'var(--green-light)', padding: '4px 10px', borderRadius: '4px' }}>
            {successMessage}
          </span>
        )}
      </div>
      
      <div className="form-grid">
        <ProjectBasicFields 
          formData={formData} 
          handleChange={handleChange} 
          errors={errors} 
        />
        
        <AdditionalDescriptionFields 
          additionalFields={additionalFields} 
          setAdditionalFields={setAdditionalFields} 
        />
        
        <GalleryUpload 
          galleryFiles={galleryFiles} 
          setGalleryFiles={setGalleryFiles} 
          errors={errors} 
        />
      </div>
      
      <ProjectFormActions 
        isSaving={isSaving} 
        isPublishing={isPublishing} 
        handleSaveDraft={() => handleAction('draft')} 
        handlePublish={() => handleAction('publish')} 
      />
    </div>
  );
}
