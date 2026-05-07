'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useStore } from '@/hooks/useStore';
import { teamStore } from '@/lib/store';
import TeamBasicFields from './TeamBasicFields';
import TeamPhotoUpload from './TeamPhotoUpload';
import TeamBioField from './TeamBioField';
import TeamSettingsFields from './TeamSettingsFields';
import TeamFormActions from './TeamFormActions';

export default function TeamMemberForm({ mode = 'create', initialData = null }) {
  const router = useRouter();
  const { createItem, updateItem } = useStore(teamStore);
  
  const drawerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    role: '',
    qualifications: '',
    image: '',
    bio: '',
    status: 'active',
    email: '',
    phone: '',
    displayOrder: '',
    ...initialData
  });
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  useEffect(() => {
    if (drawerRef.current) {
      gsap.fromTo(drawerRef.current, 
        { y: 20, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = true;
    if (!formData.role?.trim()) newErrors.role = true;
    if (!formData.bio?.trim()) newErrors.bio = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (isDraft = false) => {
    if (!validate()) {
      // Shake animation on error
      gsap.fromTo(drawerRef.current,
        { x: -5 },
        { x: 5, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set(drawerRef.current, {x: 0}) }
      );
      return;
    }

    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const finalData = {
      ...formData,
      status: isDraft ? 'archived' : formData.status // Using 'archived' for draft-like status if needed, or stick to 'draft' if store handles it
    };

    if (mode === 'create') {
      createItem({ ...finalData, id: `t${Date.now()}` });
      setSuccessMsg('Team member created successfully!');
    } else {
      updateItem(formData.id, finalData);
      setSuccessMsg('Team member updated successfully!');
    }

    setIsSaving(false);

    // Redirect after success
    setTimeout(() => {
      router.push('/team');
    }, 1000);
  };

  return (
    <div className="form-card" ref={drawerRef} style={{ opacity: 0, visibility: 'hidden' }}>
      <div className="card-header">
        <span className="card-title">{mode === 'create' ? 'Add New Team Member' : 'Edit Team Member'}</span>
        {successMsg && (
          <span style={{ fontSize: '10px', color: 'var(--green)', fontWeight: 'bold' }}>{successMsg}</span>
        )}
      </div>
      <div className="form-body">
        <TeamBasicFields formData={formData} handleChange={handleChange} errors={errors} />
        <TeamPhotoUpload image={formData.image} onChange={handleImageChange} />
        <TeamBioField formData={formData} handleChange={handleChange} errors={errors} />
        <TeamSettingsFields formData={formData} handleChange={handleChange} />
      </div>
      <TeamFormActions 
        onSaveDraft={() => handleSave(true)} 
        onSavePublish={() => handleSave(false)} 
        isSaving={isSaving}
      />
    </div>
  );
}
