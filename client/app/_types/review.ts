export interface ReviewState {
    email: string;
    isReviewVisible: Record<string, boolean>;
    classesReview:  Record<number, { stars: number; reviewText: string }>;
    unsubmittedReviews: Record<number, { stars: number; reviewText: string }>,
    status: string;
    error: string | null;
}