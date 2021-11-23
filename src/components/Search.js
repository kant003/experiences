import { useState } from "react";

function Search({ onSubmit }) {
    const [keyword, setKeyword] = useState('')

    const hanbleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ keyword })
        //  pushLocation(`/search/${keyword}`)
    }

    return (
        <div>
            <form onSubmit={hanbleSubmit}>
                Buscar por tag: <input value={keyword} onChange={e => setKeyword(e.target.value)} />
            </form>
        </div>
    );
}
export default Search;