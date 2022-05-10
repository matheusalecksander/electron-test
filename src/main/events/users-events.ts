import { ipcMain } from 'electron'
import { prismaClient } from 'utils/prismaClient'

import { IPC } from 'shared/constants'

export class UsersEvents {
  async createUser() {
    const listenerChannel = IPC.USERS.CREATE_USER
    const senderChannel = IPC.USERS.USER_CREATED

    ipcMain.on(listenerChannel, async (event, args) => {
      const user = await prismaClient.user.create({
        data: {
          name: args.name,
        },
      })

      event.sender.send(senderChannel, {
        msg: `Usuário criado com sucesso`,
        user,
      })
    })
  }

  async getUsers() {
    const listenerChannel = IPC.USERS.REQUEST_USERS
    const senderChannel = IPC.USERS.SEND_USERS

    ipcMain.handle(listenerChannel, async () => {
      const users = await prismaClient.user.findMany()

      return users
    })

    /*  ipcMain.on(listenerChannel, async (event, args) => {
      const users = await prismaClient.user.findMany()

      event.sender.send(senderChannel, {
        msg: `Usuários enviados com sucesso`,
        users,
      })
    }) */
  }
}
