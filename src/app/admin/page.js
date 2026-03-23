"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Database, ShieldAlert, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                    <ShieldAlert className="text-red-500 h-8 w-8" />
                    Admin Command Center
                </h1>
                <p className="text-zinc-400">Restricted Access • System Overview</p>
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-yellow-500">System restoration in progress...</p>
                </div>
            </div>
        </div>
    );
}
