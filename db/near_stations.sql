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
    address public.stations.address%TYPE,  -- 기존에 추가된 주소
    output public.stations.output%TYPE,     -- 기존에 추가된 출력
    charger_count integer                   -- 새로 추가된 충전기 개수
)
language sql
as $$
  select 
    s.id, s.station_name, 
    st_distance(s.location, st_point(longitude, latitude)::geography) as dist_meters, 
    s.z_code, s.zs_code, s.charger_type, s.slug, s.address, s.output,
    count(c.id) as charger_count
  from 
    public.stations s
  left join public.chargers c on s.id = c.station_id
  group by s.id
  order by s.location <-> st_point(longitude, latitude)::geography
  limit max_results;
$$;