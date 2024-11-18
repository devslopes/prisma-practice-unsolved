SELECT AVG(sr."score")
FROM StarRating sr
WHERE sr."userId" = $1;