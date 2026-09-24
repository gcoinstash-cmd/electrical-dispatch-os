-- SEED DATA FOR VOLTGRID COMMERCIAL ELECTRICAL DISPATCH OS
INSERT INTO electrical_work_orders (id, order_code, facility_name, property_address, voltage_spec, issue_description, arc_flash_category, lead_electrician, dispatch_status, urgency)
VALUES
('e1111111-1111-1111-1111-111111111111', 'VOLT-1081', 'Qualcomm Semiconductor Fab', '6400 Technology Way, Austin TX', '480V / 3Φ (2000A Switchboard)', 'Solid State Trip Unit Alarm on Main Distribution Feeder #3', 'CAT 4 (40 cal)', 'Marcus Vance (Master Electrician #99401)', 'ISOLATING', 'HIGH_VOLTAGE_CRITICAL'),
('e2222222-2222-2222-2222-222222222222', 'VOLT-1082', 'Tesla Gigafactory Supercharger Plaza', '1 Tesla Rd, Austin TX', '13.8kV Medium-Voltage Padmount', 'Liquid Dielectric Breakdown & Gas Accumulation Relay Inspection', 'CAT 4 (40 cal)', 'Elena Rodriguez (High-Voltage Tech #8812)', 'TESTING', 'SCHEDULED_PREVENTATIVE'),
('e3333333-3333-3333-3333-333333333333', 'VOLT-1083', 'Ascension Seton Regional Hospital', '1201 W 38th St, Austin TX', '480V Emergency Automatic Transfer Switch', 'Diesel Generator Backup Synchronization Failure', 'CAT 2 (8 cal)', 'David Kim (Critical Systems Specialist)', 'DISPATCHED', 'EMERGENCY_REPAIR'),
('e4444444-4444-4444-4444-444444444444', 'VOLT-1084', 'Pinnacle High-Rise Luxury Condos', '200 Congress Ave, Austin TX', '208Y/120V Commercial Busway', 'Thermographic Delta-T Anomaly on 800A Tap-Off Box', 'CAT 2 (8 cal)', 'Tyler Miller (Journeyman Electrician)', 'RE_ENERGIZED', 'SCHEDULED_PREVENTATIVE');

INSERT INTO ev_charging_stations (station_code, site_name, dispenser_count, max_kw_per_dispenser, current_grid_draw_kw, ocpp_status)
VALUES
('EV-SITE-01', 'Austin Airport Fast Charge Depot', 8, 350.0, 680.0, 'CHARGING'),
('EV-SITE-02', 'Domain Northside Fleet Station', 6, 350.0, 140.0, 'OPERATIONAL'),
('EV-SITE-03', 'Buda Logistics Intermodal Hub', 12, 400.0, 0.0, 'FAULT_DETECTED');

INSERT INTO thermal_inspections (work_order_id, equipment_tag, peak_temp_celsius, delta_t_celsius, flir_image_url, severity_classification, inspector_license)
VALUES
('e1111111-1111-1111-1111-111111111111', 'SWBD-A-FEEDER-3-LUG', 94.2, 41.8, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', 'CRITICAL_OVERHEAT', 'FLIR-ITC-LEVEL-3-TX-4019'),
('e4444444-4444-4444-4444-444444444444', 'BUSWAY-TAP-800A-CONGRESS', 58.1, 8.4, 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', 'NORMAL', 'FLIR-ITC-LEVEL-2-TX-8821');

INSERT INTO master_electrician_vans (unit_callsign, lead_technician, ppe_cal_rating, bucket_truck_equipped, gps_latitude, gps_longitude)
VALUES
('VOLT-VAN-01', 'Marcus Vance', 40, false, 30.2700, -97.7400),
('VOLT-TRUCK-02', 'Elena Rodriguez', 40, true, 30.2200, -97.6200),
('VOLT-VAN-03', 'David Kim', 40, false, 30.3050, -97.7480);
