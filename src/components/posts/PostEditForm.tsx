import { useCallback, useState, useContext, useEffect } from "react";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { FiImage } from "react-icons/fi";
import { db } from "firebaseApp";

import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";

import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "pages/home";

export default function PostEidtForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]); // 성공적으로 생성한 모든 태그들을 담고있음
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileUpload = () => {};

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      console.log("useCallback getPost");
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
          hashTags: tags,
        });
      }
      navigate(`/posts/${post?.id}`);
      toast.success("게시글을 수정했습니다.");
      //   추가로직
      //   await addDoc(
      //     // db , collection이름 , 추가할 데이터
      //     collection(db, "posts"),
      //     {
      //       content: content,
      //       createdAt: new Date()?.toLocaleDateString("ko", {
      //         hour: "2-digit",
      //         minute: "2-digit",
      //         second: "2-digit",
      //       }),
      //       uid: user?.uid,
      //       email: user?.email,
      //     }
      //   );
      //   setContent("");
      //   toast.success("게시글을 생성했습니다.");
    } catch (e: any) {}
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      // 키보드 입력이 앤터고 && 스페이스가 아닌 값이 들어있는 경우
      // 만약 같은 태그가 있다면 에러를 띄운다
      // 아니라면 태그를 생성해준다
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <div className="post">
      <form className="post-form" onSubmit={onSubmit}>
        <textarea
          className="post-form__textarea"
          required
          name="content"
          id="content"
          placeholder="What is happening?"
          onChange={onChange}
          value={content}
        />
        <div className="post-form__hashtags">
          <span className="post-form__hashtags-outputs">
            {tags?.map((tag, index) => (
              <span
                className="post-form__hashtags-tag"
                key={index}
                onClick={() => removeTag(tag)}
              >
                #{tag}
              </span>
            ))}
          </span>
          <input
            className="post-form__input"
            name="hashtag"
            id="hashtag"
            placeholder="해시태그 + 스페이스바 입력"
            onChange={onChangeHashTag}
            onKeyUp={handleKeyUp}
            value={hashTag}
          />
        </div>
        <div className="post-form__submit-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <input type="submit" value="수정" className="post-form__submit-btn" />
        </div>
      </form>
    </div>
  );
}
