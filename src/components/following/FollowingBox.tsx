import { PostProps } from "pages/home";

interface FollowingProps {
  post: PostProps;
}

export default function FollowingBox({ post }: FollowingProps) {
  return <button className="post__following-btn">Following</button>;
}
