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
            <Icon name="plus" size={22} color="#DE2E4B" style={{ marginRight: 10 }} />
        </Pressable>
    )
}

export default PlusIcon;