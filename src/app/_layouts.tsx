import { Stack } from "expo-router";

export default function Layout() {
  const backgroundColor = "#09090B";

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Index" }} />
      <Stack.Screen name="personagens" options={{ title: "Personagens" }} />
      <Stack.Screen name="episodeos" options={{ title: "Episodeos" }} />
      <Stack.Screen name="busca" options={{ title: "Busca" }} />
    </Stack>
  );
}
