-- ==============================================================================
-- VOLTGRID COMMERCIAL ELECTRICAL DISPATCH OS (Phase 2 - #60)
-- Medium-Voltage Switchgear & EV Fast Charging Dispatch Schema
-- ==============================================================================

-- 1. Electrical Work Orders Table
CREATE TABLE IF NOT EXISTS electrical_work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code TEXT NOT NULL UNIQUE,
    facility_name TEXT NOT NULL,
    property_address TEXT NOT NULL,
    voltage_spec TEXT NOT NULL DEFAULT '480V / 3Φ',
    issue_description TEXT NOT NULL,
    arc_flash_category TEXT NOT NULL DEFAULT 'CAT 2 (8 cal)',
    lead_electrician TEXT NOT NULL,
    dispatch_status TEXT NOT NULL DEFAULT 'DISPATCHED', -- DISPATCHED, ISOLATING, RE_ENERGIZED, TESTING
    urgency TEXT NOT NULL DEFAULT 'SCHEDULED_PREVENTATIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. EV Fast Charging Stations Table
CREATE TABLE IF NOT EXISTS ev_charging_stations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    station_code TEXT NOT NULL UNIQUE,
    site_name TEXT NOT NULL,
    dispenser_count INTEGER NOT NULL DEFAULT 4,
    max_kw_per_dispenser NUMERIC NOT NULL DEFAULT 350.0,
    current_grid_draw_kw NUMERIC DEFAULT 0,
    ocpp_status TEXT NOT NULL DEFAULT 'OPERATIONAL', -- OPERATIONAL, CHARGING, FAULT_DETECTED
    last_ping_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Radiometric Thermal Infrared Inspections Table
CREATE TABLE IF NOT EXISTS thermal_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_order_id UUID REFERENCES electrical_work_orders(id) ON DELETE CASCADE,
    equipment_tag TEXT NOT NULL,
    peak_temp_celsius NUMERIC NOT NULL,
    delta_t_celsius NUMERIC NOT NULL,
    flir_image_url TEXT,
    severity_classification TEXT NOT NULL DEFAULT 'NORMAL', -- NORMAL, ELEVATED, CRITICAL_OVERHEAT
    inspector_license TEXT NOT NULL,
    inspected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Master Electrician Service Vans Table
CREATE TABLE IF NOT EXISTS master_electrician_vans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_callsign TEXT NOT NULL UNIQUE,
    lead_technician TEXT NOT NULL,
    ppe_cal_rating INTEGER NOT NULL DEFAULT 40,
    bucket_truck_equipped BOOLEAN DEFAULT false,
    gps_latitude NUMERIC,
    gps_longitude NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE electrical_work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ev_charging_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE thermal_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE master_electrician_vans ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public Read Access electrical_work_orders" ON electrical_work_orders FOR SELECT USING (true);
CREATE POLICY "Public Write Access electrical_work_orders" ON electrical_work_orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access ev_charging_stations" ON ev_charging_stations FOR SELECT USING (true);
CREATE POLICY "Public Write Access ev_charging_stations" ON ev_charging_stations FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access thermal_inspections" ON thermal_inspections FOR SELECT USING (true);
CREATE POLICY "Public Write Access thermal_inspections" ON thermal_inspections FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access master_electrician_vans" ON master_electrician_vans FOR SELECT USING (true);
CREATE POLICY "Public Write Access master_electrician_vans" ON master_electrician_vans FOR INSERT WITH CHECK (true);
