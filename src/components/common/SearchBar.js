import { useEffect, useRef, useState } from 'react';
import './SearchBar.css';
import { GridSearchIcon } from '@mui/x-data-grid';
import SearchResultList from './SearchResultList';

const SearchBar = (props) => {
    const [userInputText, setUserInputText] = useState('');
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleSelection = (result) =>{
        props.selectAction(result.id);
        setUserInputText(result.name);
        setShowResults(false);
        
    }

    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowResults(false);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [wrapperRef]);

    const handleChange = (event) => {
        setUserInputText(event.target.value);
        setShowResults(true);
        if (props.data) {
            // userInputText && s && s.name && s.name.toLowerCase().includes(userInputText.toLowerCase)
            setResults(props.data.filter(
                (s) =>  userInputText && s && s.name && s.name.toLowerCase().includes(userInputText.toLowerCase())
            ));
        }
    }

    return (
        <div className='root' ref={wrapperRef}>
            <div className="input-wrapper">
               <GridSearchIcon id="search-icon"/>
               <input
                placeholder='Search ...'
                value={userInputText}
                onChange={(e) => handleChange(e)}
                />
            </div>
            {   showResults &&
                <SearchResultList handleSelection={handleSelection} results={results}/>
            }
        </div>
    );

}

export default SearchBar;