import { TOP_SALES_PART_LIST, TopSalesPart } from './topSalesCatalog';

export interface PartRow {
  PartNumber: string;
  Description: string;
  Category?: string;
}

// Initial core catalog items
export const initialRawData: PartRow[] = [
  // Electrical & Lighting
  { PartNumber: "64215", Description: "H-7 BULB LED/WHITE 24V", Category: "Electrical & Lighting" },
  { PartNumber: "64196", Description: "H-4 HALOGEN BULB HEAVY DUTY", Category: "Electrical & Lighting" },
  { PartNumber: "64156", Description: "H-3 FOG LAMP BULB", Category: "Electrical & Lighting" },
  { PartNumber: "3382", Description: "AUTO BULB 24V 21W SINGLE CONTACT", Category: "Electrical & Lighting" },
  { PartNumber: "1987302510", Description: "BOSCH AUTO BULB H7 LONGLIFE", Category: "Electrical & Lighting" },
  { PartNumber: "20398660", Description: "VOLVO FH INDICATOR LIGHT CORNER LAMP", Category: "Electrical & Lighting" },
  { PartNumber: "5455111", Description: "PUSH AND PULL DASHBOARD SWITCH", Category: "Electrical & Lighting" },
  { PartNumber: "1359871", Description: "SCANIA LED SIDE MARKER LAMP ORANGE", Category: "Electrical & Lighting" },
  { PartNumber: "81259020475", Description: "MAN TRUCK REAR TAIL LIGHT ASSEMBLY", Category: "Electrical & Lighting" },
  { PartNumber: "0005450113", Description: "MERCEDES ACTROS HEADLIGHT SWITCH", Category: "Electrical & Lighting" },
  { PartNumber: "1791550", Description: "DAF XF DAYTIME RUNNING LIGHT (DRL)", Category: "Electrical & Lighting" },
  { PartNumber: "0025422818", Description: "MERCEDES RELAY 24V 5-PIN 30A", Category: "Electrical & Lighting" },

  // Pipes, Hoses, Fittings & Hardware
  { PartNumber: "109975982", Description: "PVC PIPE 12MM REINFORCED AIR LINE", Category: "Pipes & Hoses" },
  { PartNumber: "89976082", Description: "PVC PIPE 6MM HIGH PRESSURE BRAKE LINE", Category: "Pipes & Hoses" },
  { PartNumber: "89979082", Description: "PVC PIPE 8MM POLYOX AIR BRAKE TUBE", Category: "Pipes & Hoses" },
  { PartNumber: "19970652", Description: "PVC PIPE 10MM NYLON AIR HOSE", Category: "Pipes & Hoses" },
  { PartNumber: "74310013002", Description: "BOOSTER AIR BRAKE HOSE 500MM", Category: "Pipes & Hoses" },
  { PartNumber: "74304016200", Description: "BOOSTER NIPPLE 12MM M16x1.5", Category: "Hardware & Fittings" },
  { PartNumber: "52806", Description: "STRAIGHT AUTO FITTING QUICK PUSH PLASTIC 6MM", Category: "Hardware & Fittings" },
  { PartNumber: "52808", Description: "STRAIGHT AUTO FITTING QUICK PUSH PLASTIC 8MM", Category: "Hardware & Fittings" },
  { PartNumber: "52810", Description: "STRAIGHT AUTO FITTING QUICK PUSH PLASTIC 10MM", Category: "Hardware & Fittings" },
  { PartNumber: "29906171", Description: "FITTING MANUAL BRASS UNION 12MM", Category: "Hardware & Fittings" },
  { PartNumber: "915011010102", Description: "BANJO BOLT M16x1.5 SINGLE FUEL/AIR", Category: "Hardware & Fittings" },
  { PartNumber: "915011008103", Description: "BANJO BOLT M14x1.5 HIGH PRESSURE", Category: "Hardware & Fittings" },
  { PartNumber: "7603016103", Description: "COPPER SEALING WASHER 16x22x1.5MM", Category: "Hardware & Fittings" },
  { PartNumber: "4010672", Description: "COLLER NUT (32N F/T) HIGH TENSILE", Category: "Hardware & Fasteners" },
  { PartNumber: "659112612", Description: "WHEEL BOLT M22x1.5 GRADE 10.9", Category: "Hardware & Fasteners" },
  { PartNumber: "980623220", Description: "BPW TRAILER HUB BOLT N/M ECO PLUS", Category: "Hardware & Fasteners" },
  { PartNumber: "0329603180", Description: "SAF AXLE WHEEL NUT M22x1.5 FLANGED", Category: "Hardware & Fasteners" },

  // Filters, Fluids & Lubricants
  { PartNumber: "69782", Description: "OIL FILTER MITSUBISHI CANTER/FUSO O/M", Category: "Filters & Lubricants" },
  { PartNumber: "90915", Description: "OIL FILTER TOYOTA HIACE / LAND CRUISER", Category: "Filters & Lubricants" },
  { PartNumber: "49890420", Description: "ADBLUE 20L EMISSION FLUID ISO 22241", Category: "Fluids & Chemicals" },
  { PartNumber: "LF16015", Description: "FLEETGUARD SPIN-ON LUBE FILTER", Category: "Filters & Lubricants" },
  { PartNumber: "FF5052", Description: "FLEETGUARD FUEL FILTER ELEMENT", Category: "Filters & Lubricants" },
  { PartNumber: "AF25139M", Description: "FLEETGUARD AIR FILTER PRIMARY MAGNUM", Category: "Filters & Lubricants" },
  { PartNumber: "FS19732", Description: "FUEL WATER SEPARATOR FILTER BOWL", Category: "Filters & Lubricants" },
  { PartNumber: "HU9471Z", Description: "MANN OIL FILTER ELEMENT MERCEDES ACTROS", Category: "Filters & Lubricants" },
  { PartNumber: "WK10603X", Description: "MANN PRE-FUEL FILTER SEPARATOR", Category: "Filters & Lubricants" },
  { PartNumber: "C291440", Description: "MANN AIR FILTER ELEMENT VOLVO FH12/FH16", Category: "Filters & Lubricants" },
  { PartNumber: "15W40-208L", Description: "HEAVY DUTY DIESEL ENGINE OIL 15W40 CI-4", Category: "Fluids & Chemicals" },
  { PartNumber: "80W90-GL5", Description: "HEAVY DUTY GEAR OIL GL-5 20L", Category: "Fluids & Chemicals" },

  // Brakes, Suspension & Air Valves
  { PartNumber: "4721950180", Description: "WABCO ABS SOLENOID VALVE 24V", Category: "Brakes & Air Systems" },
  { PartNumber: "4324102227", Description: "WABCO AIR DRYER CARTRIDGE DESICCANT", Category: "Brakes & Air Systems" },
  { PartNumber: "4800200080", Description: "WABCO PROPORTIONAL RELAY VALVE", Category: "Brakes & Air Systems" },
  { PartNumber: "K000945", Description: "KNORR-BREMSE BRAKE CALIPER SN7 DISC", Category: "Brakes & Air Systems" },
  { PartNumber: "1102913", Description: "CONTITECH AIR SPRING BELLOWS 1T19L-7", Category: "Brakes & Air Systems" },
  { PartNumber: "951811", Description: "FIRESTONE AIR BELLOW SUSPENSION 1T15M-9", Category: "Brakes & Air Systems" },
  { PartNumber: "20518333", Description: "VOLVO TRUCK FRONT BRAKE LINING SET", Category: "Brakes & Air Systems" },
  { PartNumber: "1906401", Description: "SCANIA TRAILER BRAKE CHAMBER TYPE 24/30", Category: "Brakes & Air Systems" },

  // Safety, Cargo & Accessories
  { PartNumber: "9194510000", Description: "CARGO LASHING BELT 10 METER 5 TON RATCHET", Category: "Safety & Cargo" },
  { PartNumber: "51105", Description: "FIRE EXTINGUISHER CYLINDER 6KG POWDER", Category: "Safety & Equipment" },
  { PartNumber: "14361", Description: "EMERGENCY HAZARD REFLECTIVE STICKER SMALL", Category: "Body & Safety" },
  { PartNumber: "12536", Description: "LONG VEHICLE REFLECTIVE STICKER JAPAN SPEC", Category: "Body & Safety" },
  { PartNumber: "16919", Description: "SEAT BELT ADVISORY STICKER 15x10CM", Category: "Body & Safety" },
  { PartNumber: "81637306484", Description: "MAN WIDE ANGLE EXTERIOR REARVIEW MIRROR", Category: "Body & Safety" },
  { PartNumber: "20791465", Description: "VOLVO MAIN MIRROR GLASS HEATED 24V", Category: "Body & Safety" },
  { PartNumber: "700MM-WIPER", Description: "HEAVY DUTY WIPER BLADE 700MM (28 INCH)", Category: "Body & Safety" },

  // Belts, Pulleys & Bearings
  { PartNumber: "8PK1420", Description: "HEAVY DUTY V-RIBBED ALTERNATOR BELT", Category: "Belts & Engine" },
  { PartNumber: "8PK2155", Description: "FAN DRIVE SERPENTINE BELT VOLVO D13", Category: "Belts & Engine" },
  { PartNumber: "33118", Description: "TIMKEN TAPERED ROLLER BEARING WHEEL HUB", Category: "Bearings & Seals" },
  { PartNumber: "VKBA5314", Description: "SKF TRUCK WHEEL BEARING KIT COMPLETE", Category: "Bearings & Seals" },
  { PartNumber: "145x175x15", Description: "CR OIL SEAL DRIVE AXLE HUB CASSETTE", Category: "Bearings & Seals" }
];

