import { EnhancedClean } from "../svgs/EnhancedClean";
import { FreeCancel } from "../svgs/FreeCancel";
import { GreatCheckin } from "../svgs/GreatCheckin";
import { HouseTag } from "../svgs/HouseTag";
import { SelfCheckIn } from "../svgs/SelfCheckIn";
import { WiFi } from "../svgs/WiFi";

export function Tags({ tag, type }) {
    switch (tag) {
        case 'entire to yourself':
            return <div className="tag-container flex">
                <HouseTag />
                <div className="flex column">
                    <p>  <span className="tag-header">{`Entire ${type}`}</span> <br />
                        <span className="fade-font"> {`You'll have the entire ${type} to yourself.`}</span></p>
                </div>
            </div>
        case 'enhanced clean':
            return <div className="tag-container flex">
                <EnhancedClean />
                <div className=" flex column">
                    <p>  <span className="tag-header">Enhanced Clean</span> <br />
                        <span className="fade-font">The host committed to Homeaway's 5-step enhanced cleaning process.</span> </p>
                </div>
            </div>
        case 'self check-in':
            return <div className="tag-container flex">
                <SelfCheckIn />
                <div className="flex column">
                    <p> <span className="tag-header">Self Check-in</span> <br />
                        <span className="fade-font"> Check yourself in with the key safe.</span></p>
                </div>
            </div>
        case 'free cancellation':
            return <div className="tag-container flex">
                <FreeCancel />
                <div className="flex column">
                    <p> <span className="tag-header">Free cancellation up to 48 hours before the check-in.</span> <br />
                        <span className="fade-font">You won't be charged for reservasion.</span></p>
                </div>
            </div>
        case 'great check-in':
            return <div className="tag-container flex">
                <GreatCheckin />
                <div className="flex column">
                    <p> <span className="tag-header">Great Check-in experience</span> <br />
                        <span className="fade-font">95% of recent guests gave the check-in process a 5-star rating.</span></p>
                </div>
            </div>
        case 'wifi':
            return <div className="tag-container flex">
                <WiFi />
                <div className="flex column">
                    <p> <span className="tag-header">Wi-Fi</span> <br />
                        <span className="fade-font">Guests often search for this popular amenity.</span></p>
                </div>
            </div>
        default:

    }
}