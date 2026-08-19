import SectionLabel from "./SectionLabel";
import TeacherCard from "./TeacherCard";

const teacherImages = [
  { image: "/images/teachers/anthony-goltz.png", hasVideo: true },
  { image: "/images/teachers/alan-bryson.png", hasVideo: true },
  { image: "/images/teachers/rishi-handa.png", hasVideo: true },
];

interface TeachersDict {
  label: string;
  heading: string;
  list: { name: string; credential: string; bio: string }[];
}

export default function Teachers({ dict }: { dict: TeachersDict }) {
  return (
    <section className="bg-second-bg pt-48 pb-16 w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 md:px-16">
          <SectionLabel label={dict.label} title={dict.heading} labelColor="accent-text" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-9 px-5 md:px-16 pt-8 md:pt-16 pb-4">
          {dict.list.map((teacher, i) => (
            <TeacherCard
              key={i}
              name={teacher.name}
              credential={teacher.credential}
              bio={teacher.bio}
              image={teacherImages[i]?.image ?? ""}
              hasVideo={teacherImages[i]?.hasVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
