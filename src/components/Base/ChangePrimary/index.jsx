import { RiPaintBrushLine } from '@react-icons/all-files/ri/RiPaintBrushLine';
import { useEffect, useRef, useState } from 'react';
import Color from 'color';
import useTheme, { sanitizeColor } from '../../../utils/useTheme';
import useCheatcode from '../../../utils/useCheatcode';
import useAnalytics from '../../../utils/useAnalytics';
import Control from '../../Control';
import Modal from '../../Modal';
import {
  colorPreview,
  inputGroup,
  colorInput,
  colorControls,
  colorInputs,
  save,
} from './ChangePrimary.module.scss';

export default function ChangePrimary() {
  const enabled = useCheatcode('owowatsdis?', 'Color mode');
  const [tempTheme, setTempTheme] = useState();
  const { theme, setTheme } = useTheme();
  const gtag = useAnalytics();
  const count = useRef(0);

  useEffect(() => {
    if (!enabled) setTempTheme();
  }, [enabled]);

  const submit = (e) => {
    e.preventDefault();
    const newTheme = Object.entries(tempTheme).reduce((acc, [key, value]) => {
      acc[key] = sanitizeColor(value);
      return acc;
    }, {});

    gtag('event', 'change-color', {
      event_category: 'actions',
      event_label: newTheme,
      value: ++count.current,
    });

    setTheme(newTheme);
    setTempTheme();
    return false;
  };

  return enabled && (
    <>
      <Control
        onClick={() => setTempTheme({ ...theme })}
        icon={RiPaintBrushLine}
        title="Change primary color"
      />
      <Modal onClose={() => setTempTheme()} show={!!tempTheme}>
        <h2>Change Theme Color</h2>
        <form onSubmit={submit} className={colorControls} noValidate>
          <div
            style={{ '--color': Color(tempTheme ?? theme).hex() }}
            className={colorPreview}
          />
          <div className={colorInputs}>
            {Object.entries(tempTheme ?? theme).map(([tag, value]) => (
              <div className={inputGroup} key={tag}>
                <input
                  onChange={({ target }) =>
                    setTempTheme({
                      ...tempTheme,
                      [tag]: target.value,
                    })
                  }
                  className={colorInput}
                  value={value}
                  type='number'
                  max='255'
                  min='0'
                />
                <label>{tag.toUpperCase()}</label>
              </div>
            ))}
          </div>
          <button name="Save changes" className={save}>Save changes</button>
        </form>
      </Modal>
    </>
  );
}
