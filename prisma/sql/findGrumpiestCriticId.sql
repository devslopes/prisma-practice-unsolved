SELECT u.*
FROM User u
    JOIN StarRating sr ON sr."userId" = u."id"
GROUP BY u."id"
ORDER BY AVG(sr."score") ASC
LIMIT 1;