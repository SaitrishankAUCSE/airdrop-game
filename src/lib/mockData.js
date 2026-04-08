// =============================================
// HomieNest — Enterprise Mock Data Engine (Indian Context)
// Real property images via Unsplash + 99acres-style realistic data
// =============================================

import { properties as generatedProperties } from './generatedProperties';

// --- Properties (Real Indian Market Data) ---
export const properties = generatedProperties;

// --- Price History Generator ---
export function getPriceHistory(propertyId) {
    const prop = properties.find(p => p.id === propertyId);
    if (!prop) return [];
    const base = prop.price;
    // Simulate slight fluctuation over last 12 months
    const History = [];
    const months = ["Mar '25", "Apr '25", "May '25", "Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26"];
    months.forEach((m, i) => {
        // Random variability +/- 2% per month
        const factor = 1 + (Math.random() * 0.04 - 0.02);
        // Slight upward trend 0.5% per month
        const trend = 1 + (i * 0.005);
        History.push({ month: m, price: Math.round(base * 0.94 * trend * factor) });
    });
    return History;
}

// --- Tax History Generator ---
export function getTaxHistory(propertyId) {
    const prop = properties.find(p => p.id === propertyId);
    if (!prop) return [];
    // Basic tax assumption ~0.1% of capital value per annum adjusted historically
    const annualTax = Math.round(prop.price * 0.001);
    return [
        { year: "2023", tax: Math.round(annualTax * 0.90), assessed: Math.round(prop.price * 0.85) },
        { year: "2024", tax: Math.round(annualTax * 0.95), assessed: Math.round(prop.price * 0.92) },
        { year: "2025", tax: annualTax, assessed: prop.price },
    ];
}

// --- Schools Nearby ---
export function getSchoolsNearby(locality) {
    const schools = {
        "Bandra West": [{ name: "St. Andrews High School", rating: 4.5, distance: "0.8 km", type: "ICSE" }, { name: "Arya Vidya Mandir", rating: 4.4, distance: "1.2 km", type: "CBSE" }, { name: "Dhribhai Ambani Intl", rating: 4.9, distance: "2 km", type: "IB" }],
        "Whitefield": [{ name: "The Deens Academy", rating: 4.6, distance: "1.5 km", type: "CBSE" }, { name: "Ryan International", rating: 4.0, distance: "2.5 km", type: "ICSE" }, { name: "Vydehi School of Excellence", rating: 4.3, distance: "1 km", type: "CBSE" }],
        "Lower Parel": [{ name: "DSB International", rating: 4.5, distance: "1.0 km", type: "IGCSE" }, { name: "JBCN International", rating: 4.2, distance: "1.5 km", type: "IB" }],
        "Worli": [{ name: "Podar International", rating: 4.4, distance: "2.0 km", type: "IB/CIE" }, { name: "Sacred Heart School", rating: 4.1, distance: "1.8 km", type: "State" }],
        "Gurgaon": [{ name: "The Shri Ram School", rating: 4.8, distance: "3 km", type: "ICSE" }, { name: "DPS Gurgaon", rating: 4.5, distance: "4 km", type: "CBSE" }, { name: "Heritage Xperiential", rating: 4.7, distance: "2.5 km", type: "IB" }],
        "Jubilee Hills": [{ name: "Jubilee Hills Public School", rating: 4.6, distance: "1.5 km", type: "CBSE" }, { name: "Bharatiya Vidya Bhavan", rating: 4.7, distance: "2 km", type: "CBSE" }],
        "Koregaon Park": [{ name: "The Bishop's School", rating: 4.5, distance: "1.0 km", type: "ICSE" }, { name: "St. Mary's School", rating: 4.3, distance: "2.5 km", type: "ICSE" }],
        "Adyar": [{ name: "The School KFI", rating: 4.8, distance: "2.0 km", type: "ICSE" }, { name: "St. Patrick's", rating: 4.4, distance: "1.5 km", type: "State" }],
        "Salt Lake": [{ name: "Our Lady Queen of the Missions", rating: 4.5, distance: "1.2 km", type: "ICSE" }, { name: "Salt Lake School", rating: 4.2, distance: "1.8 km", type: "CBSE" }],
    };
    // Fallback for unmapped localities
    return schools[locality] || [{ name: "Kendriya Vidyalaya", rating: 4.0, distance: "1.5 km", type: "CBSE" }, { name: "City International School", rating: 4.2, distance: "2.0 km", type: "ICSE" }, { name: "Local Public School", rating: 3.8, distance: "0.8 km", type: "State" }];
}

