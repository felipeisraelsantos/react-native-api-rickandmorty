import { Button } from "@/components/button";
import { router } from "expo-router";
import { Text } from "react-native";

import { Layout } from "@/components/layout";
import { styles } from "@/styles";

export default function Index() {
  return (
      <Layout>
        <Text style={styles.text}>
          Rick and Morty
        </Text >
        <Button
          name="Episodeos"
          onPress={() => {
            router.navigate("/episodeos");
          }}
        />

        <Button
          name="Busca"
          onPress={() => {
            router.navigate("/busca");
          }}
        />
      </Layout>
  );
}
