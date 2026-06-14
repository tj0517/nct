import Button from "./Button";

export default function About() {
  return (
    <section className="flex flex-col gap-4 items-center p-16 w-full">
      <p className="font-fraunces font-normal text-[36px] text-main text-justify leading-normal">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So
        much depends upon the right teacher. Our Oxford University-educated
        native speakers prepare children, adults, and university applicants for
        the classroom, the conversation, the exam, and the interview. Speak the
        King&apos;s English at the moment you need it most.
      </p>
      <div className="flex items-end justify-end w-full gap-6">
        <a href="#about">
          <Button variant="outline">About us</Button>
        </a>
        <Button variant="filled">Meet the founder</Button>
      </div>
    </section>
  );
}
