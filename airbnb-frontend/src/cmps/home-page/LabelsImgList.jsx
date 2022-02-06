    import { LabelsImgPreview } from "./LabelsImgPreview"

    export function LabelsImgList({ links }) {
        return (
            <ul className="labels-img-list">
                {links.map((link, idx) => <LabelsImgPreview key={idx} link={link} idx={idx} />)}
            </ul>
        )

    }