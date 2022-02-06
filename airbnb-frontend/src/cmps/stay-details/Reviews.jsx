export function Reviews({ reviews }) {




    return (
        <div className="reviews-container">
            {reviews.slice(0, 6).map((review, idx) => (
                <ReviewPreview key={idx} review={review} />
            ))}
        </div>
    )
}