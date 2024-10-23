import { Button, Card, Stack } from '@mui/material';
import axios from 'axios';
import { set } from 'nprogress';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import LinearWithValueLabel from 'src/components/progress-bar-label/LinearWithValueLabel';
import axiosInstance from 'src/utils/axios';
import { api } from 'src/config';

export default function Format() {
  const [isLoadingDownloadFormat, setIsLoadingDownloadFormat] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setProgressInfo] = useState<string>('PROGRESS');
  const [step, setStep] = useState({
    currentStep: 0,
    totalStep: 0,
    nameStep: '',
  });

  async function processDownload({
    url,
    limit,
    countProgress,
    pageDivider,
    page,
    divider,
    index,
    total,
  }: {
    url: string;
    limit: number;
    countProgress: number;
    pageDivider: number;
    page: number;
    divider: number;
    index: number;
    total: number;
  }) {
    const response = await axiosInstance.get(url, {
      params: {
        page: index,
      },
    });

    if (pageDivider < 1) {
      countProgress += pageDivider * limit;
    } else if (index === page) {
      countProgress = total;
    } else {
      countProgress = limit * index;
    }

    setProgress(divider * index);
    setProgressInfo(`Data: ${parseInt(String(countProgress))}/${total}`);

    return response;
  }

  async function loopSteps(steps: any[]) {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setStep({
        currentStep: i + 1,
        totalStep: steps.length,
        nameStep: step.name,
      });

      const total = step.total;
      const limit = step.limit;
      const page = Math.ceil(total / limit);
      const pageDivider = total / page;
      const divider = 100 / page;

      let countProgress = 0;
      for (let index = 1; index <= page; index++) {
        await processDownload({
          url: step.url,
          limit,
          countProgress,
          pageDivider,
          page,
          divider,
          index,
          total,
        });
      }

      if (i === steps.length - 1) {
        setTimeout(() => {
          setProgress(0);
          setProgressInfo('PROGRESS');
          window.open(api.basepath.main + `download?file_name=temp/upload_format.xlsx`);
        }, 2000);
      }
    }
  }

  const handleDownloadFormat = async () => {
    setIsLoadingDownloadFormat(true);
    try {
      const response: any = await axiosInstance.get('download-format');
      loopSteps(response);
    } catch (error) {
    } finally {
      setIsLoadingDownloadFormat(false);
    }
  };

  return (
    <Page title="WKOWKWO">
      <Card sx={{ padding: '20px' }}>
        <h1>Format</h1>
        <LinearWithValueLabel progress={progress} progressInfo={progressInfo} />
        <Stack>
          {step.currentStep}/{step.totalStep} {step.nameStep}
        </Stack>
        <Button variant="contained" onClick={handleDownloadFormat}>
          Download Format
        </Button>
      </Card>
    </Page>
  );
}
