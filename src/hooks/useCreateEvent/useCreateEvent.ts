import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';

export interface EventFormState {
  title: string;
  description: string;
  category: string;
  maxCapacity: string;
  date: Date | null;
  time: string;
  isOnline: boolean;
  linkOrAddress: string;
  image: File | null;
}

const INITIAL_STATE: EventFormState = {
  title: '',
  description: '',
  category: '',
  maxCapacity: '',
  date: null,
  time: '',
  isOnline: true,
  linkOrAddress: '',
  image: null,
};

export const useCreateEvent = (onSubmitCallback?: (data: EventFormState) => void) => {
  const [formData, setFormData] = useState<EventFormState>(INITIAL_STATE);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!formData.image) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(formData.image);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.image]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleModalityChange = (isOnline: boolean) => {
    setFormData((prev) => ({ ...prev, isOnline, linkOrAddress: '' }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmitCallback) {
      onSubmitCallback(formData);
    } else {
      console.log('Datos enviados:', formData);
    }
  };

  return {
    formData,
    imagePreview,
    handleChange,
    handleDateChange,
    handleModalityChange,
    handleImageChange,
    handleSubmit,
  };
};
