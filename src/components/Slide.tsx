import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CheckBox from 'expo-checkbox';

const {width, height} = Dimensions.get('window');

type SlideItem = {
  id: number;
  background: number;
  image: number;
  title: string;
  description: string;
};

type SlideProps = {
  slide: SlideItem;
  finish: any;
};

const Slide: React.FC<SlideProps> = ({slide, finish}) => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <ImageBackground
      source={slide?.background}
      resizeMode="cover"
      style={styles.container}>
      {slide?.id !== 4 ? (
        <View style={styles.slideContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{slide?.title}</Text>
            {slide?.description && (
              <Text style={styles.description}>{slide?.description}</Text>
            )}
          </View>
          <Image
            source={slide?.image}
            resizeMode="contain"
            style={
              slide?.description
                ? styles.image
                : {height: height * 0.75, width: width}
            }
          />
        </View>
      ) : (
        <View style={styles.finalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={finish}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.finalTitle}>{slide?.title}</Text>
          {slide?.description && (
            <Text style={styles.finalDescription}>{slide?.description}</Text>
          )}
          <TouchableOpacity
            style={selected === 0 ? styles.buttonSelected : styles.button}
            onPress={() => setSelected(0)}>
            <View style={styles.buttonView}>
              <CheckBox
                disabled={false}
                value={selected === 0}
                onValueChange={() => setSelected(0)}
              />
              <View style={styles.buttonTextView}>
                <Text style={styles.buttonTitle}>1 Month</Text>
                <Text style={styles.buttonDescription}>
                  $2.99/month, auto renewable
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={selected === 1 ? styles.buttonSelected : styles.button}
            onPress={() => setSelected(1)}>
            <View style={styles.buttonView}>
              <CheckBox
                disabled={false}
                value={selected === 1}
                onValueChange={() => setSelected(1)}
              />
              <View style={styles.buttonTextView}>
                <Text style={styles.buttonTitle}>1 Year</Text>
                <Text style={styles.buttonDescription}>
                  First 3 days free, then $529,99/year
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    paddingTop: 30,
  },
  headerContainer: {
    alignItems: 'flex-start',
    height: height * 0.15,
  },
  title: {
    color: '#13231B',
    fontSize: 28,
    fontWeight: '300',
    marginLeft: 10,
    width: width * 0.9,
  },
  description: {
    color: '#13231B',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
    marginLeft: 10,
    width: width * 0.9,
  },
  image: {
    height: height * 0.6,
    width: width,
  },
  finalContainer: {
    flex: 1,
    width: width,
    padding: 20,
    justifyContent: 'flex-end',
    marginBottom: 130,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 18,
    right: 18,
    height: 24,
    width: 24,
    borderRadius: 48,
    backgroundColor: '#00000066',
  },
  closeButtonText: {
    fontWeight: '600',
    fontSize: 10,
    color: 'white',
  },
  finalTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '300',
  },
  finalDescription: {
    color: 'white',
    fontSize: 17,
    fontWeight: '300',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFFFFF0D',
    borderWidth: 0.5,
    borderRadius: 14,
    borderColor: '#FFFFFF4D',
    marginVertical: 8,
  },
  buttonSelected: {
    backgroundColor: '#FFFFFF0D',
    borderWidth: 1.5,
    borderRadius: 14,
    borderColor: '#28AF6E',
    marginVertical: 8,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingVertical: 10,
  },
  buttonTextView: {
    marginLeft: 10,
  },
  buttonTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonDescription: {
    color: '#FFFFFFB2',
    fontWeight: '300',
    fontSize: 12,
  },
});
