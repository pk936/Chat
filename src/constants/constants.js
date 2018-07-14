/**
 * Created by piyush on 7/13/18.
 */

const BASE_URL = 'http://18.221.153.152:6767';

const API_BASE_URL = `${BASE_URL}/api/v1/`;

const appUrl = {
    LOGIN_URL                : API_BASE_URL + 'login',
    GOOGLE_URL               : API_BASE_URL + 'googlelogin',
    TOKEN_VERIFY_URL         : API_BASE_URL + 'verification',
    TOKEN_RESEND_URL         : API_BASE_URL + 'resend-verification-token',
    USER_DETAILS             : API_BASE_URL + 'user/',
    FETCH_USERS              : API_BASE_URL + 'users',
    FETCH_TEAMS              : API_BASE_URL + 'teams',
    PEOPLE_URL               : API_BASE_URL + 'users',
    TEAM_URL                 : API_BASE_URL + 'teams',
    SOCKET_URL               : BASE_URL,
    CHAT_URL                 : API_BASE_URL + 'conversations/',
    NOTIFICATIONS_URL        : API_BASE_URL + 'notifications',
    READ_NOTIFICATIONS_URL   : API_BASE_URL + 'notificationread',
    USER_ROLE                : API_BASE_URL + 'roles',
    CONVERSATIONS            : API_BASE_URL + 'conversations',
    ACCOUNTS                 : API_BASE_URL + 'accounts',
    PROFILE                  : API_BASE_URL + 'profile',
    CUSTOM_NOTIFICATIONS     : API_BASE_URL + 'custom_notification_templates',
    SEARCH_URL               : API_BASE_URL + 'search',
};

export default appUrl;



