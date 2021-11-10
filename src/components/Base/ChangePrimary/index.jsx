import { RiPaintBrushLine } from '@react-icons/all-files/ri/RiPaintBrushLine';
import { Helmet } from 'react-helmet';
import { useEffect, useRef, useState } from 'react';
import useCheatcode from '../../../utils/useCheatcode';
import gtag from '../../../utils/gtag';
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

function sanitizeColor(color) {
  color = parseInt(color) || 0;
  if (color > 255) color = 255;
  else if (color < 0) color = 0;
  return color;
}

function RgbToHex(rgb) {
  return `#${Object.values(rgb)
    .map((color) => sanitizeColor(color).toString(16).padStart(2, '0'))
    .join('')}`;
}

export default function ChangePrimary({ initColor }) {
  const enabled = useCheatcode('owowatsdis?', 'Color mode');
  const [theme, setTheme] = useState(initColor);
  const [tempTheme, setTempTheme] = useState();
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

    gtag('event', 'action', {
      count: ++count.current,
      color: newTheme,
      type: 'theme',
    });

    setTheme(newTheme);
    setTempTheme();
    return false;
  };

  return (
    <>
      <Helmet>
        <link
          href={`/api/assets/logo?${new URLSearchParams({
            color: RgbToHex(theme),
          })}`}
          rel='shortcut icon'
          type='image/svg'
        />
        <style type='text/css'>
          {`:root{--primary:${Object.values(theme).join(', ')};}`}
        </style>
      </Helmet>
      {enabled && (
        <>
          <Control
            onClick={() => setTempTheme({ ...theme })}
            icon={RiPaintBrushLine}
          />
          <Modal onClose={() => setTempTheme()} show={!!tempTheme}>
            <h2>Change Theme Color</h2>
            <form onSubmit={submit} className={colorControls} noValidate>
              <div
                style={{ '--color': RgbToHex(tempTheme ?? theme) }}
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
              <button className={save}>Save changes</button>
            </form>
          </Modal>
        </>
      )}
    </>
  );
}