// --- Monthly EMI Estimate ---
export function getMonthlyEstimate(price) {
    const downPayment = Math.round(price * 0.2); // 20% down
    const loanAmount = price - downPayment;
    const rate = 8.75 / 100 / 12; // 8.75% home loan rate
    const tenureMonths = 240; // 20 years
    const emi = Math.round(loanAmount * rate * Math.pow(1 + rate, tenureMonths) / (Math.pow(1 + rate, tenureMonths) - 1));
    const insurance = Math.round(price * 0.0005 / 12); // Property insurance est
    const hoa = price > 50000000 ? 15000 : 5000;
    const tax = Math.round(price * 0.001 / 12); // Property tax monthly est
    return { emi, tax, insurance, hoa, total: emi + tax + insurance + hoa, downPayment, loanAmount };
}

// --- City Market Data (Data Intelligence) ---
export const cityData = [
    { city: "Mumbai", avgPrice: 28000000, pricePerSqft: 17600, growth: 7.8, inventory: 15200, demand: 96, supplyIndex: 55, avgDaysOnMarket: 45, absorptionRate: 68 },
    { city: "Bangalore", avgPrice: 12500000, pricePerSqft: 9310, growth: 11.2, inventory: 22000, demand: 94, supplyIndex: 78, avgDaysOnMarket: 35, absorptionRate: 82 },
    { city: "Gurgaon", avgPrice: 19500000, pricePerSqft: 11500, growth: 14.5, inventory: 11000, demand: 98, supplyIndex: 65, avgDaysOnMarket: 28, absorptionRate: 88 },
    { city: "Hyderabad", avgPrice: 14000000, pricePerSqft: 8300, growth: 16.2, inventory: 18500, demand: 95, supplyIndex: 82, avgDaysOnMarket: 30, absorptionRate: 85 },
    { city: "New Delhi", avgPrice: 22000000, pricePerSqft: 9620, growth: 5.5, inventory: 8500, demand: 88, supplyIndex: 45, avgDaysOnMarket: 60, absorptionRate: 60 },
    { city: "Pune", avgPrice: 9500000, pricePerSqft: 8220, growth: 9.8, inventory: 16000, demand: 85, supplyIndex: 72, avgDaysOnMarket: 40, absorptionRate: 75 },
    { city: "Chennai", avgPrice: 9200000, pricePerSqft: 7500, growth: 6.2, inventory: 12500, demand: 80, supplyIndex: 68, avgDaysOnMarket: 50, absorptionRate: 65 },
    { city: "Kolkata", avgPrice: 8500000, pricePerSqft: 6290, growth: 4.8, inventory: 14000, demand: 75, supplyIndex: 60, avgDaysOnMarket: 55, absorptionRate: 58 },
    { city: "Ahmedabad", avgPrice: 7500000, pricePerSqft: 6000, growth: 8.5, inventory: 11000, demand: 82, supplyIndex: 65, avgDaysOnMarket: 42, absorptionRate: 70 },
    { city: "Noida", avgPrice: 8800000, pricePerSqft: 6500, growth: 12.5, inventory: 19000, demand: 86, supplyIndex: 85, avgDaysOnMarket: 32, absorptionRate: 72 },
    { city: "Jaipur", avgPrice: 6500000, pricePerSqft: 5800, growth: 10.2, inventory: 8000, demand: 78, supplyIndex: 70, avgDaysOnMarket: 38, absorptionRate: 65 },
    { city: "Lucknow", avgPrice: 5800000, pricePerSqft: 7000, growth: 9.5, inventory: 7500, demand: 72, supplyIndex: 68, avgDaysOnMarket: 40, absorptionRate: 62 },
    { city: "Chandigarh", avgPrice: 11000000, pricePerSqft: 10500, growth: 7.2, inventory: 4500, demand: 85, supplyIndex: 55, avgDaysOnMarket: 45, absorptionRate: 75 },
    { city: "Surat", avgPrice: 6200000, pricePerSqft: 5400, growth: 11.8, inventory: 9000, demand: 80, supplyIndex: 75, avgDaysOnMarket: 35, absorptionRate: 78 },
    { city: "Indore", avgPrice: 5500000, pricePerSqft: 5200, growth: 12.2, inventory: 8500, demand: 84, supplyIndex: 80, avgDaysOnMarket: 30, absorptionRate: 82 },
    { city: "Coimbatore", avgPrice: 6800000, pricePerSqft: 6200, growth: 8.8, inventory: 6000, demand: 76, supplyIndex: 65, avgDaysOnMarket: 42, absorptionRate: 68 },
    { city: "Kochi", avgPrice: 7200000, pricePerSqft: 6800, growth: 6.5, inventory: 5500, demand: 70, supplyIndex: 62, avgDaysOnMarket: 48, absorptionRate: 60 },
    { city: "Thane", avgPrice: 11500000, pricePerSqft: 12500, growth: 8.8, inventory: 13500, demand: 90, supplyIndex: 75, avgDaysOnMarket: 38, absorptionRate: 70 },
    { city: "Navi Mumbai", avgPrice: 13500000, pricePerSqft: 11500, growth: 15.5, inventory: 14000, demand: 92, supplyIndex: 70, avgDaysOnMarket: 25, absorptionRate: 85 },
    { city: "Visakhapatnam", avgPrice: 5200000, pricePerSqft: 4800, growth: 10.5, inventory: 6500, demand: 74, supplyIndex: 72, avgDaysOnMarket: 40, absorptionRate: 64 },
    { city: "Nagpur", avgPrice: 4800000, pricePerSqft: 4500, growth: 7.5, inventory: 7000, demand: 68, supplyIndex: 65, avgDaysOnMarket: 44, absorptionRate: 58 },
    { city: "Ludhiana", avgPrice: 4200000, pricePerSqft: 4800, growth: 6.8, inventory: 5000, demand: 65, supplyIndex: 60, avgDaysOnMarket: 48, absorptionRate: 55 },
    { city: "Bhopal", avgPrice: 3800000, pricePerSqft: 4200, growth: 11.5, inventory: 4800, demand: 80, supplyIndex: 75, avgDaysOnMarket: 35, absorptionRate: 72 },
    { city: "Patna", avgPrice: 4500000, pricePerSqft: 6500, growth: 5.2, inventory: 3500, demand: 70, supplyIndex: 55, avgDaysOnMarket: 52, absorptionRate: 50 },
    { city: "Vadodara", avgPrice: 5500000, pricePerSqft: 4800, growth: 9.2, inventory: 6200, demand: 78, supplyIndex: 68, avgDaysOnMarket: 42, absorptionRate: 68 },
    { city: "Ghaziabad", avgPrice: 6800000, pricePerSqft: 5200, growth: 13.8, inventory: 15000, demand: 88, supplyIndex: 82, avgDaysOnMarket: 30, absorptionRate: 80 },
    { city: "Rajkot", avgPrice: 4600000, pricePerSqft: 3400, growth: 12.5, inventory: 5500, demand: 82, supplyIndex: 78, avgDaysOnMarket: 32, absorptionRate: 75 },
    { city: "Madurai", avgPrice: 4400000, pricePerSqft: 4600, growth: 8.5, inventory: 4200, demand: 72, supplyIndex: 65, avgDaysOnMarket: 45, absorptionRate: 62 },
    { city: "Raipur", avgPrice: 3500000, pricePerSqft: 2800, growth: 15.2, inventory: 3800, demand: 85, supplyIndex: 70, avgDaysOnMarket: 28, absorptionRate: 82 },
    { city: "Ranchi", avgPrice: 3200000, pricePerSqft: 2600, growth: 10.8, inventory: 3200, demand: 74, supplyIndex: 62, avgDaysOnMarket: 40, absorptionRate: 65 },
    { city: "Guwahati", avgPrice: 4200000, pricePerSqft: 3200, growth: 12.5, inventory: 2500, demand: 80, supplyIndex: 55, avgDaysOnMarket: 35, absorptionRate: 70 },
    { city: "Thiruvananthapuram", avgPrice: 6200000, pricePerSqft: 4800, growth: 7.5, inventory: 3000, demand: 75, supplyIndex: 60, avgDaysOnMarket: 48, absorptionRate: 65 },
    { city: "Vijayawada", avgPrice: 5800000, pricePerSqft: 4200, growth: 18.2, inventory: 4000, demand: 90, supplyIndex: 75, avgDaysOnMarket: 22, absorptionRate: 88 },
];

