import React from 'react';
import FreeIcon from '../../../icons/free.png';
import CodingIcon from '../../../icons/coding.svg';
import EnglishIcon from '../../../icons/english-language.svg';
import WebsiteIcon from '../../../icons/website.svg';
import WorkingIcon from '../../../icons/working.svg';
import RocketIcon from '../../../icons/rocket.svg';

const features = [
  {
    key: 1,
    icon: FreeIcon,
    title: "Free!",
    desc: "Our platform is completely free, you can use it without any charge."
  },
  {
    key: 2,
    icon: CodingIcon,
    title: "Multi Language Support!",
    desc: "By multi-language support, you can use the popular programming language you want. (Python, Java, C++, C#, Javascript)"
  },
  {
    key: 3,
    icon: EnglishIcon,
    title: "All in English!",
    desc: "The entire site, including the tasks, is in English. In this way, you will have no difficulty understanding the tasks."
  },
  {
    key: 4,
    icon: WebsiteIcon,
    title: "Easy user interface!",
    desc: "The user interface has been kept simple and easy. You will be able to find what you are looking for immediately."
  },
  {
    key: 5,
    icon: WorkingIcon,
    title: "Comfortable Working Environment!",
    desc: "You can write the codes directly from our site instead of loading the codes from another place. You can also see the results of the code instantly."
  },
  {
    key: 6,
    icon: RocketIcon,
    title: "Very Fast!",
    desc: "Thanks to our powerful servers, you can run the codes very quickly and get the results. No need to wait any longer!"
  }
];

const Features = () => (
  <div className="container mx-auto mb-16">
    <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
      {features.map(feature => (
        <li key={feature.key} className="mt-10 md:mt-0 ml-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <img src={feature.icon} alt="HardCode features"/>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h4>
              <p className="mt-2 text-base leading-6 text-gray-500">
                {feature.desc}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export default Features;
