import React from 'react';
import FreeIcon from '../../../icons/free.png';
import CodingIcon from '../../../icons/coding.svg';
import TurkeyIcon from '../../../icons/turkey.svg';
import WebsiteIcon from '../../../icons/website.svg';
import WorkingIcon from '../../../icons/working.svg';
import RocketIcon from '../../../icons/rocket.svg';

const features = [
  {
    key: 1,
    icon: FreeIcon,
    title: "Ücretsiz!",
    desc: "Platformumuz tamamen ücretsizdir, herhangi bir ücret ödemeden gönül rahatlığıyla kullanabilirsiniz."
  },
  {
    key: 2,
    icon: CodingIcon,
    title: "Çoklu Dil Desteği!",
    desc: "Çoklu dil desteği sayesinde istediğiniz popüler programlama dilini kullanabilirsiniz. (Python, Java, C++, C#, Javascript)"
  },
  {
    key: 3,
    icon: TurkeyIcon,
    title: "Tamamen Türkçe!",
    desc: "Görevler de dahil olmak üzere tüm site Türkçe dilindedir. Bu sayede görevleri anlamakta zorluk çekmeyeceksiniz."
  },
  {
    key: 4,
    icon: WebsiteIcon,
    title: "Kolay Arayüz!",
    desc: "Kullanıcı arayüzü kolay ve sade tutulmuştur. Aradığınız şeyi hemen bulabileceksiniz."
  },
  {
    key: 5,
    icon: WorkingIcon,
    title: "Rahat Çalışma Ortamı!",
    desc: "Kodları başka bir yerden yüklemek yerine direkt olarak sitemizden kodları yazabiliyorsunuz. Kodun sonuçlarını da anlık olarak görebiliyorsunuz."
  },
  {
    key: 6,
    icon: RocketIcon,
    title: "Çok Hızlı!",
    desc: "Güçlü sunucularımız sayesinde kodları çok hızlı çalıştırıp sonuçları elde edebiliyorsunuz. Artık beklemeye gerek yok!"
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