// --- City → Major Localities Mapping (Real-World Data) ---
export const cityLocalities = {
    "Mumbai": ["Bandra West", "Andheri West", "Powai", "Worli", "Lower Parel", "Malad West", "Borivali", "Goregaon", "Juhu", "Chembur", "Dadar", "Colaba", "Thane", "Kurla", "Kandivali"],
    "Bangalore": ["Whitefield", "Koramangala", "Indiranagar", "HSR Layout", "Sarjapur Road", "Electronic City", "Marathahalli", "Hebbal", "JP Nagar", "Bannerghatta Road", "Yelahanka", "Rajajinagar", "Jayanagar", "BTM Layout", "Devanahalli", "Malleshwaram", "Basavanagudi", "Frazer Town", "Benson Town", "Ulsoor", "Bellandur", "Kumaraswamy Layout", "Banashankari", "RR Nagar", "Kengeri", "Vijayanagar", "Yeshwanthpur", "Vidyaranyapura"],
    "Gurgaon": ["Golf Course Road", "DLF Phase 5", "Sector 49", "Sector 56", "Sohna Road", "MG Road", "Sector 82", "Sector 67", "Dwarka Expressway", "Sector 48", "Palam Vihar", "Sector 37D", "Sector 92", "Sector 70A", "Sector 84"],
    "Hyderabad": ["Gachibowli", "Hitech City", "Jubilee Hills", "Banjara Hills", "Kondapur", "Kukatpally", "Manikonda", "Miyapur", "Begumpet", "Madhapur", "Secunderabad", "LB Nagar", "Dilsukhnagar", "Uppal", "Kompally"],
    "New Delhi": ["Vasant Vihar", "Greater Kailash", "Saket", "Dwarka", "Rohini", "Janakpuri", "Hauz Khas", "Defence Colony", "Lajpat Nagar", "Pitampura", "Karol Bagh", "Nehru Place", "Uttam Nagar", "Mayur Vihar", "Green Park"],
    "Pune": ["Koregaon Park", "Hinjewadi", "Kharadi", "Viman Nagar", "Baner", "Wakad", "Hadapsar", "Aundh", "Kothrud", "Magarpatta", "Pimple Saudagar", "Kondhwa", "NIBM Road", "Undri", "Bavdhan"],
    "Chennai": ["T Nagar", "Velachery", "Anna Nagar", "OMR", "Adyar", "Porur", "Tambaram", "Sholinganallur", "Thoraipakkam", "Chromepet", "Perambur", "Guindy", "Nungambakkam", "Thiruvanmiyur", "ECR"],
    "Kolkata": ["Salt Lake", "New Town", "Rajarhat", "Ballygunge", "Alipore", "EM Bypass", "Garia", "Behala", "Tollygunge", "Jadavpur", "Howrah", "Dum Dum", "Park Street", "Lake Town", "Jodhpur Park"],
    "Ahmedabad": ["SG Highway", "Prahlad Nagar", "Satellite", "Bodakdev", "Vastrapur", "Bopal", "South Bopal", "Ambli", "Thaltej", "Navrangpura", "Maninagar", "Chandkheda", "Gota", "Science City", "Shilaj"],
    "Noida": ["Sector 150", "Sector 137", "Sector 78", "Sector 75", "Sector 62", "Sector 128", "Sector 44", "Greater Noida West", "Sector 50", "Sector 100", "Sector 143", "Sector 77", "Sector 135", "Yamuna Expressway", "Sector 120"],
    "Jaipur": ["Vaishali Nagar", "Malviya Nagar", "Mansarovar", "Jagatpura", "Tonk Road", "C-Scheme", "Raja Park", "Ajmer Road", "Sodala", "Pratap Nagar", "Jhotwara", "Sanganer", "Nirman Nagar", "Bani Park", "Civil Lines"],
    "Lucknow": ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Mahanagar", "Alambagh", "Jankipuram", "Vikas Nagar", "Aminabad", "Rajajipuram", "Aashiyana", "Sushant Golf City", "Eldeco Udyan", "Sahara City", "Chinhat"],
    "Chandigarh": ["Sector 17", "Sector 35", "Sector 22", "Sector 44", "Sector 16", "Sector 8", "Sector 9", "Sector 15", "Zirakpur", "Mohali", "Panchkula", "Sector 21", "Sector 34", "Sector 43", "Sector 7"],
    "Surat": ["Vesu", "Adajan", "Pal", "Althan", "Piplod", "Athwa", "Dumas Road", "Varachha", "Ghod Dod Road", "Magdalla", "Katargam", "Bhatar", "City Light", "New City Light", "Parvat Patiya"],
    "Indore": ["Vijay Nagar", "Palasia", "AB Road", "Nipania", "Bhawarkuan", "Sapna Sangeeta", "MR 10", "Rau", "Tilak Nagar", "Sudama Nagar", "Scheme 78", "Scheme 54", "Bicholi Mardana", "Super Corridor", "Mahalaxmi Nagar"],
    "Coimbatore": ["RS Puram", "Peelamedu", "Saravanampatti", "Gandhipuram", "Singanallur", "Race Course", "Ganapathy", "Vadavalli", "Sulur", "Kovaipudur", "Thudiyalur", "Ondipudur", "Kalapatti", "Vilankurichi", "Uppilipalayam"],
    "Kochi": ["Edappally", "Kakkanad", "Vyttila", "Marine Drive", "Panampilly Nagar", "Kaloor", "Aluva", "Tripunithura", "Ernakulam North", "Palarivattom", "Thrippunithura", "Fort Kochi", "Cheranalloor", "Maradu", "Kadavanthra"],
    "Thane": ["Ghodbunder Road", "Majiwada", "Pokhran Road", "Kolshet Road", "Manpada", "Waghbil", "Panchpakhadi", "Balkum", "Brahmand", "Vartak Nagar", "Hiranandani Estate", "Naupada", "Vijay Garden", "Samata Nagar", "Kasarvadavali"],
    "Navi Mumbai": ["Kharghar", "Vashi", "Panvel", "Belapur", "Airoli", "Nerul", "Sanpada", "Ulwe", "Taloja", "Ghansoli", "Seawoods", "Kopar Khairane", "Kamothe", "New Panvel", "Dronagiri"],
    "Visakhapatnam": ["Arilova", "Madhurawada", "Gajuwaka", "MVP Colony", "Seethammadhara", "Health City", "Rishikonda", "Dwaraka Nagar", "Kommadi", "Yendada", "Rushikonda", "Pendurthi", "NAD Junction", "Srikanth Nagar", "Lawsons Bay Colony", "Kancharapalem", "Akkayyapalem", "Siripuram", "Waltair Uplands", "Pedawaltair", "PM Palem", "Bheemili", "Gopalapatnam", "Simhachalam", "Vepagunta", "Sujatha Nagar"],
    "Nagpur": ["Dharampeth", "Sadar", "Ramdaspeth", "Civil Lines", "Laxmi Nagar", "Wardha Road", "Manish Nagar", "Pratap Nagar", "IT Park", "Hingna", "Koradi Road", "Mankapur", "Trimurti Nagar", "Byramji Town", "Seminary Hills"],
    "Ludhiana": ["Model Town", "Sarabha Nagar", "BRS Nagar", "Dugri", "Pakhowal Road", "Civil Lines", "Rajguru Nagar", "Ferozepur Road", "Rishi Nagar", "Guru Nanak Nagar", "Kitchlu Nagar", "Urban Estate", "Shaheed Bhagat Singh Nagar", "Tagore Nagar", "PAU"],
    "Bhopal": ["MP Nagar", "Arera Colony", "Hoshangabad Road", "Kolar Road", "Shahpura", "Ayodhya Nagar", "Indrapuri", "Bairagarh", "Habibganj", "Mandideep", "BHEL", "Katara Hills", "Awadhpuri", "Danish Kunj", "Misrod"],
    "Patna": ["Boring Road", "Kankarbagh", "Rajendra Nagar", "Bailey Road", "Patliputra Colony", "Danapur", "Anisabad", "Ashiyana Nagar", "Saguna More", "Phulwari Sharif", "Mahesh Nagar", "Naubatpur", "Budh Marg", "Sampatchak", "Khagaul"],
    "Vadodara": ["Alkapuri", "Gotri", "Manjalpur", "Vasna Bhayli Road", "Waghodia Road", "Fatehgunj", "Sama", "Karelibaug", "Subhanpura", "Akota", "Makarpura", "Tarsali", "Harni", "Bhayli", "Tandalja"],
    "Ghaziabad": ["Indirapuram", "Vaishali", "Raj Nagar Extension", "Crossings Republik", "Kaushambi", "Vasundhara", "Shalimar Garden", "Govindpuram", "Lal Kuan", "Wave City", "NH-24", "Mohan Nagar", "Ahinsa Khand", "Shakti Khand", "Niti Khand"],
    "Rajkot": ["Kalawad Road", "University Road", "Raiya Road", "150 Feet Ring Road", "Astron Chowk", "Mavdi", "Kothariya", "Gondal Road", "Bhaktinagar", "Pedak Road", "Nana Mava Road", "Amin Marg", "Kalavad Road", "Jamnagar Road", "Airport Road"],
    "Madurai": ["KK Nagar", "Anna Nagar", "SS Colony", "Villapuram", "Thiruparankundram", "Arapalayam", "Goripalayam", "Tallakulam", "Palanganatham", "Teppakulam", "Narimedu", "Iyer Bungalow", "Virattipathu", "Melur Road", "Mattuthavani"],
    "Raipur": ["Shankar Nagar", "Devendra Nagar", "Telibandha", "Civil Lines", "Tatibandh", "Fafadih", "Pandri", "New Rajendra Nagar", "Amanaka", "Mowa", "VIP Road", "Priyadarshini Nagar", "Avanti Vihar", "Vidhan Sabha Road", "Daldal Seoni"],
    "Ranchi": ["Morabadi", "Bariatu", "Lalpur", "Doranda", "Harmu", "Ashok Nagar", "Kanke Road", "Ratu Road", "Hinoo", "Dhurwa", "Argora", "Kadru", "Hatia", "Kokar", "Namkum"],
    "Guwahati": ["Dispur", "Ganeshguri", "Zoo Road", "Beltola", "Hatigaon", "Six Mile", "Basistha", "GS Road", "Paltan Bazaar", "Chandmari", "Maligaon", "Hengrabari", "Kahilipara", "Lachit Nagar", "Bharalumukh"],
    "Thiruvananthapuram": ["Kazhakootam", "Technopark", "Pattom", "Kowdiar", "Vazhuthacaud", "Kesavadasapuram", "Sreekaryam", "Peroorkada", "Vattiyoorkavu", "Mannanthala", "Enchakkal", "Ulloor", "Thirumala", "Nedumangad", "Attipra"],
    "Vijayawada": ["Benz Circle", "Moghalrajpuram", "Labbipet", "Governorpet", "Patamata", "Kanuru", "Poranki", "Gannavaram", "Enikepadu", "Auto Nagar", "Gunadala", "Nunna", "Tadepalli", "Mangalagiri", "Penamaluru", "Bhavanipuram", "Gollapudi", "Ibrahimpatnam", "One Town", "Two Town", "Ajit Singh Nagar", "Machavaram", "Satyanarayanapuram", "Nidamanuru"],
};

