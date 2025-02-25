import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";

export type TeamBlockProps = PagebuilderType<"team">;

export function TeamBlock({ teamMembers }: TeamBlockProps) {
  return (
    <section id="team-members" className="my-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-center">
          {Array.isArray(teamMembers) && teamMembers.length > 0 && (
            <div className="space-y-8">
              {teamMembers.map((teamMember) => (
                <div key={teamMember._id} className="w-full">
                  <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
                    <div className="flex-shrink-0">
                      {teamMember.image?.asset && (
                        <SanityImage
                          // @ts-expect-error do not know why it's failing
                          asset={teamMember.image}
                          className="h-48 w-48 rounded-full object-cover shadow-md md:h-64 md:w-64"
                        />
                      )}
                    </div>
                    <div className="flex-grow space-y-4 text-center md:text-left">
                      <div>
                        <h2 className="text-lg font-medium md:text-2xl">
                          {teamMember.name}
                        </h2>
                        <h3 className="font-semibold">{teamMember.position}</h3>
                      </div>
                      <div>
                        <RichText richText={teamMember.bio} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
