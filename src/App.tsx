import { useBooksQuery, useCreateBookMutation } from "./graphql/generated";
import { useState } from "react";

function App() {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

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
      {books.map((book) => (
        <div key={book.id}>ID:{book.id} / title:{book.title} / disc:{book.discription}</div>
      ))}
    </div>
  );
}

export default App;
