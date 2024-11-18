SELECT "parentalRating",
    "releaseYear"
FROM Movie
WHERE "parentalRating" = 'PG-13'
ORDER BY "releaseYear" DESC;