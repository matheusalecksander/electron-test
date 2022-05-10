import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export async function sayHelloFromRenderer() {
  const listenerChannel = IPC.EVENTS.SAY_HELLO_FROM_MAIN
  const senderChannel = IPC.EVENTS.SAY_HELLO_FROM_RENDERER

  ipcRenderer.send(senderChannel, 'Olá, eu sou o processo de renderização')

  ipcRenderer.once(listenerChannel, (event, args) => {
    console.log({
      msg: `Evento recebido com sucesso`,
      args,
    })
  })
}
