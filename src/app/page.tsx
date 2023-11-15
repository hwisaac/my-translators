'use client';
import TranslatorBlock from '@/components/TranslatorBlock';
import {
  useMtDeepl,
  useMtGpt35_1106,
  useMtGpt40,
  useMtPapago,
} from '@/queries';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useEffect, useState } from 'react';

interface ITurnOn {
  mtPapago: boolean;
  mtDeepl: boolean;
  mtGpt35: boolean;
  mtGpt40: boolean;
  mtKeti0: boolean;
}

export default function Home() {
  const [sourceText, setSourceText] = useState('');
  const [isTranslateButtonActive, setIsTranslateButtonActive] = useState(false);

  const [humanTranslation, setHumanTranslation] = useState('');

  const [turnOn, setTurnOn] = useState<ITurnOn>({
    mtPapago: false,
    mtDeepl: false,
    mtGpt35: false,
    mtGpt40: false,
    mtKeti0: false,
  });

  const {
    data: mtPapago,
    isFetching: isLoadingPapago,
    refetch: refetchPapago,
  } = useMtPapago(sourceText);

  const {
    data: mtDeepl,
    isFetching: isLoadingDeepl,
    refetch: refetchDeepl,
  } = useMtDeepl(sourceText);

  const {
    data: mtGpt35,
    isFetching: isLoadingGpt35,
    refetch: refetchGpt35,
  } = useMtGpt35_1106(sourceText);
  const {
    data: mtGpt40,
    isFetching: isLoadingGpt40,
    refetch: refetchGpt40,
  } = useMtGpt40(sourceText);

  useEffect(() => {
    const isAnyTrue = Object.values(turnOn).some((value) => value);
    setIsTranslateButtonActive(isAnyTrue);
  }, [turnOn]);

  const onTranslate = async () => {
    if (turnOn.mtPapago) {
      refetchPapago();
    }

    if (turnOn.mtDeepl) {
      refetchDeepl();
    }

    if (turnOn.mtGpt35) {
      refetchGpt35();
    }

    if (turnOn.mtGpt40) {
      refetchGpt40();
    }
  };

  function onTest() {
    console.log({
      sourceText,
      humanTranslation,
      mtDeepl,
      mtGpt35,
      mtGpt40,
      mtPapago,
    });
  }

  return (
    <div className='space-y-10 divide-y-2 divide-cyan-600'>
      <section>
        <FormGroup sx={{ px: 5, flexDirection: 'row', gap: 5 }}>
          <FormControlLabel
            control={
              <Switch
                size='small'
                onClick={() =>
                  setTurnOn((prev) => ({ ...prev, mtPapago: !prev.mtPapago }))
                }
              />
            }
            label='Papago'
          />
          <FormControlLabel
            control={
              <Switch
                size='small'
                onClick={() =>
                  setTurnOn((prev) => ({ ...prev, mtDeepl: !prev.mtDeepl }))
                }
              />
            }
            label='Deepl'
          />
          <FormControlLabel
            control={
              <Switch
                size='small'
                onClick={() =>
                  setTurnOn((prev) => ({ ...prev, mtGpt35: !prev.mtGpt35 }))
                }
              />
            }
            label='GPT 3.5-turbo'
          />
          <FormControlLabel
            control={
              <Switch
                size='small'
                onClick={() =>
                  setTurnOn((prev) => ({ ...prev, mtGpt40: !prev.mtGpt40 }))
                }
              />
            }
            label='GPT 4.0'
          />
        </FormGroup>
      </section>
      <section className='border flex flex-col gap-3'></section>
      <div className='flex'>
        <section className='flex flex-col max-w-sm'>
          <h3 className='font-semibold text-cyan-800'>English</h3>
          <textarea
            className='border'
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
          />
          <button
            className={`${
              isTranslateButtonActive
                ? 'bg-red-400 text-white'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            onClick={onTranslate}>
            번역하기
          </button>
        </section>
        <section>
          <h3 className='font-semibold text-cyan-800'>인간 번역</h3>
          <textarea
            className='border'
            value={humanTranslation}
            onChange={(event) => setHumanTranslation(event.target.value)}
          />
        </section>
      </div>

      <TranslatorBlock
        title='Papago'
        text={mtPapago}
        isLoading={isLoadingPapago}
      />

      <TranslatorBlock
        title='DeepL'
        text={mtDeepl}
        isLoading={isLoadingDeepl}
      />
      <TranslatorBlock
        title='GPT 3.5(turbo-1106, 16k tokens)'
        text={mtGpt35}
        isLoading={isLoadingGpt35}
      />
      <TranslatorBlock
        title='GPT 4.0(0613, 8k tokens)'
        text={mtGpt40}
        isLoading={isLoadingGpt40}
      />

      <button onClick={onTest}>test btn</button>
      <pre>
        {JSON.stringify(
          {
            sourceText,
            humanTranslation,
            mtDeepl,
            mtGpt35,
            mtGpt40,
            mtPapago,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}

