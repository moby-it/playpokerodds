import pkg from 'node-os-utils';
const { cpu } = pkg;
import chalk from 'chalk';
export let interval: NodeJS.Timer | undefined;
export function startCpuProfile() {
  interval = setInterval(() => {
    cpu.usage().then((cpuPercentage) => {
      if (cpuPercentage > 70) {
        console.warn(chalk.yellow(`WARNING: CPU at ${cpuPercentage}%`));
      }
    });
  }, 5000);
}
