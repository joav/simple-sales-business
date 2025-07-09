import { addLogger } from '@Shared/infrastructure';
import { appLoggers } from './loggers';

const component = 'App';

addLogger(component, appLoggers.HTTP, 'http');
addLogger(component, appLoggers.DEFAULT);
