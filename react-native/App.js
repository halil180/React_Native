import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [quiz, setAllQuizzes] = useState([])
  const deneme = async ()  => {
    const response = await fetch(`http://localhost:8080/api/v1/Question/6`);
    const data = await response.json();
    setAllQuizzes([data]);
    console.log(data,'oldmai')
  }
  useEffect(() => {
    
    deneme()
    console.log('lol')

  }, [])
  
  return (
    <View style={styles.container}>
      <Text>{quiz && quiz.map((x) => (
        <Text key={x.id}>
           {x.question}
           </Text>
      ))}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
