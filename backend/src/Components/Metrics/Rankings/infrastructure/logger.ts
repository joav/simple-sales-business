import { addLogger } from '@Shared/infrastructure';

const component = 'Metrics:Rankings';

export const configLogger = () => {
  addLogger(component, LOGGER);
};
export const LOGGER = `${component}:DEFAULT`;
