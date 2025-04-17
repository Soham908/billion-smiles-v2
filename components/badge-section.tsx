import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import badgeData from "../assets/BadgeData.json";
import { useUserStore } from "@/store/userStore";

const BadgeSection = () => {
  const { userData } = useUserStore();

  const userBadges = badgeData.filter((badge) =>
    userData?.badgesEarned?.includes(badge.title)
  );

  return (
    <View style={styles.badgesSection}>
      <View style={styles.badgesRow}>
        {!userBadges || userBadges.length === 0 ? (
          <Text>Post an image to earn your first badge</Text>
        ) : (
          userBadges.map((badgeData, index) => (
              <Image
                style={styles.badge}
                source={{
                  uri: badgeData.url,
                }}
              />
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgesSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "gray",
  },
  badgesRow: {
    flexDirection: "row",
  },
  badge: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 8,
  },
});

export default BadgeSection;
