import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


function HeartIcon() {
    const navigation = useNavigation();
    const handleHeartPress = () => {
        navigation.navigate('Favourites');
    };
    return (
        <Pressable onPress={handleHeartPress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            <Icon name="heart" size={22} color="#DE2E4B" style={{ marginRight: 10 }} />
        </Pressable>
    )
}

export default HeartIcon;