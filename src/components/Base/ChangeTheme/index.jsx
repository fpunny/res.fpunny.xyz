import { RiMoonLine } from '@react-icons/all-files/ri/RiMoonLine';
import { RiSunLine } from '@react-icons/all-files/ri/RiSunLine';
import useTheme from '../../../utils/useTheme';
import Control from '../../Control';

export default function ChangeTheme() {
  const { isDark, setIsDark } = useTheme();
  return (
    <Control
      icon={isDark ? RiMoonLine : RiSunLine}
      onClick={() => setIsDark(!isDark)}
      name="Change theme"
    />
  );
}
