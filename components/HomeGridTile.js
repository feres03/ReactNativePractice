import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


function HomeGridTile() {
    const navigation = useNavigation();
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Searching for a movie using filter methode
    const handleSearch = (text) => {
        if (text === '') {
            setSearchQuery('');
            fetchMovies();
        } else {
            setSearchQuery(text);
            const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase()));
            setMovies(filteredMovies);
        }

    };

    // function to fetch the movies-list  from the API
    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                'https://api.themoviedb.org/3/movie/top_rated?api_key=ce368a0d5d44ebad5e11cf907fd4340d'
            );
            const films = response.data.results;
            setMovies(films);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // Navigate to the movie details screen
    const handleMoviePress = (movie) => {
        navigation.navigate('Details', { movie });
    };

    //Rendering data
    const renderItem = ({ item }) => {
        const imageUri = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

        return (
            <Pressable style={styles.gridItem} onPress={() => handleMoviePress(item)}>
                <Image style={styles.image} source={{ uri: imageUri }} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.average}>{item.vote_average}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Icon name="search" size={18} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={movies}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>

    );
};


export default HomeGridTile;

const styles = StyleSheet.create({
    searchIcon: {
        marginRight: 8,
        marginHorizontal: 10,
        color: 'gray'
    },
    searchBar: {
        flexDirection: 'row',
        height: 40,
        margin: 10,
        padding: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        backgroundColor: '#EED7C5',
        borderColor: 'gray',
        borderRadius: 20,
    },
    container: {
        backgroundColor: '#B36A5E'
    },

    gridItem: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#EFD7C5',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 6,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    average: {
        fontSize: 14,
        textAlign: 'center',
    },

})
