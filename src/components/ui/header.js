import React from 'react';
import Logo from '../../logo.png';
import MenuIcon from '../../menu.png';

const Header = () => {
  const [menu, setMenu] = React.useState(false);

  React.useEffect(() => {

    function handleClick(e){
      console.log(e);
      if(menu == true && e.target.outerText !== "İletişim" && e.target.outerText !== "Hemen Başla"){
        setMenu(false);
      }
    }

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    }

  }, [menu])

  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-16">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <a href="#" className="flex">
              <img className="h-12 lg:ml-16 w-auto" src={Logo} alt="HardCode"/>
            </a>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
            <a href="#" className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
              İletişim
            </a>
            <span className="inline-flex rounded-md shadow-sm">
              <a href="#" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                Hemen Başla!
              </a>
            </span>
          </div>
          <div className="relative inline-block lg:hidden md:hidden">
            <img onClick={() => setMenu(!menu)} className="lg:hidden md:hidden" src={MenuIcon}/>
            {menu === true &&
            <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
              <div class="rounded-md bg-white shadow-xs">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="/" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">İletişim</a>
                  <a href="/" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Hemen Başla</a>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
