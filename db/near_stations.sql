create or replace function nearby_stations(
    latitude float, 
    longitude float, 
    max_results integer
)
returns table (
    id public.stations.id%TYPE, 
    station_name public.stations.station_name%TYPE, 
    dist_meters float,
    z_code public.stations.z_code%TYPE,
    zs_code public.stations.zs_code%TYPE,
    charger_type public.stations.charger_type%TYPE,
    slug public.stations.slug%TYPE,
    address public.stations.address%TYPE,  -- Added address
    output public.stations.output%TYPE     -- Added output
)
language sql
as $$
  select id, station_name, st_distance(location, st_point(longitude, latitude)::geography) as dist_meters, z_code, zs_code, charger_type, slug, address, output
  from public.stations
  order by location <-> st_point(longitude, latitude)::geography
  limit max_results;
$$;