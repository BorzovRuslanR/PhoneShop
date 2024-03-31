
function calculateAverageRating(ratings: { rating: number }[]): number | null {
    if (ratings.length === 0) {
      return null;
    }
  
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;
    return averageRating;
  }