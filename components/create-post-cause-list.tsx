import { ICause } from "@/types/typeCause";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface CauseCardProps {
    cause: ICause;
    isSelected?: boolean;
    onPress?: (cause: ICause) => void;
}


export const CauseCard = ({ cause, isSelected, onPress }: CauseCardProps) => {
    const truncatedDescription = cause.description.length > 75
        ? cause.description.substring(0, 75) + '...'
        : cause.description;

    return (
        <TouchableOpacity
            onPress={() => onPress?.(cause)}
            style={[
                styles.card,
                isSelected && { backgroundColor: '#AAFFAA' }
            ]}
        >
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
        </TouchableOpacity>
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