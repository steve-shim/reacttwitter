import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "test1@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123111",
  },
  {
    id: "2",
    email: "test2@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123122",
  },
  {
    id: "3",
    email: "test3@test.com",
    content: "내용입니다",
    createdAt: "2023-08-30",
    uid: "123133",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      {/* Post Form */}
      <PostForm />
      {/* Tweet Post */}
      <div className="post">
        {posts?.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
