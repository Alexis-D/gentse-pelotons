import styles from './App.module.css';

import '@mantine/core/styles.css';

import {
  Accordion,
  Alert,
  Group,
  List,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { PersonSimpleBikeIcon } from '@phosphor-icons/react';
import { useLocalStorage } from 'usehooks-ts';
import {
  Club9000Saturday,
  Club9000Thursday,
  Club9000Wednesday,
} from './pelotons/Club9000';
import {
  ScheldePelotonWednesday,
  ScheldePelotonWeekdays,
  ScheldePelotonWeekend,
} from './pelotons/ScheldePeloton';
import { VDH } from './pelotons/VDH';
import { VPeloton } from './pelotons/VPeloton';
import { Facebook, Github, Strava, Website, WhatsApp } from './socials';
import { getBelgiumDay } from './utils';

const App = () => {
  const [opened, setOpened] = useLocalStorage('info-box-opened', true);

  return (
    <div className={styles.main}>
      <Title order={1}>Regular Ghent Pelotons / Group rides</Title>
      <Space h="lg" />
      {opened && (
        <>
          <Alert
            variant="light"
            color="blue"
            title="Intro"
            icon={<PersonSimpleBikeIcon />}
            withCloseButton
            onClose={() => setOpened(false)}
          >
            <Text>
              Just moved to Ghent? Travelling for a bit? If you're looking for a
              group ride, this page tries to list the reliable rides that you
              can easily join any day of the week: no club membership needed,
              show up at the right time and place and ride along.
            </Text>
            <Text>
              Pro-tip: 'tegen' (against) when there's oncoming traffic, 'voor'
              (in-front) when there's something to overtake (pedestrian, slower
              cyclist, ...).
            </Text>
          </Alert>
          <Space h="lg" />
        </>
      )}
      <Accordion defaultValue={getBelgiumDay()}>
        <Accordion.Item value="Monday">
          <Accordion.Control>Monday</Accordion.Control>
          <Accordion.Panel>
            <ScheldePelotonWeekdays />
            <VPeloton />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Tuesday">
          <Accordion.Control>Tuesday</Accordion.Control>
          <Accordion.Panel>
            <ScheldePelotonWeekdays />
            <VPeloton />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Wednesday">
          <Accordion.Control>Wednesday</Accordion.Control>
          <Accordion.Panel>
            <Club9000Wednesday />
            <ScheldePelotonWeekdays />
            <VPeloton />
            <ScheldePelotonWednesday />
            <VDH />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Thursday">
          <Accordion.Control>Thursday</Accordion.Control>
          <Accordion.Panel>
            <ScheldePelotonWeekdays />
            <VPeloton />
            <Club9000Thursday />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Friday">
          <Accordion.Control>Friday</Accordion.Control>
          <Accordion.Panel>
            <ScheldePelotonWeekdays />
            <VPeloton />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Saturday">
          <Accordion.Control>Saturday</Accordion.Control>
          <Accordion.Panel>
            <ScheldePelotonWeekend />
            <VPeloton />
            <Club9000Saturday />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Sunday">
          <Accordion.Control>Sunday</Accordion.Control>
          <Accordion.Panel>
            <ScheldePelotonWeekend />
            <VPeloton />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Other">
          <Accordion.Control>Other</Accordion.Control>
          <Accordion.Panel>
            Other relevant groups rides are around but they aren't as regular
            (or I don't have enough info!):
            <List>
              <List.Item>
                VP2: A slower VPeloton, unsure about the details/regularity.
              </List.Item>
              <List.Item>
                <Group gap={5}>
                  SPB: A slower Scheldepeloton morning ride. See
                  <WhatsApp href="https://chat.whatsapp.com/GLD9sHkSzXaBSShUwHxz0V" />
                  .
                </Group>
              </List.Item>
              <List.Item>
                <Group gap={5}>
                  Pédaleurs de Flandres aka PdF: see
                  <Strava href="https://www.strava.com/clubs/445371" />,
                  <Facebook href="https://www.facebook.com/pedaleurdeflandrescc" />
                  and
                  <Website href="https://www.pedaleurdeflandres.be/pages/cycling-community" />
                  .
                </Group>
              </List.Item>
              <List.Item>
                <Group gap={5}>
                  VELOmoaten: see
                  <Strava href="https://www.strava.com/clubs/velomoaten-154436" />{' '}
                  and
                  <Facebook href="https://www.facebook.com/groups/VELOmoaten/" />
                  .
                </Group>
              </List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Space h="lg" />
      <Group gap="xs">
        If anything is incorrect, or you have more data/group rides to
        contribute, feel free to open an issue on
        <Github
          href="https://github.com/Alexis-D/gentse-pelotons/issues"
          text="Alexis-D/gentse-pelotons"
        />
        .
      </Group>
      <Space h="lg" />
    </div>
  );
};

export default App;
