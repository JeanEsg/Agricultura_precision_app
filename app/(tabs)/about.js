import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const SectionComponent = ({ title, content, imageSource }) => {
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

const AboutScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SectionComponent
          title="Nosotros"
          content="Somos un grupo de estudiantes..."
          imageSource={require('../../assets/7.jpg')}
        />
        <SectionComponent
          title="Nosotros"
          content="Somos un grupo de estudiantes..."
          imageSource={require('../../assets/6.jpg')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 15,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '85%',
    height: 200,
    marginBottom: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default AboutScreen;