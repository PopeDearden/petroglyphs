UPDATE locations set (location_name, long, lat, location_imgae) = ($2,$3,$4,$5)
WHERE location_id = $1;
SELECT * FROM locations
WHERE location_id = $1;