// --- Monthly Market Trends ---
export const monthlyTrends = [
    { month: "Mar", avgPrice: 12100, volume: 1520, views: 45500, inquiries: 3250 },
    { month: "Apr", avgPrice: 12250, volume: 1440, views: 43500, inquiries: 3050 },
    { month: "May", avgPrice: 12400, volume: 1620, views: 48500, inquiries: 3550 },
    { month: "Jun", avgPrice: 12350, volume: 1470, views: 46500, inquiries: 3150 },
    { month: "Jul", avgPrice: 12600, volume: 1570, views: 49500, inquiries: 3650 },
    { month: "Aug", avgPrice: 12800, volume: 1670, views: 52500, inquiries: 4050 },
    { month: "Sep", avgPrice: 12950, volume: 1820, views: 56500, inquiries: 4550 },
    { month: "Oct", avgPrice: 13200, volume: 2120, views: 65500, inquiries: 5250 },
    { month: "Nov", avgPrice: 13400, volume: 1920, views: 60500, inquiries: 4850 },
    { month: "Dec", avgPrice: 13600, volume: 1720, views: 55500, inquiries: 4250 },
    { month: "Jan", avgPrice: 13800, volume: 1970, views: 62500, inquiries: 4950 },
    { month: "Feb", avgPrice: 14050, volume: 2220, views: 70500, inquiries: 5650 },
];

