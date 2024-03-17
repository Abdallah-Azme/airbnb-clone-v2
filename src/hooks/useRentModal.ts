import { StoreApi, UseBoundStore, create } from "zustand";

type RentModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useRentModal: UseBoundStore<StoreApi<RentModalStore>> =
  create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export default useRentModal;
