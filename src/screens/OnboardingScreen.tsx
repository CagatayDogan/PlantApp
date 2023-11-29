import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList, Dimensions} from 'react-native';
import Slide from '../components/Slide';
import Footer from '../components/Footer';

import {setOnboardingStatus} from '../reducers/onboardingSlice';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

type SlideItem = {
  id: number;
  background: number;
  image: number;
  title: string;
  description: string;
};

const slides: SlideItem[] = [
  {
    id: 1,
    background: require('../assets/Background.png'),
    image: require('../assets/Content1.png'),
    title: 'Welcome to Plant App',
    description: 'Identify more than 3000+ plants and 88% accuracy.',
  },
  {
    id: 2,
    background: require('../assets/Background.png'),
    image: require('../assets/Content2.png'),
    title: 'Take a photo to identify the plant!',
    description: '',
  },
  {
    id: 3,
    background: require('../assets/Background.png'),
    image: require('../assets/FlatiPhone.png'),
    title: 'Get plant care guides',
    description: '',
  },
  {
    id: 4,
    background: require('../assets/Image.png'),
    image: null,
    title: 'PlantApp Premium',
    description: 'Access All Features',
  },
];

type OnboardingScreenProps = {
  navigation: any;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const ref = useRef<FlatList<SlideItem>>(null);
  const dispatch = useDispatch();

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const finish = () => {
    dispatch(setOnboardingStatus(true));
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height}}
        style={{width: width, height: height}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide slide={item} finish={finish} />}
      />
      <Footer
        goToNextSlide={goToNextSlide}
        finish={finish}
        currentSlideIndex={currentSlideIndex}
        slides={slides}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingScreen;
