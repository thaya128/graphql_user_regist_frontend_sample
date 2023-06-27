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
    <div>
      <h1 className="text-3xl font-bold underline">本の情報を追加する</h1>
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              タイトル
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="book title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              概要
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="book title" value={discription} onChange={(e) => setDiscription(e.target.value)} />
          </div>
        </div>  
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                createBook({ variables: { params: { title: title, discription: discription } } });
                setTitle("");
                setDiscription("");
              }}
            >
              本の情報を保存する
            </button>
          </div>
        </div>
      </form>
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
