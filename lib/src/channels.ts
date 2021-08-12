export const CHANNELS = {
  windowService: {
    auth: 'WINDOW_MANAGER/AUTH',
    main: 'WINDOW_MANAGER/MAIN',
    userAccountManager: 'WINDOW_MANAGER/USER_ACCOUNT_MANAGER',
    close: 'WINDOW_MANAGER/CLOSE',
  },
  iconService: {
    getFromUrl: 'ICON_SERVICE/GET_FROM_URL',
  },
  cipherService: {
    cipher: 'CIPHER_SERVISE/CIPHER',
    decipher: 'CIPHER_SERVISE/DECIPHER',
  },
  keyService: {
    find: 'KEY_SERVICE/FIND',
    create: 'KEY_SERVICE/CREATE',
    set: 'KEY_SERVICE/SET',
    export: 'KEY_SERVICE/EXPORT',
    import: 'KEY_SERVICE/IMPORT',
  },
  updateMessageService: {
    onProgress: 'UPDATE_MESSAGE_SERVICE/ON_PROGRESS',
  },
};
