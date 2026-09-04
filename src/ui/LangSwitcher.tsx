import { SegmentedControl, Text, Tooltip } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';

export const LangSwitcher = () => {
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();

  return (
    <SegmentedControl
      defaultValue={lang}
      onChange={(newlang) => navigate(`/${newlang}/`, { replace: true })}
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
  );
};
