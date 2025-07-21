import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Search, Bug, Shield, AlertTriangle, CheckCircle, Thermometer } from 'lucide-react-native';

export default function PestDisease() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Insect Pests', 'Diseases', 'Mites', 'Nematodes'];

  const pestDiseaseDatabase = [
    {
      id: 1,
      name: 'Tomato Hornworm',
      scientificName: 'Manduca quinquemaculata',
      type: 'Insect Pests',
      severity: 'High',
      cropAffected: ['Tomato'],
      symptoms: [
        'Large caterpillars feeding on leaves',
        'Defoliation of upper plant parts',
        'Black droppings on leaves',
        'Fruit damage in severe cases'
      ],
      organicTreatments: [
        'Hand picking and removal',
        'Bacillus thuringiensis (Bt) spray',
        'Beneficial wasp release (Trichogramma)',
        'Neem oil application',
        'Row covers during egg-laying period'
      ],
      preventionMethods: [
        'Companion planting with basil and marigolds',
        'Regular plant inspection',
        'Encourage beneficial insects',
        'Proper plant spacing for air circulation'
      ],
      seasonality: 'Summer',
      uaeCompliance: 'UAE Organic Standards Approved'
    },
    {
      id: 2,
      name: 'Cucumber Beetle',
      scientificName: 'Diabrotica undecimpunctata',
      type: 'Insect Pests',
      severity: 'Medium',
      cropAffected: ['Cucumber'],
      symptoms: [
        'Yellowing and wilting of leaves',
        'Small holes in leaves and fruit',
        'Bacterial wilt transmission',
        'Stunted plant growth'
      ],
      organicTreatments: [
        'Yellow sticky traps',
        'Kaolin clay spray',
        'Diatomaceous earth application',
        'Beneficial nematode release',
        'Pyrethrin-based organic insecticide'
      ],
      preventionMethods: [
        'Row covers until flowering',
        'Crop rotation with non-cucurbit crops',
        'Remove crop debris promptly',
        'Plant trap crops (radishes, nasturtiums)'
      ],
      seasonality: 'Spring-Summer',
      uaeCompliance: 'UAE Organic Standards Approved'
    },
    {
      id: 3,
      name: 'Early Blight',
      scientificName: 'Alternaria solani',
      type: 'Diseases',
      severity: 'High',
      cropAffected: ['Tomato'],
      symptoms: [
        'Dark brown spots with concentric rings on leaves',
        'Yellowing and dropping of lower leaves',
        'Stem lesions with dark brown spots',
        'Fruit rot with dark, sunken lesions'
      ],
      organicTreatments: [
        'Copper-based fungicide spray',
        'Baking soda solution (1 tsp per quart water)',
        'Neem oil application',
        'Compost tea spray',
        'Remove affected plant parts'
      ],
      preventionMethods: [
        'Proper plant spacing',
        'Drip irrigation to avoid leaf wetness',
        'Mulching to prevent soil splash',
        'Crop rotation (3-4 year cycle)'
      ],
      seasonality: 'Year-round in warm climates',
      uaeCompliance: 'UAE Organic Standards Approved'
    },
    {
      id: 4,
      name: 'Spider Mites',
      scientificName: 'Tetranychus urticae',
      type: 'Mites',
      severity: 'Medium',
      cropAffected: ['Tomato', 'Cucumber'],
      symptoms: [
        'Fine webbing on leaves and stems',
        'Yellow stippling on leaf surface',
        'Premature leaf drop',
        'Reduced plant vigor'
      ],
      organicTreatments: [
        'Predatory mite release',
        'Insecticidal soap spray',
        'Neem oil application',
        'High-pressure water spray',
        'Sulfur dust application'
      ],
      preventionMethods: [
        'Maintain proper humidity levels',
        'Avoid over-fertilization with nitrogen',
        'Regular monitoring with hand lens',
        'Remove heavily infested leaves'
      ],
      seasonality: 'Hot, dry conditions',
      uaeCompliance: 'UAE Organic Standards Approved'
    }
  ];

  const filteredItems = pestDiseaseDatabase.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Insect Pests': return Bug;
      case 'Diseases': return Shield;
      case 'Mites': return AlertTriangle;
      default: return Bug;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Insect Pests': return '#DBEAFE';
      case 'Diseases': return '#FEE2E2';
      case 'Mites': return '#FEF3C7';
      case 'Nematodes': return '#F3E8FF';
      default: return '#F3F4F6';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pest & Disease Control</Text>
        <Text style={styles.subtitle}>Organic management solutions</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search pests & diseases..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Type Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.typeContainer}
        contentContainerStyle={styles.typeContent}
      >
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              selectedType === type && styles.typeButtonActive
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={[
              styles.typeText,
              selectedType === type && styles.typeTextActive
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pest & Disease Database */}
      <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => {
          const IconComponent = getTypeIcon(item.type);
          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.scientificName}>{item.scientificName}</Text>
                  <View style={styles.itemMeta}>
                    <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
                      <Text style={styles.typeBadgeText}>{item.type}</Text>
                    </View>
                    <View style={styles.severityContainer}>
                      <AlertTriangle size={14} color={getSeverityColor(item.severity)} />
                      <Text style={[styles.severityText, { color: getSeverityColor(item.severity) }]}>
                        {item.severity}
                      </Text>
                    </View>
                  </View>
                </View>
                <IconComponent size={32} color="#EF4444" />
              </View>

              <View style={styles.cropAffected}>
                <Text style={styles.sectionLabel}>Crops Affected:</Text>
                <Text style={styles.cropList}>{item.cropAffected.join(', ')}</Text>
              </View>

              <View style={styles.symptomsSection}>
                <Text style={styles.sectionLabel}>Symptoms:</Text>
                {item.symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomItem}>
                    <AlertTriangle size={14} color="#F59E0B" />
                    <Text style={styles.symptomText}>{symptom}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.treatmentSection}>
                <Text style={styles.sectionLabel}>Organic Treatments:</Text>
                {item.organicTreatments.map((treatment, index) => (
                  <View key={index} style={styles.treatmentItem}>
                    <CheckCircle size={14} color="#22C55E" />
                    <Text style={styles.treatmentText}>{treatment}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.preventionSection}>
                <Text style={styles.sectionLabel}>Prevention Methods:</Text>
                {item.preventionMethods.map((method, index) => (
                  <View key={index} style={styles.preventionItem}>
                    <Shield size={14} color="#3B82F6" />
                    <Text style={styles.preventionText}>{method}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Thermometer size={16} color="#6B7280" />
                  <Text style={styles.metaText}>Season: {item.seasonality}</Text>
                </View>
                <View style={styles.complianceTag}>
                  <CheckCircle size={14} color="#22C55E" />
                  <Text style={styles.complianceText}>{item.uaeCompliance}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  typeContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  typeContent: {
    paddingRight: 20,
  },
  typeButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  typeButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  itemList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  cropAffected: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cropList: {
    fontSize: 14,
    color: '#6B7280',
  },
  symptomsSection: {
    marginBottom: 16,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  symptomText: {
    fontSize: 14,
    color: '#B45309',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  treatmentSection: {
    marginBottom: 16,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  treatmentText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  preventionSection: {
    marginBottom: 16,
  },
  preventionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  preventionText: {
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  complianceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  complianceText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#166534',
    marginLeft: 4,
  },
});