// ============================================================================
// EXPIRYGUARD — SMART EXPIRY & HOUSEHOLD WASTE PREVENTION DATA CORE
// Pre-loaded realistic Indian household grocery, medicine & dairy inventory
// ============================================================================

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '📦' },
  { id: 'dairy', name: 'Dairy & Milk', icon: '🥛', defaultShelfDays: 3 },
  { id: 'medicines', name: 'Medicines & First-Aid', icon: '💊', defaultShelfDays: 365, isMedical: true },
  { id: 'packaged', name: 'Packaged Food & Snacks', icon: '🍞', defaultShelfDays: 7 },
  { id: 'groceries', name: 'Pantry Groceries & Grains', icon: '🌾', defaultShelfDays: 180 },
  { id: 'cosmetics', name: 'Personal Care & Cosmetics', icon: '🧴', defaultShelfDays: 730 },
  { id: 'household', name: 'Household & Cleaning', icon: '🧼', defaultShelfDays: 365 }
];

export const POPULAR_BRANDS = [
  { name: 'Amul', category: 'dairy' },
  { name: 'Mother Dairy', category: 'dairy' },
  { name: 'Nandini', category: 'dairy' },
  { name: 'Britannia', category: 'packaged' },
  { name: 'Parle', category: 'packaged' },
  { name: 'Nestlé', category: 'packaged' },
  { name: 'Tata Sampann', category: 'groceries' },
  { name: 'Aashirvaad', category: 'groceries' },
  { name: 'Dolo 650 (Micro Labs)', category: 'medicines' },
  { name: 'Crocin (GSK)', category: 'medicines' },
  { name: 'Cipla', category: 'medicines' },
  { name: 'Sun Pharma', category: 'medicines' },
  { name: 'Dabur', category: 'groceries' },
  { name: 'Himalaya', category: 'cosmetics' },
  { name: 'Dettol', category: 'household' },
  { name: 'Nivea', category: 'cosmetics' }
];

