import { cpu } from 'node-os-utils';
import chalk from 'chalk';
export function startCpuProfile() {
  setInterval(() => {
    cpu.usage().then((cpuPercentage) => {
      if (cpuPercentage > 70) {
        console.warn(chalk.yellow(`WARNING: CPU at ${cpuPercentage}%`));
      }
    });
  }, 5000);
}
