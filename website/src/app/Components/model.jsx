"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";
import { IoIosArrowDropdown } from "react-icons/io";

export function AnimatedPinDemo({ title, href, imageSrc }) {
  return (
    <div className="h-[30rem] w-[400px] flex items-center justify-center edu-au-vic-wa-nt-arrows-text">
      <PinContainer href={href}>
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[15rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            {title}
            <IoIosArrowDropdown className="text-white" />
          </h3>

          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500"></span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4">
            <Image
              src={imageSrc}
              alt={title}
              width={300}
              height={300}
              className="rounded-lg w-[700px] h-[200px]"
            />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
