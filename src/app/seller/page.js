"use client";
import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { TabBar, StatCard, SectionHeader, EmptyState, ProgressRing } from '@/components/ui/RoleTheme';
import { properties, cityData, formatPrice, formatNumber } from '@/lib/mockData';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    LayoutDashboard,
    Home,
    TrendingUp,
    Users,
    FileText,
    Calendar,
    Zap,
    Brain,
    Plus,
    Edit,
    Trash2,
    ExternalLink,
    Copy,
    ChevronRight,
    Mail,
    Phone,
    MessageSquare,
    Check,
    X,
    Upload,
    ArrowUpRight,
    ArrowDownRight,
    Camera,
    Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PropertyVisual } from '@/components/ui/PropertyVisual';

const ACCENT = '#c93a2a';

export default function SellerPage() {
    const [activeTab, setActiveTab] = useState('listings');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isAddingProperty, setIsAddingProperty] = useState(false);

    // Initial properties for "my listings" - migrated to state for persistence
    const [myListings, setMyListings] = useState(() => properties.slice(0, 4).map((p, i) => ({
        ...p,
        status: i === 0 ? 'Active' : i === 1 ? 'Negotiation' : i === 2 ? 'Sold' : 'Active',
        views: 1240 + i * 250,
        saves: 85 + i * 12,
        inquiries: 12 + i * 3,
        image: p.image || `https://source.unsplash.com/1200x800/?house,${encodeURIComponent(p.city)}`
    })));

    const tabs = [
        { id: 'listings', label: 'My Listings', icon: 'home_work' },
        { id: 'pricing', label: 'AI Pricing', icon: 'auto_graph', highlight: true },
        { id: 'leads', label: 'Buyer Leads', icon: 'group', badge: 3 },
        { id: 'performance', label: 'Performance', icon: 'insights' },
        { id: 'visits', label: 'Visits & Offers', icon: 'event' },
        { id: 'documents', label: 'Documents', icon: 'description' },
        { id: 'promotion', label: 'Promotion', icon: 'campaign' },
        { id: 'ai', label: 'AI Insights', icon: 'psychology' }
    ];

    // Sub-component for adding property
    const AddPropertyModal = ({ onClose, onAdd }) => {
        const cities = Object.keys(cityData);
        const [city, setCity] = useState(cities[0]);
        const [locality, setLocality] = useState('');
        const [bedrooms, setBedrooms] = useState(3);
        const [sqft, setSqft] = useState(1800);
        const [propertyType, setPropertyType] = useState('Apartment');
        const [loading, setLoading] = useState(false);
        const [estimatedPrice, setEstimatedPrice] = useState(null);

        useEffect(() => {
            if (cityData[city] && cityData[city].length > 0) {
                setLocality(cityData[city][0]);
            }
        }, [city]);

        const getPrediction = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const res = await fetch('/api/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ city, locality, sqft, bedrooms, propertyType, age: 3 })
                });
                const data = await res.json();
                if (data && data.prediction) {
                    setEstimatedPrice(data.prediction.price);
                }
            } catch (err) {
                console.error("Prediction failed by ML API:", err);
                // Fallback realistic price gen
                setEstimatedPrice(sqft * 12500 + bedrooms * 500000);
            }
            setLoading(false);
        };

        const handleSave = () => {
            const locEncoded = encodeURIComponent(locality);
            const cityEncoded = encodeURIComponent(city);
            // Default image randomizer mimicking real areas via unspalsh ids mapping or dicebear fallback
            const imgId = Math.floor(Math.random() * 200) + 1;
            const newProp = {
                id: Date.now(),
                title: `${bedrooms} BHK ${propertyType} in ${locality}`,
                price: estimatedPrice || (sqft * 12500),
                city: city,
                locality: locality,
                status: 'Evaluation',
                views: 0,
                saves: 0,
                image: 'google_maps_satellite' // PropertyVisual handles this via city/locality
            };
            onAdd(newProp);
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"><X size={20} /></button>
                    <h2 className="text-3xl font-['Anton'] text-white tracking-wide uppercase mb-2">Add New Property</h2>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-8">AI-Powered Valuation & Portfolio Integration</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">City</label>
                            <select value={city} onChange={e => setCity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors">
                                {cities.map(c => <option key={c} value={c} className="bg-black text-white">{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Locality</label>
                            <select value={locality} onChange={e => setLocality(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors">
                                {(cityData[city] || []).map(l => <option key={l} value={l} className="bg-black text-white">{l}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Property Type</label>
                            <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors">
                                {['Apartment', 'Villa', 'Penthouse', 'Independent House'].map(t => <option key={t} value={t} className="bg-black text-white">{t}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Bedrooms</label>
                                <input type="number" min="1" max="10" value={bedrooms} onChange={e => setBedrooms(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Square Feet</label>
                                <input type="number" min="500" max="15000" step="100" value={sqft} onChange={e => setSqft(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 mt-2 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                        {estimatedPrice ? (
                            <div className="text-center relative z-10 w-full animate-in fade-in zoom-in duration-500">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 mb-2 block flex justify-center items-center gap-1"><Brain size={12}/> Live Nifty ML Valuation</span>
                                <div className="text-4xl font-['Anton'] text-white mb-4">{formatPrice(estimatedPrice)}</div>
                                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-2 shadow-inner">
                                    <PropertyVisual city={city} locality={locality} zoom={18} type="satellite" />
                                </div>
                                <span className="text-xs text-white/50 block mt-2 italic font-medium">Map centered on {locality}, {city} satellite imagery.</span>
                            </div>
                        ) : (
                            <button onClick={getPrediction} disabled={loading} className="relative z-10 w-full py-4 bg-primary text-white font-bold rounded-xl text-sm uppercase tracking-widest shadow-[0_4px_24px_rgba(201,58,42,0.4)] hover:-translate-y-1 transition-all disabled:opacity-50">
                                {loading ? "Analyzing Live Markets..." : "Fetch AI Estimated Price"}
                            </button>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={onClose} className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-[11px] uppercase tracking-widest hover:bg-white/10 transition-colors">Cancel</button>
                        <button onClick={handleSave} disabled={!estimatedPrice} className="flex-[2] py-4 bg-white text-black font-bold rounded-xl text-[11px] uppercase tracking-[0.2em] hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Confirm & Add To Portfolio
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'listings':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold font-['Anton'] uppercase tracking-wider">Property Portfolio</h2>
                            <button onClick={() => setIsAddingProperty(true)} className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                                <Plus size={16} />
                                Add New Property
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {myListings.map((property) => (
                                <div key={property.id} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden hover:border-primary/30 transition-all duration-300">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                                        <PropertyVisual city={property.city} locality={property.locality} type="satellite" zoom={17} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border",
                                                property.status === 'Active' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" :
                                                    property.status === 'Negotiation' ? "bg-amber-500/20 text-amber-400 border-amber-500/20" :
                                                        "bg-white/10 text-white/60 border-white/10"
                                            )}>
                                                {property.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-white mb-1 truncate">{property.title}</h3>
                                        <p className="text-primary font-bold text-xl mb-4">{formatPrice(property.price)}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex gap-2">
                                                <button title="Edit" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                                                    <Edit size={14} />
                                                </button>
                                                <button title="Preview" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                                                    <ExternalLink size={14} />
                                                </button>
                                                <button title="Duplicate" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                                                    <Copy size={14} />
                                                </button>
                                            </div>
                                            <button title="Delete" className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 'pricing':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-['Anton'] text-white tracking-wide uppercase mb-2">AI Pricing Assistant</h2>
                                        <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Strategy for Palm Grove Estate</p>
                                    </div>
                                    <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">High Demand Level</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 block">Current Price</span>
                                        <div className="text-3xl font-['Anton'] text-white">₹2.45 Cr</div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 relative group cursor-pointer hover:bg-primary/20 transition-all">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 block">AI Suggested Price</span>
                                        <div className="text-3xl font-['Anton'] text-white flex items-center gap-3">
                                            ₹2.62 Cr
                                            <ArrowUpRight className="text-emerald-400 animate-bounce" size={24} />
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                            <Check size={12} /> Possible 7% Upside
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
                                        <span>Market Minimum</span>
                                        <span>Avg. Market</span>
                                        <span>Market Maximum</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-white/10 w-1/4 border-r border-white/5" />
                                        <div className="h-full bg-primary/40 w-1/2 relative">
                                            <div className="absolute top-0 left-1/2 w-1 h-full bg-white shadow-[0_0_15px_white]" />
                                        </div>
                                        <div className="h-full bg-white/10 w-1/4 border-l border-white/5" />
                                    </div>
                                    <p className="text-xs text-white/60 leading-relaxed italic">
                                        "Your property is currently priced in the 45th percentile. Given the recent infrastructure development in Indiranagar, we recommend adjusting to the 60th percentile for optimal returns without losing traction."
                                    </p>
                                </div>

                                <button className="w-full mt-8 bg-white text-black hover:bg-white/90 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-2">
                                    Apply Suggested Price Adjustment
                                    <Zap size={14} className="fill-black" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <StatCard label="Price vs Market" value="-4.2%" trend="+1.2" icon="compare_arrows" />
                            <StatCard label="Neighborhood Growth" value="+12.4%" trend="+2.4" icon="trending_up" color="#10b981" />
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Market Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40">Buyer Interest</span>
                                        <span className="text-xs font-bold text-emerald-400">Very High</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40">Avg. Listing Life</span>
                                        <span className="text-xs font-bold text-white">18 Days</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40">Similar Listings</span>
                                        <span className="text-xs font-bold text-white">24</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'leads':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold font-['Anton'] uppercase tracking-wider">Interested Buyers</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">3 New Today</span>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-widest text-white/40">Buyer Identity</th>
                                        <th className="px-6 py-6 text-[11px] font-bold uppercase tracking-widest text-white/40">Interest Level</th>
                                        <th className="px-6 py-6 text-[11px] font-bold uppercase tracking-widest text-white/40">Status</th>
                                        <th className="px-6 py-6 text-[11px] font-bold uppercase tracking-widest text-white/40">Last Action</th>
                                        <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { name: 'Rahul Sharma', email: 'rahul.s@example.com', type: 'High Interest', stage: 'Visit Scheduled', last: '2h ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
                                        { name: 'Ananya Iyer', email: 'ananya.i@example.com', type: 'Direct Offer', stage: 'Negotiating', last: '5h ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
                                        { name: 'Vikram Malhotra', email: 'v.malhotra@example.com', type: 'Casual', stage: 'Contacted', last: '1d ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' }
                                    ].map((lead, i) => (
                                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <img src={lead.avatar} className="w-10 h-10 rounded-full bg-white/10 border border-white/10" alt="" />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white">{lead.name}</span>
                                                        <span className="text-[10px] text-white/40">{lead.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-xs text-white/60">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full font-bold",
                                                    lead.type === 'Direct Offer' ? "text-primary bg-primary/10" : "text-emerald-400 bg-emerald-400/10"
                                                )}>{lead.type}</span>
                                            </td>
                                            <td className="px-6 py-6 text-xs font-medium text-white/80">{lead.stage}</td>
                                            <td className="px-6 py-6 text-[10px] text-white/40 font-bold uppercase tracking-widest">{lead.last}</td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-white/40 hover:text-emerald-400 transition-all">
                                                        <Phone size={14} />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-white/40 hover:text-primary transition-all">
                                                        <MessageSquare size={14} />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                                                        <Calendar size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                );

            case 'performance':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard label="Impressions" value="48.2K" trend="+15" icon="visibility" />
                            <StatCard label="Unique Views" value="12,405" trend="+8" icon="person" />
                            <StatCard label="Property Saves" value="842" trend="+24" icon="favorite" color="#ec4899" />
                            <StatCard label="Conversion" value="3.2%" trend="-2" icon="ads_click" color="#8b5cf6" />
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 h-[400px]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-['Anton'] text-white tracking-wide uppercase">Visibility Growth</h3>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /> Impressions</div>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20" /> Benchmark</div>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height="80%">
                                <AreaChart data={cityData['mumbai']}>
                                    <defs>
                                        <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={ACCENT} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke={ACCENT} strokeWidth={3} fillOpacity={1} fill="url(#colorImpressions)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                );

            case 'documents':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Ownership Deed', status: 'Verified', date: 'Oct 2025', icon: 'verified_user' },
                                { title: 'Tax Receipts', status: 'Updated', date: 'Jan 2026', icon: 'receipt_long' },
                                { title: 'RERA Approvals', status: 'Pending', date: 'Processing', icon: 'gavel' }
                            ].map((doc, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white/40">{doc.icon}</span>
                                        </div>
                                        <button className="text-white/20 hover:text-white transition-colors">
                                            <ExternalLink size={16} />
                                        </button>
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{doc.title}</h4>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={cn(
                                            "text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full",
                                            doc.status === 'Verified' ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/20 text-primary"
                                        )}>{doc.status}</span>
                                        <span className="text-[10px] text-white/20">{doc.date}</span>
                                    </div>
                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 group-hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white">
                                        <Upload size={14} /> Update Document
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 'visits':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Calendar size={16} className="text-primary" /> Upcoming Visits
                            </h3>
                            {[
                                { time: 'Today, 4:00 PM', buyer: 'Arjun Mehra', status: 'Confirmed' },
                                { time: 'Tomorrow, 10:30 AM', buyer: 'Saira Kapoor', status: 'Pending' }
                            ].map((v, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">{v.time}</span>
                                        <span className="text-xs text-white/40">{v.buyer}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/30 transition-all">Reschedule</button>
                                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Cancel</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp size={16} className="text-primary" /> Active Offers
                            </h3>
                            {[
                                { offer: '₹2.58 Cr', buyer: 'Amit Verma', note: 'Ready Possession', status: 'New' },
                            ].map((v, i) => (
                                <div key={i} className="bg-primary/5 border border-primary/20 rounded-[2rem] p-6 relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-['Anton'] text-white">{v.offer}</span>
                                            <span className="text-xs text-white/40">From {v.buyer}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_4px_12px_rgba(201,58,42,0.3)]">{v.status}</span>
                                    </div>
                                    <p className="text-xs text-white/60 mb-6 bg-black/20 p-3 rounded-xl italic">"{v.note}"</p>
                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/90">Accept Offer</button>
                                        <button className="px-4 py-3 bg-white/5 border border-white/10 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10">Counter</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 'promotion':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 rounded-[2.5rem] p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-['Anton'] text-white tracking-wide uppercase mb-4">Boost Listing</h3>
                                <p className="text-xs text-white/40 leading-relaxed mb-8 uppercase tracking-widest font-bold">Get 10x more reach using our "Priority Plus" boosting engine. Your property will appear first in all relevant searches for 7 days.</p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-white/80"><Check size={16} className="text-primary" /> Smart Retargeting</div>
                                    <div className="flex items-center gap-3 text-sm text-white/80"><Check size={16} className="text-primary" /> Social Media Showcase</div>
                                    <div className="flex items-center gap-3 text-sm text-white/80"><Check size={16} className="text-primary" /> Premium Badge Highlight</div>
                                </div>
                            </div>
                            <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-[0_8px_32px_rgba(201,58,42,0.3)]">Activate Boost — ₹9,999</button>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                            <h3 className="text-xl font-['Anton'] text-white tracking-wide uppercase mb-6">Agent Assistance</h3>
                            <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold mb-8">Professional help to close deals faster</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/10 transition-all">
                                    <Camera size={24} className="mx-auto mb-3 text-primary" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block">Pro Photos</span>
                                </button>
                                <button className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/10 transition-all">
                                    <FileText size={24} className="mx-auto mb-3 text-primary" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block">Legal Audit</span>
                                </button>
                                <button className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/10 transition-all">
                                    <Users size={24} className="mx-auto mb-3 text-primary" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block">Concierge</span>
                                </button>
                                <button className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/10 transition-all">
                                    <Target size={24} className="mx-auto mb-3 text-primary" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block">Valuation</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'ai':
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="bg-black/40 backdrop-blur-xl border border-primary/20 rounded-[2.5rem] p-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(201,58,42,0.4)]">
                                    <Brain className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-['Anton'] text-white tracking-wide uppercase">AI Insight Engine</h3>
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Smart Recommendations for Faster Sales</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Camera size={18} className="text-primary" />
                                            <span className="text-sm font-bold text-white uppercase tracking-wider">Visual Enhancement</span>
                                        </div>
                                        <p className="text-xs text-white/40 leading-relaxed mb-4">"Our computer vision model detected low lighting in your bedroom photos. Brighter imagery can increase click-through rates by 22%."</p>
                                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">Book Pro Photography <ChevronRight size={12} /></button>
                                    </div>
                                    <div className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Target size={18} className="text-primary" />
                                            <span className="text-sm font-bold text-white uppercase tracking-wider">Price Correction</span>
                                        </div>
                                        <p className="text-xs text-white/40 leading-relaxed mb-4">"Inventory in HSR Layout has increased by 15% this week. A minor 2% drop could position you as the top-value listing."</p>
                                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">View Data Model <ChevronRight size={12} /></button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-8 bg-primary/10 border border-primary/20 rounded-3xl relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h4 className="text-3xl font-['Anton'] text-white mb-2">12 Days</h4>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6">Predicted Time to Sell</p>
                                            <p className="text-xs text-white/80 leading-relaxed">Based on current market velocity and your listing's performance metrics, we expect a firm offer within the next 2 weeks.</p>
                                        </div>
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary opacity-10 blur-3xl rounded-full" />
                                    </div>
                                    <button className="w-full py-4 border border-white/10 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] text-white/40 hover:bg-white/5 hover:text-white transition-all">Refresh Predictions</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            default:
                return <EmptyState title="Coming Soon" subtitle="This section is currently being integrated." icon="construction" />;
        }
    };

    return (
        <AuthGuard>
            <div className="relative min-h-screen text-white bg-[#030303] selection:bg-primary/30 selection:text-white pb-32">
                {/* Background Animation */}
                <div className="absolute inset-0 z-0">
                    <BackgroundPaths title="" showCta={false} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32">

                    <SectionHeader
                        icon="sell"
                        title="Seller Portal"
                        subtitle="Command Center for Homeowners"
                        accent={ACCENT}
                    />

                    <div className="mb-10 lg:sticky lg:top-24 z-40">
                        <TabBar
                            tabs={tabs}
                            active={activeTab}
                            onChange={setActiveTab}
                            accent={ACCENT}
                        />
                    </div>

                    <div className="relative min-h-[60vh]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Add Property Modal Overaly */}
                    <AnimatePresence>
                        {isAddingProperty && (
                            <AddPropertyModal 
                                onClose={() => setIsAddingProperty(false)} 
                                onAdd={(newProp) => { setMyListings([newProp, ...myListings]); setIsAddingProperty(false); }} 
                            />
                        )}
                    </AnimatePresence>

                    {/* Quick Stats Grid - Secondary performance metrics */}
                    <div className="mt-20 pt-10 border-t border-white/5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="text-center">
                                <div className="text-2xl font-['Anton'] text-white">4.9/5</div>
                                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Listing Quality</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-['Anton'] text-white">92%</div>
                                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Response Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-['Anton'] text-white">₹24 Cr</div>
                                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Portfolio Value</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-['Anton'] text-white">PRO</div>
                                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Seller Status</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
