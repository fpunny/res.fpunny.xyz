import { useResume } from '../../../components/Base';
import Marked from '../../../components/Marked';
import useDateFormat from '../../../utils/useDateFormat';
import BaseContent from '../BaseContent';
import BaseSection from '../BaseSection';

export default function Project() {
  const { projects } = useResume();
  const format = useDateFormat({
    month: 'short',
    year: 'numeric',
  });

  return (
    <BaseSection title='Projects'>
      {projects.map((project) => (
        <BaseContent
          title={project.organization}
          subtitle={project.title}
          aside={`${format(project.start)} - ${
            project.end ? format(project.end) : 'Current'
          }`}
          body={<Marked>{project.description}</Marked>}
          key={project.id}
        />
      ))}
    </BaseSection>
  );
}
