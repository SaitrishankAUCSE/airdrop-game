"use client";
import React from 'react';

/**
 * PropertyVisual - Reliable "Real World" visualization via Google Maps.
 * Strictly avoids AI-generated or unrealistic imagery.
 */
export const PropertyVisual = ({ 
    city = "India", 
    locality = "", 
    zoom = 15, 
    type = "satellite", 
    className = "" 
}) => {
    // Construct search query for Google Maps
    const query = encodeURIComponent(`${locality} ${city}`);
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA` + 
                   `&q=${query}&maptype=${type}&zoom=${zoom}`;
    
    // Note: Since we use a free embed without a specific billing key for a prototype, 
    // we use the public iframe bridge which is most reliable.
    const publicMapUrl = `https://www.google.com/maps?q=${query}&output=embed&t=${type === 'satellite' ? 'k' : 'm'}&z=${zoom}`;

    return (
        <div className={`relative w-full h-full bg-slate-900 overflow-hidden ${className}`}>
            <iframe
                title="Real World Location"
                src={publicMapUrl}
                width="100%"
                height="100%"
                className="border-0 grayscale invert-[90%] hue-rotate-180 contrast-[85%] brightness-[90%] opacity-80 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay to prevent accidental map interaction on cards */}
            <div className="absolute inset-0 z-10 bg-transparent cursor-pointer" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>
    );
};
