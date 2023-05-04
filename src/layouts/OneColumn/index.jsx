import '@fontsource/inter/600.css';
import '@fontsource/inter/400.css';

export { Head } from '../../components/Base';
import Base from '../../components/Base';
import Page from '../../components/Page';
import Education from './Education';
import Project from './Project';
import Footer from './Footer';
import Header from './Header';
import Skill from './Skill';
import Work from './Work';

import { page } from './OneColumn.module.scss';

export default function OneColumn(props) {
  return (
    <Base {...props} withButtons>
      <Page className={page}>
        <Header />
        <Skill />
        <Education />
        <Work />
        <Project />
        <Footer />
      </Page>
    </Base>
  );
}
