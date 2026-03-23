"use client";
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { SaveButton } from '@/components/ui/save-button';

import { properties, formatPrice } from '@/lib/mockData';

export default function Listings() {
    return (
        <AuthGuard>
            <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-gray-50/50">
                <div className="max-w-[1200px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-['Anton'] text-navy tracking-wide mb-4">Property Marketplace</h1>
                        <p className="text-navy/60 font-medium max-w-[500px] mx-auto">
                            Explore verified listings with AI-predicted valuations and growth potential.
                        </p>
                    </div>

                    {/* Listings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <div key={property.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={property.image}
                                        alt={property.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-navy uppercase tracking-wider">
                                        {property.status}
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                                        <div className="text-2xl font-['Anton'] tracking-wide">{formatPrice(property.price)}</div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-navy leading-tight mb-1">{property.name}</h3>
                                                <p className="text-sm text-navy/50">{property.locality}, {property.city}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                                    {property.safetyScore}% Safety
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-navy/70 mt-3">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">bed</span> {property.bedrooms} Bed</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">bathtub</span> {property.bathrooms} Bath</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">square_foot</span> {property.sqft} sqft</span>
                                        </div>
                                    </div>

                                    {/* Footer / Action */}
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                                        <Link href={`/buyer`} className="text-sm font-bold text-navy hover:text-primary transition-colors">
                                            View Details
                                        </Link>
                                        <SaveButton
                                            text={{
                                                idle: "Save",
                                                saving: "Saving...",
                                                saved: "Saved"
                                            }}
                                            className="px-4 py-1.5 text-xs min-w-[100px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
