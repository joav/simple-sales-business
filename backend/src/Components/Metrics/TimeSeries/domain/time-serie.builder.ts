import { DataValuePrimitives } from './_data-value.primitives';
import { TimeSerie } from './time-serie';

export class TimeSerieBuilder {
  private timeSerieSlug = '';
  private category = '';
  private data?: DataValuePrimitives[];

  withTimeSerieSlug(timeSerieSlug: string) {
    this.timeSerieSlug = timeSerieSlug;
    return this;
  }

  withCategory(category: string) {
    this.category = category;
    return this;
  }

  withData(data?: DataValuePrimitives[]) {
    this.data = data;
    return this;
  }

  build() {
    return TimeSerie.fromPrimitives({
      timeSerieSlug: this.timeSerieSlug,
      category: this.category,
      data: this.data
    });
  }
}
