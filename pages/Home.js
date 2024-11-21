import { Button} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
      <Button
        title="Admin View"
        onPress={() =>
          navigation.navigate('AdminView', {})
        }
      />
    );
  };

export default HomeScreen;