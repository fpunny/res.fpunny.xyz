import { useResume } from '../../../components/Base';
import Marked from '../../../components/Marked';
import useDateFormat from '../../../utils/useDateFormat';
import BaseContent from '../BaseContent';
import BaseSection from '../BaseSection';

export default function Work() {
  const { works } = useResume();
  const format = useDateFormat({
    month: 'short',
    year: 'numeric',
  });

  return (
    <BaseSection title='Work Experience'>
      {works.map((work) => (
        <BaseContent
          title={work.organization}
          subtitle={work.title}
          aside={`${format(work.start)} - ${
            work.end ? format(work.end) : 'Current'
          }`}
          body={<Marked>{work.description}</Marked>}
          key={work.id}
        />
      ))}
    </BaseSection>
  );
}
