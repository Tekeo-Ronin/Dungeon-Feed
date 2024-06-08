import PostItem from "@/components/posts/PostItem";
import Header from "@/components/Header";
import usePost from "@/hooks/usePost";
import Form from "@/components/Form";

import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex h-full items-center justify-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Post" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Write your reply"
      />
    </>
  );
};

export default PostView;
