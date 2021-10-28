import BaseSection from "../BaseSection";
import BaseContent from '../BaseContent';
import { useResume } from '../../../components/Base';
import Marked from '../../../components/Marked';
import useDateFormat from "../../../utils/useDateFormat";

// ! Chnage this implementation if you have more than one degree
// ! I'm too little brain for that I guess :c
export default function Education() {
  const { educations } = useResume();
  const [ uni ] = educations;

  const format = useDateFormat({
    month: 'short',
    year: 'numeric',
  });

  if (!uni) return null;

  return (
    <BaseSection title='Education'>
      <BaseContent
        body={<Marked>{uni.description}</Marked>}
        aside={`${format(uni.start)} - ${format(uni.end)}`}
        subtitle={uni.title}
        title={uni.location}
      />
    </BaseSection>
  );
}