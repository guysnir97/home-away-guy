import React from 'react';
import { Pie } from 'react-chartjs-2';



export class RateHost extends React.Component {
    state = {
        dataToShow: null,
        reviews: {
            oneStar: 0,
            twoStar: 0,
            threeStar: 0,
            fourStar: 0,
            fiveStar: 0
        },
        idx: 0,

    }


    setDataChart = (labelCount) => {
        const data = {
            labels: Object.keys(labelCount),
            datasets: [
                {
                    label: '# of Votes',
                    data: Object.values(labelCount),
                    backgroundColor: [
                        'red',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 3,
                },
            ],
        };
        this.setState({ dataToShow: data })

    }

    async componentDidMount() {
        const { assets } = this.props
        const { idx } = this.state
        if (!idx) await this.countStarReview(assets[idx])
        const labelCount = this.state.reviews
        this.setDataChart(labelCount)


    }
    componentDidUpdate() {

    }

    countStarReview = (asset) => {
        var avg = []
        for (const review of asset.reviews) {
            const sum = (review.rate.cleanliness + review.rate.communication + review.rate.checkin + review.rate.accuracy + review.rate.value + review.rate.location) / 6
            avg.push(Math.floor(sum))
        }
        const temp = this.setRateReview(avg)
        this.setState({ reviews: temp })
    }
    setRateReview = (rates) => {

        let temp = {
            oneStar: 0,
            twoStar: 0,
            threeStar: 0,
            fourStar: 0,
            fiveStar: 0
        }
        for (const rate of rates) {
            switch (rate) {
                case 1:
                    temp.oneStar += 1
                    break;
                case 2:
                    temp.twoStar += 1
                    break;
                case 3:
                    temp.threeStar += 1
                    break;
                case 4:
                    temp.fourStar += 1
                    break;
                case 5:
                    temp.fiveStar += 1
                    break;
                default:
            }
        }
        return temp
    }

    currAssent = (idx) => {
        const { assets } = this.props
        this.setState({ idx }, async () => {
            this.countStarReview(assets[idx])
            this.setDataChart(this.state.reviews)
        })

    }
    render() {
        const { assets } = this.props
        return (
            <div className="statistic flex space-between">
                <div className=" flex column gap15 ">
                    {assets.map((asset, idx) => (
                        <div key={idx} className="stay-statistic flex pointer gap10" onClick={() => { this.currAssent(idx) }}>
                            <div>
                                <img src={asset.imgUrls[0]} alt="" />
                            </div>
                            <div className=" flex column gap10">
                                <h3 className="book fw-unset fs16 asset-header">{asset.name}</h3>
                                <h3 className="book fw-unset fs16 asset-header">{asset.loc.address}</h3>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="pie">
                    <Pie data={this.state.dataToShow} />
                </div>
            </div>

        )
    }
};


