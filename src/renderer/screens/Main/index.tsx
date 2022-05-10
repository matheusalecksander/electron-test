import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Container, Heading, Button } from 'renderer/components'
import { useWindowStore } from 'renderer/store'

interface IUser {
  name: string
  id: string
}

export function MainScreen() {
  const { App } = window // The "App" comes from the bridge

  const [name, setName] = useState<string>()
  const [users, setUsers] = useState<IUser[]>([])
  const [newUser, setNewUser] = useState<number>(0)

  const navigate = useNavigate()
  const store = useWindowStore().about

  useEffect(() => {
    App.sayHelloFromBridge()

    App.whenAboutWindowClose(({ message }) => {
      console.log(message)

      store.setAboutWindowState(false)
    })
  }, [])

  useEffect(() => {
    getUsers()
  }, [newUser])

  function openAboutWindow() {
    App.createAboutWindow()
    store.setAboutWindowState(true)
  }

  function sendMessage() {
    App.sayHelloFromRenderer()
  }

  async function createUser() {
    await App.createUser(name).then(() => setNewUser((prev) => prev++))
  }

  async function getUsers() {
    const allUsers = await App.getUsers()

    setUsers(allUsers)
  }

  return (
    <Container>
      <Heading>Hi, {App.username || 'there'}! 👋</Heading>

      <h2>It's time to build something awesome! ✨</h2>

      <nav>
        <Button
          className={store.isOpen ? 'disabled' : ''}
          onClick={openAboutWindow}
        >
          Open About Window
        </Button>

        <Button onClick={() => navigate('anotherScreen')}>
          Go to Another screen
        </Button>
      </nav>
      <Button onClick={sendMessage}>Mande uma comunicação</Button>

      <input
        placeholder="Nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={createUser}>Create user</Button>

      <Button onClick={getUsers}>Get Users</Button>

      <ul>
        {users.length > 0 &&
          users.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </Container>
  )
}
