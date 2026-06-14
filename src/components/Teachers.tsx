import SectionLabel from "./SectionLabel";
import TeacherCard from "./TeacherCard";

const teachers = [
  {
    name: "Anthony Goltz",
    bio: "An Oxford-educated historian, Anthony began teaching English in India in 1994 and founded A Nice Cup of Tea in 2012. His clients have included bestselling author Katarzyna Bonda, as well as Google, the BBC, and the Polish Ministry of Foreign Affairs. He drinks Lapsang Souchong tea.",
    image: "/images/teachers/anthony-goltz.jpg",
    hasVideo: true,
  },
  {
    name: "Ruq Jaffry",
    bio: "A native English speaker living in Brisbane, Australia, Ruq brings an international outlook to her teaching. She holds a BA in International Business Management (with Distinction), and has lived, worked, and studied across Europe, the UK, the US, and Southeast Asia. She drinks green tea.",
    image: "/images/teachers/ruq-jaffry.jpg",
  },
  {
    name: "Dr Alan Bryson",
    bio: "Holding a PhD in History from the University of St Andrews, Alan has taught English and History at several universities, including Oxford and Sheffield. He has contributed to research in archaeology and literature, and curated a British Library exhibition on Elizabeth I and Mary, Queen of Scots. He drinks builder\u2019s tea.",
    image: "/images/teachers/alan-bryson.jpg",
    hasVideo: true,
  },
  {
    name: "Dr Rishi Handa",
    bio: "With a degree in Mathematics with Theoretical Physics from UCL and a PhD from SOAS, Rishi currently teaches Sanskrit at St James Independent School for Boys in London. Outside academia, he is also a musician, producer, and filmmaker. Although he doesn\u2019t drink tea, Dr Handa somehow remains both fully awake and professionally British.",
    image: "/images/teachers/rishi-handa.jpg",
    hasVideo: true,
  },
];

export default function Teachers() {
  return (
    <section className="bg-second-bg pt-48 pb-16 w-full">
      <div className="px-16">
        <SectionLabel label="NATIVE SPEAKERS" title="Meet our Teachers" />
      </div>
      <div className="grid grid-cols-2 gap-9 px-16 pt-16 pb-4">
        {teachers.map((teacher, i) => (
          <TeacherCard
            key={i}
            name={teacher.name}
            bio={teacher.bio}
            image={teacher.image}
            hasVideo={teacher.hasVideo}
          />
        ))}
      </div>
    </section>
  );
}
