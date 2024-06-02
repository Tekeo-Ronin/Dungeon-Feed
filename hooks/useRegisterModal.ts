import {create} from 'zustand';

interface RegisterMidalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useRegisterModal = create<RegisterMidalStore>((set) => ({
    isOpen: false,
    onOpen:()=> set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useRegisterModal;