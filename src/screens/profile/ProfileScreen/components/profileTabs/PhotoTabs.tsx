import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const {width} = Dimensions.get('window');
const MARGIN = 15;

const fetchRandomBikeImages = async () => {
  const apiKey = 'ihY-majm3D9u0aLPDEeBIhIPB6T7qFtO9gqkQrvqg8c';
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=bike&count=10&client_id=${apiKey}`,
  );
  const data = await response.json();
  const images = data.map((img: any) => img.urls.small); // You can choose any size
  return images;
};

export default function PhotoTab({username}: {username: string}) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any>();
  useEffect(() => {
    setIsLoading(true);
    fetchRandomBikeImages()
      .then(res => {
        setImages(res);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [username]);

  if (isLoading) {
    return (
      <View style={{height: 400}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!images) {
    return <></>;
  }
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
      {images.map((item: any) => (
        <Image
          key={item}
          source={{uri: item}}
          resizeMode="cover"
          style={styles.image}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: (width - MARGIN * 4) / 3,
    height: (width - MARGIN * 4) / 2.5,
    borderRadius: 15,
    marginLeft: MARGIN,
    marginTop: MARGIN,
  },
});
