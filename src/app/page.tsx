'use client';
import TranslatorBlock from '@/components/TranslatorBlock';
import {
  useMtDeepl,
  useMtGoogle,
  useMtGpt35_1106,
  useMtGpt40,
  useMtGpt4o,
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
  mtGpt4o: boolean;
  mtGoogle: boolean;
}

interface IStackData {
  sourceText: string;
  humanTranslation: string;
  mtPapago: string;
  mtDeepl: string;
  mtGpt35: string;
  mtGpt40: string;
  mtKeti0: string;
  mtGpt4o: string;
  mtGoogle: string;
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
    mtGpt4o: false,
    mtGoogle: false,
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
    data: mtGpt4o,
    isFetching: isFetchingGpt4o,
    refetch: refetchGpt4o,
  } = useMtGpt4o(sourceText);
  const {
    data: mtKeti0,
    isFetching: isFetchingKeti0,
    refetch: refetchKeti0,
  } = useMtKeti(sourceText);
  const {
    data: mtGoogle,
    isFetching: isFetchingGoogle,
    refetch: refetchGoogle,
  } = useMtGoogle(sourceText);
  console.log('mtGoogle', mtGoogle);

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
    if (turnOn.mtGpt4o) {
      refetchGpt4o();
    }
    if (turnOn.mtKeti0) {
      refetchKeti0();
    }
    if (turnOn.mtGoogle) {
      refetchGoogle();
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
        mtGpt4o,
        mtGoogle,
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
    <div className='space-y-10 divide-y-2 p-2'>
      <section className='w-full max-w-6xl mx-auto flex justify-center'>
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
                  setTurnOn((prev) => ({ ...prev, mtGpt4o: !prev.mtGpt4o }))
                }
              />
            }
            label='GPT 4o'
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
          <FormControlLabel
            control={
              <Switch
                size='small'
                onClick={() =>
                  setTurnOn((prev) => ({ ...prev, mtGoogle: !prev.mtGoogle }))
                }
              />
            }
            label='Google'
          />
        </FormGroup>
      </section>
      {/* <section className='border flex flex-col gap-3'></section> */}
      <div className='flex w-full max-w-6xl mx-auto justify-center'>
        <section className='flex flex-col w-1/2'>
          <h3 className='font-semibold text-cyan-800'>English</h3>
          <textarea
            className='border h-[200px]'
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
          />
          <button
            className={`h-[30px] ${
              isTranslateButtonActive
                ? 'bg-red-400 text-white'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            onClick={onTranslate}>
            번역하기
          </button>
        </section>
        <section className='flex flex-col w-1/2'>
          <h3 className='font-semibold text-cyan-800'>인간 번역</h3>
          <textarea
            className='border h-[200px]'
            value={humanTranslation}
            onChange={(event) => setHumanTranslation(event.target.value)}
          />
          <button
            disabled
            className='h-[30px] border p-1 rounded text-gray-400 cursor-not-allowed'
            onClick={onEvaluation}>
            평가하기
          </button>
        </section>
      </div>
      {/* 번역기 */}
      <section className='grid grid-cols-3 gap-3 w-full max-w-6xl mx-auto'>
        <TranslatorBlock
          title='Papago'
          text={mtPapago}
          isLoading={isFetchingPapago}
          isTurnOn={turnOn.mtPapago}
        />

        <TranslatorBlock
          title='DeepL'
          text={mtDeepl}
          isLoading={isFetchingDeepl}
          isTurnOn={turnOn.mtDeepl}
        />
        <TranslatorBlock
          title='GPT 3.5(turbo-1106, 16k tokens)'
          text={mtGpt35}
          isLoading={isFetchingGpt35}
          isTurnOn={turnOn.mtGpt35}
        />
        <TranslatorBlock
          title='GPT 4.0(0613, 8k tokens)'
          text={mtGpt40}
          isLoading={isFetchingGpt40}
          isTurnOn={turnOn.mtGpt40}
        />
        <TranslatorBlock
          title='GPT 4o(128k tokens)'
          text={mtGpt4o}
          isLoading={isFetchingGpt4o}
          isTurnOn={turnOn.mtGpt4o}
        />
        <TranslatorBlock
          title='keti-0'
          text={mtKeti0}
          isLoading={isFetchingKeti0}
          isTurnOn={turnOn.mtKeti0}
        />
        <TranslatorBlock
          title='google'
          text={mtGoogle}
          isLoading={isFetchingGoogle}
          isTurnOn={turnOn.mtGoogle}
        />
      </section>
      {/* 버튼 */}
      <div className='flex w-full max-w-6xl mx-auto'>
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
      </div>
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

