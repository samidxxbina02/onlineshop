import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const leftSideIconsData = [
  {
    as: <InstagramIcon sx={{ color: 'white' }} fontSize='large' />,
    href: "https://www.instagram.com/samidxxbina/",
  },
  {
    as: <PinterestIcon sx={{ color: 'white' }} fontSize='large'/>,
    href: "https://www.pinterest.com/",
  },
  {
    as: <YouTubeIcon sx={{ color: 'white' }} fontSize='large'/>,
    href: "https://www.youtube.com/",
  },
];

const rightSideIconsData = [
    {
        as:<SearchIcon sx={{ color: 'white' }} fontSize='large'/>,
        onClick: ()=> console.log('search')
    },
    {
        as:<ShoppingCartIcon sx={{ color: 'white' }} fontSize='large'/>,
        href:'/cart'
    }
];

const navigationData = [
    {
        as: 'Главная',
        href:'/'
    },
    {
        as:'Добавить товар',
        href:'/admin'
    },
    {
        as:'О нас',
        href:'/about'
    },
   
    {
        as:'Связаться с нами',
        href:'/contacts'
    },
];


export {
    leftSideIconsData,
    rightSideIconsData,
    navigationData
}