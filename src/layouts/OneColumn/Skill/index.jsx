import { Fragment } from 'react';
import { useResume } from '../../../components/Base';
import BaseSection from '../BaseSection';
import { container, label, list } from './Skill.module.scss';

export default function Skill() {
  const { skills } = useResume();
  return (
    <BaseSection title='Skills'>
      <div style={{ '--count': skills.length }} className={container}>
        {skills.map((skill) => (
          <Fragment key={skill.id}>
            <h3 className={label}>{skill.title}</h3>
            <ul className={list}>
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </BaseSection>
  );
}
