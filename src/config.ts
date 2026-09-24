/**
 * Application & Company Business Configuration
 * Centralized business constants and contact information.
 */

export const COMPANY_INFO = {
  name: "MOHAMMED AMIN AUTOMOTIVE PARTS SHOP L.L.C.",
  shortName: "MAPS",
  trn: "100223789000003",
  address: "Musaffah - M/5, Building No - 64, Al Mazj Street 1, Abu Dhabi - U.A.E.",
  pobox: "P.O. Box: 91199",
  established: "1992",
  founder: "Mohammed Shahjahan",
  chairman: "Mohammed Shahjahan",
  
  // Showroom
  showroomPhone: "02 555 3297, 02 677 1357",
  showroomMobile: "+971 50 752 0168, +971 58 192 6848",
  
  // Warehouse
  warehousePhone: "02 245 8661",
  warehouseMobile: "+971 58 873 9722",
  
  // Executive
  chairmanMobile: "+971 50 419 5043",
  
  // Email
  email: "maapsuae@gmail.com, mohammadshahjahanpersonal@gmail.com"
};

export const CONTACT_CONFIG = {
  company: COMPANY_INFO,
  showroom: {
    phones: ["02 555 3297", "02 677 1357"],
    primaryPhone: "02 555 3297",
    primaryPhoneRaw: "025553297",
    mobiles: ["+971 50 752 0168", "+971 58 192 6848"],
    primaryWhatsAppNumber: "971507520168",
    primaryWhatsAppDisplay: "+971 50 752 0168"
  },
  warehouse: {
    phone: "02 245 8661",
    phoneRaw: "022458661",
    mobile: "+971 58 873 9722",
    whatsAppNumber: "971588739722"
  },
  chairman: {
    mobile: "+971 50 419 5043",
    mobileRaw: "+971504195043",
    whatsAppNumber: "971504195043"
  },
  management: {
    mobile: "+971 50 419 5043",
    mobileRaw: "+971504195043",
    whatsAppNumber: "971504195043"
  },
  emails: {
    all: ["maapsuae@gmail.com", "mohammadshahjahanpersonal@gmail.com"],
    primary: "maapsuae@gmail.com"
  }
};

/**
 * Generate a clean WhatsApp chat URL with optional pre-filled message
 */
export function getWhatsAppUrl(
  message?: string,
  targetOrDepartment: 'showroom' | 'warehouse' | 'chairman' | 'management' | string = 'showroom',
  overrideNumber?: string
): string {
  let targetNumber = overrideNumber;
  
  if (!targetNumber) {
    if (targetOrDepartment === 'warehouse') {
      targetNumber = CONTACT_CONFIG.warehouse.whatsAppNumber;
    } else if (targetOrDepartment === 'chairman' || targetOrDepartment === 'management') {
      targetNumber = CONTACT_CONFIG.chairman.whatsAppNumber;
    } else if (targetOrDepartment === 'showroom') {
      targetNumber = CONTACT_CONFIG.showroom.primaryWhatsAppNumber;
    } else if (typeof targetOrDepartment === 'string' && targetOrDepartment.length > 0) {
      // Direct phone number passed as second parameter
      targetNumber = targetOrDepartment;
    } else {
      targetNumber = CONTACT_CONFIG.showroom.primaryWhatsAppNumber;
    }
  }

  const cleanNumber = targetNumber.replace(/\D/g, '');
  if (!message) {
    return `https://wa.me/${cleanNumber}`;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a clean tel: URL
 */
export function getPhoneUrl(phone?: string): string {
  const target = phone || CONTACT_CONFIG.showroom.primaryPhone;
  return `tel:${target.replace(/\s+/g, '')}`;
}

/**
 * Generate a clean mailto: URL
 */
export function getEmailUrl(email?: string): string {
  const target = email || CONTACT_CONFIG.emails.primary;
  return `mailto:${target.trim()}`;
}

/**
 * Generate Google Image Search URL for a specific OE part
 */
export function getGoogleImagesUrl(partNumber: string, descriptions: string[] = []): string {
  const primaryDesc = descriptions[0] || '';
  const searchTerms = [partNumber, primaryDesc, 'truck part', 'auto'].filter(Boolean).join(' ');
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchTerms)}`;
}
