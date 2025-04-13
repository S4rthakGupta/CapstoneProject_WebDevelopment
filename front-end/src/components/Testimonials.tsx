"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Business Student, Year 3",
    quote:
      "I found a $60 textbook for just $15. CampusSynergy is now my go-to for buying and selling anything at uni.",
    avatar: "/images/testimonial1.jpg",
  },
  {
    name: "Sara Liu",
    role: "Engineering Student, Year 2",
    quote:
      "Safe, easy, and completely verified. I sold my old dorm fridge in one day!",
    avatar: "/images/testimonial2.jpg",
  },
  {
    name: "David Reyes",
    role: "Computer Science, Year 4",
    quote: "Way better than Facebook Marketplace. No randoms, just students.",
    avatar: "/images/testimonial3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 px-6 bg-background text-foreground"
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#18206F] dark:text-[#92DCE5]">
          Hear It from Other Students
        </h2>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Students love CampusSynergy. Here’s what they have to say.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-muted/20 p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-semibold text-md">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
