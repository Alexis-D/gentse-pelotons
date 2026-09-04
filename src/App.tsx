import styles from './App.module.css';

import '@mantine/core/styles.css';

import {
  Accordion,
  Alert,
  Group,
  List,
  SegmentedControl,
  SimpleGrid,
  Space,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ArrowFatRightIcon, PersonSimpleBikeIcon } from '@phosphor-icons/react';
import { getParser } from 'bowser';
import { type ComponentProps, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
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
import { Facebook, Github, Strava, Website } from './ui/socials';
import { getBelgiumDay } from './utils';
import './i18n';
import { useTranslation } from 'react-i18next';

type AccordionPanelProps = ComponentProps<typeof Accordion.Panel>;

const CustomAccordionPanel = ({ children, ...props }: AccordionPanelProps) => (
  <Accordion.Panel {...props}>
    <SimpleGrid cols={{ base: 1, sm: 2 }}>{children}</SimpleGrid>
  </Accordion.Panel>
);

const App = () => {
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [opened, setOpened] = useLocalStorage('info-box-opened', true);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  if (lang !== 'en' && lang !== 'nl') {
    return <Navigate to="/en" replace />;
  }

  const today = getBelgiumDay();

  const parser = getParser(window.navigator.userAgent);
  // do not rely on keepMountedMode=activity as it causes issues when changing visibility
  // unmount to avoid 'Too many active WebGL contexts. Oldest context will be lost' on chrome-based/mobile browsers...
  const accordionProps = {
    keepMounted:
      parser.getPlatformType() === 'desktop' &&
      parser.getPlatformType() === 'Firefox',
    keepMountedMode: 'display-none',
  } as const;

  return (
    <div className={styles.main}>
      <Group justify="space-between">
        <Title order={1}>{t('title')}</Title>
        <SegmentedControl
          defaultValue={lang}
          onChange={(newlang) => navigate(`/${newlang}`)}
          data={[
            { label: '🇬🇧 en', value: 'en' },
            {
              label: (
                <Tooltip label="This is more of a demo/WIP than anything else">
                  <Text>🇳🇱 nl</Text>
                </Tooltip>
              ),
              value: 'nl',
            },
          ]}
        />
      </Group>
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
              (in front/ahead) when there's something to overtake (pedestrian,
              slower cyclist, ...), and 'paaltje(s)' (bollards).
            </Text>
          </Alert>
          <Space h="lg" />
        </>
      )}
      <Accordion defaultValue={today} {...accordionProps}>
        <Accordion.Item value="Monday">
          <Accordion.Control icon={today === 'Monday' && <ArrowFatRightIcon />}>
            {t('monday')}
          </Accordion.Control>
          <CustomAccordionPanel>
            <ScheldePelotonWeekdays />
            <VPeloton />
          </CustomAccordionPanel>
        </Accordion.Item>
        <Accordion.Item value="Tuesday">
          <Accordion.Control
            icon={today === 'Tuesday' && <ArrowFatRightIcon />}
          >
            {t('tuesday')}
          </Accordion.Control>
          <CustomAccordionPanel>
            <ScheldePelotonWeekdays />
            <VPeloton />
          </CustomAccordionPanel>
        </Accordion.Item>
        <Accordion.Item value="Wednesday">
          <Accordion.Control
            icon={today === 'Wednesday' && <ArrowFatRightIcon />}
          >
            {t('wednesday')}
          </Accordion.Control>
          <CustomAccordionPanel>
            <Club9000Wednesday />
            <ScheldePelotonWeekdays />
            <VPeloton />
            <ScheldePelotonWednesday />
            <VDH />
          </CustomAccordionPanel>
        </Accordion.Item>
        <Accordion.Item value="Thursday">
          <Accordion.Control
            icon={today === 'Thursday' && <ArrowFatRightIcon />}
          >
            {t('thursday')}
          </Accordion.Control>
          <CustomAccordionPanel>
            <ScheldePelotonWeekdays />
            <VPeloton />
            <Club9000Thursday />
          </CustomAccordionPanel>
        </Accordion.Item>
        <Accordion.Item value="Friday">
          <Accordion.Control icon={today === 'Friday' && <ArrowFatRightIcon />}>
            {t('friday')}
          </Accordion.Control>
          <CustomAccordionPanel>
            <ScheldePelotonWeekdays />
            <VPeloton />
          </CustomAccordionPanel>
        </Accordion.Item>
        <Accordion.Item value="Saturday">
          <Accordion.Control
            icon={today === 'Saturday' && <ArrowFatRightIcon />}
          >
            {t('saturday')}
          </Accordion.Control>
          <CustomAccordionPanel>
            <ScheldePelotonWeekend />
            <VPeloton />
            <Club9000Saturday />
          </CustomAccordionPanel>
        </Accordion.Item>
        <Accordion.Item value="Sunday">
          <Accordion.Control icon={today === 'Sunday' && <ArrowFatRightIcon />}>
            {t('sunday')}
          </Accordion.Control>
          <CustomAccordionPanel>
            <ScheldePelotonWeekend />
            <VPeloton />
          </CustomAccordionPanel>
        </Accordion.Item>
        <Accordion.Item value="Other">
          <Accordion.Control>{t('other')}</Accordion.Control>
          <Accordion.Panel>
            Other relevant groups rides are around but they aren't as regular
            (or I don't have enough info!):
            <List>
              <List.Item>
                VP2: A slower VPeloton, unsure about the details/regularity.
              </List.Item>
              <List.Item>SPB: A slower Scheldepeloton morning ride.</List.Item>
              <List.Item>
                <Group gap="0.3rem">
                  Pédaleurs de Flandres aka PdF: see
                  <Strava href="https://www.strava.com/clubs/445371" />,
                  <Facebook href="https://www.facebook.com/pedaleurdeflandrescc" />
                  and
                  <Website href="https://www.pedaleurdeflandres.be/pages/cycling-community" />
                  .
                </Group>
              </List.Item>
              <List.Item>
                <Group gap="0.3rem">
                  VELOmoaten: see
                  <Strava href="https://www.strava.com/clubs/velomoaten-154436" />
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
      {t('footer')}{' '}
      <Github
        href="https://github.com/Alexis-D/gentse-pelotons/issues"
        text="Alexis-D/gentse-pelotons"
      />
      .
      <Space h="lg" />
    </div>
  );
};

export default App;
