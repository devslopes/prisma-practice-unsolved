SELECT u."id"
FROM User u
    JOIN StarRating sr ON sr."userId" = u."id"
GROUP BY u."id"
ORDER BY AVG(sr."score") DESC
LIMIT 1;