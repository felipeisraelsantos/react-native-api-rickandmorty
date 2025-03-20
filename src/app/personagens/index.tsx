import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import { Container } from "@/styles/personagens";

export default function Personagens() {
  type Character = {
    id: number;
    name: string;
    image: string;
    url: string;
    air_date: string;
    species: string;
    origin:{
        name: string
    }
  };

  const { id } = useLocalSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://rickandmortyapi.com/api/episode/${id}`)
        .then(async (response) => {
          const characterUrls = response.data.characters;

          // Extrai apenas os IDs dos personagens
          const characterIds = characterUrls.map((url: string) =>
            url.split("/").pop()
          );

        //   busca informações dos personagens
          const apiUrl = `https://rickandmortyapi.com/api/character/${characterIds.join(",")}`;
          const characterResponse = await axios.get(apiUrl);

          setCharacters(
            Array.isArray(characterResponse.data)
              ? characterResponse.data
              : [characterResponse.data]
          );
        })
        .catch((error) => {
          console.error("Error fetching characters: ", error);
        });
    }
  }, [id]);

  const styles = StyleSheet.create({
    row: {
      alignItems: "center",
      padding: 3,
      flexWrap: "wrap"
    },
    characterCard: {
      margin: "1%",
      color: "#080000",
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: 20,
      flexDirection: "row",
      padding: 5
    },
    characterImage: {
      width: "65%",
      height: "100%",
      borderRadius: 10
    },
    characterName: {
      color: "#000",
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 5,
      textAlign: "center",
      flexWrap: "wrap",
      width: 100,
    },
  });

  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back" size={32} color={"#fff"} />
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={characters}
        renderItem={({ item }) => (
            <View style={styles.characterCard}>
                <Image
                source={{ uri: item.image}}
                style={styles.characterImage}
                />
              <View style={styles.row} >
                <Text style={styles.characterName}>Nome {item.name}</Text>
                <Text style={styles.characterName}>Espécie {item.species}</Text>
                <Text style={styles.characterName}>Origem {item.origin.name != 'unknown' ? item.origin.name : ''}</Text>
            </View>

          </View>
        )}
      />
    </Container>
  );
}
