import React, { useCallback } from 'react';
import styles from './Search.module.scss';
import { FiSearch } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';

import {debounce} from "lodash";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

export const Search = () => {
    const dispatch = useDispatch();
    const inputRef = React.useRef();
    const [value, setValue] = React.useState('');

    const handleClear = () => {
        setValue('');
        dispatch(setSearchValue(''))
        inputRef.current.focus();
    };
    const updateSearch = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
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
            {value && (
                <FiX
                    className={styles.clearIcon}
                    onClick={handleClear}
                />
            )}
        </div>
    );
};
