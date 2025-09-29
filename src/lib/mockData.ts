export interface ExtractedService {
  id: string;
  invoiceNumber: string;
  treatmentDate: string;
  serviceNameArabic: string;
  serviceNameEnglish: string;
  grossAmount: number;
  confidence: number;
  needsReview: boolean;
}

export interface IdCardData {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
}

export interface MockDocument {
  id: string;
  pageNumber: number;
  type: 'invoice' | 'prescription' | 'discharge-summary' | 'id-card' | 'claim-form';
  classification: 'relevant' | 'ignored';
  confidence: number;
  thumbnail: string;
}

export const mockExtractedServices: ExtractedService[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    treatmentDate: '2025-01-15',
    serviceNameArabic: 'فحص طبي شامل',
    serviceNameEnglish: 'Comprehensive Medical Examination',
    grossAmount: 350.00,
    confidence: 95,
    needsReview: false,
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-001',
    treatmentDate: '2025-01-15',
    serviceNameArabic: 'تحليل دم كامل',
    serviceNameEnglish: 'Complete Blood Count (CBC)',
    grossAmount: 120.00,
    confidence: 88,
    needsReview: true,
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-002',
    treatmentDate: '2025-01-18',
    serviceNameArabic: 'أشعة سينية على الصدر',
    serviceNameEnglish: 'Chest X-Ray',
    grossAmount: 200.00,
    confidence: 92,
    needsReview: false,
  },
];

export const mockIdCardData: IdCardData = {
  fullName: 'أحمد محمد العلي',
  idNumber: '1234567890',
  dateOfBirth: '1985-03-15',
};

export const mockClaimData = {
  claimNumber: '05202501168',
  patientName: 'أحمد محمد العلي',
  patientNameEnglish: 'Ahmed Mohammed Al-Ali',
  idNumber: '1234567890',
  totalServices: 3,
  totalAmount: 670.00,
};

export const mockDocuments: MockDocument[] = [
  {
    id: '1',
    pageNumber: 1,
    type: 'invoice',
    classification: 'relevant',
    confidence: 95,
    thumbnail: '/api/placeholder/150/200',
  },
  {
    id: '2',
    pageNumber: 2,
    type: 'invoice',
    classification: 'relevant',
    confidence: 92,
    thumbnail: '/api/placeholder/150/200',
  },
  {
    id: '3',
    pageNumber: 3,
    type: 'prescription',
    classification: 'ignored',
    confidence: 88,
    thumbnail: '/api/placeholder/150/200',
  },
  {
    id: '4',
    pageNumber: 4,
    type: 'discharge-summary',
    classification: 'ignored',
    confidence: 90,
    thumbnail: '/api/placeholder/150/200',
  },
  {
    id: '5',
    pageNumber: 5,
    type: 'claim-form',
    classification: 'ignored',
    confidence: 85,
    thumbnail: '/api/placeholder/150/200',
  },
];