// --- Clients (Indian Context) ---
export const clients = [
    { id: 1, name: "Rahul Khanna", email: "rahul.k@gmail.com", phone: "+91 98200 12345", budget: 35000000, preference: "Sea View Apartment", city: "Mumbai", status: "showing", lastContact: "2026-02-12", notes: "Prefers South Bombay or Bandra. Cash ready.", avatar: "RK", type: "buyer", leadScore: 88, source: "Website", urgency: "high", preApproved: true, interactions: 15, documentsCount: 2 },
    { id: 2, name: "Priya Desai", email: "priya.d@yahoo.in", phone: "+91 99800 54321", budget: 15000000, preference: "3 BHK close to IT Park", city: "Bangalore", status: "qualified", lastContact: "2026-02-10", notes: "Working in Whitefield. Needs ready to move.", avatar: "PD", type: "buyer", leadScore: 75, source: "Referral", urgency: "medium", preApproved: true, interactions: 8, documentsCount: 1 },
    { id: 3, name: "Vikram Malhotra", email: "vikram.m@outlook.com", phone: "+91 98110 98765", budget: 85000000, preference: "Farmhouse/Villa", city: "Delhi", status: "offer", lastContact: "2026-02-11", notes: "Looking for Chhattarpur Farms or Westend.", avatar: "VM", type: "buyer", leadScore: 92, source: "Direct", urgency: "high", preApproved: true, interactions: 20, documentsCount: 5 },
    { id: 4, name: "Anjali Gupta", email: "anjali.g@gmail.com", phone: "+91 98480 11223", budget: 22000000, preference: "Investment Property", city: "Hyderabad", status: "lead", lastContact: "2026-02-09", notes: "ROI focused. Interested in commercial spaces too.", avatar: "AG", type: "buyer", leadScore: 60, source: "Social Media", urgency: "low", preApproved: false, interactions: 3, documentsCount: 0 },
    { id: 5, name: "Rajesh Iyer", email: "r.iyer@gmail.com", phone: "+91 98840 33445", budget: 9500000, preference: "2 BHK OMR", city: "Chennai", status: "closed", lastContact: "2026-02-01", notes: "Deal closed at Hiranandani.", avatar: "RI", type: "buyer", leadScore: 100, source: "Website", urgency: "high", preApproved: true, interactions: 25, documentsCount: 8 },
    { id: 6, name: "Suresh Mehta", email: "suresh.invest@gmail.com", phone: "+91 98230 44556", budget: 45000000, preference: "Sell 4 BHK Koregaon Park", city: "Pune", status: "qualified", lastContact: "2026-02-13", notes: "Selling ancestral property. Wants quick liqudation.", avatar: "SM", type: "seller", leadScore: 85, source: "Direct", urgency: "high", preApproved: true, interactions: 10, documentsCount: 4 },
];

