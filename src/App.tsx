import { useBooksQuery } from "./graphql/generated";


function App() {
  const { data: { books = [] } = {} } = useBooksQuery();

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>ID:{book.id} / title:{book.title} / disc:{book.discription}</div>
      ))}
    </div>
  );
}

export default App;
