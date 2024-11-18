SELECT m."id",
    m."title",
    m."releaseYear",
    m."parentalRating"
FROM Movie m
    JOIN StarRating sr on sr."movieId" = m."id"
    JOIN User u on u."id" = sr."userId"
WHERE sr."userId" = $1;