import progress from "cli-progress";
import colors from "colors";

const progressBar = new progress.SingleBar({
  barCompleteChar: "#",
  barIncompleteChar: ".",
  fps: 5,
  stream: process.stdout,
  barsize: 30,
  etaAsynchronousUpdate: true,
  autopadding: true,
  progressCalculationRelative: true,
  format:
    "Downloading " +
    colors.green("{bar}") +
    " {percentage}% " +
    colors.green("{value}/{total}") +
    " {duration}s",
});

export { progressBar };
