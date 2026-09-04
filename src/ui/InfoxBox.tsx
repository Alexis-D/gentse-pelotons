import { Alert, Space, Text } from '@mantine/core';
import { PersonSimpleBikeIcon } from '@phosphor-icons/react';
import { useLocalStorage } from 'usehooks-ts';

export const Infobox = () => {
  const [opened, setOpened] = useLocalStorage('info-box-opened', true);
  return (
    opened && (
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
            group ride, this page tries to list the reliable rides that you can
            easily join any day of the week: no club membership needed, show up
            at the right time and place and ride along.
          </Text>
          <Text>
            Pro-tip: 'tegen' (against) when there's oncoming traffic, 'voor' (in
            front/ahead) when there's something to overtake (pedestrian, slower
            cyclist, ...), and 'paaltje(s)' (bollards).
          </Text>
        </Alert>
        <Space h="lg" />
      </>
    )
  );
};
