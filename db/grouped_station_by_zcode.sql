CREATE VIEW grouped_station_by_zcode AS
SELECT z_code, COUNT(*)
FROM stations
GROUP BY z_code
order by z_code;