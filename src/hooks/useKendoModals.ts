import { useCallback, useState } from 'react';

export function useKendoModals<TModal extends string, TPayload = unknown>() {
  const [modal, setModal] = useState<TModal | null>(null);
  const [modalPayload, setModalPayload] = useState<TPayload | null>(null);

  const openModal = useCallback((type: TModal, payload?: TPayload | null) => {
    setModal(type);
    setModalPayload(payload ?? null);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setModalPayload(null);
  }, []);

  return {
    modal,
    modalPayload,
    openModal,
    closeModal,
    isOpen: modal !== null,
  };
}
