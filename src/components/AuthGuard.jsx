"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                // Prevent caching of auth status
                const res = await fetch('/api/auth/me', {
                    cache: 'no-store',
                    headers: { 'Pragma': 'no-cache' }
                });
                if (res.ok) {
                    setAuthorized(true);
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    localStorage.removeItem('isLoggedIn');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Auth Guard Error:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!authorized) return null;

    return <>{children}</>;
}
