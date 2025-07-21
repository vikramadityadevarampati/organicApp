import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Search, Filter, Leaf, Clock, AlertCircle, CheckCircle } from 'lucide-react-native';

export default function WeedControl() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Broad-leaf', 'Grass', 'Sedge', 'Woody'];

  const weedDatabase = [
    {
      id: 1,
      name: 'Dandelion',
      scientificName: 'Taraxacum officinale',
      category: 'Broad-leaf',
      severity: 'Medium',
      cropAffected: ['Tomato', 'Cucumber'],
      organicTreatments: [
        'Hand weeding before seed formation',
        'Corn gluten meal as pre-emergent',
        'Vinegar-based herbicide (20% acetic acid)',
        'Dense mulching with organic matter'
      ],
      preventionMethods: [
        'Maintain healthy soil pH (6.0-7.0)',
        'Ensure proper crop spacing',
        'Regular cultivation between rows'
      ],
      seasonality: 'Spring-Fall',
      uaeCompliance: 'UAE Organic Standards Approved'
    },
    {
      id: 2,
      name: 'Crabgrass',
      scientificName: 'Digitaria sanguinalis',
      category: 'Grass',
      severity: 'High',
      cropAffected: ['Tomato', 'Cucumber', 'Pepper'],
      organicTreatments: [
        'Corn gluten meal pre-emergent application',
        'Hand cultivation when soil is dry',
        'Solarization using clear plastic sheets',
        'Flame weeding for small patches'
      ],
      preventionMethods: [
        'Thick organic mulch application',
        'Proper irrigation management',
        'Crop rotation with cover crops'
      ],
      seasonality: 'Summer',
      uaeCompliance: 'UAE Organic Standards Approved'
    },
    {
      id: 3,
      name: 'Purslane',
      scientificName: 'Portulaca oleracea',
      category: 'Broad-leaf',
      severity: 'Low',
      cropAffected: ['Tomato'],
      organicTreatments: [
        'Hand weeding (entire plant including roots)',
        'Mulching with straw or wood chips',
        'Cultivation during hot, dry weather',
        'Natural vinegar spray (10% acetic acid)'
      ],
      preventionMethods: [
        'Proper soil drainage',
        'Avoid overwatering',
        'Regular monitoring and early removal'
      ],
      seasonality: 'Summer-Fall',
      uaeCompliance: 'UAE Organic Standards Approved'
    }
  ];

  const filteredWeeds = weedDatabase.filter(weed => {
    const matchesSearch = weed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         weed.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || weed.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weed Control</Text>
        <Text style={styles.subtitle}>Organic management solutions</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search weeds..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Weed Database */}
      <ScrollView style={styles.weedList} showsVerticalScrollIndicator={false}>
        {filteredWeeds.map((weed) => (
          <View key={weed.id} style={styles.weedCard}>
            <View style={styles.weedHeader}>
              <View style={styles.weedInfo}>
                <Text style={styles.weedName}>{weed.name}</Text>
                <Text style={styles.scientificName}>{weed.scientificName}</Text>
                <View style={styles.weedMeta}>
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(weed.category) }]}>
                    <Text style={styles.categoryBadgeText}>{weed.category}</Text>
                  </View>
                  <View style={styles.severityContainer}>
                    <AlertCircle size={14} color={getSeverityColor(weed.severity)} />
                    <Text style={[styles.severityText, { color: getSeverityColor(weed.severity) }]}>
                      {weed.severity}
                    </Text>
                  </View>
                </View>
              </View>
              <Leaf size={32} color="#22C55E" />
            </View>

            <View style={styles.cropAffected}>
              <Text style={styles.sectionLabel}>Crops Affected:</Text>
              <Text style={styles.cropList}>{weed.cropAffected.join(', ')}</Text>
            </View>

            <View style={styles.treatmentSection}>
              <Text style={styles.sectionLabel}>Organic Treatments:</Text>
              {weed.organicTreatments.map((treatment, index) => (
                <View key={index} style={styles.treatmentItem}>
                  <CheckCircle size={14} color="#22C55E" />
                  <Text style={styles.treatmentText}>{treatment}</Text>
                </View>
              ))}
            </View>

            <View style={styles.preventionSection}>
              <Text style={styles.sectionLabel}>Prevention Methods:</Text>
              {weed.preventionMethods.map((method, index) => (
                <View key={index} style={styles.preventionItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.preventionText}>{method}</Text>
                </View>
              ))}
            </View>

            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.metaText}>Season: {weed.seasonality}</Text>
              </View>
              <View style={styles.complianceTag}>
                <CheckCircle size={14} color="#22C55E" />
                <Text style={styles.complianceText}>{weed.uaeCompliance}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Broad-leaf': return '#DBEAFE';
    case 'Grass': return '#D1FAE5';
    case 'Sedge': return '#FEF3C7';
    case 'Woody': return '#F3E8FF';
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
  categoryContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  categoryContent: {
    paddingRight: 20,
  },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  weedList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  weedCard: {
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
  weedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  weedInfo: {
    flex: 1,
  },
  weedName: {
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
  weedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryBadgeText: {
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
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
    marginTop: 7,
    marginRight: 10,
  },
  preventionText: {
    fontSize: 14,
    color: '#374151',
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