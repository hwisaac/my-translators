'use client';
import TranslatorBlock from '@/components/TranslatorBlock';
import {
  useMtDeepl,
  useMtGpt35_1106,
  useMtGpt40,
  useMtKeti,
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

interface IStackData {
  sourceText: string;
  humanTranslation: string;
  mtPapago: string;
  mtDeepl: string;
  mtGpt35: string;
  mtGpt40: string;
  mtKeti0: string;
}
export default function Home() {
  const [sourceText, setSourceText] = useState('');
  const [isTranslateButtonActive, setIsTranslateButtonActive] = useState(false);
  const [stackData, setStackData] = useState<IStackData[]>([]);

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
    isFetching: isFetchingPapago,
    refetch: refetchPapago,
  } = useMtPapago(sourceText);

  const {
    data: mtDeepl,
    isFetching: isFetchingDeepl,
    refetch: refetchDeepl,
  } = useMtDeepl(sourceText);

  const {
    data: mtGpt35,
    isFetching: isFetchingGpt35,
    refetch: refetchGpt35,
  } = useMtGpt35_1106(sourceText);
  const {
    data: mtGpt40,
    isFetching: isFetchingGpt40,
    refetch: refetchGpt40,
  } = useMtGpt40(sourceText);
  const {
    data: mtKeti0,
    isFetching: isFetchingKeti0,
    refetch: refetchKeti0,
  } = useMtKeti(sourceText);

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
    if (turnOn.mtKeti0) {
      refetchKeti0();
    }
  };

  function onCopy() {
    navigator.clipboard
      .writeText(JSON.stringify(stackData, null, 2))
      .then(() => {
        console.log('객체 복사됨');
      })
      .catch((error) => {
        // Optional: Handle the error case
        console.error('객체 복사 실패: ', error);
      });
  }

  const onEvaluation = () => {};
  const onStack = () => {
    setStackData((prev) => {
      const newStackData = [...prev];
      newStackData.push({
        sourceText,
        humanTranslation,
        mtDeepl,
        mtGpt35,
        mtGpt40,
        mtPapago,
        mtKeti0,
      });

      return newStackData;
    });
  };

  // CSV 파일 다운로드 함수
  function downloadCSV(data: any[]) {
    const csvString = convertToCSV(data);
    // UTF-8 BOM 추가
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);

    const blob = new Blob([bom, csvString], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className='space-y-10 divide-y-2 p-2 '>
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
          <FormControlLabel
            control={
              <Switch
                size='small'
                onClick={() =>
                  setTurnOn((prev) => ({ ...prev, mtKeti0: !prev.mtKeti0 }))
                }
              />
            }
            label='Keti-0'
          />
        </FormGroup>
      </section>
      {/* <section className='border flex flex-col gap-3'></section> */}
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
          <button
            disabled
            className='border p-1 rounded text-gray-400 cursor-not-allowed'
            onClick={onEvaluation}>
            평가하기
          </button>
        </section>
      </div>

      <section className='flex flex-col gap-3'>
        <TranslatorBlock
          title='Papago'
          text={mtPapago}
          isLoading={isFetchingPapago}
        />

        <TranslatorBlock
          title='DeepL'
          text={mtDeepl}
          isLoading={isFetchingDeepl}
        />
        <TranslatorBlock
          title='GPT 3.5(turbo-1106, 16k tokens)'
          text={mtGpt35}
          isLoading={isFetchingGpt35}
        />
        <TranslatorBlock
          title='GPT 4.0(0613, 8k tokens)'
          text={mtGpt40}
          isLoading={isFetchingGpt40}
        />
        <TranslatorBlock
          title='keti-0'
          text={mtKeti0}
          isLoading={isFetchingKeti0}
        />
      </section>

      <button
        className='border bg-orange-400 text-white p-3 rounded hover:opacity-50 active:scale-90 transition-all'
        onClick={onCopy}>
        Copy
      </button>
      <button
        className='border bg-orange-400 text-white p-3 rounded hover:opacity-50 active:scale-90 transition-all'
        onClick={onStack}>
        Stack
      </button>
      <button
        className='border bg-orange-400 text-white p-3 rounded hover:opacity-50 active:scale-90 transition-all'
        onClick={() => downloadCSV(stackData)}>
        Download(.csv)
      </button>
      <pre>{JSON.stringify(stackData, null, 2)}</pre>
    </div>
  );
}

// 배열을 CSV 문자열로 변환하는 함수
function convertToCSV(arr: string[]) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((row) => {
      return Object.values(row)
        .map((value) => {
          if (typeof value === 'string') {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(',');
    })
    .join('\n');
}

