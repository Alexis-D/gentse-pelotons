import styles from './App.module.css';

import '@mantine/core/styles.css';

import {
  Accordion,
  Grid,
  Group,
  List,
  SimpleGrid,
  Space,
  Title,
} from '@mantine/core';
import { ArrowFatRightIcon } from '@phosphor-icons/react';
import { getParser } from 'bowser';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Infobox } from './ui/InfoxBox';
import { LangSwitcher } from './ui/LangSwitcher';
import { Facebook, Github, Strava, Website } from './ui/socials';
import { getBelgiumDay } from './utils';

type AccordionPanelProps = ComponentProps<typeof Accordion.Panel>;

const CustomAccordionPanel = ({ children, ...props }: AccordionPanelProps) => (
  <Accordion.Panel {...props}>
    <SimpleGrid cols={{ base: 1, sm: 2 }}>{children}</SimpleGrid>
  </Accordion.Panel>
);

export const App = () => {
  const { t } = useTranslation();

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
      <Grid>
        <Grid.Col span={{ base: 12, sm: 10 }} order={{ base: 1, sm: 0 }}>
          <Title order={1}>{t('title')}</Title>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, sm: 2 }}
          style={{ textAlign: 'right' }}
          order={{ base: 0, sm: 1 }}
        >
          <LangSwitcher />
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <Infobox />
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
