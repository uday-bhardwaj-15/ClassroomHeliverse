import React from "react";
import Image from "next/image";
const Event = () => {
  return (
    <>
      <div className="bg-gray-200 px-2 py-10">
        <div id="features" className="mx-auto max-w-6xl">
          <p className="text-center text-base font-semibold leading-7 text-primary-500">
            Events
          </p>
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Upcoming events are shown here
          </h2>
          <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
            <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
              <Image
                src="https://www.svgrepo.com/show/530438/ddos-protection.svg"
                alt=""
                className="mx-auto h-10 w-10"
                width={40}
                height={40}
              />
              <h3 className="my-3 font-display font-medium">
                Powered by I.I.T
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                the cutting-edge language model that makes interactions a
                breeze. With its user-friendly interface, effortlessly tap into
                the world of AI-generated text.
              </p>
            </li>
            <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
              <Image
                src="https://www.svgrepo.com/show/530442/port-detection.svg"
                alt=""
                className="mx-auto h-10 w-10"
                width={40}
                height={40}
              />
              <h3 className="my-3 font-display font-medium">
                Laser Sharp Focus
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                Simply input your subject, click the generate button, and the
                result will appear in seconds just like magick.
              </p>
            </li>
            <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
              <Image
                src="https://www.svgrepo.com/show/530444/availability.svg"
                alt=""
                className="mx-auto h-10 w-10"
                width={40}
                height={40}
              />
              <h3 className="my-3 font-display font-medium">
                Start Coding Program
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                We offer advanced customization. You can freely combine options
                like roles, languages, publish, tones, lengths, and formats.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Event;
