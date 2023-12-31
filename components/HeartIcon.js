import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


function HeartIcon() {
    const navigation = useNavigation();
    const handleHeartPress = () => {
        navigation.navigate('Favourites');
    };
    return (
        <Pressable onPress={handleHeartPress}>
            <Icon name="heart" size={25} color="#DE2E4B" style={{ marginRight: 15 }} />
        </Pressable>
    )
}

export default HeartIcon;

