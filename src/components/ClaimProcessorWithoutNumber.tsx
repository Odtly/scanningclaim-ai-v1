import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ProcessingStages from "./ProcessingStages";
import DocumentClassifier from "./DocumentClassifier";
import ExtractedDataTable from "./ExtractedDataTable";
import { mockExtractedServices, mockIdCardData } from "@/lib/mockData";

interface ClaimProcessorWithoutNumberProps {
  onBack: () => void;
}

type ProcessingStage = 'upload' | 'scanning' | 'id-detection' | 'id-extraction' | 'database-check' | 'claim-generation' | 'classifying' | 'ocr' | 'completed';

const ClaimProcessorWithoutNumber = ({ onBack }: ClaimProcessorWithoutNumberProps) => {
  const [currentStage, setCurrentStage] = useState<ProcessingStage>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showIdForm, setShowIdForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedClaimNumber] = useState('05202501169');
  const [idData, setIdData] = useState(mockIdCardData);
  const [extractedData, setExtractedData] = useState(mockExtractedServices);
  const [idVerificationStatus, setIdVerificationStatus] = useState<'found' | 'not-found' | 'unreadable'>('found');

  const startProcessing = () => {
    setIsProcessing(true);
    setCurrentStage('scanning');
    
    // Simulate processing stages
    setTimeout(() => setCurrentStage('id-detection'), 1500);
    setTimeout(() => setCurrentStage('id-extraction'), 2500);
    setTimeout(() => setCurrentStage('database-check'), 4000);
    
    // Simulate different ID verification outcomes
    setTimeout(() => {
      const outcomes = ['found', 'not-found', 'unreadable'] as const;
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      setIdVerificationStatus(randomOutcome);
      
      if (randomOutcome === 'found') {
        setCurrentStage('claim-generation');
        setTimeout(() => setCurrentStage('classifying'), 6000);
        setTimeout(() => setCurrentStage('ocr'), 7500);
        setTimeout(() => {
          setCurrentStage('completed');
          setShowResults(true);
          setIsProcessing(false);
        }, 9000);
      } else {
        setIsProcessing(false);
        setShowIdForm(true);
      }
    }, 5000);
  };

  const handleManualIdSubmit = () => {
    setShowIdForm(false);
    setIsProcessing(true);
    setCurrentStage('claim-generation');
    
    setTimeout(() => setCurrentStage('classifying'), 1500);
    setTimeout(() => setCurrentStage('ocr'), 3000);
    setTimeout(() => {
      setCurrentStage('completed');
      setShowResults(true);
      setIsProcessing(false);
    }, 4500);
  };

  const handleConfirmAndInsert = () => {
    alert(`Successfully created Claim No. ${generatedClaimNumber} and inserted ${extractedData.length} services`);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Scan Claim Without Claim Number
            </h1>
            <p className="text-muted-foreground mt-1">
              Automated claim creation from ID card scanning
            </p>
          </div>
        </div>

        {/* Initial Upload */}
        {currentStage === 'upload' && (
          <Card className="enterprise-card mb-8 fade-in">
            <CardHeader>
              <CardTitle>Upload Document with ID Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-warning/10 flex items-center justify-center">
                  <div className="w-8 h-8 bg-warning rounded-sm"></div>
                </div>
                <h3 className="font-semibold mb-2">Ready to Scan</h3>
                <p className="text-muted-foreground mb-4">
                  Document should start with ID card followed by medical invoices
                </p>
                <div className="flex items-center gap-2 justify-center mb-4">
                  <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                  </div>
                  <span className="text-sm font-medium">mixed_documents_with_id.pdf</span>
                  <Badge variant="outline">PDF</Badge>
                </div>
              </div>
              
              <Button 
                onClick={startProcessing} 
                className="w-full" 
                size="lg"
              >
                Start ID Card Detection & Processing
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Processing Stages for ID workflow */}
        {isProcessing && (
          <ProcessingStages 
            currentStage={currentStage} 
            fileName="mixed_documents_with_id.pdf"
            isIdWorkflow={true}
          />
        )}

        {/* ID Verification Results */}
        {idVerificationStatus !== 'found' && showIdForm && (
          <Card className="enterprise-card mb-8 fade-in">
            <CardHeader>
              <CardTitle className="text-warning">
                {idVerificationStatus === 'not-found' ? 'ID Not Found in Database' : 'ID Card Not Readable'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {idVerificationStatus === 'not-found' 
                  ? 'The extracted ID number was not found in our database. Please enter the information manually.'
                  : 'Unable to read the ID card clearly. Please enter the information manually.'
                }
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name (Arabic)</Label>
                  <Input
                    id="fullName"
                    value={idData.fullName}
                    onChange={(e) => setIdData({...idData, fullName: e.target.value})}
                    className="rtl-text"
                    placeholder="الاسم الكامل"
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    value={idData.idNumber}
                    onChange={(e) => setIdData({...idData, idNumber: e.target.value})}
                    placeholder="Enter ID number"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={idData.dateOfBirth}
                    onChange={(e) => setIdData({...idData, dateOfBirth: e.target.value})}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleManualIdSubmit} 
                className="w-full" 
                size="lg"
              >
                Create Claim & Continue Processing
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Success - Generated Claim Number */}
        {currentStage === 'claim-generation' && (
          <Card className="enterprise-card mb-8 fade-in">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-completed/10 flex items-center justify-center">
                  <div className="w-8 h-8 bg-completed rounded-sm"></div>
                </div>
                <Badge className="bg-completed text-completed-foreground mb-4">
                  Claim Generated Successfully
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Claim No. {generatedClaimNumber}</h3>
                <p className="text-muted-foreground">
                  Proceeding to invoice extraction and processing...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Final Results */}
        {(currentStage === 'completed' || showResults) && (
          <div className="space-y-8 fade-in">
            <DocumentClassifier />
            
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-completed/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-completed rounded-sm"></div>
                  </div>
                  New Claim: {generatedClaimNumber}
                </CardTitle>
                <p className="text-muted-foreground">
                  Review extracted data for the newly created claim
                </p>
              </CardHeader>
              <CardContent>
                <ExtractedDataTable 
                  data={extractedData}
                  onDataChange={setExtractedData}
                  claimNumber={generatedClaimNumber}
                />
                
                <div className="mt-6 flex gap-4">
                  <Button onClick={handleConfirmAndInsert} size="lg" className="flex-1">
                    Confirm & Create Claim
                  </Button>
                  <Button variant="outline" size="lg">
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimProcessorWithoutNumber;