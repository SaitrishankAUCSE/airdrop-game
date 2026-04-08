# HomieNest: Project Architecture & UML Diagrams
Visual documentation of the HomieNest Real Estate platform workflows and logic.

---

## 1. System Macro-Architecture
*Component Diagram*  
This diagram illustrates the high-level components of the HomieNest ecosystem and how they interact.

```mermaid
componentDiagram
    [User Browser] as UI
    [Next.js App Router] as Auth
    [API Predict Route] as API
    [MLEngine Module] as ML
    [Nifty Realty Index] as YF
    [Google Maps API] as Maps
    [Firebase DB] as DB

    UI --> Auth : Interactive Dashboards
    Auth --> API : POST /predict
    API --> ML : Input Features
    API --> YF : Live Market Sentiment
    ML --> API : Deterministic Prediction
    API --> UI : Enriched Valuation Result
    UI --> Maps : Real-world Verification
    Auth --> DB : Persist User/Saved Props
```

---

## 2. Dynamic Valuation Pipeline
*Sequence Diagram*  
Trace of a single price prediction request.

```mermaid
sequenceDiagram
    participant U as User (UI)
    participant A as API Handler
    participant YF as Yahoo Finance
    participant ML as ML Engine
    participant V as Verdict Analyst

    U->>A: Submit Property Features (BHK, Sqft, etc.)
    A->>YF: Fetch ^CNXREALTY (Live Nifty Index)
    YF-->>A: Recent Market Price & Close
    A->>A: Calculate liveMultiplier (Sentiment)
    A->>ML: MLEngine.predict(features)
    ML->>ML: Apply Locality, Floor, Age weights
    ML-->>A: Base Predict Result
    A->>A: Apply liveMultiplier to Result
    A->>V: MLEngine.getProfessionalVerdict(result)
    V-->>A: Narrative String
    A-->>U: Final Enriched JSON (Predicted + Verdict)
```

---

## 3. Buyer Transaction Lifecycle
*Activity Diagram*  
The user journey from discovery to offer.

```mermaid
stateDiagram-v2
    [*] --> Discovery
    Discovery --> PropertySelected
    PropertySelected --> AIValuation : Runs ML Predictor
    AIValuation --> Discovery : Poor Match
    AIValuation --> FinancialAnalysis : Fair Value
    FinancialAnalysis --> TourRequested : Positive Outlook
    TourRequested --> Negotiating : Tour Completed
    Negotiating --> OfferSubmitted
    OfferSubmitted --> [*] : Closing
```

---

## 4. ML Feature Processing Logic
*Logic Flow Diagram*  
How the `MLEngine` transforms raw inputs into a priced asset.

```mermaid
flowchart TD
    Start([Raw Property Features]) --> CityRate[Fetch Base City Rate]
    CityRate --> LocalityNode{Check Locality Tier}
    LocalityNode -- Premium --> P_Mult[+65% Multiplier]
    LocalityNode -- Mid --> M_Mult[+25% Multiplier]
    LocalityNode -- Standard --> B_Mult[Base Multiplier]
    
    P_Mult --> StructNode
    M_Mult --> StructNode
    B_Mult --> StructNode
    
    StructNode{Configuration check} -->|Luxury| Lux[+15% Structural]
    StructNode -->|Compact| Comp[-5% Discount]
    
    Lux --> FloorAge[Apply Floor Rise & Age Depreciation]
    Comp --> FloorAge
    
    FloorAge --> AmenityEnsemble[Apply Amenities Weights]
    AmenityEnsemble --> FinalMerge[Merge Rates & Multiply by Sqft]
    FinalMerge --> Output([Final Valuation Result])
```

---

## 5. System Entity Relationships
*ER Diagram*  
Data relationships between core entities.

```mermaid
erDiagram
    USER ||--o{ SAVED_PROPERTY : saves
    USER ||--o{ SAVED_SEARCH : triggers
    PROPERTY ||--o{ AMENITIES : includes
    PROPERTY ||--|| ML_PREDICTION : generates
    LOCALITY ||--o{ PROPERTY : hosts
    
    USER {
        string id
        string email
        string role
    }
    PROPERTY {
        string name
        int price
        int sqft
        string status
    }
    ML_PREDICTION {
        int predictedValue
        int confidenceScore
        string verdict
    }
```

---

*Note: These diagrams are generated using Mermaid.js syntax and are compatible with GitHub and most Markdown editors.*
