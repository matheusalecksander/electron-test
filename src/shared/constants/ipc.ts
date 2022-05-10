export const IPC = {
  WINDOWS: {
    ABOUT: {
      CREATE: 'windows: create-about-window',
      WHEN_CLOSE: 'windows: when-about-window-close',
    },
  },
  EVENTS: {
    SAY_HELLO_FROM_MAIN: 'events: hello-from-main!',
    SAY_HELLO_FROM_RENDERER: 'events: hello-from-renderer!',
  },
  USERS: {
    CREATE_USER: 'user: create_user',
    USER_CREATED: 'user: user_created',
    REQUEST_USERS: 'user: request_users',
    SEND_USERS: 'user: send_users',
  },
}
