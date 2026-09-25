import React, { useState } from 'react';
import { 
  Zap, 
  Activity, 
  ShieldAlert, 
  Gauge, 
  Radio, 
  Clock, 
  MapPin, 
  Lock, 
  AlertTriangle, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  Flame, 
  BatteryCharging,
  Layers
} from 'lucide-react';
import { AdminPortalModal } from './components/AdminPortalModal';

interface WorkOrder {
  id: string;
  facility: string;
  location: string;
  voltage: string;
  issue: string;
  arcFlashCat: 'CAT 1 (4 cal)' | 'CAT 2 (8 cal)' | 'CAT 4 (40 cal)';
  leadElectrician: string;
  status: 'DISPATCHED' | 'ISOLATING' | 'RE-ENERGIZED' | 'TESTING';
  urgency: 'HIGH VOLTAGE CRITICAL' | 'SCHEDULED PREVENTATIVE' | 'EMERGENCY REPAIR';
}

interface ChargerStation {
  id: string;
  siteName: string;
  dispensers: number;
  maxKw: number;
  ocppStatus: 'OPERATIONAL' | 'CHARGING' | 'FAULT / GROUND DETECTED';
  gridDrawKw: number;
}

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'ev' | 'thermal'>('dispatch');
  const [selectedOrder, setSelectedOrder] = useState<string>('VOLT-1081');

  const workOrders: WorkOrder[] = [
    {
      id: 'VOLT-1081',
      facility: 'Qualcomm Semiconductor Fab',
      location: '6400 Technology Way, Austin TX',
      voltage: '480V / 3Φ (2,000A Main Switchboard)',
      issue: 'Solid State Trip Unit Alarm on Main Distribution Feeder #3 (Ground Fault Pickup)',
      arcFlashCat: 'CAT 4 (40 cal)',
      leadElectrician: 'Master Electrician Marcus Vance',
      status: 'ISOLATING',
      urgency: 'HIGH VOLTAGE CRITICAL'
    },
    {
      id: 'VOLT-1082',
      facility: 'Tesla Gigafactory Supercharger Plaza',
      location: '1 Tesla Rd, Austin TX',
      voltage: '13.8kV Medium-Voltage Padmount Transformer',
      issue: 'Liquid Dielectric Breakdown & Gas Accumulation Relay Inspection',
      arcFlashCat: 'CAT 4 (40 cal)',
      leadElectrician: 'High-Voltage Tech Rodriguez',
      status: 'TESTING',
      urgency: 'SCHEDULED PREVENTATIVE'
    },
    {
      id: 'VOLT-1083',
      facility: 'Ascension Seton Regional Hospital',
      location: '1201 W 38th St, Austin TX',
      voltage: '480V Emergency Automatic Transfer Switch (ATS)',
      issue: 'Diesel Generator Backup Synchronization Failure during Monthly Exerciser',
      arcFlashCat: 'CAT 2 (8 cal)',
      leadElectrician: 'Critical Systems Specialist Kim',
      status: 'DISPATCHED',
      urgency: 'EMERGENCY REPAIR'
    },
    {
      id: 'VOLT-1084',
      facility: 'Pinnacle High-Rise Luxury Condos',
      location: '200 Congress Ave, Austin TX',
      voltage: '208Y/120V Commercial Busway',
      issue: 'Thermographic Delta-T Anomaly (72°C Rise) on 800A Tap-Off Box',
      arcFlashCat: 'CAT 2 (8 cal)',
      leadElectrician: 'Journeyman Miller',
      status: 'RE-ENERGIZED',
      urgency: 'SCHEDULED PREVENTATIVE'
    }
  ];

  const chargingStations: ChargerStation[] = [
    {
      id: 'EV-SITE-01',
      siteName: 'Austin Airport Fast Charge Depot',
      dispensers: 8,
      maxKw: 350,
      ocppStatus: 'CHARGING',
      gridDrawKw: 680
    },
    {
      id: 'EV-SITE-02',
      siteName: 'Domain Northside Fleet Station',
      dispensers: 6,
      maxKw: 350,
      ocppStatus: 'OPERATIONAL',
      gridDrawKw: 140
    },
    {
      id: 'EV-SITE-03',
      siteName: 'Buda Logistics Intermodal Hub',
      dispensers: 12,
      maxKw: 400,
      ocppStatus: 'FAULT / GROUND DETECTED',
      gridDrawKw: 0
    }
  ];

  return (
    <div className="min-h-screen bg-[#09080E] text-slate-100 font-sans selection:bg-purple-500/20 selection:text-purple-300">
      {/* HUD Telemetry Top Bar */}
      <header className="sticky top-0 z-40 bg-[#09080E]/90 backdrop-blur-md border-b border-purple-500/20 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black tracking-tight text-white">VOLTGRID</span>
                <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold uppercase">
                  ELECTRICAL OS v1.0
                </span>
              </div>
              <p className="text-xs font-semibold font-mono text-slate-400">Commercial 480V Switchgear & EV Fast Charging Dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Gauge className="w-3.5 h-3.5" /> 480V / 3-PHASE NOMINAL
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> 100% GRID SYNCHRONIZED
              </span>
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:border-purple-500/50 text-xs font-mono font-bold tracking-wider transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              [ ELECTRIC PASS ]
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#160f22] via-[#0f0b18] to-[#07050b] border border-purple-500/20 p-6 md:p-10 shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" /> NFPA 70E Arc Flash Certified Engineering
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              High-Voltage Switchgear. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
                Commercial Power Redundancy.
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              Industrial operating system designed for commercial electrical contractors, datacenter facility directors, and EV fast-charging network operators. Real-time infrared thermography, transformer oil testing, and automatic transfer switch telemetry.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs font-mono tracking-wider transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" /> DISPATCH HIGH-VOLTAGE FLEET
              </button>
              <button 
                onClick={() => setActiveTab('ev')}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors flex items-center gap-2"
              >
                <BatteryCharging className="w-4 h-4 text-purple-400" /> EV Fast Charger Network
              </button>
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'dispatch'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            01 // Switchgear Work Orders
          </button>
          <button
            onClick={() => setActiveTab('ev')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'ev'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            02 // 350kW DC Fast Charge Depots
          </button>
          <button
            onClick={() => setActiveTab('thermal')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'thermal'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            03 // FLIR Thermal Infrared Scans
          </button>
        </div>

        {/* Tab 1: Dispatch */}
        {activeTab === 'dispatch' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">Active High-Voltage Work Orders</h3>
                <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse" /> Telemetry Live
                </span>
              </div>

              <div className="space-y-3">
                {workOrders.map((wo) => (
                  <div
                    key={wo.id}
                    onClick={() => setSelectedOrder(wo.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      selectedOrder === wo.id
                        ? 'bg-[#140e1f] border-purple-500/50 shadow-lg shadow-purple-500/10'
                        : 'bg-[#0d0914] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-400">{wo.id}</span>
                        <span className={`text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          wo.urgency.includes('CRITICAL') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          wo.urgency.includes('EMERGENCY') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {wo.urgency}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-purple-300 font-bold px-2 py-0.5 rounded bg-black/40 border border-white/5">
                        {wo.arcFlashCat}
                      </span>
                    </div>

                    <div className="pt-3">
                      <h4 className="text-base font-bold text-white">{wo.facility}</h4>
                      <p className="text-base text-zinc-200 leading-relaxed flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-300" /> {wo.location}
                      </p>
                      <p className="text-xs font-mono text-purple-300 mt-1 font-semibold">{wo.voltage}</p>
                      <p className="text-xs text-slate-300 mt-2 bg-black/30 p-2.5 rounded-xl border border-white/5">
                        {wo.issue}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
                      <span className="text-slate-400">{wo.leadElectrician}</span>
                      <span className="text-purple-400 font-bold">{wo.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Telemetry */}
            <div className="space-y-6">
              <div className="bg-[#120d1a] border border-purple-500/20 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" /> Electrical Busway Health
                </h3>
                
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Target Switchboard:</span>
                    <span className="text-purple-300 font-bold">{selectedOrder}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Phase A Voltage:</span>
                    <span className="text-white font-bold">277.4 VAC</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Phase B Voltage:</span>
                    <span className="text-white font-bold">276.9 VAC</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Phase C Voltage:</span>
                    <span className="text-white font-bold">277.1 VAC</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Harmonic Distortion:</span>
                    <span className="text-emerald-400 font-bold">1.8% THD (Nominal)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-slate-400">Arc Flash Hazard Boundary</div>
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs font-mono text-rose-300">
                    <div>Flash Hazard at 18 inches: 38.4 cal/cm²</div>
                    <div className="text-slate-400 text-xs font-semibold tracking-wider mt-1">Required: Full 40 cal Hood, Suit & Insulated Gloves</div>
                  </div>
                </div>

                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold tracking-wider transition-colors"
                >
                  AUDIT SWITCHGEAR LOCKOUT/TAGOUT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: EV Depots */}
        {activeTab === 'ev' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Commercial EV Fast Charging Fleet Depots</h3>
                <p className="text-base text-zinc-200 leading-relaxed font-mono">OCPP 2.0.1 Cloud Protocol & Microgrid Load Balancing</p>
              </div>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-4 py-2 rounded-xl bg-purple-500 text-white font-mono text-xs font-bold hover:bg-purple-400 transition-colors"
              >
                + ADD DISPENSER NODE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chargingStations.map((station) => (
                <div key={station.id} className="bg-[#120d1a] border border-purple-500/20 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-purple-400 font-bold">{station.id}</span>
                    <span className="text-slate-400">{station.dispensers} Dispensers</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{station.siteName}</h4>
                    <p className="text-xs font-mono text-purple-300 mt-1">{station.maxKw} kW Ultra-Fast CCS / NACS</p>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Real-Time Draw:</span>
                      <span className="text-white font-bold">{station.gridDrawKw} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">OCPP Telemetry:</span>
                      <span className={`font-bold ${
                        station.ocppStatus === 'FAULT / GROUND DETECTED' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {station.ocppStatus}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs border border-white/5 transition-colors"
                  >
                    View Power Module Inverter
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: FLIR Thermal */}
        {activeTab === 'thermal' && (
          <div className="bg-[#120d1a] border border-purple-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">FLIR Thermographic Infrared Inspection Logs</h3>
                <p className="text-base text-zinc-200 leading-relaxed font-mono">Predictive Delta-T Overheat Anomaly Detection</p>
              </div>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-4 py-2 rounded-xl bg-purple-500 text-white font-mono text-xs font-bold hover:bg-purple-400 transition-colors"
              >
                UPLOAD RADIOMETRIC IR SCAN
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  unit: '480V Breaker Bus Tab (A-Phase)',
                  temp: '94.2°C',
                  deltaT: '+41.8°C over ambient',
                  urgency: 'REPAIR IMMEDIATELY',
                  finding: 'Loose bolted bus joint causing localized joule heating on lug connection.'
                },
                {
                  unit: 'Dry-Type Transformer Secondary Lug',
                  temp: '58.1°C',
                  deltaT: '+8.4°C over ambient',
                  urgency: 'MONITOR QUARTERLY',
                  finding: 'Thermal balance within standard NETA acceptance criteria.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold">{item.unit}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      item.urgency.includes('IMMEDIATELY') ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {item.urgency}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-purple-400">{item.temp}</div>
                  <div className="text-xs text-slate-400">Delta-T: {item.deltaT}</div>
                  <p className="text-xs font-sans text-slate-300 pt-2 border-t border-white/5">{item.finding}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default App;
