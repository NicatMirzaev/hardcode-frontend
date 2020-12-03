import React from 'react';
import FreeIcon from '../../../icons/free.png';

const features = [
  {
    key: 1,
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    key: 2,
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    key: 3,
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    key: 4,
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    key: 5,
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    key: 6,
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
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
