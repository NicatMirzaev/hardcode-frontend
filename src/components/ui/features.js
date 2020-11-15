import React from 'react';
import FreeIcon from '../../icons/free.png';

const features = [
  {
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  }
];

const Features = () => (
  <div class="container mx-auto">
    <ul class="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
      {features.map(feature => (
        <li class="mt-10 md:mt-0 ml-2">
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <img src={feature.icon} alt="HardCode features"/>
              </div>
            </div>
            <div class="ml-4">
              <h4 class="text-lg leading-6 font-medium text-gray-900">{feature.title}</h4>
              <p class="mt-2 text-base leading-6 text-gray-500">
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
