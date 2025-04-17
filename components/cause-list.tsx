import React from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ICause } from '@/types/typeCause';

const causes = [
  {
    _id: '1',
    causeTitle: 'Plant Trees',
    description: 'Join us to plant trees in urban areas. Help reduce pollution and create green spaces.',
    category: 'Environment',
    location: 'Pune',
    ngoName: 'Green Earth',
    status: 'Ongoing',
    needsVolunteers: true,
  },
  {
    _id: '2',
    causeTitle: 'School Renovation',
    description: 'We need support to renovate schools in underprivileged areas. Improve education infrastructure.',
    category: 'Education',
    location: 'Mumbai',
    ngoName: 'Teach for India',
    status: 'Needing Support',
    needsVolunteers: false,
  },
  {
    _id: '3',
    causeTitle: 'Animal Shelter Aid',
    description: 'Support our efforts to rescue and rehabilitate animals in need. Your contribution helps us save lives.',
    category: 'Animals',
    location: 'Delhi',
    ngoName: 'Pet Help',
    status: 'Completed',
    needsVolunteers: false,
  },
  // Add more items here
];

const CauseCard = ({ cause }: { cause: ICause }) => {
  // Truncate the description after 2 lines or 20 words (for simplicity)
  const truncatedDescription = cause.description.length > 75
    ? cause.description.substring(0, 75) + '...'
    : cause.description;

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.causeTitle}>{cause.causeTitle}</Text>
        <Text style={styles.shortDescription}>{truncatedDescription}</Text>

        <View style={styles.detailsRow}>
          <MaterialIcons name="location-on" size={16} />
          <Text style={styles.detailsText}>{cause.location}</Text>
          <MaterialIcons style={{ marginLeft: 12 }} name="category" size={16} />
          <Text style={styles.detailsText}>{cause.category}</Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusText}>{cause.status}</Text>
          {cause.needsVolunteers && (
            <View style={styles.volunteerBadge}>
              <Text style={styles.volunteerText}>Volunteers Needed</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const CauseList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={causes}
        renderItem={({ item }) => <CauseCard cause={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  flatList: {
  },
  card: {
    width: 250,
    marginRight: 16,
    backgroundColor: '#eee',
    borderRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  causeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  shortDescription: {
    fontSize: 12,
    color: '#555',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 6,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  volunteerBadge: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  volunteerText: {
    fontSize: 10,
    color: '#fff',
  },
});

export default CauseList;
