import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarPostItem = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div
        className="mt-6 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full
          bg-rose-500 p-4 transition hover:bg-opacity-80 lg:hidden"
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="mt-6 hidden cursor-pointer rounded-full bg-rose-500 px-4 py-2 transition
          hover:bg-opacity-90 lg:block"
      >
        <p className="hidden text-center text-[20px] font-semibold text-white lg:block">
          Make post
        </p>
      </div>
    </div>
  );
};

export default SidebarPostItem;
