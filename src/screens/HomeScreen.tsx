import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';

import {getCategories, getQuestions} from '../api/axios';

const {height} = Dimensions.get('window');

type QuestionItem = {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
};

const Questions: React.FC<{question: QuestionItem}> = ({question}) => {
  return (
    <ImageBackground
      source={{uri: question?.image_uri}}
      resizeMode="cover"
      style={styles.questionContainer}
      imageStyle={styles.questionImage}>
      <Text style={styles.questionTitle}>{question?.title}</Text>
    </ImageBackground>
  );
};

type ImageItem = {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: string;
  createdAt: string;
  updatedAt: string;
};

type CategoryItem = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  rank: number;
  image: ImageItem;
};

const Categories: React.FC<{category: CategoryItem}> = ({category}) => {
  return (
    <View style={styles.categoryContainer}>
      <ImageBackground
        source={{uri: category?.image?.url}}
        resizeMode="cover"
        style={styles.categoryImage}
        imageStyle={styles.categoryImageStyle}>
        <Text style={styles.categoryTitle}>{category?.title}</Text>
      </ImageBackground>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>();
  const [questions, setQuestions] = useState<QuestionItem[]>();

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await getQuestions();
      setQuestions(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('../assets/HeaderBackground.png')}
          resizeMode="cover"
          style={styles.header}>
          <Text style={styles.headerTitle}>Hi, plant lover!</Text>
          <Text style={styles.headerText}>Good Afternoon! ⛅</Text>
          <View style={styles.searchBarContainer}>
            <Image
              source={require('../assets/Search.png')}
              resizeMode="contain"
              style={styles.searchBarImage}
            />
            <TextInput
              style={styles.searchBarInput}
              placeholder="Search for plants"
            />
          </View>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContainer}>
              <Image
                source={require('../assets/MessageIcon.png')}
                resizeMode="contain"
                style={styles.buttonMessageImage}
              />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>FREE Premium Available</Text>
                <Text style={styles.buttonDescription}>
                  Tap to upgrade your account!
                </Text>
              </View>
              <Image
                source={require('../assets/arrow.png')}
                resizeMode="contain"
                style={styles.buttonArrowImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.contentText}>Get Started</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={questions}
            contentContainerStyle={styles.questionsFlatListContentContainer}
            style={styles.questionsFlatList}
            renderItem={({item}) => <Questions question={item} />}
          />
          <FlatList
            numColumns={2}
            style={styles.categoriesFlatList}
            data={categories}
            renderItem={({item}) => <Categories category={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: height * 0.21,
    padding: 20,
  },
  headerTitle: {
    fontWeight: '400',
    fontSize: 16,
    color: '#13231B',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 24,
    color: '#13231B',
  },
  searchBarContainer: {
    backgroundColor: 'white',
    height: 44,
    borderRadius: 12,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarImage: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  searchBarInput: {
    marginLeft: 5,
    marginRight: 45,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#24201A',
    borderRadius: 14,
    marginTop: 15,
    marginHorizontal: 10,
    height: 64,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    paddingVertical: 10,
  },
  buttonMessageImage: {
    height: 45,
    width: 45,
  },
  buttonTextContainer: {
    marginLeft: 10,
  },
  buttonTitle: {
    color: '#E5C990',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonDescription: {
    color: '#FFDE9CCC',
    fontWeight: '400',
    fontSize: 13,
  },
  buttonArrowImage: {
    height: 25,
    width: 25,
    position: 'absolute',
    right: 12,
    top: 18.5,
  },
  contentText: {
    marginLeft: 10,
    marginTop: 15,
    fontWeight: '500',
    fontSize: 15,
    color: '#13231B',
  },
  questionsFlatListContentContainer: {
    padding: 14,
  },
  questionsFlatList: {
    marginHorizontal: -10,
  },
  categoriesFlatList: {
    marginHorizontal: 5,
  },
  questionContainer: {
    marginHorizontal: 6,
    height: 164,
    width: 240,
  },
  questionImage: {
    borderRadius: 12,
  },
  questionTitle: {
    fontWeight: '400',
    fontSize: 15,
    color: 'white',
    marginTop: 110,
    marginHorizontal: 15,
  },
  categoryContainer: {
    flex: 1,
    height: 164,
    margin: 6,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#29BB896B',
  },
  categoryImage: {
    height: 162,
  },
  categoryImageStyle: {
    borderRadius: 12,
  },
  categoryTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#13231B',
    marginLeft: 10,
    marginRight: 50,
    marginTop: 10,
  },
});

export default HomeScreen;
