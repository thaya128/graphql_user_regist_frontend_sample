import "tailwindcss/tailwind.css";
import {
  useBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
} from "./graphql/generated";
import { useState } from "react";

function App() {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [deleteBook] = useDeleteBookMutation({ refetchQueries: ["books"] });

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">CRUD books</h1>
      <label className="block">
        <span className="text-gray-700">title</span>
        <input className="form-input mt-1 block w-full" placeholder="book title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="block">
        <span className="text-gray-700">discription</span>
        <textarea className="form-textarea mt-1 block w-full" placeholder="book discription" value={discription} onChange={(e) => setDiscription(e.target.value)} />
      </label>
      <button
        onClick={() => {
          createBook({ variables: { params: { title: title, discription: discription } } });
          setTitle("");
          setDiscription("");
        }}
      >
        保存
      </button>
      <table className="border-collapse border border-slate-500 ...">
        <thead>
          <tr>
            <th className="border border-slate-600 ...">id</th>
            <th className="border border-slate-600 ...">タイトル</th>
            <th className="border border-slate-600 ...">説明</th>
            <th className="border border-slate-600 ...">削除ボタン</th>
          </tr>
        </thead>
        <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td className="border border-slate-700 ...">{book.id}</td>
            <td className="border border-slate-700 ...">{book.title}</td>
            <td className="border border-slate-700 ...">{book.discription}</td>
            <td className="border border-slate-700 ...">
              <button onClick={() => deleteBook({ variables: { id: book.id } })}>
                削除
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
