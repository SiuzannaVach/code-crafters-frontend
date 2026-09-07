import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";

type EventStatus = "borrador" | "activo";

interface StoredCreatedEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  maxCapacity: number;
  date: string | null;
  time: string;
  isOnline: boolean;
  linkOrAddress: string;
  imageName: string | null;
  status: EventStatus;
  createdAt: string;
}

const CREATED_EVENTS_KEY = "cc_created_events";

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
  title: "",
  description: "",
  category: "",
  maxCapacity: "",
  date: null,
  time: "",
  isOnline: true,
  linkOrAddress: "",
  image: null,
};

export const useCreateEvent = () => {
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

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((previous) => ({ ...previous, date }));
  };

  const handleModalityChange = (isOnline: boolean) => {
    setFormData((previous) => ({
      ...previous,
      isOnline,
      linkOrAddress: "",
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFormData((previous) => ({ ...previous, image: file }));
    }
  };

  const saveEvent = (status: EventStatus) => {
    if (
      status === "activo" &&
      (!formData.title.trim() ||
        !formData.description.trim() ||
        !formData.category ||
        !formData.maxCapacity ||
        !formData.date ||
        !formData.time ||
        !formData.linkOrAddress.trim())
    ) {
      window.alert(
        "Completa todos los campos obligatorios antes de publicar el evento.",
      );
      return;
    }

    const event: StoredCreatedEvent = {
      id: `event-${Date.now()}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      maxCapacity: Number(formData.maxCapacity) || 0,
      date: formData.date?.toISOString() ?? null,
      time: formData.time,
      isOnline: formData.isOnline,
      linkOrAddress: formData.linkOrAddress.trim(),
      imageName: formData.image?.name ?? null,
      status,
      createdAt: new Date().toISOString(),
    };

    const savedEvents = JSON.parse(
      localStorage.getItem(CREATED_EVENTS_KEY) || "[]",
    ) as StoredCreatedEvent[];

    localStorage.setItem(
      CREATED_EVENTS_KEY,
      JSON.stringify([...savedEvents, event]),
    );

    window.alert(
      status === "activo"
        ? "¡Evento publicado correctamente!"
        : "Borrador guardado correctamente.",
    );

    if (status === "activo") {
      setFormData(INITIAL_STATE);
    }
  };

  const handleSaveDraft = () => {
    saveEvent("borrador");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    saveEvent("activo");
  };

  return {
    formData,
    imagePreview,
    handleChange,
    handleDateChange,
    handleModalityChange,
    handleImageChange,
    handleSaveDraft,
    handleSubmit,
  };
};
