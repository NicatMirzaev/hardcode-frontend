import React from 'react';
import Logo from '../../logo.png';
import FacebookIcon from '../../icons/facebook.png';
import InstagramIcon from '../../icons/instagram.png';
import TwitterIcon from '../../icons/twitter.png';

const Footer = () => (
  <footer className="footer bg-white relative pt-1 border-b-2 border-blue-700">
    <div className="container mx-auto px-6">

        <div className="sm:flex sm:mt-8">
            <div className="mt-8 sm:mt-0 sm:w-full flex flex-col md:flex-row justify-between">
                <div className="flex flex-col">
                  <a href="/">
                    <img className="h-12 w-auto mb-6" src={Logo} alt="HardCode"/>
                  </a>
                </div>
                <div className="flex flex-col mb-6">
                  <h4 className="text-lg mb-2 leading-6 font-medium text-gray-900">Sosyal Medya</h4>
                  <img className="w-6 h-6 cursor-pointer" src={FacebookIcon} alt="HardCode facebook"/>
                  <img className="mt-4 w-6 h-6 cursor-pointer" src={InstagramIcon} alt="HardCode instagram"/>
                  <img className="mt-4 w-4 h-4 cursor-pointer" src={TwitterIcon} alt="HardCode twitter"/>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg leading-6 font-medium text-gray-900">Faydalı Linkler</h4>
                  <p className="mt-2 text-base leading-6 text-gray-500 cursor-pointer">
                    İletişim
                  </p>
                  <p className="mt-2 text-base leading-6 text-gray-500 cursor-pointer">
                    Hakkımızda
                  </p>
                  <p className="mt-2 text-base leading-6 text-gray-500 cursor-pointer">
                    Gizlilik Politikası
                  </p>
                  <p className="mt-2 text-base leading-6 text-gray-500 cursor-pointer">
                    Kullanım Şartları
                  </p>
                </div>
            </div>
        </div>
    </div>
    <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
                <p className="text-sm text-blue-700 font-bold mb-2">
                    © 2020 HardCode, tüm hakları saklıdır.
                </p>
            </div>
        </div>
    </div>
</footer>
)


export default Footer;
