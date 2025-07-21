import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { User, Bell, Shield, Database, MapPin, FileText, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoDetection, setAutoDetection] = useState(false);
  const [organicMode, setOrganicMode] = useState(true);

  const showComingSoon = () => {
    Alert.alert('Coming Soon', 'This feature will be available in the next update.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your farm management preferences</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingItem} onPress={showComingSoon}>
          <View style={styles.settingIcon}>
            <User size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Farm Profile</Text>
            <Text style={styles.settingDescription}>Manage farm details and crop information</Text>
          </View>
          <Text style={styles.settingValue}>></Text>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Bell size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive alerts for crop issues</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#D1D5DB', true: '#BBF7D0' }}
            thumbColor={notifications ? '#22C55E' : '#F3F4F6'}
          />
        </View>
      </View>

      {/* Detection Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detection & Monitoring</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Shield size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>UAE Organic Compliance</Text>
            <Text style={styles.settingDescription}>Ensure all treatments meet UAE organic standards</Text>
          </View>
          <Switch
            value={organicMode}
            onValueChange={setOrganicMode}
            trackColor={{ false: '#D1D5DB', true: '#BBF7D0' }}
            thumbColor={organicMode ? '#22C55E' : '#F3F4F6'}
          />
        </View>
        <TouchableOpacity style={styles.settingItem} onPress={showComingSoon}>
          <View style={styles.settingIcon}>
            <Database size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Detection Sensitivity</Text>
            <Text style={styles.settingDescription}>Adjust crop analysis sensitivity levels</Text>
          </View>
          <Text style={styles.settingValue}>High</Text>
        </TouchableOpacity>
      </View>

      {/* Location & Climate */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location & Climate</Text>
        <TouchableOpacity style={styles.settingItem} onPress={showComingSoon}>
          <View style={styles.settingIcon}>
            <MapPin size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Farm Location</Text>
            <Text style={styles.settingDescription}>Set your farm's location for climate data</Text>
          </View>
          <Text style={styles.settingValue}>UAE</Text>
        </TouchableOpacity>
      </View>

      {/* Documentation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Documentation & Compliance</Text>
        <TouchableOpacity style={styles.settingItem} onPress={showComingSoon}>
          <View style={styles.settingIcon}>
            <FileText size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Treatment Records</Text>
            <Text style={styles.settingDescription}>Export organic treatment logs</Text>
          </View>
          <Text style={styles.settingValue}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={showComingSoon}>
          <View style={styles.settingIcon}>
            <Shield size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Certification Reports</Text>
            <Text style={styles.settingDescription}>Generate UAE organic compliance reports</Text>
          </View>
          <Text style={styles.settingValue}>></Text>
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.settingItem} onPress={showComingSoon}>
          <View style={styles.settingIcon}>
            <HelpCircle size={24} color="#22C55E" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Help & Support</Text>
            <Text style={styles.settingDescription}>Get help with organic farming practices</Text>
          </View>
          <Text style={styles.settingValue}>></Text>
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>Organic Farm Management System</Text>
        <Text style={styles.aboutText}>
          Specialized for sustainable farming practices in the UAE and GCC region, 
          following organic certification standards for optimal crop health and environmental stewardship.
        </Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 40,
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
  section: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  settingValue: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  aboutSection: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});