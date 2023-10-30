import React, { useState } from 'react';
import Page from 'src/components/Page';
import { Button, Card } from '@mui/material';
import LinearWithValueLabel from 'src/components/progress-bar-label/LinearWithValueLabel';
import { countDownload, progressDownload } from 'src/api_handler/report';
import { api } from 'src/config';

export default function DownloadPage() {
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setProgressInfo] = useState<string>('PROGRESS');

  const handleDownload = async () => {
    const { total, limit } = (await countDownload()) as any;
    const page_divider = +total / +limit;
    const page = Math.ceil(page_divider);
    const divider = 100 / page;
    let countProgress = 0;
    for (let index = 1; index <= page; index++) {
      const response = await progressDownload({ page: index });
      if (page_divider < 1) {
        countProgress += page_divider * limit;
      } else if (index === page) {
        countProgress = page_divider * limit;
      } else {
        countProgress = limit * index;
      }
      setProgressInfo(`Data: ${parseInt(String(countProgress))}/${total}`);
      setProgress(divider * index);
      console.log({ index, page, percetage: divider * index });
      if (index === page) {
        const { file_name } = response as any;
        console.log({ file_name });
        window.open(api.basepath.main + `download?file_name=${file_name}`);
      }
    }

    setTimeout(() => {
      setProgress(0);
      setProgressInfo('PROGRESS');
    }, 2000);
  };

  return (
    <Page title="WKOWKWO">
      <Card sx={{ padding: '20px' }}>
        <LinearWithValueLabel progress={progress} progressInfo={progressInfo} />
        <Button onClick={handleDownload} variant="contained">
          Download
        </Button>
      </Card>
    </Page>
  );
}
