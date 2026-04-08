import { NextResponse } from 'next/server';
import { MLEngine } from '@/lib/ml-engine';

export async function POST(request) {
    try {
        const body = await request.json();
        const { city, locality, sqft, bedrooms, floor, age, amenities, propertyType } = body;

        // 1. Fetch live Nifty Realty Data (Yahoo Finance public API)
        let liveMultiplier = 1.0;
        let indexValue = null;
        let indexChangePcnt = 0;
        
        try {
            const yfUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/^CNXREALTY?interval=1d';
            const res = await fetch(yfUrl, { cache: 'no-store' }); // Ensure it fetches live, not cached
            if (res.ok) {
                const data = await res.json();
                const latestPrice = data.chart.result[0].meta.regularMarketPrice;
                const previousClose = data.chart.result[0].meta.chartPreviousClose;
                indexValue = latestPrice;
                
                // Calculate sentiment: Live market impact is dampened compared to volatile stocks
                indexChangePcnt = ((latestPrice - previousClose) / previousClose);
                liveMultiplier = 1.0 + (indexChangePcnt * 0.15); 
            }
        } catch (e) {
            console.error("Live Data Fetch failed:", e);
        }

        // 2. Base ML Calculation (Now contains hyper-realistic linear math)
        let mlResult = MLEngine.predict({
            city, locality, sqft, bedrooms, floor, age, amenities, propertyType
        });

        // 3. Apply Live Market Sentiment
        // Safety bound: market can't arbitrarily crash property value by more than 5% in one day
        liveMultiplier = Math.max(0.95, Math.min(1.05, liveMultiplier));

        const newPredicted = Math.round(mlResult.predicted * liveMultiplier);
        const newPricePerSqft = Math.round(mlResult.pricePerSqft * liveMultiplier);

        // Adjust drivers array
        if (indexValue !== null) {
            const impactStr = `${liveMultiplier >= 1 ? '+' : ''}${((liveMultiplier - 1) * 100).toFixed(2)}%`;
            mlResult.drivers.push({ 
                factor: "Live Index Sentiment (^CNXREALTY)", 
                impact: impactStr,
                type: liveMultiplier >= 1 ? "positive" : "negative"
            });
        }

        const enrichedResult = {
            ...mlResult,
            predicted: newPredicted,
            low: Math.round(newPredicted * 0.94),
            high: Math.round(newPredicted * 1.06),
            pricePerSqft: newPricePerSqft,
            indexValue,
            indexChangePcnt: (indexChangePcnt * 100).toFixed(2),
            drivers: mlResult.drivers.sort((a,b) => b.impact.localeCompare(a.impact))
        };

        const verdict = MLEngine.getProfessionalVerdict(enrichedResult, body);

        return NextResponse.json({ ...enrichedResult, verdict });

    } catch (error) {
        console.error("API Error in predict:", error);
        return NextResponse.json({ error: 'Failed to process prediction' }, { status: 500 });
    }
}
