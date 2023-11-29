import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

type SlideItem = {
  id: number;
  background: number;
  image: number;
  title: string;
  description: string;
};

type FooterProps = {
  goToNextSlide: any;
  finish: any;
  currentSlideIndex: number;
  slides: SlideItem[];
};

const Footer: React.FC<FooterProps> = ({
  goToNextSlide,
  finish,
  currentSlideIndex,
  slides,
}) => {
  return (
    <View style={styles.footer}>
      {/* Render buttons */}
      <TouchableOpacity
        onPress={
          currentSlideIndex === slides.length - 1 ? finish : goToNextSlide
        }
        style={styles.button}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: 'white',
          }}>
          {currentSlideIndex === 0
            ? 'Get Started'
            : currentSlideIndex === slides.length - 1
            ? 'Try free for 3 days'
            : 'Continue'}
        </Text>
      </TouchableOpacity>

      {currentSlideIndex === 0 && (
        <View style={styles.textContainer}>
          <Text
            style={{
              color: '#597165B2',
              fontSize: 11,
              fontWeight: '400',
              textAlign: 'center',
              width: width * 0.6,
            }}>
            By tapping next, you are agreeing to PlantID
            <Text style={{textDecorationLine: 'underline'}}>
              {' '}
              Terms of Use{' '}
            </Text>
            &
            <Text style={{textDecorationLine: 'underline'}}>
              {' '}
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      )}
      {currentSlideIndex === 1 || currentSlideIndex === 2 ? (
        <View style={styles.indicatiorContainer}>
          {slides.map((slide, slideIndex) => (
            <View
              key={slideIndex}
              style={[
                styles.indicator,
                currentSlideIndex == slideIndex && {
                  backgroundColor: '#13231B',
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                },
              ]}
            />
          ))}
        </View>
      ) : null}
      {currentSlideIndex === 3 && (
        <View style={styles.textContainer}>
          <Text
            style={{
              color: '#597165B2',
              fontSize: 9,
              fontWeight: '300',
              textAlign: 'center',
              width: width * 0.9,
            }}>
            After the 3-day free trial period you’ll be charged ₺274.99 per year
            unless you cancel before the trial expires. Yearly Subscription is
            Auto-Renewable
            <Text style={{textDecorationLine: 'underline'}}>
              {' '}
              Terms of Use{' '}
            </Text>
            &
            <Text style={{textDecorationLine: 'underline'}}>
              {' '}
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: height * 0.15,
    marginHorizontal: 20,
  },
  button: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#28AF6E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicatiorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  indicator: {
    height: 6,
    width: 6,
    backgroundColor: '#13231B40',
    marginHorizontal: 3,
    borderRadius: 3,
  },
});

export default Footer;
