import React from 'react';
import styles from '../../pages/CreateEvent/CreateEvent.module.scss';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const CreateEventLabel: React.FC<LabelProps> = ({ children, id, ...props }) => (
  <label htmlFor={id} className={styles.label} {...props}>
    {children}
  </label>
);

export const CreateEventFormGroup: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
  <div className={styles.formGroup}>
    <CreateEventLabel id={id}>{label}</CreateEventLabel>
    {children}
  </div>
);

type DynamicInputProps = 
  | ({ as?: 'input' } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({ as: 'textarea' } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({ as: 'select' } & React.SelectHTMLAttributes<HTMLSelectElement>);

type InputFieldProps = DynamicInputProps & {
  label: string;
  id: string;
};

export const CreateEventInputField: React.FC<InputFieldProps> = (fieldProps) => {
  if (fieldProps.as === 'textarea') {
    const { label, id, children, as, ...props } = fieldProps;
    void as;
    return (
      <CreateEventFormGroup label={label} id={id}>
        <textarea id={id} className={styles.input} {...props}>
          {children}
        </textarea>
      </CreateEventFormGroup>
    );
  }

  if (fieldProps.as === 'select') {
    const { label, id, children, as, ...props } = fieldProps;
    void as;
    return (
      <CreateEventFormGroup label={label} id={id}>
        <select id={id} className={styles.input} {...props}>
          {children}
        </select>
      </CreateEventFormGroup>
    );
  }

  const { label, id, as, ...props } = fieldProps;
  void as;
  return (
    <CreateEventFormGroup label={label} id={id}>
      <input id={id} className={styles.input} {...props} />
    </CreateEventFormGroup>
  );
};

interface ModalityButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
}

export const CreateEventModalityButton: React.FC<ModalityButtonProps> = ({ active, onClick, icon, text }) => (
  <button
    type="button"
    className={`${styles.modalityCard} ${active ? styles.modalityCardActive : ''}`}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </button>
);
