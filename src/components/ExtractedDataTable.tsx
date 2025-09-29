import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExtractedService } from "@/lib/mockData";

interface ExtractedDataTableProps {
  data: ExtractedService[];
  onDataChange: (data: ExtractedService[]) => void;
  claimNumber: string;
}

const ExtractedDataTable = ({ data, onDataChange, claimNumber }: ExtractedDataTableProps) => {
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    invoiceNumber: '',
    treatmentDate: '',
    serviceNameArabic: '',
    serviceNameEnglish: '',
    grossAmount: '',
  });

  const updateService = (id: string, field: keyof ExtractedService, value: any) => {
    const updatedData = data.map(service => 
      service.id === id ? { ...service, [field]: value, needsReview: false } : service
    );
    onDataChange(updatedData);
  };

  const addNewService = () => {
    const service: ExtractedService = {
      id: Date.now().toString(),
      invoiceNumber: newService.invoiceNumber,
      treatmentDate: newService.treatmentDate,
      serviceNameArabic: newService.serviceNameArabic,
      serviceNameEnglish: newService.serviceNameEnglish,
      grossAmount: parseFloat(newService.grossAmount) || 0,
      confidence: 100, // Manually added, so 100% confidence
      needsReview: false,
    };

    onDataChange([...data, service]);
    setNewService({
      invoiceNumber: '',
      treatmentDate: '',
      serviceNameArabic: '',
      serviceNameEnglish: '',
      grossAmount: '',
    });
    setShowAddForm(false);
  };

  const removeService = (id: string) => {
    const updatedData = data.filter(service => service.id !== id);
    onDataChange(updatedData);
  };

  const totalAmount = data.reduce((sum, service) => sum + service.grossAmount, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-primary">{data.length}</div>
          <div className="text-sm text-muted-foreground">Total Services</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-completed">${totalAmount.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Total Amount</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-warning">{data.filter(s => s.needsReview).length}</div>
          <div className="text-sm text-muted-foreground">Need Review</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-foreground">{claimNumber}</div>
          <div className="text-sm text-muted-foreground">Claim Number</div>
        </Card>
      </div>

      {/* Services Table */}
      <div className="space-y-3">
        {data.map((service, index) => (
          <Card key={service.id} className={`p-4 transition-all ${
            service.needsReview ? 'border-warning/50 bg-warning/5' : 'border-border'
          }`}>
            <div className="flex items-start gap-4">
              {/* Service Number */}
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {index + 1}
              </div>

              {/* Service Details */}
              <div className="flex-1 grid md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Invoice Number</Label>
                    {editingRow === service.id ? (
                      <Input
                        value={service.invoiceNumber}
                        onChange={(e) => updateService(service.id, 'invoiceNumber', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 font-medium">{service.invoiceNumber}</div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-xs text-muted-foreground">Treatment Date</Label>
                    {editingRow === service.id ? (
                      <Input
                        type="date"
                        value={service.treatmentDate}
                        onChange={(e) => updateService(service.id, 'treatmentDate', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1">{new Date(service.treatmentDate).toLocaleDateString()}</div>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Service Name (English)</Label>
                    {editingRow === service.id ? (
                      <Input
                        value={service.serviceNameEnglish}
                        onChange={(e) => updateService(service.id, 'serviceNameEnglish', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1">{service.serviceNameEnglish}</div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Service Name (Arabic)</Label>
                    {editingRow === service.id ? (
                      <Input
                        value={service.serviceNameArabic}
                        onChange={(e) => updateService(service.id, 'serviceNameArabic', e.target.value)}
                        className="mt-1 rtl-text"
                      />
                    ) : (
                      <div className="mt-1 rtl-text">{service.serviceNameArabic}</div>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Gross Amount</Label>
                    {editingRow === service.id ? (
                      <Input
                        type="number"
                        value={service.grossAmount}
                        onChange={(e) => updateService(service.id, 'grossAmount', parseFloat(e.target.value) || 0)}
                        className="mt-1"
                        step="0.01"
                      />
                    ) : (
                      <div className="mt-1 font-semibold text-lg">${service.grossAmount.toFixed(2)}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={service.needsReview ? "destructive" : service.confidence > 90 ? "default" : "secondary"}>
                      {service.confidence}% Confidence
                    </Badge>
                    {service.needsReview && (
                      <Badge variant="outline" className="text-warning">
                        Needs Review
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex flex-col gap-2">
                {editingRow === service.id ? (
                  <Button 
                    size="sm" 
                    onClick={() => setEditingRow(null)}
                    className="text-xs"
                  >
                    Save
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditingRow(service.id)}
                    className="text-xs"
                  >
                    Edit
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeService(service.id)}
                  className="text-xs text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Service */}
      {showAddForm ? (
        <Card className="p-4 border-dashed border-primary/50">
          <h3 className="font-semibold mb-4">Add New Service</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="newInvoiceNumber">Invoice Number</Label>
                <Input
                  id="newInvoiceNumber"
                  value={newService.invoiceNumber}
                  onChange={(e) => setNewService({...newService, invoiceNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="newTreatmentDate">Treatment Date</Label>
                <Input
                  id="newTreatmentDate"
                  type="date"
                  value={newService.treatmentDate}
                  onChange={(e) => setNewService({...newService, treatmentDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="newServiceNameEnglish">Service Name (English)</Label>
                <Input
                  id="newServiceNameEnglish"
                  value={newService.serviceNameEnglish}
                  onChange={(e) => setNewService({...newService, serviceNameEnglish: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newServiceNameArabic">Service Name (Arabic)</Label>
                <Input
                  id="newServiceNameArabic"
                  value={newService.serviceNameArabic}
                  onChange={(e) => setNewService({...newService, serviceNameArabic: e.target.value})}
                  className="rtl-text"
                />
              </div>
              <div>
                <Label htmlFor="newGrossAmount">Gross Amount</Label>
                <Input
                  id="newGrossAmount"
                  type="number"
                  step="0.01"
                  value={newService.grossAmount}
                  onChange={(e) => setNewService({...newService, grossAmount: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button onClick={addNewService}>Add Service</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          onClick={() => setShowAddForm(true)}
          className="w-full border-dashed"
        >
          Add Manual Service Entry
        </Button>
      )}
    </div>
  );
};

export default ExtractedDataTable;