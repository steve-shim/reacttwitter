import { useState, useContext } from "react";
import { PostProps } from "pages/home";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

export interface CommentFormProps {
  post: PostProps | null;
}

export default function CommentForm({ post }: CommentFormProps) {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (post && user) {
      const postRef = doc(db, "posts", post?.id);
      const commnetObj = {
        comment: comment,
        uid: user?.uid,
        email: user?.email,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      await updateDoc(postRef, {
        comments: arrayUnion(commnetObj),
      });

      toast.success("댓글을 생성했습니다.");
      setComment("");

      try {
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      // textarea 입력값을 comment 상태값에 업데이트 한다
      setComment(value);
    }
  };
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="comment"
        id="comment"
        required
        placeholder="What??"
        onChange={onChange}
        value={comment}
      />
      <div className="post-form__submit-area">
        <div />
        <input
          type="submit"
          value="Comment"
          className="post-form__submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
}
