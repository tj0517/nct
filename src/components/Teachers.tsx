import SectionLabel from "./SectionLabel";
import TeacherCard from "./TeacherCard";

// "Watch intro" is not editor-controlled: the Sanity `teacher` schema has no
// `hasVideo` field, so this stays in code, positional like before
// (docs/deferred-tasks.md, NCT-3.04). Photos now come from the dictionary.
const teacherHasVideo = [true, true, true];

interface TeachersDict {
  label: string;
  heading: string;
  list: { name: string; credential: string; bio: string; image: string }[];
}

export default function Teachers({ dict }: { dict: TeachersDict }) {
  return (
    <section className="bg-second-bg pt-48 pb-16 w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 md:px-16">
          <SectionLabel title={dict.heading} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-9 px-5 md:px-16 pt-8 md:pt-16 pb-4">
          {dict.list.map((teacher, i) => (
            <TeacherCard
              key={i}
              name={teacher.name}
              credential={teacher.credential}
              bio={teacher.bio}
              image={teacher.image}
              hasVideo={teacherHasVideo[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
