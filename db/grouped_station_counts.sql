CREATE VIEW grouped_station_by_zscode AS
SELECT zs_code, COUNT(*)
FROM stations
GROUP BY zs_code;