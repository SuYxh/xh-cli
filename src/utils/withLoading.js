async function withLoading(message, fn, ...args) {
  const ora = await import("ora");
  const spinner = ora.default(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
}
module.exports = withLoading;