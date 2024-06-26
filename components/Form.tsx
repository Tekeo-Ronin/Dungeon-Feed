import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Post Created");

      setBody("");
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="peer mt-3 w-full resize-none bg-black text-[20px] text-white
                placeholder-neutral-500 outline-none ring-0 disabled:opacity-80"
              placeholder={placeholder}
            ></textarea>
            <hr className="h-[1px] w-full border-neutral-800 opacity-0 transition peer-focus:opacity-100" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Send"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Welcome to DungeonFeed
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Sign Up" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default Form;
