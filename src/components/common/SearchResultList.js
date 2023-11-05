import './SearchResultList.css';

const SearchResultList = (props) => {

    return (
        <div className="results-list">
            {
                props.results &&
                props.results.map((result, i) => {
                    return (
                        <div key={i} onClick={()=> props.handleSelection(result)} className="search-result">{result.name}</div>
                    );
                })
            }
        </div>
    );

}

export default SearchResultList;