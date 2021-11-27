import { useState } from "react";

function Search({ onSubmit }) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ keyword })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="input mb-5" value={keyword} onChange={e => setKeyword(e.target.value)} />
      </form>
    </div>
  );
}
export default Search;
