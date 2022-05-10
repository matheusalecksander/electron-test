import { ipcMain } from 'electron'

import { IPC } from 'shared/constants'

export async function sayHelloFromIPC() {
  const listenerChannel = IPC.EVENTS.SAY_HELLO_FROM_RENDERER
  const senderChannel = IPC.EVENTS.SAY_HELLO_FROM_MAIN

  ipcMain.on(listenerChannel, (event, args) => {
    console.log({ alert: `Evento recebido com sucesso`, args })
    event.sender.send(senderChannel, 'Olá, eu sou o processo principal')
  })
}
