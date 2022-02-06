import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service" 
export function LabelsImgPreview({ link, idx }) {
    const order = { label: link.value }
    const queryString = utilService.makeQueryParams(order)
    return ( 
        <Link  className="link-labels" to={`/stay?${queryString}`}>
            <li className="label-img">
                <img className={`labels-img round-edge link-${idx}`} src={link.img} alt="" />
                <h3 className="label-txt">{link.label}</h3>
            </li>
        </Link>
    )

}
