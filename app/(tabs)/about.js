import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Section } from '../../components/Section';

const AboutScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Section
          title="Nosotros"
          content="Somos un grupo de estudiantes de la Universidad Autónoma de Occidente, que cursan en sexto semestre la asignatura de Ambiente y Desarrollo Sostenible. El grupo está conformado por personas de las carreras de Ingeniería Mecatrónica e Ingeniería Informática. Tenemos como objetivo ayudar al medio ambiente con una solución sustentable para el uso eficaz de los recursos hídricos."
          imageSource={require('../../assets/7.jpg')}
        />
        <Section
          title="Introducción"
          content="La creciente preocupación por la escasez de agua y la necesidad de optimizar los recursos en la agricultura ha llevado a explorar soluciones tecnológicas que promuevan un uso eficiente del agua. Este proyecto propone la implementación de un sistema de agricultura de precisión que monitoree variables clave para reducir el desperdicio de agua y mejorar la productividad agrícola."
          imageSource={require('../../assets/3.jpg')}
        />
        <Section
          title="Problema"
          content="El desperdicio de agua en la agricultura es un problema crítico, especialmente en comunidades rurales donde el acceso a este recurso es limitado. Las prácticas de riego ineficientes contribuyen a la escasez de agua, afectando tanto la producción agrícola como la sostenibilidad del medio ambiente."
          imageSource={require('../../assets/4.webp')}
        />
        <Section
          title="Situación actual"
          content="El agua es esencial para la agricultura, pero su uso ineficiente puede llevar a la degradación del suelo y afectar la seguridad alimentaria. La implementación de tecnologías de monitoreo puede mejorar la gestión del agua. Existen diferentes tipos de sensores que permiten medir la humedad del suelo, la temperatura y la humedad relativa del aire, lo que ayuda a los agricultores a tomar decisiones informadas sobre el riego."
          imageSource={require('../../assets/2.jpg')}
        />
        <Section
          title="Nuestro prototipo"
          content="Este sistema conecta sensores a un microcontrolador ESP32 programado en C++. Una vez el código ha sido compilado, el microcontrolador se conecta a la red Wi-Fi y queda listo para recibir peticiones de sistemas remotos para visualizar la temperatura, la humedad relativa del aire y la humedad del suelo de nuestra planta en tiempo real. También, el prototipo calcula la cantidad de agua que le hace falta a la planta para garantizar su uso eficiente. Para finalizar, nuestro sistema ofrece la posibilidad de ofrecer todo tipo de recomendaciones basadas en IA, según el usuario lo requiera."
          imageSource={require('../../assets/6.jpg')}
        />
        <Section
          title="Nuestra app"
          content="La aplicación móvil se conecta al prototipo a través de una API RESTful. La aplicación permite visualizar los datos de los sensores en tiempo real y recibir recomendaciones personalizadas para el riego de la planta. Además, la aplicación cuenta con un chatbot que responde a las preguntas más frecuentes de los usuarios y ofrece información sobre el estado de la planta. La aplicación móvil permite consultar datos de sensores en tiempo real mediante un sistema RAG con backend desarrollado en Python siguiendo una arquitectura hexagonal. La interfaz de la aplicación es intuitiva y dinámica, facilitando la exploración de datos y respondiendo consultas específicas relacionadas con los sensores."
          imageSource={require('../../assets/8.jpg')}
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
});

export default AboutScreen;