import '@fontsource/inter/600.css';
import '@fontsource/inter/400.css';

import Page from '../../components/Page';
import Base from '../../components/Base';
import Education from './Education';
import Project from './Project';
import Header from './Header';
import Skill from './Skill';
import Work from './Work';

import './OneColumn.module.scss';

export default function OneColumn(props) {
  return <Base {...props}>
    <Page>
      <Header/>
      <Skill/>
      <Education/>
      <Work/>
      <Project/>
    </Page>
  </Base>;
}
