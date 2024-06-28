import styles from "./Edit.module.css";
import { ChangeEvent, useState } from "react";
import { Todo } from "@/types/Todo";

const TITLE_SIZE = 30;
const CONTENT_SIZE = 80;

export type EditProps = {
  todo: Todo | null;
  close: () => void;
};

export default function Edit({ todo, close }: EditProps) {
  const [title, setTitle] = useState<string>(todo?.title ?? "");
  const [content, setContent] = useState<string>(todo?.content ?? "");
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleClickSubmit = () => {
    if (todo !== null) {
      const _putPromise = fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/put/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: todo.id, title, content }),
        },
      );
    } else {
      const _postPromise = fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        },
      );
    }
    close();
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div>
            <h3>{todo !== null ? "Edit" : "New"} Todo</h3>
          </div>
          <div>Title</div>
          <div>
            <input
              value={title}
              onChange={handleChangeTitle}
              size={TITLE_SIZE}
            />
          </div>
          <div>Content</div>
          <div>
            <input
              value={content}
              onChange={handleChangeContent}
              size={CONTENT_SIZE}
            />
          </div>
          <div>
            <button onClick={handleClickSubmit}>Submit</button>
            <button onClick={close}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
