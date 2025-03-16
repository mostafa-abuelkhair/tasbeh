
import { Text, View, FlatList,Alert, Image, StyleSheet,Dimensions, Platform  } from 'react-native';
import {Colors} from '@/constants/Colors';
import { useState, useEffect } from "react";
import * as Location from "expo-location";


export default function HomeScreen() {

  const [time, setTime] = useState(new Date());
  const [prayersTimes, setPrayersTimes] = useState([] as any);
  const [nextPrayer, setNextPrayer] = useState(null as any);

  useEffect(() => {

    const interval = setInterval(() => setTime(new Date()), 1000);

    async function getDate() {
      const apiDate = new Date();
      let formattedDate = apiDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-');

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
          Alert.alert("Permission Denied", "You need to grant location access.");
          return;
      }
      let location = await Location.getCurrentPositionAsync({});
        
      let response = await fetch(
        `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&method=5&shafaq=general&midnightMode=0&timezonestring=${Intl.DateTimeFormat().resolvedOptions().timeZone}&latitudeAdjustmentMethod=1&calendarMethod=UAQ`
      );
      let data = await response.json();

      const timing = data.data.timings;

      let prayers = [
        { name: "الفجر", time:  timing.Fajr },
        { name: "الشروق", time:  timing.Sunrise },
        { name: "الظهر", time:  timing.Dhuhr },
        { name: "العصر", time:  timing.Asr },
        { name: "المغرب", time:  timing.Maghrib },
        { name: "العشاء", time:  timing.Isha }
      ]
      setPrayersTimes(prayers);

      const prayerInterval = setInterval(() => {

        if(new Date().getDate() > apiDate.getDate()){
          clearInterval(prayerInterval);
          getDate();
          return;
        }

        const nextPrayerIndex = prayers.findIndex((prayer: any) => {
          const [hours, minutes] = prayer.time.split(":").map(Number);
          const prayerTime = new Date().setHours(hours, minutes, 0, 0);
          return prayerTime > new Date().getTime();
        })

        if(nextPrayerIndex !== -1){
          const next = prayers[nextPrayerIndex];
          const [hours, minutes] = next.time.split(":").map(Number);
          let timeDifference: any = new Date().setHours(hours, minutes, 0, 0) - new Date().getTime();
          timeDifference = timeDifference / 1000;
          let hrs = String(Math.floor(timeDifference / 3600)).padStart(2, "0");
          let mins = String(Math.floor((timeDifference % 3600) / 60)).padStart(2, "0");
          let seconds = String(Math.ceil(timeDifference % 60)).padStart(2, "0");
          setNextPrayer({
            name: next.name,
            time: `${hrs}:${mins}:${seconds}`
          });
        }
        else{
          setNextPrayer(null);
        }

      }, 1000);
    }

   getDate();


    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.ClockContainer}>
        <Image
          style={styles.clockBack}
          source={require("@/assets/images/clock.png")}
          resizeMode="contain" 
        />
        <Text style={styles.clock}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>

      <View>
        <Text style={styles.weekday}>
          {time.toLocaleDateString("ar-EG", { weekday: "long" })}
        </Text>
        <Text style={styles.date}>
          {time.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" })}
        </Text>
        <Text style={styles.date}>
          {new Intl.DateTimeFormat("ar-EG-u-ca-islamic", {
          day: "2-digit",
          month: "long",
          year: "numeric"
          }).format(time)}
        </Text>
      </View>

      <View style={styles.PrayersContainer}>
        <FlatList
          data={prayersTimes}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.prayerRow}>
              <Text style={styles.prayerTime}>{item.time}</Text>
              <Text style={styles.prayerName}>{item.name}</Text>
            </View>
          )}
        />

        <Text style={styles.next}>
          {nextPrayer && `متبقى على ${nextPrayer.name} : ${nextPrayer.time}`}
        </Text>
      </View>


    </View>

  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  ClockContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 200,
    height: 200
  },
  clockBack:{
    position:'absolute',
    width: 200,
    height: 200,

  },
  clock:{
    fontSize:28,
    fontWeight:'bold',
    color: Colors.light.color3
  },
  weekday: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.color1,
    marginTop: 5,
    textAlign: 'center',
  },
  date: {
    fontSize: 20,
    color: Colors.light.color2,
    marginTop: 5,
    textAlign: 'center',
  },
  next:{
    marginTop: 10,
    fontSize: 18,
    color: Colors.light.color1,
    textAlign: 'right',
  },
  PrayersContainer: {
    marginTop: 20,
    width: "80%",
  },
  prayersTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.light.color1,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  prayerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.color2,
  },
  prayerTime: {
    fontSize: 18,
    color: Colors.light.color3,
  }
});
