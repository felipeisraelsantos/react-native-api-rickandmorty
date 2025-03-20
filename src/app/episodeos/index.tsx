import React from "react";
import { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import { Button } from "@/components/button";
import { Layout } from "@/components/layout";

export default function Episodeos() {
  type Episode = {
    id: number;
    name: string;
    episode: string;
    url: string;
    air_date: string;
  };

  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((response) => {
        setEpisodes(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching episodes: ", error);
      });
  }, []);

  return (
    <Layout >
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back" size={32} color={"#fff"} />
      </TouchableOpacity>

      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            name={item.episode}
            onPress={() => {
              router.navigate(`/personagens?id=${item.id}`);
            }}
          />
        )}
      />
    </ Layout>
  );
}
