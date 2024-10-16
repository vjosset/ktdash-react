import { createTheme, Image, MantineProvider, Title } from '@mantine/core';
import { AppShell, Burger, Group } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { NavbarSimple } from './components/Navbar';
import Root from './pages';
import MainLogo from './assets/icon-96x96.png';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';
import { Link } from 'wouter';
import { useRef } from 'react';

const theme = createTheme({
  fontFamily: 'Oswald, "Arial Narrow", Roboto, sans-serif',
  primaryColor: 'orange',
});

function App() {
  const [opened, { toggle }] = useDisclosure();
  const button = useRef(null);

  // Stupid ref hack because you can't manually close the nav :|
  const closeNav = () => {
    if (opened) {
      button?.current?.click();
    }
  }

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Notifications />
      <ModalsProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          padding={0}
        >
          <AppShell.Header>
            <Group h="100%" px="md" gap={5}>
              <Burger opened={opened} onClick={toggle} ref={button} hiddenFrom="sm" size="sm" />
              <Link onClick={() => closeNav()} style={{ display: 'flex', textDecoration: 'none', color: 'white' }} href="/">
                <Group gap={5}>
                  <Image h={50}
                    w="auto"
                    fit="contain" src={MainLogo} />
                  <Title fontFamily="Anton" order={1}>KTDASH</Title>
                </Group>
              </Link>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <NavbarSimple close={closeNav} />
          </AppShell.Navbar>
          <AppShell.Main>
            <Root />
          </AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
