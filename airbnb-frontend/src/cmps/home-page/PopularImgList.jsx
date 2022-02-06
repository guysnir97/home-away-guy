import { PopularImgPreview } from './PopularImgPreview'
export function PopularImgList({ links, onImgClick }) {
    return (
        <ul className="popular-img-list">
            {links.map((link, idx) => <PopularImgPreview onImgClick={onImgClick} key={idx} link={link} idx={idx} />)}
        </ul>

    )


}