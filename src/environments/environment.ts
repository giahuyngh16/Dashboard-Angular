export const environment = {
  developer: true,
  production: false,
  uat: false,
  apiHost: 'https://localhost:5001',
  apiHostInsider: '',
  authoritySetting: {
    authority: '',
    client_id: '',
    redirect_uri: '',
    response_type: 'id_token token',
    scope: '',
    post_logout_redirect_uri: '',
    loadUserInfo: true,
    silent_redirect_uri: '',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
  },
};
