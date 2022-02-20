import log from 'loglevel';

if (process.env.NODE_ENV === 'development') {
  // Show all log level messages
  log.setLevel(0);
}
log.info('Setting up logger...');
if (typeof window === 'undefined') {
  (global as any).log = log;
} else {
  (window as any).log = log;
}
export default log;
