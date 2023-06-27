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
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={discription} onChange={(e) => setDiscription(e.target.value)} />
      <button
        onClick={() => {
          createBook({ variables: { params: { title: title, discription: discription } } });
          setTitle("");
          setDiscription("");
        }}
      >
        保存
      </button>
      <table>
        <tr>
          <th>id</th>
          <th>タイトル</th>
          <th>説明</th>
          <th>削除ボタン</th>
        </tr>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.discription}</td>
            <td>
              <button onClick={() => deleteBook({ variables: { id: book.id } })}>
                削除
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
