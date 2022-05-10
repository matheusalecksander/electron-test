import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export async function createUser(name: string) {
  const listenerChannel = IPC.USERS.USER_CREATED
  const senderChannel = IPC.USERS.CREATE_USER

  ipcRenderer.send(senderChannel, { name })
  ipcRenderer.once(listenerChannel, (event, args) => {
    console.log(args)
  })
}

export async function getUsers(): Promise<any[]> {
  const listenerChannel = IPC.USERS.SEND_USERS
  const senderChannel = IPC.USERS.REQUEST_USERS

  const users = await ipcRenderer.invoke(senderChannel)

  return users

  /* ipcRenderer.send(senderChannel)
  ipcRenderer.once(listenerChannel, async (event, args) => {
    console.log(args)
    args.users.forEach((element) => {
      users.push(element)
      console.log(element)
    })
  }) */
}
