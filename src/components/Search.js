import { useState } from "react";

function Search({onSubmit}) {
    const [keyword, setKeyword] = useState('')
    //const [path, pushLocation] = useLocation()

    /*const handleChange = (e) => {
        setKeyword(e.target.value)
    }*/

    const hanbleSubmit = (e) => {
        e.preventDefault()
        onSubmit({keyword})
       // onSearch(keyword)
      //  pushLocation(`/search/${keyword}`)
    }

    return (
        <div>
            <form onSubmit={hanbleSubmit}>
            Buscar: <input value={keyword} onChange={e => setKeyword(e.target.value)} />
            </form>
        </div>
    );
}
export default Search;