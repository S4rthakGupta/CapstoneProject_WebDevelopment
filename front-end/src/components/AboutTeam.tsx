"use client";

import Image from "next/image";

const team = [
  {
    name: "Dilpreet Kaur",
    role: "Frontend Developer",
    description: "Passionate about clean UI and student-focused design.",
    image: "/images/team1.jpg",
  },
  {
    name: "Shakila",
    role: "Backend Developer",
    description: "Loves secure APIs and clean database architecture.",
    image: "/images/team2.jpg",
  },
  {
    name: "Niya Alex",
    role: "UI/UX Designer",
    description: "Focuses on making student experiences intuitive.",
    image: "/images/team3.jpg",
  },
  {
    name: "Sarthak Gupta",
    role: "Project Coordinator",
    description: "Keeps the team synced and deadlines on track.",
    image: "/images/team4.jpg",
  },
];

export default function AboutTeam() {
  return (
    <section id="team" className="py-20 px-6 bg-background text-foreground">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#18206F] dark:text-[#92DCE5]">
          Meet the Team
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          We’re a team of students solving real campus problems — one feature at a time.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {team.map((member, index) => (
          <div
            key={index}
            className="text-center bg-muted/20 p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={100}
              height={100}
              className="mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-[#18206F] dark:text-[#92DCE5]">
              {member.name}
            </h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
            <p className="mt-2 text-sm text-muted-foreground">{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
