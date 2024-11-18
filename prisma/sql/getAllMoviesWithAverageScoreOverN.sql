SELECT m.*
FROM Movie m
    JOIN StarRating sr on sr."movieId" = m."id"
GROUP BY m."id"
HAVING AVG("score") > $1;