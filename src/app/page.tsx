"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Edit from "@/components/Edit";
import { Todo } from "@/types/Todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const reloadTodos = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo`)
      .then((response) => response.json())
      .then((todos: Todo[]) => setTodos(todos));
  };
  const [editing, setEditing] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const handleClickNew = () => {
    setEditingTodo(null);
    setEditing(true);
  };
  const handleClickEdit = (todo: Todo) => () => {
    setEditingTodo(todo);
    setEditing(true);
  };
  const handleClickDelete = (todo: Todo) => () => {
    const confirmed = window.confirm(`Delete "${todo.title}"?`);
    if (confirmed) {
      const _ = fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${todo.id}`,
        {
          method: "DELETE",
        },
      ).then(reloadTodos);
    }
  };
  const close = () => {
    setEditingTodo(null);
    setEditing(false);
  };
  useEffect(() => {
    const _ = reloadTodos();
  }, []);
  return (
    <>
      <main className={styles.main}>
        <div className={styles.title}>
          <p>Todo App</p>
          <div>
            <button onClick={handleClickNew}>New</button>
          </div>
        </div>

        <div className={styles.center}>
          <table className={styles.grid}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.content}</td>
                  <td>{todo.createdAt}</td>
                  <td>{todo.updatedAt}</td>
                  <td>
                    <button onClick={handleClickEdit(todo)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={handleClickDelete(todo)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {editing && (
        <Edit todo={editingTodo} close={close} reload={reloadTodos} />
      )}
    </>
  );
}