// Combine initial data and newly uploaded top sales catalog
export const rawData: PartRow[] = [
  ...initialRawData,
  ...TOP_SALES_PART_LIST.map((item: TopSalesPart) => ({
    PartNumber: item.p,
    Description: item.d,
    Category: item.c || 'Commercial Truck Parts'
  }))
];

export interface PartRecord {
  partNumber: string;
  descriptions: string[];
  category?: string;
}

export const getSearchableInventory = (): PartRecord[] => {
  const map = new Map<string, { descriptions: Set<string>; category?: string }>();
  
  rawData.forEach(row => {
    const pn = row.PartNumber?.trim();
    const desc = row.Description?.trim();
    if (!pn) return;
    
    // Normalize part key for deduplication
    const normKey = pn.toUpperCase().replace(/\s+/g, ' ');
    if (!map.has(normKey)) {
      map.set(normKey, { descriptions: new Set(), category: row.Category });
    }
    if (desc) {
      map.get(normKey)!.descriptions.add(desc);
    }
    if (row.Category && (!map.get(normKey)!.category || map.get(normKey)!.category === 'Commercial Truck Parts')) {
      map.get(normKey)!.category = row.Category;
    }
  });

  return Array.from(map.entries()).map(([partNumber, data]) => ({
    partNumber,
    descriptions: Array.from(data.descriptions),
    category: data.category || 'Commercial Truck Parts'
  }));
};

