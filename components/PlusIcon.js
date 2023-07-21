import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


function PlusIcon() {
    const navigation = useNavigation();
    const handleHeartPress = () => {
        navigation.navigate('AddMovie');
    };
    return (
        <Pressable onPress={handleHeartPress}>
            <Icon name="plus" size={24} color="#DE2E4B" style={{ marginLeft: 15 }} />
        </Pressable>
    )
}

export default PlusIcon;