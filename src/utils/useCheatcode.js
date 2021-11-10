import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

// Yes its in plain text, and no it's not worth setting up something elaborate for this
export default function useCheatcode(code, context) {
  const [enabled, setEnabled] = useState(false);
  const [progress, setProgress] = useState('');

  useEffect(() => {
    const isComplete = code === progress;
    if (!code.startsWith(progress) || isComplete) {
      setProgress('');
      if (isComplete) {
        toast.success(
          `${context} has been ${!enabled ? 'enabled' : 'disabled'}`,
        );
        setEnabled(!enabled);
      }
    }
  }, [code, progress, context, enabled]);

  useEffect(() => {
    const handler = ({ key }) => setProgress((_progress) => _progress + key);
    window.addEventListener('keypress', handler);

    return () => {
      window.removeEventListener('keypress', handler);
    };
  }, []);

  return enabled;
}
