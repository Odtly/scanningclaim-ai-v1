import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDocuments } from "@/lib/mockData";

const DocumentClassifier = () => {
  const relevantDocs = mockDocuments.filter(doc => doc.classification === 'relevant');
  const ignoredDocs = mockDocuments.filter(doc => doc.classification === 'ignored');

  const getTypeLabel = (type: string) => {
    const labels = {
      'invoice': 'Invoice',
      'prescription': 'Prescription',
      'discharge-summary': 'Discharge Summary',
      'id-card': 'ID Card',
      'claim-form': 'Claim Form',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string, classification: string) => {
    if (classification === 'ignored') return 'secondary';
    
    switch (type) {
      case 'invoice': return 'default';
      case 'id-card': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Card className="enterprise-card slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-sm"></div>
          </div>
          Document Classification Results
        </CardTitle>
        <p className="text-muted-foreground">
          Automatically classified {mockDocuments.length} pages - {relevantDocs.length} relevant, {ignoredDocs.length} ignored
        </p>
      </CardHeader>
      <CardContent>
        {/* Relevant Documents */}
        <div className="mb-8">
          <h3 className="font-semibold text-completed mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-completed rounded-full"></div>
            Relevant Documents ({relevantDocs.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relevantDocs.map((doc) => (
              <div
                key={doc.id}
                className="group relative border-2 border-completed/30 rounded-lg p-3 hover:border-completed/60 transition-all cursor-pointer"
              >
                <div className="aspect-[3/4] bg-muted rounded mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/20"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-xs font-mono text-primary bg-background/90 rounded px-1">
                      Page {doc.pageNumber}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="text-xs bg-completed/20 text-completed border-completed/30">
                      {doc.confidence}%
                    </Badge>
                  </div>
                </div>
                <div className="text-center">
                  <Badge variant={getTypeColor(doc.type, doc.classification)} className="text-xs">
                    {getTypeLabel(doc.type)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ignored Documents */}
        <div>
          <h3 className="font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
            Ignored Documents ({ignoredDocs.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ignoredDocs.map((doc) => (
              <div
                key={doc.id}
                className="group relative border border-muted rounded-lg p-3 opacity-60 hover:opacity-80 transition-all cursor-pointer"
              >
                <div className="aspect-[3/4] bg-muted/50 rounded mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-muted-foreground/10 to-muted-foreground/20"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-xs font-mono text-muted-foreground bg-background/90 rounded px-1">
                      Page {doc.pageNumber}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="text-xs">
                      {doc.confidence}%
                    </Badge>
                  </div>
                  {/* Ignored overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge variant="secondary" className="text-xs">
                      Ignored
                    </Badge>
                  </div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="text-xs">
                    {getTypeLabel(doc.type)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Button variant="outline" size="sm">
            Reclassify Documents
          </Button>
          <Button variant="outline" size="sm">
            View All Pages
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentClassifier;