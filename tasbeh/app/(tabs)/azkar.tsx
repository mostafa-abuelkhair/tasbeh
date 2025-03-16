import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import {Colors} from '@/constants/Colors';

const azkarData = [
  { prayer: 'الفجر', azkar: 'اللهم اجعل لي نورًا في قلبي، ونورًا في قبري، ونورًا في سمعي، ونورًا في بصري.' },
  { prayer: 'الظهر', azkar: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك.' },
  { prayer: 'العصر', azkar: 'أستغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه.' },
  { prayer: 'المغرب', azkar: 'اللهم أجرني من النار، اللهم أجرني من النار.' },
  { prayer: 'العشاء', azkar: 'سبحان الله وبحمده، سبحان الله العظيم.' },
];

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>أذكار بعد الصلاة</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {azkarData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.prayerName}>{item.prayer}</Text>
            <Text style={styles.azkarText}>{item.azkar}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    paddingVertical: height * 0.07, 
    alignItems: 'center',
    backgroundColor: Colors.light.color1, 
  },
  header: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.color2,
    textAlign: 'center',
  },
  azkarText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: '#555',
  },
});
