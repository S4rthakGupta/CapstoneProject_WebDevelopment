"use client";

import { FaShieldAlt, FaUserGraduate, FaHandshake } from "react-icons/fa";

const features = [
  {
    icon: (
      <FaShieldAlt className="w-6 h-6 text-[#18206F] dark:text-[#92DCE5]" />
    ),
    title: "Verified Students Only",
    description:
      "Every user is authenticated via student ID to ensure safety and trust in every transaction.",
  },
  {
    icon: (
      <FaUserGraduate className="w-6 h-6 text-[#18206F] dark:text-[#92DCE5]" />
    ),
    title: "Built for Students",
    description:
      "CampusSynergy is created by students for students — tailored to your lifestyle, needs, and budget.",
  },
  {
    icon: (
      <FaHandshake className="w-6 h-6 text-[#18206F] dark:text-[#92DCE5]" />
    ),
    title: "Safe & Local Deals",
    description:
      "Buy and sell only within your campus network. No spam. No scams. Just synergy.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-2 bg-background text-foreground px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#18206F] dark:text-[#92DCE5]">
          Why Choose CampusSynergy?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          We are redefining the student marketplace experience.
        </p>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Here&#39;s why thousands of students trust us.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-lg border border-border hover:shadow-md transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
