import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GiphyItem from './molecules/Giphy-item/GiphyItem';
import useLoadNext from '../utils/custom-hooks/useLoadNext';
import SearchBar from './molecules/SearchBar/SearchBar';

export default function Giphy() {
    const limit = 21
    const [ data, setData ] = useState([]);

    const [ pageStart, setPageStart ] = useState(0);
    const [ query, setQuery ] = React.useState('');


    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);

    const fetchNew = React.useRef(0);


    // set query
    const handleChange = e => {
        setQuery(e.target.value)
    }

    // search action on onclick
    const searchByQuery = (e) => {
        e.preventDefault()
        fetchData()
    }

    // fetch data
    const fetchData = async () => {
        let inputParams;
        let path = ''

        if (query?.length) {
            path = '/gifs/search'
            inputParams = {
                api_key: process.env.REACT_APP_API_KEY,
                limit: 21,
                q: query
            }
        } else {
            path = '/gifs/trending'
            inputParams = {
                api_key: process.env.REACT_APP_API_KEY,
                limit: 21,
                offset: fetchNew.current
            }
        }

        setIsError(false);
        setIsLoading(true);

        setPageStart(prev => prev + limit)
        fetchNew.current += pageStart + limit;

        try {
            const results = await axios(`${process.env.REACT_APP_END_POINT}${path}`, {
                params: inputParams
            });

            setData(prev => [ ...prev, ...results?.data?.data ]);
        } catch (err) {
            // setIsError(true);
            // setTimeout(() => setIsError(false), 4000);
        } finally {
            setIsError(false)
            setIsLoading(false);
        }
    };

    const id = "last-scroll-element"

    useEffect(() => {
        fetchData();
    }, []);

    useLoadNext(id, fetchData)

    return (
        <div className="parent__wrapper">
            <form className="search">
                <input
                    type="text"
                    className="search-bar"
                    onChange={handleChange}
                    placeholder="Type to search..."
                    autoFocus
                />
                <button className='button' onClick={searchByQuery} >Search</button>
            </form>
            {/* <SearchBar /> */}
            <div className="gif-wrappcer gallery__item">
                {data && data.map(giphy => {
                    return (
                        <GiphyItem key={data?.id}
                            imgUrl={giphy.images.fixed_height.url}
                            title={giphy?.title}
                        />
                    );
                })
                }
            </div>
            <span id={id}></span>
        </div>
    )
}
