"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./Todo.module.scss";
import {
  useDeleteAllMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodoQuery,
  usePostTodoMutation,
  useUploadFileMutation,
} from "@/redux/api/todo";
import Image from "next/image";
import { useState } from "react";

interface TodoType {
  url: string;
  title: string;
}
interface TodoTypeEdit {
  _id: number;
  url: string;
  title: string;
}

const TodoList = () => {
  const { register, handleSubmit, reset } = useForm<TodoType>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit } =
    useForm<TodoTypeEdit>();

  const [uploadFileMutation] = useUploadFileMutation();
  const [postTodoMutation] = usePostTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [editTodoMutation] = useEditTodoMutation();
  const [deleteAllMutation] = useDeleteAllMutation();
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const { data } = useGetTodoQuery();

  const onSubmit: SubmitHandler<TodoType> = async (data) => {
    const file = data.url[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseFile } = await uploadFileMutation(formData);

    const newData = {
      url: responseFile.url,
      title: data.title,
    };

    await postTodoMutation(newData);
    reset();
  };

  const onSubmitEdit: SubmitHandler<TodoTypeEdit> = async (data) => {
    const file = data.url[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseFile } = await uploadFileMutation(formData);

    const newData = {
      url: responseFile.url,
      title: data.title,
    };

    await editTodoMutation({ _id: isEdit, newData });
    setIsEdit(null);
  };

  return (
    <div id={scss.TodoList}>
      <div className="container">
        <div className={scss.TodoList}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" {...register("url", { required: true })} />
            <input type="text" {...register("title", { required: true })} />
            <button type="submit">Submit</button>
          </form>
          {data?.map((el) => (
            <button onClick={() => deleteAllMutation(el)} key="deleteAll">
              Delete ALL
            </button>
          ))}
        </div>
      </div>
      <div className={scss.Todos}>
        {data?.map((el) =>
          isEdit === el._id ? (
            <form onSubmit={handleSubmitEdit(onSubmitEdit)} key={el._id}>
              <input type="file" {...registerEdit("url")} />
              <input type="text" {...registerEdit("title")} />
              <button type="submit">Edit</button>
              <button type="button" onClick={() => setIsEdit(null)}>
                Cancel
              </button>
            </form>
          ) : (
            <div key={el._id}>
              <Image width={200} height={200} src={el.url} alt={el.title} />
              <h2>{el.title}</h2>
              <button onClick={() => deleteTodoMutation(el._id)}>Delete</button>
              <button onClick={() => setIsEdit(el._id)}>Edit</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TodoList;
