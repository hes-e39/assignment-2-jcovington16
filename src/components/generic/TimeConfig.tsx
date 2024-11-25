import { useState } from "react";

interface TimerConfigProps {
  type: string;
  onAddTimer: (timer: { type: string; duration: number }) => void;
}

const TimerConfig: React.FC<TimerConfigProps> = ({
  type,
  onAddTimer,
}) => {
  const [duration, setDuration] = useState<number>(60);

  const handleConfirm = () => {
    onAddTimer({ type, duration });
  };

  return (
    <div>
      <h2>Configure {type} Timer</h2>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        placeholder="Duration (seconds)"
      />
      <button onClick={handleConfirm}>Add Timer</button>
    </div>
  );
};

export default TimerConfig;
