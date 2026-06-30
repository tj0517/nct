import SectionLabel from "./SectionLabel";
import TeacherCard from "./TeacherCard";

const teachers = [
  {
    name: "Anthony Goltz",
    credential: "Oxford University",
    bio: "Founder of NCT. Teaching English since 1994. Clients include Google, the BBC, and bestselling authors. Drinks Lapsang Souchong.",
    image: "/images/teachers/anthony-goltz.jpg",
    hasVideo: true,
  },
  {
    name: "Ruq Jaffry",
    credential: "BA International Business (Distinction)",
    bio: "Native speaker from Brisbane, Australia. Has lived and worked across Europe, the UK, the US, and Southeast Asia. Drinks green tea.",
    image: "/images/teachers/ruq-jaffry.jpg",
  },
  {
    name: "Dr Alan Bryson",
    credential: "PhD, University of St Andrews",
    bio: "Taught at Oxford and Sheffield. Curated a British Library exhibition on Elizabeth I. Drinks builder\u2019s tea.",
    image: "/images/teachers/alan-bryson.jpg",
    hasVideo: true,
  },
  {
    name: "Dr Rishi Handa",
    credential: "UCL & SOAS",
    bio: "Maths and physics background. Teaches Sanskrit in London. Also a musician, producer, and filmmaker. Doesn\u2019t drink tea.",
    image: "/images/teachers/rishi-handa.jpg",
    hasVideo: true,
  },
];

export default function Teachers() {
  return (
    <section className="bg-second-bg pt-48 pb-16 w-full">
      <div className="px-5 md:px-16">
        <SectionLabel label="NATIVE SPEAKERS" title="Meet our Teachers" labelColor="accent-text" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-9 px-5 md:px-16 pt-8 md:pt-16 pb-4">
        {teachers.map((teacher, i) => (
          <TeacherCard
            key={i}
            name={teacher.name}
            credential={teacher.credential}
            bio={teacher.bio}
            image={teacher.image}
            hasVideo={teacher.hasVideo}
          />
        ))}
      </div>
    </section>
  );
}