export interface QuickHeadline {
  num: string;
  desc: string;
  category: string;
}

// Generate the complete pool of headlines for the Quick Try ticker
export const getAllQuickHeadlines = (): QuickHeadline[] => {
  const inventory = getSearchableInventory();
  return inventory.map(item => ({
    num: item.partNumber,
    desc: item.descriptions[0] || 'Truck Part',
    category: item.category || 'OE Replacement'
  }));
};

export const MAJOR_CATEGORIES = [
  {
    id: 1,
    title: "Electrical, Lighting & Batteries",
    description: "Batteries, LED/Bulbs, Starter Motors, Relays, Horns, Terminals",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Hardware, Fittings, Pipes & Hoses",
    description: "Bolts, Nuts, Hose Clips, Brass/Banjo Unions, Nipples, Washers, Pipes",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Filters, Fluids, Oils & Lubricants",
    description: "Oil/Fuel/Air Filters, Engine Oils, Coolants, Greases, ATF",
    image: "https://images.unsplash.com/photo-1635784063749-0158863f640c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Brakes, Steering & Air Suspension",
    description: "Brake Drums, Boosters, Air Bellows, Calipers, Slack Adjusters, Tie Rods",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Engine, Cooling & Exhaust Systems",
    description: "Radiators, Water Pumps, Thermostats, Head Gaskets, Mufflers, Belts",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Transmission, Clutch & Bearings",
    description: "Clutch Plates, Servos, Flywheels, Hub Bearings, Seals, Universal Joints",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Safety Gear & Heavy Accessories",
    description: "Hard Hats, Safety Boots, High-Vis Vests, Fire Extinguishers, Tarpaulins, Belts",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80"
  }
];

