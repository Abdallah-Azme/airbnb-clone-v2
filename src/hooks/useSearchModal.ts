import { create } from "zustand";

type SearchModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useSearchModal = create<SearchModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
