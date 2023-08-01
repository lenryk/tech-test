export default function stopwatchCalc(time = 0) {
  if (!time) {
    return ["00", "00", "00"];
  }

  const secondsInHour = 3600;
  const secondsInMinute = 60;

  const hh = Math.floor(time / secondsInHour);
  const mm = Math.floor(time / secondsInMinute);
  const ss = Math.floor(time % secondsInMinute);

  const formattedHH = hh.toString().padStart(2, "0");
  const formattedMM = mm.toString().padStart(2, "0");
  const formattedSS = ss.toString().padStart(2, "0");

  return [formattedHH, formattedMM, formattedSS];
}
