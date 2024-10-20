import { createTheme, Image, MantineProvider, Text, Title, UnstyledButton } from '@mantine/core';
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
import { IconDotsVertical, IconPlus, IconUsers } from '@tabler/icons-react';

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
            <Group h="100%" px="md" gap={5} align="center" justify="space-between" style={{ flex: 1 }} wrap="nowrap">
              <Group justify="center" gap={5}>
                <Burger opened={opened} onClick={toggle} ref={button} hiddenFrom="sm" size="sm" />
                <Link onClick={() => closeNav()} style={{ display: 'flex', textDecoration: 'none', color: 'white', alignItems: 'center' }} href="/">
                  <Group gap={5}>
                    <Image h={40}
                      w="auto"
                      fit="contain" src={MainLogo} />
                    <Title fontFamily="Anton" order={2}>KTDASH</Title>
                  </Group>
                </Link>
              </Group>
              <Group style={{ color: 'white' }}>
                <UnstyledButton title="Create">
                  <Group gap={2}><IconPlus size={20} stroke={1.5} /> <Text visibleFrom="sm">Create</Text></Group>
                </UnstyledButton>
                <UnstyledButton>
                  <Group gap={2}><IconUsers size={20} stroke={1.5} /> <Text visibleFrom="sm">Pre-Built</Text></Group>
                </UnstyledButton>
                <UnstyledButton>
                  <Group gap={2}><IconDotsVertical size={20} stroke={1.5} /></Group>
                </UnstyledButton>
              </Group>
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
