import useCurrrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePosts from "./usePosts";
import usePost from "./usePost";

import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useLike = ({postId, userId}: {postId: string, userId?: string}) => {
const {data: currentUser} = useCurrrentUser();
const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
const { mutate: mutateFetchedPosts } = usePosts(userId);

const loginModal = useLoginModal();

const hasLiked = useMemo(() => {
    const list = fetchedPost?.likesIds || [];

    return list.includes(currentUser?.id);
}, [currentUser?.id, fetchedPost?.likesIds]);

const toggleLike =useCallback(async () => {
if(!currentUser) {
    return loginModal.onOpen();
}

try {
    let request;

    if(hasLiked) {
        request = () => axios.delete('/api/like', {data: {postId}})
    } else {
        request = () => axios.post('/api/like', {postId})
    }

    await request()
    mutateFetchedPost();
    mutateFetchedPosts();
    
} catch (error) {
    toast.error('Something went wrong');
}
}, [currentUser, loginModal, hasLiked, mutateFetchedPost, mutateFetchedPosts, postId])

return {hasLiked, toggleLike}
};

export default useLike;