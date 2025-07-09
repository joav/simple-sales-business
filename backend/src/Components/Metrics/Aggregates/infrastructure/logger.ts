import { addLogger } from '@Shared/infrastructure';

const component = 'Metrics:Aggregates';

export const configLogger = () => {
  addLogger(component, LOGGER);
};
export const LOGGER = `${component}:DEFAULT`;
