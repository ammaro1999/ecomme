function ProductReviews({ product, onAddReview, language }) {
    try {
        const [reviews, setReviews] = React.useState(product.reviews || []);
        const [showReviewForm, setShowReviewForm] = React.useState(false);
        const [sortBy, setSortBy] = React.useState('newest');
        const [filterRating, setFilterRating] = React.useState(0);
        const [userReview, setUserReview] = React.useState({
            rating: 5,
            title: '',
            comment: ''
        });

        const t = translations[language];
        const user = JSON.parse(localStorage.getItem('user'));

        const handleSubmitReview = async (e) => {
            e.preventDefault();
            if (!user) {
                alert(t.loginToReview);
                return;
            }

            try {
                const reviewData = {
                    productId: product.id,
                    userId: user.objectId,
                    userName: user.objectData.name || user.objectData.email || user.objectData.phone,
                    rating: userReview.rating,
                    title: userReview.title,
                    comment: userReview.comment,
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    verified: true
                };

                const savedReview = await saveReview(reviewData);
                setReviews([savedReview.objectData, ...reviews]);
                setShowReviewForm(false);
                setUserReview({ rating: 5, title: '', comment: '' });
                onAddReview(savedReview.objectData);
            } catch (error) {
                console.error('Error submitting review:', error);
                alert(t.reviewError);
            }
        };

        const handleLikeReview = async (reviewId) => {
            if (!user) {
                alert(t.loginToLike);
                return;
            }

            try {
                const review = reviews.find(r => r.id === reviewId);
                const newLikes = review.likes + 1;
                await updateReviewLikes(reviewId, newLikes);
                setReviews(reviews.map(r => 
                    r.id === reviewId ? { ...r, likes: newLikes } : r
                ));
            } catch (error) {
                console.error('Error liking review:', error);
                alert(t.likeError);
            }
        };

        const sortedAndFilteredReviews = React.useMemo(() => {
            let result = [...reviews];

            if (filterRating > 0) {
                result = result.filter(review => review.rating === filterRating);
            }

            switch (sortBy) {
                case 'newest':
                    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'highest':
                    result.sort((a, b) => b.rating - a.rating);
                    break;
                case 'lowest':
                    result.sort((a, b) => a.rating - b.rating);
                    break;
                case 'mostLiked':
                    result.sort((a, b) => b.likes - a.likes);
                    break;
                default:
                    break;
            }

            return result;
        }, [reviews, sortBy, filterRating]);

        const renderStars = (rating) => {
            return Array.from({ length: 5 }).map((_, index) => (
                <i
                    key={index}
                    className={`fas fa-star ${
                        index < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                ></i>
            ));
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                        {t.reviews} ({reviews.length})
                    </h3>
                    {!showReviewForm && (
                        <button
                            onClick={() => setShowReviewForm(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {t.writeReview}
                        </button>
                    )}
                </div>

                {showReviewForm && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t.rating}
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setUserReview({
                                                ...userReview,
                                                rating: star
                                            })}
                                            className="text-2xl"
                                        >
                                            <i className={`fas fa-star ${
                                                star <= userReview.rating 
                                                    ? 'text-yellow-400' 
                                                    : 'text-gray-300'
                                            }`}></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t.reviewTitle}
                                </label>
                                <input
                                    type="text"
                                    value={userReview.title}
                                    onChange={(e) => setUserReview({
                                        ...userReview,
                                        title: e.target.value
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t.reviewComment}
                                </label>
                                <textarea
                                    value={userReview.comment}
                                    onChange={(e) => setUserReview({
                                        ...userReview,
                                        comment: e.target.value
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowReviewForm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    {t.cancel}
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {t.submitReview}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="flex gap-4 mb-6">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="newest">{t.newest}</option>
                        <option value="highest">{t.highestRated}</option>
                        <option value="lowest">{t.lowestRated}</option>
                        <option value="mostLiked">{t.mostLiked}</option>
                    </select>
                    <select
                        value={filterRating}
                        onChange={(e) => setFilterRating(Number(e.target.value))}
                        className="border rounded px-3 py-2"
                    >
                        <option value="0">{t.allRatings}</option>
                        <option value="5">5 {t.stars}</option>
                        <option value="4">4 {t.stars}</option>
                        <option value="3">3 {t.stars}</option>
                        <option value="2">2 {t.stars}</option>
                        <option value="1">1 {t.star}</option>
                    </select>
                </div>

                <div className="space-y-6">
                    {sortedAndFilteredReviews.map(review => (
                        <div key={review.id} className="border-b pb-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        {renderStars(review.rating)}
                                        {review.verified && (
                                            <span className="text-green-500 text-sm">
                                                <i className="fas fa-check-circle"></i> {t.verifiedPurchase}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-medium mt-1">{review.title}</h4>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-2">{review.comment}</p>
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    {review.userName}
                                </div>
                                <button
                                    onClick={() => handleLikeReview(review.id)}
                                    className="text-gray-500 hover:text-blue-500"
                                >
                                    <i className="far fa-thumbs-up mr-1"></i>
                                    {review.likes}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductReviews component error:', error);
        reportError(error);
        return null;
    }
}
export default ProductReviews;