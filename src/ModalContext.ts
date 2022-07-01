import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { ModalID } from "../types/modal";

export const ModalContext = createContext<{
  modalId: keyof ModalID | null;
  setModalId: Dispatch<SetStateAction<keyof ModalID | null>>;
}>({
  modalId: null,
  setModalId: () => {},
});
export const useModal = () => {
  const [modalId, setModalId] = useState<keyof ModalID | null>(null);
  const modalContext = useContext(ModalContext);
  return { modalContext, modalId, setModalId };
};
