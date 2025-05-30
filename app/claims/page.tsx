"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  FileCheck, 
  Hourglass, 
  RotateCw, 
  FileX, 
  Search,
  Camera
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion } from '@/lib/motion';

const mockClaims = [
  {
    id: 'CLM001',
    policyNumber: 'POL123456',
    type: 'Health',
    description: 'Hospital admission for appendectomy',
    amount: 95000,
    submittedDate: '2023-12-05',
    status: 'approved',
    documents: [
      'Hospital Discharge Summary',
      'Medical Bills',
      'Doctor Prescription',
      'ID Proof'
    ],
    timeline: [
      { date: '2023-12-05', event: 'Claim Submitted' },
      { date: '2023-12-06', event: 'Claim Under Review' },
      { date: '2023-12-10', event: 'Additional Documents Requested' },
      { date: '2023-12-12', event: 'Documents Received' },
      { date: '2023-12-18', event: 'Claim Approved' },
      { date: '2023-12-20', event: 'Payment Processed' }
    ]
  },
  {
    id: 'CLM002',
    policyNumber: 'POL789012',
    type: 'Health',
    description: 'Annual health checkup',
    amount: 12000,
    submittedDate: '2024-02-15',
    status: 'processing',
    documents: [
      'Medical Bills',
      'Test Reports',
      'Doctor Prescription'
    ],
    timeline: [
      { date: '2024-02-15', event: 'Claim Submitted' },
      { date: '2024-02-16', event: 'Claim Under Review' },
      { date: '2024-02-20', event: 'Additional Documents Requested' }
    ]
  },
  {
    id: 'CLM003',
    policyNumber: 'POL345678',
    type: 'Health',
    description: 'Emergency room visit for injury',
    amount: 35000,
    submittedDate: '2024-01-10',
    status: 'rejected',
    documents: [
      'Emergency Room Report',
      'Medical Bills',
      'Doctor Notes'
    ],
    timeline: [
      { date: '2024-01-10', event: 'Claim Submitted' },
      { date: '2024-01-12', event: 'Claim Under Review' },
      { date: '2024-01-15', event: 'Additional Clarification Requested' },
      { date: '2024-01-18', event: 'Response Received' },
      { date: '2024-01-25', event: 'Claim Rejected - Treatment not covered under policy' }
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'rejected':
      return <FileX className="h-5 w-5 text-destructive" />;
    case 'processing':
      return <RotateCw className="h-5 w-5 text-amber-500" />;
    default:
      return <Hourglass className="h-5 w-5 text-muted-foreground" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'processing':
      return 'Processing';
    default:
      return 'Pending';
  }
};

export default function ClaimsPage() {
  const [activeTab, setActiveTab] = useState('track-claim');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [fileUploadStage, setFileUploadStage] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClaims = mockClaims.filter(claim => 
    claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploadStage(1);
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setFileUploadStage(2);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const simulateNewClaim = () => {
    setActiveTab('track-claim');
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Insurance Claim Center</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            File new claims, track existing ones, and get AI-assisted support throughout the entire claims process.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file-claim">
              <FileText className="h-4 w-4 mr-2" />
              File a New Claim
            </TabsTrigger>
            <TabsTrigger value="track-claim">
              <Search className="h-4 w-4 mr-2" />
              Track Existing Claims
            </TabsTrigger>
          </TabsList>
          
          {/* File a New Claim */}
          <TabsContent value="file-claim">
            <Card>
              <CardHeader>
                <CardTitle>Submit a New Insurance Claim</CardTitle>
                <CardDescription>
                  Our AI assistant will guide you through the claim filing process and help ensure you have all required documentation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="policy-number">Policy Number</Label>
                      <Input id="policy-number" placeholder="e.g., POL123456" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="claim-type">Claim Type</Label>
                      <Select>
                        <SelectTrigger id="claim-type">
                          <SelectValue placeholder="Select claim type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="health">Health Insurance</SelectItem>
                          <SelectItem value="life">Life Insurance</SelectItem>
                          <SelectItem value="auto">Auto Insurance</SelectItem>
                          <SelectItem value="home">Home Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="claim-description">Claim Description</Label>
                    <Textarea 
                      id="claim-description" 
                      placeholder="Briefly describe the reason for your claim"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="incident-date">Incident Date</Label>
                      <Input id="incident-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="claim-amount">Claim Amount (₹)</Label>
                      <Input id="claim-amount" type="number" placeholder="e.g., 50000" />
                    </div>
                  </div>
                </div>
                
                {/* Document Upload */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Document Upload</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload all relevant documents to support your claim. Our AI will analyze them automatically.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-dashed border-2 bg-muted/30">
                      <CardContent className="flex flex-col items-center justify-center py-6">
                        {fileUploadStage === 0 ? (
                          <>
                            <Upload className="h-8 w-8 text-muted-foreground mb-3" />
                            <p className="font-medium mb-1">Upload Documents</p>
                            <p className="text-sm text-muted-foreground mb-3 text-center">
                              Drag and drop files or click to browse
                            </p>
                            <Label 
                              htmlFor="file-upload" 
                              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md cursor-pointer"
                            >
                              Browse Files
                            </Label>
                            <Input 
                              id="file-upload" 
                              type="file" 
                              multiple 
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </>
                        ) : fileUploadStage === 1 ? (
                          <div className="w-full space-y-3">
                            <p className="font-medium text-center">Uploading Documents...</p>
                            <Progress value={uploadProgress} />
                            <p className="text-sm text-muted-foreground text-center">
                              {uploadProgress}% complete
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <p className="font-medium mb-1">Upload Complete!</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              2 documents uploaded successfully
                            </p>
                            <Button variant="outline" size="sm" onClick={() => setFileUploadStage(0)}>
                              Upload More
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30">
                      <CardContent className="flex flex-col items-center justify-center py-6">
                        <Camera className="h-8 w-8 text-muted-foreground mb-3" />
                        <p className="font-medium mb-1">Snap & Upload</p>
                        <p className="text-sm text-muted-foreground mb-3 text-center">
                          Use your camera to take photos of documents
                        </p>
                        <Button>
                          Open Camera
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Required Documents:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>Medical bills and receipts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>Doctor&apos;s prescription and diagnosis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>ID proof (Aadhaar or PAN card)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
                <Button variant="outline">Save as Draft</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      Submit Claim
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Claim Submitted Successfully!</DialogTitle>
                      <DialogDescription>
                        Your claim has been submitted and is being processed. You can track its status anytime.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center py-4">
                      <div className="text-center">
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Claim #CLM004</h3>
                        <p className="text-muted-foreground mb-4">
                          Expected processing time: 5-7 business days
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={simulateNewClaim}>
                        Track Claim Status
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Track Existing Claims */}
          <TabsContent value="track-claim">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Insurance Claims</CardTitle>
                <CardDescription>
                  View and monitor the status of all your submitted claims.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Search by claim ID, policy number, or description" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Claims List */}
                <div className="space-y-4">
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim) => (
                      <Card 
                        key={claim.id} 
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedClaim(claim)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">Claim #{claim.id}</h3>
                                <span className="text-sm text-muted-foreground">({claim.policyNumber})</span>
                              </div>
                              <p className="text-sm mb-1">{claim.description}</p>
                              <p className="text-sm font-medium">₹{claim.amount.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-1.5">
                                {getStatusIcon(claim.status)}
                                <span className={`text-sm font-medium ${
                                  claim.status === 'approved' ? 'text-green-500' : 
                                  claim.status === 'rejected' ? 'text-destructive' : 
                                  'text-amber-500'
                                }`}>
                                  {getStatusLabel(claim.status)}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground mt-1">
                                Submitted: {new Date(claim.submittedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-lg mb-1">No Claims Found</h3>
                      <p className="text-muted-foreground">No claims match your search criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Claim Details Dialog */}
            {selectedClaim && (
              <Dialog open={!!selectedClaim} onOpenChange={(open) => !open && setSelectedClaim(null)}>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <span>Claim #{selectedClaim.id}</span>
                      <span className={`text-sm px-2 py-0.5 rounded ${
                        selectedClaim.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                        selectedClaim.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 
                        'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                      }`}>
                        {getStatusLabel(selectedClaim.status)}
                      </span>
                    </DialogTitle>
                    <DialogDescription>
                      {selectedClaim.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Claim Info */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Claim Amount</h4>
                          <p className="text-xl font-semibold">₹{selectedClaim.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Policy Number</h4>
                          <p className="font-medium">{selectedClaim.policyNumber}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Documents Submitted</h4>
                        <ul className="space-y-1">
                          {selectedClaim.documents.map((doc: string, index: number) => (
                            <li key={index} className="flex items-center gap-2">
                              <FileCheck className="h-4 w-4 text-primary" />
                              <span className="text-sm">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Actions</h4>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            Download Documents
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Support
                          </Button>
                          {selectedClaim.status === 'processing' && (
                            <Button size="sm">
                              Upload Additional Documents
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Claim Timeline</h4>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-1.5 w-0.5 bg-border"></div>
                        <div className="space-y-4">
                          {selectedClaim.timeline.map((event: any, index: number) => (
                            <div key={index} className="flex gap-3">
                              <div className={`h-3 w-3 rounded-full mt-1.5 ${
                                index === 0 ? 'bg-green-500' : 
                                index === selectedClaim.timeline.length - 1 && selectedClaim.status === 'approved' ? 'bg-green-500' :
                                index === selectedClaim.timeline.length - 1 && selectedClaim.status === 'rejected' ? 'bg-destructive' :
                                'bg-primary'
                              }`}></div>
                              <div>
                                <p className="text-sm font-medium">{event.event}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(event.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}