import UserHero from "@/components/users/UserHero";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";

import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser)
    return (
      <div className="flex h-full items-center justify-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
