import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Sun, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Camera, Leaf } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: 26.5,
    humidity: 65,
    soilMoisture: 72,
    lightIntensity: 85,
  });

  const [recentDetections, setRecentDetections] = useState([
    { id: 1, type: 'Weed', crop: 'Tomato', severity: 'Low', timestamp: '2 hours ago' },
    { id: 2, type: 'Pest', crop: 'Cucumber', severity: 'Medium', timestamp: '4 hours ago' },
    { id: 3, type: 'Disease', crop: 'Tomato', severity: 'High', timestamp: '6 hours ago' },
  ]);

  const weeklyTemps = [22, 24, 26, 25, 27, 26, 28];
  const healthData = [
    { label: 'Healthy', value: 75, color: '#22C55E' },
    { label: 'Weeds', value: 15, color: '#F59E0B' },
    { label: 'Pests', value: 7, color: '#EF4444' },
    { label: 'Disease', value: 3, color: '#8B5CF6' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Farm Dashboard</Text>
        <Text style={styles.subtitle}>Real-time monitoring & control</Text>
      </View>

      {/* Environmental Sensors */}
      <View style={styles.sensorGrid}>
        <View style={styles.sensorCard}>
          <Thermometer size={24} color="#EF4444" />
          <Text style={styles.sensorValue}>{sensorData.temperature}°C</Text>
          <Text style={styles.sensorLabel}>Temperature</Text>
        </View>
        <View style={styles.sensorCard}>
          <Droplets size={24} color="#3B82F6" />
          <Text style={styles.sensorValue}>{sensorData.humidity}%</Text>
          <Text style={styles.sensorLabel}>Humidity</Text>
        </View>
        <View style={styles.sensorCard}>
          <Wind size={24} color="#10B981" />
          <Text style={styles.sensorValue}>{sensorData.soilMoisture}%</Text>
          <Text style={styles.sensorLabel}>Soil Moisture</Text>
        </View>
        <View style={styles.sensorCard}>
          <Sun size={24} color="#F59E0B" />
          <Text style={styles.sensorValue}>{sensorData.lightIntensity}%</Text>
          <Text style={styles.sensorLabel}>Light</Text>
        </View>
      </View>

      {/* Temperature Trend */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Temperature Trend (7 Days)</Text>
        <View style={styles.tempTrendContainer}>
          <View style={styles.tempLabels}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <View key={day} style={styles.tempDay}>
                <View style={[styles.tempBar, { height: weeklyTemps[index] * 4 }]} />
                <Text style={styles.tempValue}>{weeklyTemps[index]}°</Text>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Crop Health Distribution */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Crop Health Distribution</Text>
        <View style={styles.healthGrid}>
          {healthData.map((item) => (
            <View key={item.label} style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: item.color }]} />
              <Text style={styles.healthLabel}>{item.label}</Text>
              <Text style={styles.healthValue}>{item.value}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Detections */}
      <View style={styles.detectionsContainer}>
        <Text style={styles.detectionsTitle}>Recent Detections</Text>
        {recentDetections.map((detection) => (
          <View key={detection.id} style={styles.detectionCard}>
            <View style={styles.detectionIcon}>
              {detection.severity === 'High' ? (
                <AlertTriangle size={20} color="#EF4444" />
              ) : (
                <CheckCircle size={20} color="#22C55E" />
              )}
            </View>
            <View style={styles.detectionInfo}>
              <Text style={styles.detectionType}>{detection.type} - {detection.crop}</Text>
              <Text style={styles.detectionTime}>{detection.timestamp}</Text>
            </View>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(detection.severity) }]}>
              <Text style={styles.severityText}>{detection.severity}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Camera size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Scan Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
            <Leaf size={24} color="#22C55E" />
            <Text style={[styles.actionText, styles.secondaryActionText]}>Treatment Log</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#22C55E',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1FAE5',
    fontWeight: '500',
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sensorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  sensorLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  tempTrendContainer: {
    height: 180,
    justifyContent: 'flex-end',
  },
  tempLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
  },
  tempDay: {
    alignItems: 'center',
    flex: 1,
  },
  tempBar: {
    backgroundColor: '#22C55E',
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  tempValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  healthItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  healthLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  healthValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  detectionsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  detectionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  detectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  detectionIcon: {
    marginRight: 12,
  },
  detectionInfo: {
    flex: 1,
  },
  detectionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  detectionTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  actionsContainer: {
    marginHorizontal: 20,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    width: '48%',
  },
  secondaryAction: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  secondaryActionText: {
    color: '#22C55E',
  },
});