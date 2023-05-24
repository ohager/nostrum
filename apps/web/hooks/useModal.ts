import { ModalEvent } from "@/types/modalEvent";

export const useModal = () => {
  function openModal(data: ModalEvent) {
    window.dispatchEvent(new CustomEvent("modal", { detail: data }));
  }

  function closeModal() {
    window.dispatchEvent(new CustomEvent("modal", { detail: null }));
  }

  return { openModal, closeModal };
};
