import React, { useCallback } from 'react';
import styles from './Search.module.scss';
import { FiSearch } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import {SearchContext} from "../App/App";
import {debounce} from "lodash"; // Cross icon

export const Search = () => {
    const {searchValue, setSearchValue} = React.useContext(SearchContext);
    const inputRef = React.useRef();
    const [value, setValue] = React.useState('');

    const handleClear = () => {
        setValue('');
        setSearchValue('');
        inputRef.current.focus();
    };
    const updateSearch = useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 400),
        []
    );
    const onChange = (e) => {
        setValue(e.target.value);
        updateSearch(e.target.value);
    }


    return (
        <div className={styles.searchWrapper}>
            <input
                ref={inputRef}
                type="text"
                className={styles.input}
                placeholder="Search your pizza..."
                value={value}
                onChange={(e) => onChange(e)}
            />
            <FiSearch className={styles.icon} />
            {searchValue && (
                <FiX
                    className={styles.clearIcon}
                    onClick={handleClear}
                />
            )}
        </div>
    );
};
