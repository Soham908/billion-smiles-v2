import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    FlatList,
    Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const categories = ['Education', 'Environment', 'Animals', 'Healthcare', 'Food Security'];
const mockLocations = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'];

const CreateCausePage = () => {
    const [causeTitle, setCauseTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [locationQuery, setLocationQuery] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
    const [volunteerDate, setVolunteerDate] = useState(new Date());
    const [needsVolunteers, setNeedsVolunteers] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [unitDescription, setUnitDescription] = useState('');
    const [unitCost, setUnitCost] = useState('');
    const [minUnits, setMinUnits] = useState('');
    const [maxUnits, setMaxUnits] = useState('');


    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) setVolunteerDate(selectedDate);
    };

    const handleLocationSearch = (text: string) => {
        setLocationQuery(text);
        const filtered = mockLocations.filter((loc) =>
            loc.toLowerCase().includes(text.toLowerCase())
        );
        setLocationSuggestions(filtered);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create New Cause</Text>

            <TextInput
                style={styles.input}
                placeholder="Cause Title"
                value={causeTitle}
                onChangeText={setCauseTitle}
            />

            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            {/* Category Dropdown */}
            <View style={styles.dropdownContainer}>
                <Pressable
                    style={styles.dropdown}
                    onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                    <Text style={{ color: selectedCategory ? '#000' : '#999' }}>
                        {selectedCategory || 'Select Category'}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={24} />
                </Pressable>

                {showCategoryDropdown && (
                    <View style={styles.dropdownListAbsolute}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setSelectedCategory(cat);
                                    setShowCategoryDropdown(false);
                                }}
                            >
                                <Text>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>


            {/* Location Input with Mocked Autocomplete */}
            <View style={styles.dropdownContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={locationQuery}
                    onChangeText={handleLocationSearch}
                />
                {locationSuggestions.length > 0 && (
                    <View style={styles.dropdownListAbsolute}>
                        {locationSuggestions.map((loc) => (
                            <TouchableOpacity
                                key={loc}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setLocationQuery(loc);
                                    setLocationSuggestions([]);
                                }}
                            >
                                <Text>{loc}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Date Picker */}
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                <MaterialIcons name="event" size={20} color="#4CAF50" />
                <Text style={styles.dateButtonText}>
                    {volunteerDate.toDateString()}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={volunteerDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Boolean Option for Volunteers Needed */}
            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Need Volunteers?</Text>
                <Switch
                    value={needsVolunteers}
                    onValueChange={setNeedsVolunteers}
                    trackColor={{ false: '#ccc', true: '#4CAF50' }}
                />
            </View>

            {/* Amount Required */}
            {/* Unit-Based Funding Section */}
            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Work Unit Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 1 tree planted"
                        value={unitDescription}
                        onChangeText={setUnitDescription}
                    />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Cost / Unit (₹)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 50"
                        value={unitCost}
                        onChangeText={setUnitCost}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Min Units</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 10"
                        value={minUnits}
                        onChangeText={setMinUnits}
                        keyboardType="numeric"
                    />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Max Units</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 100"
                        value={maxUnits}
                        onChangeText={setMaxUnits}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* Real-time Calculator */}
            {unitCost && (minUnits || maxUnits) && (
                <View style={styles.calculator}>
                    {minUnits !== '' && (
                        <Text style={styles.calcText}>
                            Min Goal: ₹{parseInt(unitCost) * parseInt(minUnits || '0')}
                        </Text>
                    )}
                    {maxUnits !== '' && (
                        <Text style={styles.calcText}>
                            Max Goal: ₹{parseInt(unitCost) * parseInt(maxUnits || '0')}
                        </Text>
                    )}
                </View>
            )}


            {/* Submit */}
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>Submit Cause</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreateCausePage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 14,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eafbe9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    dateButtonText: {
        marginLeft: 10,
        color: '#4CAF50',
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dropdownContainer: {
        marginBottom: 16,
        position: 'relative', // makes the child dropdownListAbsolute relative to this
    },
    dropdown: {
        backgroundColor: '#f1f1f1',
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    },
    dropdownListAbsolute: {
        position: 'absolute',
        top: 50, // adjust depending on dropdown height
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 8,
        elevation: 4, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 16
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 6,
        color: '#444',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    calculator: {
        backgroundColor: '#f3f3f3',
        padding: 12,
        borderRadius: 8,
        marginTop: 4,
        marginBottom: 16,
    },
    calcText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#333',
    },


});
