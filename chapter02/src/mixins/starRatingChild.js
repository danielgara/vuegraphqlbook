export default {
    inject: {
      StarRating: {
        default() {
          console.error('StarRatingDisplay need to be a child of StartRating');
        },
      },
    },
  };