import { StyleSheet, Text, View, Image } from "react-native";

export const Section = ({ title, content, imageSource }) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.content}>
          {imageSource && (
            <Image source={imageSource} style={styles.image} />
          )}
          <Text style={styles.text}>{content}</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    section: {
      marginBottom: 15,
      backgroundColor: '#dddddd',
      borderRadius: 10,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
        padding: 10,
    },
    image: {
        width: '85%',
        height: 200,
        marginBottom: 10,
        alignSelf: 'center',
      },
      text: {
        fontSize: 16,
        textAlign: 'justify',
        padding: 10,
      },
  });
  