// Calculate date offset from today for deterministic demo
function getDateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export const INITIAL_PRODUCTS = [
  {
    id: 'exp-1',
    name: 'Amul Taaza Toned Milk (1 Litre)',
    brand: 'Amul',
    category: 'dairy',
    location: 'Fridge',
    mfgDate: getDateOffset(-2),
    expiryDate: getDateOffset(2),
    quantity: '1 Packet',
    price: 54,
    status: 'expiring_soon',
    confidence: 'high',
    notes: 'Keep chilled. Use before tomorrow morning tea.',
    scannedVia: 'photo_ocr',
    addedBy: 'You'
  },
  {
    id: 'exp-2',
    name: 'Britannia Whole Wheat Bread',
    brand: 'Britannia',
    category: 'packaged',
    location: 'Pantry Counter',
    mfgDate: getDateOffset(-4),
    expiryDate: getDateOffset(1),
    quantity: '1 Loaf (400g)',
    price: 45,
    status: 'expiring_soon',
    confidence: 'high',
    notes: 'Make toast or sandwiches tonight!',
    scannedVia: 'photo_ocr',
    addedBy: 'Priya'
  },
  {
    id: 'exp-3',
    name: 'Crocin Cold & Flu (10 Tablets)',
    brand: 'Crocin (GSK)',
    category: 'medicines',
    location: 'Medicine Box',
    mfgDate: getDateOffset(-730),
    expiryDate: getDateOffset(-3), // Expired!
    quantity: '1 Strip (6 left)',
    price: 65,
    status: 'expired',
    confidence: 'high',
    notes: '⚠️ EXPIRED MEDICINE: Never consume! Discard safely.',
    scannedVia: 'photo_ocr',
    addedBy: 'Dad'
  },
  {
    id: 'exp-4',
    name: 'Mother Dairy Fresh Paneer',
    brand: 'Mother Dairy',
    category: 'dairy',
    location: 'Fridge',
    mfgDate: getDateOffset(-3),
    expiryDate: getDateOffset(3),
    quantity: '200g Pack',
    price: 95,
    status: 'expiring_soon',
    confidence: 'high',
    notes: 'Make Paneer Bhurji or Matar Paneer for dinner.',
    scannedVia: 'manual',
    addedBy: 'Priya'
  },
  {
    id: 'exp-5',
    name: 'Dolo 650mg Paracetamol Tablets',
    brand: 'Dolo 650 (Micro Labs)',
    category: 'medicines',
    location: 'Medicine Box',
    mfgDate: getDateOffset(-180),
    expiryDate: getDateOffset(185),
    quantity: '15 Tablets',
    price: 32,
    status: 'safe',
    confidence: 'high',
    notes: 'Fever and body pain relief. Safe for 6 more months.',
    scannedVia: 'voice',
    addedBy: 'You'
  },
  {
    id: 'exp-6',
    name: 'Tata Sampann Unpolished Toor Dal',
    brand: 'Tata Sampann',
    category: 'groceries',
    location: 'Kitchen Pantry',
    mfgDate: getDateOffset(-60),
    expiryDate: getDateOffset(300),
    quantity: '1 kg Bag',
    price: 175,
    status: 'safe',
    confidence: 'high',
    notes: 'Stored in air-tight stainless steel container.',
    scannedVia: 'manual',
    addedBy: 'You'
  },
  {
    id: 'exp-7',
    name: 'Yakult Probiotic Fermented Drink',
    brand: 'Yakult',
    category: 'dairy',
    location: 'Fridge Door',
    mfgDate: getDateOffset(-35),
    expiryDate: getDateOffset(-1), // Expired
    quantity: '5 Bottles Pack',
    price: 80,
    status: 'expired',
    confidence: 'high',
    notes: 'Past expiry. Fermented taste may sour.',
    scannedVia: 'photo_ocr',
    addedBy: 'Rohit'
  },
  {
    id: 'exp-8',
    name: 'Azithromycin 500mg Tablets',
    brand: 'Cipla',
    category: 'medicines',
    location: 'Medicine Box',
    mfgDate: getDateOffset(-120),
    expiryDate: getDateOffset(5),
    quantity: '3 Tablets',
    price: 110,
    status: 'expiring_soon',
    confidence: 'high',
    notes: 'Doctor prescription antibiotic. Check with doctor before taking.',
    scannedVia: 'photo_ocr',
    addedBy: 'You'
  },
  {
    id: 'exp-9',
    name: 'Aashirvaad Shudh Chakki Atta',
    brand: 'Aashirvaad',
    category: 'groceries',
    location: 'Pantry Drum',
    mfgDate: getDateOffset(-30),
    expiryDate: getDateOffset(60),
    quantity: '5 kg Bag',
    price: 245,
    status: 'safe',
    confidence: 'high',
    notes: 'Freshly milled whole wheat.',
    scannedVia: 'manual',
    addedBy: 'Dad'
  },
  {
    id: 'exp-10',
    name: 'Maggi 2-Minute Masala Noodles',
    brand: 'Nestlé',
    category: 'packaged',
    location: 'Snacks Drawer',
    mfgDate: getDateOffset(-45),
    expiryDate: getDateOffset(135),
    quantity: '4-Pack',
    price: 56,
    status: 'safe',
    confidence: 'high',
    notes: 'Quick snack for kids.',
    scannedVia: 'voice',
    addedBy: 'Rohit'
  },
  {
    id: 'exp-11',
    name: 'Nivea Soft Light Moisturizer',
    brand: 'Nivea',
    category: 'cosmetics',
    location: 'Bathroom Shelf',
    mfgDate: getDateOffset(-90),
    expiryDate: '', // Unverified date demo
    quantity: '100ml Tub',
    price: 199,
    status: 'unverified',
    confidence: 'uncertain',
    notes: 'Date label blurred. Please verify physically.',
    scannedVia: 'photo_ocr',
    addedBy: 'Priya'
  },
  {
    id: 'exp-12',
    name: 'Dabur 100% Pure Honey',
    brand: 'Dabur',
    category: 'groceries',
    location: 'Kitchen Shelf',
    mfgDate: getDateOffset(-90),
    expiryDate: getDateOffset(450),
    quantity: '500g Bottle',
    price: 215,
    status: 'safe',
    confidence: 'high',
    notes: 'Keep in warm place. Does not easily spoil.',
    scannedVia: 'manual',
    addedBy: 'You'
  }
];

