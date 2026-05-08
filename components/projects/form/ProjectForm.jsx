'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectBasicFields from './ProjectBasicFields';
import AdditionalDescriptionFields from './AdditionalDescriptionFields';
import GalleryUpload from './GalleryUpload';
import ProjectFormActions from './ProjectFormActions';
import ProjectPreview from '../ProjectPreview';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
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
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
      setIsPublishConfirmOpen(false);
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

  const handleReorderGallery = (newOrder) => {
    // 1. Update Main Image if changed (first item in preview is always main hero)
    const firstItem = newOrder[0];
    if (firstItem && firstItem.url !== formData.image) {
      setFormData(prev => ({ ...prev, image: firstItem.url }));
    }

    // 2. Map back to existing and new images
    // We exclude the main hero from the galleryFiles to avoid duplication if it's the same
    const galleryItems = newOrder.slice(1);
    
    const newExisting = galleryItems
      .filter(item => item.type === 'existing')
      .map(item => ({ id: item.id, url: item.url }));
      
    const newAdded = galleryItems
      .filter(item => item.type === 'new')
      .map(item => item.original);

    setGalleryFiles(prev => ({
      ...prev,
      existingImages: newExisting,
      newImages: newAdded
    }));
  };

  const currentProjectData = {
    ...formData,
    location: `${formData.city}${formData.state ? `, ${formData.state}` : ''}${formData.country ? `, ${formData.country}` : ''}`,
    additionalFields,
    galleryFiles
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
        handlePublish={() => setIsPublishConfirmOpen(true)} 
        handlePreview={() => setIsPreviewOpen(true)}
      />

      <ProjectPreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        project={currentProjectData} 
        onReorderGallery={handleReorderGallery}
      />

      <ConfirmationModal 
        isOpen={isPublishConfirmOpen}
        onClose={() => setIsPublishConfirmOpen(false)}
        onConfirm={() => handleAction('publish')}
        title="Publish Project?"
        message={`Are you sure you want to ${mode === 'create' ? 'publish this new project' : 'save changes'} to the live portfolio? This will update the project details on the website immediately.`}
        confirmText={mode === 'create' ? 'Publish Now' : 'Save & Publish'}
        type="info"
        isLoading={isPublishing}
      />
    </div>
  );
}