export const sellerLeads = [
    { id: 1, buyerName: "Rahul Khanna", budget: 35000000, preApproved: true, seriousness: 92, viewCount: 5, lastViewed: "2 hours ago", budgetMatch: "match", propertyId: 1 },
    { id: 2, buyerName: "Karan Johar", budget: 42000000, preApproved: true, seriousness: 88, viewCount: 3, lastViewed: "1 day ago", budgetMatch: "above", propertyId: 1 },
    { id: 3, buyerName: "Priya Desai", budget: 14000000, preApproved: true, seriousness: 65, viewCount: 2, lastViewed: "2 days ago", budgetMatch: "below", propertyId: 5 },
    { id: 4, buyerName: "Sneha Reddy", budget: 5000000, preApproved: false, seriousness: 35, viewCount: 1, lastViewed: "5 days ago", budgetMatch: "below", propertyId: 7 },
    { id: 5, buyerName: "Vikram Malhotra", budget: 85000000, preApproved: true, seriousness: 78, viewCount: 4, lastViewed: "3 hours ago", budgetMatch: "match", propertyId: 3 },
];

// --- Pipeline Stages ---
export const pipelineStages = ["lead", "qualified", "showing", "offer", "negotiation", "closed"];
export const pipelineLabels = { lead: "New Lead", qualified: "Qualified", showing: "Site Visit", offer: "Offer Made", negotiation: "Negotiation", closed: "Booked" };
export const pipelineColors = { lead: "#94a3b8", qualified: "#3b82f6", showing: "#f59e0b", offer: "#c93a2a", negotiation: "#8b5cf6", closed: "#22c55e" };

