/**
 * Created by piyush on 7/15/18.
 */
import {AsyncStorage} from 'react-native';
const HeadersBearer = {'Authorization':'Bearer ' + AsyncStorage.getItem('jwt')}
export default HeadersBearer;