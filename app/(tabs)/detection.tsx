import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, FlipHorizontal, Scan, Image as ImageIcon, CheckCircle } from 'lucide-react-native';

export default function Detection() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<any>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Camera size={64} color="#22C55E" />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to detect weeds, pests, and diseases in your crops
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (!cameraRef.current) return;
    
    setIsScanning(true);
    
    try {
      // Simulate AI detection process
      setTimeout(() => {
        const mockResults = {
          type: 'Weed Detection',
          crop: 'Tomato',
          confidence: 92,
          issues: [
            { name: 'Broad-leaved weeds', severity: 'Medium', coverage: '12%' },
            { name: 'Grass weeds', severity: 'Low', coverage: '5%' }
          ],
          recommendations: [
            'Apply organic mulching to suppress weed growth',
            'Hand weeding in affected areas',
            'Use organic herbicide (corn gluten meal) as pre-emergent'
          ]
        };
        
        setLastScan(mockResults);
        setIsScanning(false);
      }, 3000);
    } catch (error) {
      setIsScanning(false);
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crop Detection</Text>
        <Text style={styles.subtitle}>AI-powered weed, pest & disease detection</Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>
              Position crop within frame for analysis
            </Text>
          </View>
          
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <FlipHorizontal size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.captureButton, isScanning && styles.captureButtonDisabled]} 
              onPress={takePicture}
              disabled={isScanning}
            >
              {isScanning ? (
                <Scan size={32} color="#FFFFFF" />
              ) : (
                <Camera size={32} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <ImageIcon size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      {isScanning && (
        <View style={styles.scanningContainer}>
          <View style={styles.scanningIndicator}>
            <Scan size={48} color="#22C55E" />
            <Text style={styles.scanningText}>Analyzing crop image...</Text>
            <Text style={styles.scanningSubtext}>This may take a few seconds</Text>
          </View>
        </View>
      )}

      {lastScan && (
        <ScrollView style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <CheckCircle size={24} color="#22C55E" />
            <Text style={styles.resultsTitle}>Detection Results</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultType}>{lastScan.type}</Text>
            <Text style={styles.resultCrop}>Crop: {lastScan.crop}</Text>
            <Text style={styles.resultConfidence}>Confidence: {lastScan.confidence}%</Text>
          </View>

          <View style={styles.issuesSection}>
            <Text style={styles.sectionTitle}>Detected Issues</Text>
            {lastScan.issues.map((issue: any, index: number) => (
              <View key={index} style={styles.issueCard}>
                <View style={styles.issueHeader}>
                  <Text style={styles.issueName}>{issue.name}</Text>
                  <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(issue.severity) }]}>
                    <Text style={styles.severityText}>{issue.severity}</Text>
                  </View>
                </View>
                <Text style={styles.issueCoverage}>Coverage: {issue.coverage}</Text>
              </View>
            ))}
          </View>

          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>Organic Treatment Recommendations</Text>
            {lastScan.recommendations.map((rec: string, index: number) => (
              <View key={index} style={styles.recommendationCard}>
                <CheckCircle size={16} color="#22C55E" />
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'High': return '#FEE2E2';
    case 'Medium': return '#FEF3C7';
    case 'Low': return '#D1FAE5';
    default: return '#F3F4F6';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#22C55E',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#D1FAE5',
    fontWeight: '500',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#22C55E',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 50,
  },
  captureButton: {
    backgroundColor: '#22C55E',
    padding: 20,
    borderRadius: 50,
  },
  captureButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  scanningContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningIndicator: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  scanningText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  scanningSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    maxHeight: 300,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  resultCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  resultCrop: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  resultConfidence: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: '600',
  },
  issuesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  issueCard: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  issueName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  issueCoverage: {
    fontSize: 12,
    color: '#6B7280',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
  },
  recommendationsSection: {
    padding: 20,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#166534',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});