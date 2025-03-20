import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor: '#ffff',
    },
    searchInput: {
        marginTop: "5%",
        height: 60,
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 15,
        width: "100%",
        color: "#f0f0f0"
    },
    characterCard: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },
    characterImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    characterName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    characterSpecies: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#fff'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
