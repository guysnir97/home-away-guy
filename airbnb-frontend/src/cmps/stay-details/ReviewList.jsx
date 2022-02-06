import { ReviewPreview } from "./ReviewPreview"

export function ReviewList({ reviews }) {
    return (
        <div className="reviews-container">
            {reviews.map((review, idx) => <ReviewPreview key={idx} review={review} />)}
        </div>
    )

}
