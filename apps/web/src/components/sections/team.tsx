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
            <div className="space-y-12">
              {teamMembers.map((teamMember) => (
                <div key={teamMember._id} className="w-full">
                  <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
                    <div className="flex-shrink-0">
                      {teamMember.image?.asset && (
                        <div className="relative">
                          <SanityImage
                            // @ts-expect-error do not know why it's failing
                            asset={teamMember.image}
                            className="h-48 w-48 rounded-full object-cover shadow-xl border-4 border-white dark:border-gray-800 md:h-64 md:w-64"
                          />
                          {/* Swimming-themed decoration */}
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-6 h-6 text-white"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow space-y-4 text-center md:text-left">
                      <div>
                        <h2 className="text-2xl font-bold md:text-3xl text-blue-900 dark:text-blue-100">
                          {teamMember.name}
                        </h2>
                        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mt-1">
                          {teamMember.position}
                        </h3>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
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