// --- Seller Pipeline ---
export const sellerPipelineStages = ["draft", "live", "offers_received", "under_contract", "sold"];
export const sellerPipelineLabels = { draft: "Draft", live: "Active Listing", offers_received: "Offers Received", under_contract: "Under Contract", sold: "Sold" };
export const sellerPipelineColors = { draft: "#94a3b8", live: "#3b82f6", offers_received: "#f59e0b", under_contract: "#8b5cf6", sold: "#22c55e" };

// --- Buyer saved searches etc ---
export const savedSearches = [
    { id: 1, name: "Bandra Sea View 3BHK", filters: { city: "Mumbai", bedrooms: 3, minPrice: 50000000 }, matches: 2, newMatches: 1, created: "2026-01-20" },
    { id: 2, name: "Whitefield Villas < 3Cr", filters: { city: "Bangalore", type: "Villa", maxPrice: 30000000 }, matches: 4, newMatches: 2, created: "2026-02-05" },
];

export const buyerOffers = [
    { id: 1, propertyId: 1, propertyName: "Lodha World One", offerPrice: 82000000, listPrice: 85000000, status: "negotiation", submittedDate: "2026-02-10", response: "Counter: 83.5 Cr" },
];

export const tourRequests = [
    { id: 1, propertyId: 5, propertyName: "Prestige Shantiniketan", date: "2026-02-22", time: "11:00 AM", status: "confirmed", agentName: "Arjun Reddy" },
    { id: 2, propertyId: 1, propertyName: "Lodha World One", date: "2026-02-18", time: "4:00 PM", status: "pending", agentName: "Simran Kaur" },
];

// --- Agent Tasks ---
export const agentTasks = [
    { id: 1, title: "Call Rahul re: Negotiation", priority: "high", dueDate: "2026-02-14", status: "pending", client: "Rahul Khanna", type: "call" },
    { id: 2, title: "Send Agreement Draft to Vikram", priority: "high", dueDate: "2026-02-15", status: "pending", client: "Vikram Malhotra", type: "document" },
    { id: 3, title: "Schedule site visit for Priya", priority: "medium", dueDate: "2026-02-16", status: "pending", client: "Priya Desai", type: "showing" },
];

// --- Agent Calendar ---
export const agentCalendar = [
    { id: 1, title: "Site Visit - Lodha", client: "Rahul Khanna", date: "2026-02-14", time: "11:00 AM", duration: "1h", type: "showing", color: "#3b82f6" },
    { id: 2, title: "Meeting w/ Legal Team", client: null, date: "2026-02-14", time: "3:00 PM", duration: "1.5h", type: "meeting", color: "#f59e0b" },
];

export const commissionHistory = [
    { id: 1, deal: "Hiranandani Glen Classic", client: "Rajesh Iyer", closedDate: "2026-02-01", dealValue: 9500000, commission: 190000, status: "paid" },
    { id: 2, deal: "Kalpataru Vista", client: "Amit Singh", closedDate: "2026-01-15", dealValue: 24000000, commission: 480000, status: "paid" },
];

export const agentDocuments = [
    { id: 1, name: "Sale Deed Draft.pdf", client: "Rahul Khanna", type: "legal", size: "2.4 MB", date: "2026-02-12" },
    { id: 2, name: "Property Card - Bandra.pdf", client: "Suresh Mehta", type: "legal", size: "1.1 MB", date: "2026-02-10" },
];

export const buyerFeedback = [
    { id: 1, propertyId: 1, propertyName: "Lodha World One", buyer: "Rahul Khanna", rating: 5, feedback: "Exceptional view and amenities. Price is on higher side.", date: "2026-02-14" },
];

