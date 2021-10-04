import React from 'react'

export default function useLoadNext(
    id,
    callback
){
    React.useEffect(() => {
        const options = {
            root: null,
            rootMargin: "90px 0px",
            threshold: 0
        };

        const observerCallBack = enteries => {
            if (enteries[ 0 ].isIntersecting) {
                callback();
            }
            return;
        };

        const observer = new IntersectionObserver(observerCallBack, options);
        const target = document.querySelector(`#${id}`);

        observer.observe(target);
    }, [])

}
