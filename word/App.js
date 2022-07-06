import React,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import { Button  ,Avatar, Card, Title, Paragraph,TextInput } from 'react-native-paper';


export default function App() {
  const [result, setResult] = useState([])
  const [word, setWord] = useState('hello')
  // const getMoviesFromApiAsync = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://reactnative.dev/movies.json'
  //     );
  //     const json = await response.json();
  //     // return json.movies;
  //     console.log(json)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const getWord = async () => {
    try {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    setResult(data); //im setting the data i fetched from the transport api 
    console.log("data",data); 
    } catch (error) {
      console.error(error);
    }

  };
useEffect(() => {
  getWord()
  console.log('hello')
}, [])

  const LeftContent = props => <Avatar.Icon {...props} icon="file-word-box-outline" />
  return (
    <PaperProvider>


    <View style={styles.container}> 
      <Text>What's the meaning of</Text>
      <Button icon="magnify" mode="contained" onPress={() => getWord(word)}>
    Press me
  </Button>
      <StatusBar style="auto" />
      </View>
      <TextInput
      label="Email"
      type='flat'
      value={word}
      onChangeText={text => setWord(text)}
    />
{result &&    <FlatList
            data={result}
            renderItem={({ item }) => (
              <Card>
              <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
              <Card.Content>
                <Title>{item.word}</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
            )}
          />}

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    marginBottom:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
