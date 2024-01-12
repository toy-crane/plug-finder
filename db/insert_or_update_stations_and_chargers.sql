DECLARE
    station_data JSONB;
    charger_data JSONB;
    new_station_id UUID;
BEGIN
    FOR station_data IN SELECT * FROM jsonb_array_elements(data->'stations')
    LOOP
        -- 'stations' 데이터 upsert
        INSERT INTO public.stations (
            station_name, external_station_id, address, detail_location, lat, lng, location,
            org_id, org_name, org_contact, z_code, parking_free, note, available,
            available_detail, is_deleted, is_deleted_detail, zs_code, usable_time, slug, display_station_name,
            charger_type
        )
        VALUES (
            station_data->>'station_name', station_data->>'external_station_id', station_data->>'address',
            station_data->>'detail_location', (station_data->>'lat')::REAL, (station_data->>'lng')::REAL,
            st_point((station_data->>'lng')::REAL, (station_data->>'lat')::REAL),
            station_data->>'org_id', station_data->>'org_name', station_data->>'org_contact', 
            station_data->>'z_code', (station_data->>'parking_free')::BOOLEAN, station_data->>'note',
            (station_data->>'available')::BOOLEAN, station_data->>'available_detail',
            (station_data->>'is_deleted')::BOOLEAN, station_data->>'is_deleted_detail',
            station_data->>'zs_code', station_data->>'usable_time', station_data->>'slug',
            station_data->>'display_station_name',
            station_data->>'charger_type'
        )
        ON CONFLICT (external_station_id)
        DO UPDATE SET
            address = EXCLUDED.address, detail_location = EXCLUDED.detail_location, 
            lat = EXCLUDED.lat, lng = EXCLUDED.lng, location = EXCLUDED.location,
            org_id = EXCLUDED.org_id, org_name = EXCLUDED.org_name, org_contact = EXCLUDED.org_contact, 
            z_code = EXCLUDED.z_code, parking_free = EXCLUDED.parking_free, note = EXCLUDED.note,
            available = EXCLUDED.available, available_detail = EXCLUDED.available_detail, 
            is_deleted = EXCLUDED.is_deleted, is_deleted_detail = EXCLUDED.is_deleted_detail,
            zs_code = EXCLUDED.zs_code, usable_time = EXCLUDED.usable_time, slug = EXCLUDED.slug, display_station_name = EXCLUDED.display_station_name,
            charger_type = EXCLUDED.charger_type
        RETURNING id INTO new_station_id; -- 새로운 또는 기존 station ID를 반환

        -- 'chargers' 데이터 upsert
        FOR charger_data IN SELECT * FROM jsonb_array_elements(station_data->'chargers')
        LOOP
            INSERT INTO public.chargers (
                station_id, external_station_id, output, method, charger_type, external_charger_id
            )
            VALUES (
                new_station_id, charger_data->>'external_station_id', charger_data->>'output',
                charger_data->>'method', charger_data->>'charger_type', 
                charger_data ->>'external_charger_id'
            )
            ON CONFLICT (external_charger_id, external_station_id)
            DO UPDATE SET 
                output = EXCLUDED.output,
                method = EXCLUDED.method, 
                charger_type = EXCLUDED.charger_type;
        END LOOP;
    END LOOP;
EXCEPTION WHEN others THEN
    -- 오류 처리
    RAISE;
END;