import AsyncStorage from '@react-native-async-storage/async-storage';
import { reloadAsync } from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { Button, I18nManager, Text } from 'react-native';
import '../../translation/language-detector';
import { Container} from './Home.styles';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  
  const clearAsyncStorage = async() => {
    await AsyncStorage.clear();
    await reloadAsync();
  }
  return (
    <Container>
      <Text>{t('txt_home_demo_message')}</Text>
      <Button
        title={t('txt_change_language')}
        onPress={() =>
          i18n
            .changeLanguage(i18n.language === 'es' ? 'en' : 'es')
            .then(async () => {
              await I18nManager.forceRTL(i18n.dir() === 'rtl');
            })
            .then(() => reloadAsync())
        }
      />
      <Button
        title={t('txt_clear_storage')}
        onPress={clearAsyncStorage}
      />
    </Container>
  );
}

