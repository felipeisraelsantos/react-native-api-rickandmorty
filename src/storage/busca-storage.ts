import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_STORAGE_KEY = "search-storage"

type SearchStorage = {
    name: string
    url: string
}

async function get(): Promise<SearchStorage[]> {
    const storage = await AsyncStorage.getItem(SEARCH_STORAGE_KEY);
    return storage ? JSON.parse(storage) : [];
}

async function save(newSearch: SearchStorage) {
    try {
        let storage = await get()

        // Remove duplicatas
        storage = storage.filter((item) => item.name !== newSearch.name);

        // Adiciona nova pesquisa no topo
        storage.unshift(newSearch);

        // Limitando a 5 últimas buscas para mão sobrecarregar o storage
        if (storage.length > 5) {
            storage.pop();
        }

        await AsyncStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(storage));
    } catch (error) {
        throw error
    }
}

async function clear() {
    try {
      await AsyncStorage.removeItem(SEARCH_STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
    }
  }

export const searchStorage = { get, save, clear }