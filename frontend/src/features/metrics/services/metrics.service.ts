// src/features/metrics/services/metrics.service.ts

const API_BASE_URL = 'http://localhost:3500/api/v1';

// --- Tipos de Datos ---

export interface ApiResponse<T> {
  data: T;
  status: {
    statusCode: number;
    statusMessage: string;
    httpStatusCode: number;
  };
}

export interface AggregateValue {
  aggregateId: string;
  category: string;
  aggregateFn: 'RECOUNT' | 'SUMMATION';
  aggregateValue: number;
  lastUpdate: string;
}

export interface TimeSerieDataPoint {
  date: string;
  value: number;
}

export interface TimeSerie {
  timeSerieSlug: string;
  category: string;
  data: TimeSerieDataPoint[];
}

export interface RankingCompetitor {
  id: string;
  lastUpdate: string;
  value: number;
  name: string;
}

export interface Ranking {
  rankingSlug: string;
  rankingValueTitle: string;
  category: string;
  data: RankingCompetitor[];
}

// --- Funciones del Servicio ---

export async function getAggregateValue(category: string, aggregateId: string): Promise<AggregateValue> {
  const response = await fetch(`${API_BASE_URL}/metrics/${category}/aggregates/${aggregateId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch aggregate value: ${response.statusText}`);
  }
  const result: ApiResponse<AggregateValue> = await response.json();
  return result.data;
}

export async function getTimeSerie(category: string, serieSlug: string, from?: Date, to?: Date): Promise<TimeSerie> {
  const url = new URL(`${API_BASE_URL}/metrics/${category}/series/${serieSlug}`);
  if (from) {
    url.searchParams.append('from', from.toISOString());
  }
  if (to) {
    url.searchParams.append('to', to.toISOString());
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch time serie: ${response.statusText}`);
  }
  const result: ApiResponse<TimeSerie> = await response.json();
  return result.data;
}

export async function getRanking(category: string, rankingSlug: string, top = 5): Promise<Ranking> {
  const url = new URL(`${API_BASE_URL}/metrics/${category}/rankings/${rankingSlug}`);
  if (top) {
    url.searchParams.append('top', top.toString());
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch ranking: ${response.statusText}`);
  }
  const result: ApiResponse<Ranking> = await response.json();
  return result.data;
}
