import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProcessingStages from "./ProcessingStages";
import DocumentClassifier from "./DocumentClassifier";
import ExtractedDataTable from "./ExtractedDataTable";
import { mockClaimData, mockExtractedServices } from "@/lib/mockData";

interface ClaimProcessorWithNumberProps {
  onBack: () => void;
}

type ProcessingStage = 'upload' | 'scanning' | 'classifying' | 'ocr' | 'verifying' | 'extracting' | 'completed';

const ClaimProcessorWithNumber = ({ onBack }: ClaimProcessorWithNumberProps) => {
  const [currentStage, setCurrentStage] = useState<ProcessingStage>('upload');
  const [claimNumber, setClaimNumber] = useState('05202501168');
  const [fileName] = useState('05202501168.pdf');
  const [extractedData, setExtractedData] = useState(mockExtractedServices);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const startProcessing = () => {
    setIsProcessing(true);
    setCurrentStage('scanning');
    
    // Simulate processing stages
    setTimeout(() => setCurrentStage('classifying'), 1500);
    setTimeout(() => setCurrentStage('ocr'), 3000);
    setTimeout(() => setCurrentStage('verifying'), 5000);
    setTimeout(() => setCurrentStage('extracting'), 6500);
    setTimeout(() => {
      setCurrentStage('completed');
      setShowResults(true);
      setIsProcessing(false);
    }, 8000);
  };

  const handleConfirmAndInsert = () => {
    // Simulate successful insertion
    alert(`Successfully inserted ${extractedData.length} services to Claim No. ${claimNumber}`);
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
              Process Claim With Existing Number
            </h1>
            <p className="text-muted-foreground mt-1">
              OCR extraction and verification for claim {claimNumber}
            </p>
          </div>
        </div>

        {/* Claim Number Input */}
        {currentStage === 'upload' && (
          <Card className="enterprise-card mb-8 fade-in">
            <CardHeader>
              <CardTitle>Enter Claim Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="claimNumber">Claim Number</Label>
                  <Input
                    id="claimNumber"
                    value={claimNumber}
                    onChange={(e) => setClaimNumber(e.target.value)}
                    placeholder="Enter existing claim number"
                  />
                </div>
                <div>
                  <Label>Document File</Label>
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium">{fileName}</span>
                    <Badge variant="outline" className="ml-auto">PDF</Badge>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={startProcessing} 
                className="w-full" 
                size="lg"
                disabled={!claimNumber}
              >
                Start Processing Document
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Processing Stages */}
        {isProcessing && (
          <ProcessingStages 
            currentStage={currentStage} 
            fileName={fileName}
          />
        )}

        {/* Document Classification Results */}
        {(currentStage === 'completed' || showResults) && (
          <div className="space-y-8 fade-in">
            <DocumentClassifier />
            
            {/* Extracted Data Table */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-completed/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-completed rounded-sm"></div>
                  </div>
                  Extracted Invoice Data
                </CardTitle>
                <p className="text-muted-foreground">
                  Review and edit the extracted information before inserting to system
                </p>
              </CardHeader>
              <CardContent>
                <ExtractedDataTable 
                  data={extractedData}
                  onDataChange={setExtractedData}
                  claimNumber={claimNumber}
                />
                
                <div className="mt-6 flex gap-4">
                  <Button onClick={handleConfirmAndInsert} size="lg" className="flex-1">
                    Confirm & Insert to System
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

export default ClaimProcessorWithNumber;