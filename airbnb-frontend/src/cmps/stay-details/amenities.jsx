import { AirConditioning } from "../svgs/AirConditioning"
import { Gym } from "../svgs/Gym"
import { Hangers } from "../svgs/Hangers"
import { Kitchen } from "../svgs/Kitchen"
import { LongStay } from "../svgs/LongStay"
import { SmokeAlarm } from "../svgs/SmokeAlarm"
import { TV } from "../svgs/TV"
import { WiFi } from "../svgs/WiFi"


export function Amenities({ amenity }) {
    switch (amenity.toLowerCase()) {
        case 'kitchen' :
            return <div className="amenity-container flex gap5">
                <Kitchen/>
                <p>Kitchen</p>
            </div>
        case 'tv':
            return <div className="amenity-container flex gap5">
                <TV/>
                <p>TV</p>
            </div>
        case 'long stay':
            return <div className="amenity-container flex gap5">
                <LongStay/>
                <p>Long-term stays allowed</p>
            </div>
        case 'wifi':
            return <div className="amenity-container flex gap5">
                <WiFi/>
                <p>Wi-Fi</p>
            </div>
        case 'air conditioning':
            return <div className="amenity-container flex gap5">
                <AirConditioning/>
                <p>Air conditioning</p>
            </div>
        case 'smoke alarm':
            return <div className="amenity-container flex gap5">
                <SmokeAlarm/>
                <p>Smoke Alarm</p>
            </div>
        case 'gym':
            return <div className="amenity-container flex gap5">
                <Gym/>
                <p>Gym</p>
            </div>
        case 'hangers':
            return <div className="amenity-container flex gap5">
                <Hangers/>
                <p>Hangers</p>
            </div>
            default: return null
    }
}