// Sample photo scan presets for immediate testing
export const SCANNER_DEMO_PRESETS = [
  {
    id: 'preset-amul',
    title: 'Amul Taaza Milk Pouch (Clear Date)',
    category: 'dairy',
    brand: 'Amul',
    previewImg: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    detectedText: 'AMUL TAAZA TONED MILK\nMFG: ' + getDateOffset(-2) + '\nUSE BY: ' + getDateOffset(2) + '\nNET: 1000ml\nMRP: Rs 54',
    extracted: {
      name: 'Amul Taaza Toned Milk (1 Litre)',
      brand: 'Amul',
      category: 'dairy',
      mfgDate: getDateOffset(-2),
      expiryDate: getDateOffset(2),
      price: 54,
      quantity: '1 Litre',
      confidence: 'high'
    }
  },
  {
    id: 'preset-dolo',
    title: 'Dolo 650 Tablet Strip (Clear Expiry)',
    category: 'medicines',
    brand: 'Dolo 650 (Micro Labs)',
    previewImg: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    detectedText: 'DOLO-650 Paracetamol IP 650mg\nBATCH: DL-9402\nMFG DATE: ' + getDateOffset(-180) + '\nEXP DATE: ' + getDateOffset(180) + '\nMRP Rs 32.00',
    extracted: {
      name: 'Dolo 650mg Paracetamol Strip',
      brand: 'Dolo 650 (Micro Labs)',
      category: 'medicines',
      mfgDate: getDateOffset(-180),
      expiryDate: getDateOffset(180),
      price: 32,
      quantity: '15 Tablets',
      confidence: 'high'
    }
  },
  {
    id: 'preset-bread',
    title: 'Britannia Bread (Expiring Tomorrow)',
    category: 'packaged',
    brand: 'Britannia',
    previewImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    detectedText: 'BRITANNIA 100% WHOLE WHEAT\nBEST BEFORE 5 DAYS FROM PKG\nPKG DATE: ' + getDateOffset(-4) + '\nEXPIRY: ' + getDateOffset(1) + '\nPRICE: Rs 45',
    extracted: {
      name: 'Britannia Whole Wheat Bread 400g',
      brand: 'Britannia',
      category: 'packaged',
      mfgDate: getDateOffset(-4),
      expiryDate: getDateOffset(1),
      price: 45,
      quantity: '400g Pack',
      confidence: 'high'
    }
  },
  {
    id: 'preset-blurry',
    title: 'Blurry Cough Syrup Bottle (Triggers Recovery Guide)',
    category: 'medicines',
    brand: 'Cipla',
    previewImg: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
    detectedText: 'CIPLA COUGH SYRUP 100ML\nEXP: ??/??/202? (DATE BLURRED BY GLARE)\nBATCH: UNREADABLE',
    isUnclear: true,
    extracted: {
      name: 'Cipla Cough Syrup 100ml',
      brand: 'Cipla',
      category: 'medicines',
      mfgDate: '',
      expiryDate: '',
      price: 90,
      quantity: '100ml Bottle',
      confidence: 'uncertain'
    }
  }
];

export const FAMILY_MEMBERS = [
  { id: 'fm-1', name: 'You', role: 'Admin', avatar: '👨‍💼', itemsAdded: 8, tasksDone: 14 },
  { id: 'fm-2', name: 'Priya', role: 'Contributor', avatar: '👩‍⚕️', itemsAdded: 5, tasksDone: 9 },
  { id: 'fm-3', name: 'Dad', role: 'Senior User', avatar: '👴', itemsAdded: 2, tasksDone: 6 },
  { id: 'fm-4', name: 'Rohit', role: 'View-Only', avatar: '👦', itemsAdded: 1, tasksDone: 2 }
];

export const SAMPLE_ACTIVITY_LOG = [
  { id: 'act-1', text: 'Dad marked Amul Taaza Milk as Used for tea', time: '10 mins ago', type: 'used' },
  { id: 'act-2', text: 'Priya scanned Britannia Bread (expires tomorrow)', time: '2 hours ago', type: 'scan' },
  { id: 'act-3', text: 'You discarded expired Crocin Tablets safely', time: 'Yesterday', type: 'discard' },
  { id: 'act-4', text: 'Rohit added Maggi Noodles via Voice Assistant', time: '2 days ago', type: 'voice' }
];

// Helper to determine status and days remaining
export function computeProductStatus(expiryDate) {
  if (!expiryDate) return { status: 'unverified', daysRemaining: null };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expiryDate);
  exp.setHours(0, 0, 0, 0);
  
  const diffTime = exp.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { status: 'expired', daysRemaining: diffDays };
  if (diffDays <= 7) return { status: 'expiring_soon', daysRemaining: diffDays };
  return { status: 'safe', daysRemaining: diffDays };
}

// LocalStorage Persistence Helpers
const STORAGE_KEY = 'expiryguard_inventory_data_v1';

export function loadStoredInventory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(item => {
          const comp = computeProductStatus(item.expiryDate);
          return { ...item, status: comp.status, daysRemaining: comp.daysRemaining };
        });
      }
    }
  } catch (err) {
    console.warn('Storage read error:', err);
  }
  return INITIAL_PRODUCTS.map(item => {
    const comp = computeProductStatus(item.expiryDate);
    return { ...item, status: comp.status, daysRemaining: comp.daysRemaining };
  });
}

export function saveInventoryToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('Storage write error:', err);
  }
}
