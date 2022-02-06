export function ReviewPreview({ review }) {

    return (
        <div className="review-preview">
            <div className="review-preview-header flex gap10">
                <img className="user-profile-img" src={review.by.imgUrl} alt="" />
                <div className="review-preview-name-date flex column">
                    <p>  <span className="user-name bold">{review.by.fullname}</span> <br />
                        <span className="fade-font">{review.date}</span> </p>
                </div>
            </div>
            <p>{review.desc}</p>
        </div >
    )
}
