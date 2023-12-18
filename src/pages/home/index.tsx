import { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "firebaseApp";

import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

import AuthContext from "context/AuthContext";

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

// const posts: PostProps[] = [
//   {
//     id: "1",
//     email: "test1@test.com",
//     content: "내용입니다",
//     createdAt: "2023-08-30",
//     uid: "123111",
//   },
//   {
//     id: "2",
//     email: "test2@test.com",
//     content: "내용입니다",
//     createdAt: "2023-08-30",
//     uid: "123122",
//   },
//   {
//     id: "3",
//     email: "test3@test.com",
//     content: "내용입니다",
//     createdAt: "2023-08-30",
//     uid: "123133",
//   },
// ];

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  // 사용자가 로그인되었나 확인
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        console.log("dataObj", dataObj);
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div className="home__tab home__tab--active">For You</div>
          <div className="home__tab">Following</div>
        </div>
      </div>

      {/* Post Form */}
      <PostForm />
      {/* Tweet Post */}
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
