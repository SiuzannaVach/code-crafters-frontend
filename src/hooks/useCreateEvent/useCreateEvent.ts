import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Evento } from "../../types/Evento";
import { useEventContext } from "../../context/EventContext";
import { useNotificationContext } from "../../context/NotificationContext";

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

const readImageAsDataUrl = (image: File | null): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!image) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result !== "string") {
        reject(new Error("The selected image could not be serialized."));
        return;
      }

      resolve(reader.result);
    });
    reader.addEventListener("error", () => {
      reject(reader.error ?? new Error("The selected image could not be read."));
    });
    reader.readAsDataURL(image);
  });

const toEventDate = (date: Date, time: string): string => {
  const eventDate = new Date(date);
  const [hours, minutes] = time.split(":").map(Number);
  eventDate.setHours(hours, minutes, 0, 0);
  return eventDate.toISOString();
};

export const useCreateEvent = () => {
  const [formData, setFormData] = useState<EventFormState>(INITIAL_STATE);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { addEvent } = useEventContext();
  const { addNotification } = useNotificationContext();

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
    const image = event.target.files?.[0] ?? null;
    setFormData((previous) => ({ ...previous, image }));

    if (!image) {
      setImagePreview(null);
      return;
    }

    void readImageAsDataUrl(image)
      .then(setImagePreview)
      .catch((error: unknown) => {
        console.error("Unable to preview the selected image.", error);
        setImagePreview(null);
      });
  };

  const saveEvent = async () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      !formData.date ||
      !formData.time ||
      !formData.linkOrAddress.trim()
    ) {
      window.alert(
        "Completa todos los campos obligatorios antes de guardar el evento.",
      );
      return;
    }

    const savedEvent: Evento = {
      id: `event-${Date.now()}`,
      titulo: formData.title.trim(),
      descripcion: formData.description.trim(),
      fecha: toEventDate(formData.date, formData.time),
      imagen: await readImageAsDataUrl(formData.image),
      modalidad: formData.isOnline ? "online" : "presencial",
      ubicacion: formData.linkOrAddress.trim(),
      categoria: formData.category,
      organizadorId: "user-1",
      vistas: 0,
      estado: "activo",
    };

    addEvent(savedEvent);
    addNotification(
      "Centro de notificaciones",
      `Se ha creado el nuevo evento: ${savedEvent.titulo}`,
    );
    window.alert("¡Evento guardado correctamente!");
    setFormData(INITIAL_STATE);
    setImagePreview(null);
  };

  const handleSaveDraft = () => {
    void saveEvent();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void saveEvent();
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
