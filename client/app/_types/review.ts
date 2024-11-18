export interface ReviewState {
    email: string;
    isReviewVisible: Record<string, boolean>;
    classesReview:  Record<number, { stars: number; reviewTitle: string, reviewText: string }>;
    unsubmittedReviews: Record<number, { stars: number; reviewTitle: string, reviewText: string }>,
    status: string;
    error: string | null;
}

export interface Review {
    CLASS_ID: number,
    STARS: number;
    REVIEWER_NAME: string,
    REVIEW_TITLE: string,
    REVIEW_TEXT: string,
}