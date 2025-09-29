import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProcessingStagesProps {
  currentStage: string;
  fileName: string;
  isIdWorkflow?: boolean;
}

const ProcessingStages = ({ currentStage, fileName, isIdWorkflow = false }: ProcessingStagesProps) => {
  const standardStages = [
    { id: 'scanning', label: 'Scanning Pages', description: 'Processing document structure' },
    { id: 'classifying', label: 'Classifying Document Types', description: 'Identifying invoices vs other documents' },
    { id: 'ocr', label: 'Running OCR (Arabic + English)', description: 'Extracting text from invoice pages' },
    { id: 'verifying', label: 'Verifying Data', description: 'Cross-checking extracted information' },
    { id: 'extracting', label: 'Inserting Services to System', description: 'Finalizing data extraction' },
  ];

  const idWorkflowStages = [
    { id: 'scanning', label: 'Scanning Pages', description: 'Processing document structure' },
    { id: 'id-detection', label: 'Detecting ID Card', description: 'Locating ID card in document' },
    { id: 'id-extraction', label: 'Extracting ID Number', description: 'Reading ID card information' },
    { id: 'database-check', label: 'Checking Against Database', description: 'Verifying ID in system' },
    { id: 'claim-generation', label: 'Generating New Claim Number', description: 'Creating claim record' },
    { id: 'classifying', label: 'Classifying Document Types', description: 'Processing invoices' },
    { id: 'ocr', label: 'Running OCR (Arabic + English)', description: 'Extracting invoice data' },
  ];

  const stages = isIdWorkflow ? idWorkflowStages : standardStages;
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);
  const progress = ((currentIndex + 1) / stages.length) * 100;

  const getStageStatus = (stageIndex: number) => {
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'processing';
    return 'pending';
  };

  return (
    <Card className="enterprise-card mb-8 fade-in">
      <CardContent className="pt-6">
        {/* File Info */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="w-6 h-6 bg-primary rounded-sm"></div>
            {currentStage === 'scanning' && (
              <div className="scan-line"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold">{fileName}</h3>
            <p className="text-sm text-muted-foreground">Processing document...</p>
          </div>
          <div className="ml-auto">
            <Badge className="animate-pulse-processing">
              Processing
            </Badge>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stage List */}
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const status = getStageStatus(index);
            
            return (
              <div
                key={stage.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  status === 'processing' 
                    ? 'bg-primary/5 border border-primary/20' 
                    : status === 'completed'
                    ? 'bg-completed/5'
                    : 'bg-muted/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'completed'
                    ? 'bg-completed text-completed-foreground'
                    : status === 'processing'
                    ? 'bg-primary text-primary-foreground animate-pulse-processing'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {status === 'completed' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    status === 'processing' ? 'text-primary' : 
                    status === 'completed' ? 'text-completed' : 
                    'text-foreground'
                  }`}>
                    {stage.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
                
                {status === 'processing' && (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingStages;