import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GiphyItem from '../components/molecules/Giphy-item/GiphyItem';
import useLoadNext from '../utils/custom-hooks/useLoadNext';
import SearchBar from '../components/molecules/SearchBar/SearchBar';
import Loading from '../components/atoms/Loader/Loading';

export default function App() {
    const [ data, setData ] = useState([]);

    const [ pageStart, setPageStart ] = useState(0);
    const [ query, setQuery ] = React.useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);

    const nextCount = React.useRef(21);

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
        let path = '/gifs/trending'
        let inputParams = {
            api_key: process.env.REACT_APP_API_KEY,
            limit: 21,
            offset: nextCount.current
        }

        if (query?.length) {
            path = '/gifs/search'
            inputParams = {
                ...inputParams,
                q: query
            }
        }

        setIsError(false);
        setIsLoading(true);

        setPageStart(prev => prev + nextCount.current)
        nextCount.current += pageStart;

        try {
            const results = await axios(`${process.env.REACT_APP_END_POINT}${path}`, {
                params: inputParams
            });

            if (query?.length) {
                setData(results?.data?.data);
            } else {
                setData(prev => [ ...prev, ...results?.data?.data ]);
            }
        } catch (err) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000);
        } finally {
            // setIsError(false)
            setIsLoading(false);
        }
    };

    const id = "last-scroll-element"

    useEffect(() => {
        fetchData();
    }, []);

    useLoadNext(id, fetchData)

    const renderError = () => {
        if (isError) {
            return (
                <div
                    className="error-msg"
                >
                    Unable to get Gifs, please try again in a few minutes
                </div>
            );
        }
    };

    return (
        <div className="parent__wrapper">
            <h2 className="heading">Giphy API Search</h2>

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
            { renderError()}
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
                {isLoading ? <Loading /> : ''}
            </div>
            <span id={id}></span>
        </div>
    )
}
