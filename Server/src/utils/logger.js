import morgan from 'morgan';
import chalk from 'chalk';

// IST date token
morgan.token('istDate', () => {
  try {
    return new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch (error) {
    return 'Invalid Date';
  }
});

// Status color token
morgan.token('statusColor', (req, res) => {
  const status = res.statusCode;

  if (status >= 500) return chalk.red(status);
  if (status >= 400) return chalk.yellow(status);
  if (status >= 300) return chalk.cyan(status);
  if (status >= 200) return chalk.green(status);
  return status;
});

// Logger middleware
export const logger = morgan((tokens, req, res) => {
  try {
    return [
      chalk.gray(tokens.istDate()),
      chalk.blue(tokens.method(req, res)),
      chalk.magenta(tokens.url(req, res)),
      chalk.bold(tokens.statusColor(req, res)),
      chalk.yellow(`${tokens['response-time'](req, res)} ms`)
    ].join(' ');
  } catch (error) {
    console.error(' Logger error:', error.message);
    return 'Logger failed';
  }
});
