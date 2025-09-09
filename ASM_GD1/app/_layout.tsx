import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerShown: false, // Ẩn header cho tất cả các màn hình
  }}/>;
}
