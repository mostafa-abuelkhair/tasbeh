import { Tabs } from 'expo-router';
import React from 'react';
import { Platform} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { Path, Circle } from 'react-native-svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'اوقات الصلاة',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="mosque" color={color} />,
        }}
      />
      <Tabs.Screen
        name="azkar"
        options={{
          title: 'أذكار',
          tabBarIcon: ({ color }) =>
          (
            <Svg width="26" height="26" viewBox="0 0 60 60" fill={color}>
              <Path
                d="M58 61H6l6-18h40l6 18z"
                fill="#baa871"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <Circle cx="13" cy="27" r="1" fill="#284632" />
              <Path
                d="M38.243 43.029h-4.772l.4-4.587a9.378 9.378 0 0 0-.187-2.855L32 28l-2-9-5-3-3.727 24.311L21 43.994a5.594 5.594 0 0 0 5.23 5.582L33 50l-18 3-3.029 3h26.544A6.485 6.485 0 0 0 45 49.315a6.666 6.666 0 0 0-6.757-6.286Z"
                fill="#324664"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <Path
                d="M52 7v3M52 14v3M50 12h-3M57 12h-3"
                fill="none"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <Circle cx="43" cy="4" r="1" fill="#284632" />
              <Path
                d="m28.59 18.911 4.823-1.234-1.838-8.45a5.355 5.355 0 0 0-6.3-3.857h0a5.042 5.042 0 0 0-3.54 6.186l1.158 4.644a4.093 4.093 0 0 0 1.7 2.435"
                fill="#e7d1c4"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <Path
                d="M21.9 4.094h7.23a2.071 2.071 0 0 1 2.07 2.072v2.928h0-11.367 0V6.166A2.071 2.071 0 0 1 21.9 4.094Z"
                fill="#324664"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                transform="rotate(-11.102 25.518 6.593)"
              />
              <Path
                d="m43.559 29.463-6.5 3.035-5.707-7.836c-1.039-1.426-2.786-1.923-3.9-1.11h0c-1.116.813-1.179 2.628-.14 4.054l6.09 8.361c1.451 1.992 3.891 2.686 5.45 1.551l6.421-4.677Z"
                fill="#324664"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <Path
                d="m45.268 32.841 4.165-3.034a1.412 1.412 0 0 0-1.428-2.42l-4.446 2.076Z"
                fill="#e7d1c4"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <Path
                d="M38 50h-2M60 52h-5M63 61h-5M56 43h-4M4 52h5M1 61h5M8 43h4"
                fill="none"
                stroke="#284632"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </Svg>
          )
          
        }}
      />
    </Tabs>
  );
}
