import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface IInput {
  sourceText: string;
  model?: string;
}

export const postPapago = ({ sourceText }: IInput) => {
  return axios.post('/api/naver', {
    sourceText,
  });
};

export const useMtPapago = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtNaver'],
    queryFn: () => postPapago({ sourceText }),
    select: (res) => res.data.text,
    enabled: false,
  });
};

export const postDeepl = ({ sourceText }: IInput) => {
  return axios.post('/api/deepl', {
    sourceText,
  });
};

export const useMtDeepl = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtDeepl'],
    queryFn: () => postDeepl({ sourceText }),
    select: (res) => res.data.text,
    enabled: false,
  });
};

const postGpt = async ({
  sourceText,
  model,
}: {
  sourceText: string;
  model: string;
}) => {
  return axios.post('/api/chatgpt', {
    sourceText,
    model,
  });
};

export const postGpt35 = async (sourceText: string) => {
  return axios.post('/api/chatgpt', {
    sourceText,
    model: 'gpt-3.5-turbo-1106',
  });
};

export const postGpt40 = async (sourceText: string) => {
  return axios.post('/api/chatgpt', {
    sourceText,
    model: 'gpt-4',
  });
};

export const useMtGpt35_1106 = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtGpt3.5(1106)'],
    queryFn: () => postGpt({ sourceText, model: 'gpt-3.5-turbo-1106' }),
    select: (res) => res.data.text,
    enabled: false,
  });
};

export const useMtGpt40 = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtGpt4.0(0613)'],
    queryFn: () => postGpt({ sourceText, model: 'gpt-4-0613' }),
    select: (res) => res.data.text,
    enabled: false,
  });
};

export const useMtGpt4o = (sourceText: string) => {
  return useQuery({
    queryKey: ['gpt-4o'],
    queryFn: () => postGpt({ sourceText, model: 'gpt-4o' }),
    select: (res) => res.data.text,
    enabled: false,
  });
};

export const useMtKeti = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtKeti-0'],
    queryFn: () =>
      axios.post('/api/keti', {
        sourceText,
      }),
    select: (res) => res.data,
    enabled: false,
  });
};

export const useMtGoogle = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtGoogle'],
    queryFn: () =>
      axios.post('/api/google', {
        sourceText,
      }),
    select: (res) => {
      return res.data.text;
    },
    enabled: false,
  });
};

export const useMtGeminiFlash = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtGeminiFlash'],
    queryFn: () =>
      axios.post('/api/gemini', {
        sourceText,
        modelVersion: 'gemini-1.5-flash',
      }),
    select: (res) => {
      return res.data.text;
    },
    enabled: false,
  });
};
export const useMtGeminiPro15 = (sourceText: string) => {
  return useQuery({
    queryKey: ['mtGeminiPro'],
    queryFn: () =>
      axios.post('/api/gemini', {
        sourceText,
        modelVersion: 'gemini-1.5-pro',
      }),
    select: (res) => {
      return res.data.text;
    },
    enabled: false,
  });
};