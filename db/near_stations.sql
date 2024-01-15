CREATE OR REPLACE FUNCTION nearby_stations(lat FLOAT, long FLOAT, max_results INT)
RETURNS TABLE (
    id UUID, 
    station_name TEXT, 
    lat FLOAT, 
    long FLOAT, 
    dist_meters FLOAT,
    z_code TEXT,
    zs_code TEXT,
    charger_type TEXT,
    slug TEXT
)
LANGUAGE SQL
AS $$
  SELECT 
    id, 
    station_name, 
    ST_Y(location::geometry) AS lat, 
    ST_X(location::geometry) AS long, 
    ST_Distance(location, ST_Point(long, lat)::geography) AS dist_meters,
    z_code,
    zs_code,
    charger_type,
    slug
  FROM 
    public.stations
  WHERE 
    location IS NOT NULL
  ORDER BY 
    location <-> ST_Point(long, lat)::geography
  LIMIT 
    max_results;
$$;