export { COMPANY_INFO, CONTACT_CONFIG, getWhatsAppUrl, getPhoneUrl, getEmailUrl, getGoogleImagesUrl } from './config';

export interface CataloguePDF {
  id: string;
  driveId: string;
  title: string;
  subtitle: string;
  description: string;
  driveUrl: string;
  embedUrl: string;
  badge: string;
}

export const CATALOGUE_PDFS: CataloguePDF[] = [
  {
    id: "catalog-vol-1",
    driveId: "1WIKS1PzZvSD516v0F-gXoanjqnRVLdMo",
    title: "Parts Catalogue - Volume 1",
    subtitle: "Commercial Vehicle Parts & Assemblies",
    description: "Comprehensive listing of OE replacement parts, electrical units, fasteners, and standard hardware.",
    driveUrl: "https://drive.google.com/file/d/16K9oVpddP2FPQsPsnDBwmSlcDr7JY1Ht/view?usp=sharing",
    embedUrl: "https://drive.google.com/file/d/16K9oVpddP2FPQsPsnDBwmSlcDr7JY1Ht/preview",
    badge: "Volume 01"
  },
  {
    id: "catalog-vol-2",
    driveId: "1u-HuUif5fMVgOwxOQTYZmCemq7vos3Ha",
    title: "Parts Catalogue - Volume 2",
    subtitle: "Heavy Duty Suspension & Mechanical Systems",
    description: "Specifications for brake systems, air bellows, booster fittings, hub assemblies, and bearings.",
    driveUrl: "https://drive.google.com/file/d/1cLGhhVIpIXWt0WCTQqmEcjZE-k5fcDV-/view?usp=sharing",
    embedUrl: "https://drive.google.com/file/d/1cLGhhVIpIXWt0WCTQqmEcjZE-k5fcDV-/preview",
    badge: "Volume 02"
  }
];

export const CATALOGUE_VOL_3: CataloguePDF = {
  id: "catalog-vol-3",
  driveId: "1W_YSPM9yMTCTAtnUd_HnydEpIGXFd7f3",
  title: "Parts Catalogue - Volume 3",
  subtitle: "Engine Filtration, Fluids & Maintenance",
  description: "Detailed catalog of oil/fuel/air filtration, lubricants, workshop tools, and safety accessories.",
  driveUrl: "https://drive.google.com/file/d/1W_YSPM9yMTCTAtnUd_HnydEpIGXFd7f3/view?usp=sharing",
  embedUrl: "https://drive.google.com/file/d/1W_YSPM9yMTCTAtnUd_HnydEpIGXFd7f3/preview",
  badge: "Volume 03"
};
