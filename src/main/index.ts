import { app } from 'electron'

import { makeAppSetup, makeAppWithSingleInstanceLock } from './factories'
import { MainWindow, registerAboutWindowCreationByIPC } from './windows'
import { sayHelloFromIPC } from './events/say-hello-event'
import { UsersEvents } from './events/users-events'

makeAppWithSingleInstanceLock(async () => {
  const usersEvents = new UsersEvents()
  await app.whenReady()
  await makeAppSetup(MainWindow)

  registerAboutWindowCreationByIPC()
  await sayHelloFromIPC()
  await usersEvents.createUser()
  await usersEvents.getUsers()
})
