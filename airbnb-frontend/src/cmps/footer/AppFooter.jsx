import React from "react"
import { Link } from "react-router-dom"
import { stayService } from "../../services/stay.service"
import { utilService } from "../../services/util.service"
import { withRouter } from "react-router"
import Loader from "react-loader-spinner";

class _AppFooter extends React.Component {

    state = {
        staysTopRated: [],
        staysNearby: [],
        screenWidth: window.innerWidth
    }

    async componentDidMount() {
        window.addEventListener('resize', this.onResizeScreen)
        let { staysTopRated, staysNearby } = this.state
        staysTopRated = await this.getTopRated()
        staysNearby = await this.getNearby()
        this.setState({ staysTopRated, staysNearby })
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.onResizeScreen)
    }

    onResizeScreen = ({ target }) => {
        this.setState(prevState => ({ ...prevState, screenWidth: target.innerWidth }));
    }

    makeQueryParams = (city) => {
        const order = { address: city }
        return utilService.makeQueryParams(order)

    }

    getTopRated = async () => {
        const stays = await stayService.query()
        const staysTopRated = []
        let i = 0
        while (staysTopRated.length < 6) {
            if (stays[i].rating > 4.6) staysTopRated.push(stays[i])
            i++
        }
        return staysTopRated
    }
    getNearby = async () => {
        const stays = await stayService.query()
        const staysNearby = []
        let i = 0
        while (staysNearby.length < 6) {
            if (stays[i].loc.city === 'Tel Aviv' || stays[i].loc.city === 'Jerusalem') staysNearby.push(stays[i])
            i++
        }
        return staysNearby
    }

    render() {
        const { pathname } = this.props.history.location
        const { staysTopRated, staysNearby, screenWidth } = this.state
        const makeQueryParams = this.makeQueryParams
        if (!staysTopRated.length) return (
            <div className="flex align-center justify-center full">
                <Loader
                    type="ThreeDots"
                    color='#FF385C'
                    height={100}
                    width={100}
                />
            </div>
        )
        if (screenWidth > 450) {
            return (
                <div className="footer-container full">
                    <footer className={`main-footer ${pathname === '/' || pathname === '/host' || pathname === '/stay' || pathname === '/trip' ? 'main-container-home' : 'main-container'} `}>
                        <h2 className="footer-header fs30 fh40 bold">Explore the world</h2>
                        <div className="links-container flex ">
                            <div className="flex column space-between gap25">
                                <h3 className="footer-list-header fs22 fh26 book">Top rated</h3>
                                {staysTopRated.map(stay => (
                                    <div key={stay._id} className="flex column gap5" >
                                        <Link to={`/stay/${stay._id}?${makeQueryParams(`${stay.loc.city}`)}`}> <div className="medium">{stay.name}</div>
                                            <span>{stay.loc.address}</span></Link>
                                    </div>
                                ))}
                            </div>
                            <div className="flex column space-between ">
                                <h3 className="footer-list-mid-header fs22 fh26 book">Most visited cities</h3>
                                <div className="flex high column gap10">
                                    <div className="flex column gap5" >
                                        <Link to={`/stay?${makeQueryParams('Bangkok')}`}><div className="medium">Bangkok</div>
                                            <span>Thailand</span></Link>
                                    </div>
                                    <div className="flex column gap5" >
                                        <Link to={`/stay?${makeQueryParams('London')}`}><div className="medium">London</div>
                                            <span>England</span></Link>
                                    </div>
                                    <div className="flex column gap5" >
                                        <Link to={`/stay?${makeQueryParams('Barcelona')}`}><div className="medium">Barcelona</div>
                                            <span>Spain</span></Link>
                                    </div>
                                    <div className="flex column gap5" >
                                        <Link to={`/stay?${makeQueryParams('New York')}`}><div className="medium">New York</div>
                                            <span>USA</span></Link>
                                    </div>
                                    <div className="flex column gap5" >
                                        <Link to={`/stay?${makeQueryParams('Paris')}`}><div className="medium">Paris</div>
                                            <span>France</span></Link>
                                    </div>
                                    <div className="flex column gap5" >
                                        <Link to={`/stay?${makeQueryParams('Bali')}`}><div className="medium">Bali</div>
                                            <span>Indonesia</span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flex column space-between fh23">
                                <h3 className="footer-list-header fs22 fh26 book end">Nearby</h3>
                                {staysNearby.map((stay, idx) => (
                                    <div key={idx} className="flex column gap5" >
                                        <Link to={`/stay/${stay._id}?${makeQueryParams(`${stay.loc.city}`)}`}> <div className="medium">{stay.name}</div>
                                            <span>{stay.loc.address}</span> </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="seperation-line last"></div>
                        <div className="flex justify-center">
                            <p className="fs16 fh20 book">© 2021 Home away, Inc.</p>
                        </div>
                    </footer>
                </div>
            )
        } else {
            return (
                <div></div>
                )
                // <footer className="main-footer-mobile main-container-home">
                //     <nav className="mobile-container">
                //         <div className="explore">
                //             <Link to="/stay"></Link>
                //         </div>
                //         <div className="wish-list">
                //             <Link to="/stay"></Link>
                //         </div>
                //         <div className="inbox">
                //             <Link to="/"></Link>
                //         </div>
                //         <div className="trip">
                //             <Link to="/trip"></Link>
                //         </div>
                //         <div className="profile">
                //             <Link to="/"></Link>
                //         </div>
                //     </nav>
                // </footer>
        }
    }
}

export const AppFooter = withRouter(_AppFooter)




