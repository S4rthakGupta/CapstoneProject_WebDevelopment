"use client";

import Image from "next/image";

const team = [
  {
    name: "Dilpreet Kaur",
    role: "Frontend Developer",
    image: "/images/dilpreet_img.jpeg",
  },
  {
    name: "Shakila",
    role: "Backend Developer",
    image: "/images/shakila_img.jpeg",
  },
  {
    name: "Niya Alex",
    role: "UI/UX Designer",
    image: "/images/niya_img.png",
  },
  {
    name: "Sarthak Gupta",
    role: "Project Coordinator",
    image: "/images/sarthak_img.png",
  },
];

export default function AboutTeam() {
  return (
    <section id="team" className="py-20 px-6 bg-background text-foreground">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#18206F] dark:text-white">
          Meet the Team
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          We’re a team of students solving real campus problems — one feature at
          a time.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {team.map((member, index) => (
          <div
            key={index}
            className="text-center bg-muted/20 p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition"
          >
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#18206F]  dark:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
