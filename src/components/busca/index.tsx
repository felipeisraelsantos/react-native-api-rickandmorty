import { SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

import { styles } from "./styles";
import { Layout } from "@/components/layout";
import { searchStorage } from "@/storage/busca-storage";

// Função para buscar personagens
const fetchCharacters = async (search: string) => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/?name=${search}`
  );
  return data.results;
};

export default function Busca() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<{ name: string; url: string }[]>([]);

  // Carregar histórico salvo ao abrir a tela
  useEffect(() => {
    const loadHistory = async () => {
      const searches = await searchStorage.get();
      setHistory(searches);
    };
    loadHistory();
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["characters", search],
    queryFn: () => fetchCharacters(search),
    enabled: search.length >= 3, //limita busca a parti de 3 caracteres
  });

  const handleSearchChange = async (text: string) => {
      setSearch(text);

      if (text.length >= 3) {
          try {
        // Busca os personagens apenas se houver 3 ou mais caracteres
        const results = await fetchCharacters(text);

        if (results.length > 0) {
          await searchStorage.save({ name: text, url: `/busca/${text}` });

          const historico = await searchStorage.get();
          setHistory(historico);
        }
      } catch (error) {
        Alert.alert("Erro", `Erro ao salvar a pesquisa: ${String(error)}`);
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="rgba(244, 225, 82, 0.967)" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Erro ao carregar personagens.</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSearch(text)} // Permite tentar nova pesquisa
          />
          <Text style={styles.loadingText}>Tente novamente...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back" size={32} color={"#fff"} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar Personagem..."
        value={search}
        onChangeText={handleSearchChange}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.characterCard}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <Text style={styles.characterName}>{item.name}</Text>
            <Text style={styles.characterSpecies}>{item.species}</Text>
          </View>
        )}
      />
    </Layout>
  );
}
