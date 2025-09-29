import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClaimProcessorWithNumber from "@/components/ClaimProcessorWithNumber";
import ClaimProcessorWithoutNumber from "@/components/ClaimProcessorWithoutNumber";

const Index = () => {
  const [activeFlow, setActiveFlow] = useState<'dashboard' | 'with-number' | 'without-number'>('dashboard');

  if (activeFlow === 'with-number') {
    return <ClaimProcessorWithNumber onBack={() => setActiveFlow('dashboard')} />;
  }

  if (activeFlow === 'without-number') {
    return <ClaimProcessorWithoutNumber onBack={() => setActiveFlow('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            AI-Powered Health Insurance Claim Automation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Intelligent processing of scanned health insurance claims using OCR-first extraction 
            and AI fallback technology for Arabic and English documents
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Process With Claim Number */}
          <Card className="enterprise-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-sm"></div>
                </div>
                Process Claim With Claim Number
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Primary workflow for processing scanned invoices when a claim number already exists in the system.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-processing"></div>
                  <span>Automated OCR scanning (Arabic + English)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-processing"></div>
                  <span>Document classification and verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-processing"></div>
                  <span>Inline editing and service insertion</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={() => setActiveFlow('with-number')}
              >
                Start Processing
              </Button>
            </CardContent>
          </Card>

          {/* Scan Without Claim Number */}
          <Card className="enterprise-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <div className="w-6 h-6 bg-warning rounded-sm"></div>
                </div>
                Scan Claim Without Claim Number
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Automated claim creation from ID card scanning with intelligent document processing.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span>ID card detection and extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span>Database verification and claim generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span>Seamless transition to invoice processing</span>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                className="w-full mt-6" 
                size="lg"
                onClick={() => setActiveFlow('without-number')}
              >
                Start ID Scan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-completed/10 flex items-center justify-center">
              <div className="w-8 h-8 bg-completed rounded-sm"></div>
            </div>
            <h3 className="font-semibold mb-2">Multilingual OCR</h3>
            <p className="text-sm text-muted-foreground">
              Advanced Arabic and English text recognition with high accuracy
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-sm"></div>
            </div>
            <h3 className="font-semibold mb-2">Smart Classification</h3>
            <p className="text-sm text-muted-foreground">
              Automatic document type detection and relevance tagging
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-warning/10 flex items-center justify-center">
              <div className="w-8 h-8 bg-warning rounded-sm"></div>
            </div>
            <h3 className="font-semibold mb-2">Manual Override</h3>
            <p className="text-sm text-muted-foreground">
              Inline editing and manual service addition when needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;