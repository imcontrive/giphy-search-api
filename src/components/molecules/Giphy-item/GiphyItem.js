import './giphy.css'

export default function GiphyItem({ imgUrl, title }) {
    return (
        <picture className='giphy__item'>
            <img className='giphy_img' src={imgUrl} alt="giphy" loading='lazy' />
            <h3 className="giphy_title">{title}</h3>
        </picture>
    )
}