// --- Seller Listing Scores ---
export function getListingScore(property) {
    const titleScore = Math.min(98, 60 + property.name.length * 2);
    const descScore = Math.min(95, 55 + property.amenities.length * 8);
    const photoScore = property.trending ? 88 : 65 + Math.floor(Math.random() * 20);
    const amenityScore = Math.min(100, property.amenities.length * 16);
    const completeness = Math.round((titleScore + descScore + photoScore + amenityScore) / 4);
    const suggestions = [];
    if (titleScore < 80) suggestions.push("Add location keywords to title");
    if (descScore < 80) suggestions.push("Expand description with neighborhood details");
    if (photoScore < 75) suggestions.push("Add professional photos");
    if (amenityScore < 80) suggestions.push("List more amenities (parking, security, etc.)");
    if (!property.openHouseDate) suggestions.push("Schedule an open house");
    return { titleScore, descScore, photoScore, amenityScore, completeness, suggestions };
}

// --- Helper Functions ---
export function formatPrice(price) {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString('en-IN')}`;
}

export function formatNumber(num) {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}

export function getStatusColor(status) {
    const colors = { active: "#22c55e", pending: "#f59e0b", sold: "#94a3b8" };
    return colors[status] || "#94a3b8";
}

export function getStatusLabel(status) {
    const labels = { active: "Active", pending: "Under Offer", sold: "Sold" };
    return labels[status] || status;
}

import { MLEngine } from './ml-engine';

// --- AI Prediction Logic (Professional Random Forest Engine) ---
export function predictPrice(features) {
    const result = MLEngine.predict(features);
    const verdict = MLEngine.getProfessionalVerdict(result, features);
    return { ...result, verdict };
}

// --- Recommendations ---
export function getRecommendations(savedIds, maxBudget = 50000000) {
    const savedSet = Array.isArray(savedIds) ? new Set(savedIds) : (savedIds instanceof Set ? savedIds : new Set());
    // Simple mock logic: prioritize trending and active, different from saved
    return properties.filter(p => !savedSet.has(p.id) && p.status === 'active').sort(() => 0.5 - Math.random()).slice(0, 5);
}

export function getCompetitors(property) {
    return properties.filter(p => p.city === property.city && p.id !== property.id).slice(0, 3).map(p => ({
        ...p,
        priceDiff: ((p.pricePerSqft - property.pricePerSqft) / property.pricePerSqft * 100).toFixed(1)
    }));
}

export function simulatePriceChange(property, changePercent) {
    const newPrice = Math.round(property.price * (1 + changePercent / 100));
    return {
        newPrice,
        projectedViews: Math.round(property.views * (changePercent < 0 ? 1.2 : 0.8)),
        projectedInquiries: Math.round(property.inquiries * (changePercent < 0 ? 1.3 : 0.7)),
        marketPosition: changePercent < -5 ? "Competitive" : changePercent > 5 ? "Premium" : "Market Standard"
    };
}

// --- Buyer specific data ---

export const activityTimeline = [
    { id: 1, action: "Saved Property", detail: "Lodha World One", time: "2 hours ago", type: "save", icon: "bookmark" },
    { id: 2, action: "Scheduled Tour", detail: "Prestige Shantiniketan", time: "Yesterday", type: "tour", icon: "event" },
    { id: 3, action: "Price Drop Alert", detail: "Oberoi Sky City (₹ 2.8 Cr)", time: "2 days ago", type: "alert", icon: "notifications" },
    { id: 4, action: "Offer Submitted", detail: "Lodha World One", time: "4 days ago", type: "offer", icon: "gavel" },
    { id: 5, action: "Viewed Property", detail: "Rustomjee Paramount", time: "5 days ago", type: "view", icon: "visibility" },
];

export const notifications = [
    { id: 1, title: "Tour Confirmed", message: "Your visit to Prestige Shantiniketan is confirmed for Feb 22.", read: false, time: "1 hour ago", type: "tour" },
    { id: 2, title: "New Match", message: "3 new properties match your 'Sea View' search.", read: false, time: "5 hours ago", type: "search" },
    { id: 3, title: "Offer Update", message: "Seller countered your offer on Lodha World One.", read: true, time: "1 day ago", type: "offer" },
];

export const buyerPipelineStages = ["search", "touring", "offer_submitted", "under_contract", "closed"];
export const buyerPipelineLabels = { search: "Browsing", touring: "Touring", offer_submitted: "Offer", under_contract: "In Contract", closed: "Keys Handed" };
export const buyerPipelineColors = { search: "#3b82f6", touring: "#f59e0b", offer_submitted: "#c93a2a", under_contract: "#8b5cf6", closed: "#22c55e" };

export const neighborhoodScores = {
    "Lower Parel": { safety: 88, commute: 92, lifestyle: 95 },
    "Whitefield": { safety: 84, commute: 78, lifestyle: 85 },
    "Gurgaon": { safety: 82, commute: 88, lifestyle: 90 },
};
