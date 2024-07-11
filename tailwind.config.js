/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/as.jpg')"
      },
      colors: {
        'custom-green': '#38A169',  // Cor verde personalizada para o botão de checkout
        'custom-gray': '#F3F4F6'   // Cor cinza personalizada para o background do modal
      },
      scrollbar: {
        thin: '8px',  // Largura da barra de rolagem
        rounded: '8px',  // Bordas arredondadas da barra de rolagem
        thumb: {
          default: 'gray-500',  // Cor padrão da barra de rolagem
          hover: 'gray-600',  // Cor da barra de rolagem ao passar o mouse
        },
        track: {
          default: 'transparent',  // Cor da trilha da barra de rolagem
        },
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [
    require('tailwind-scrollbar'),  // Adiciona o plugin para a customização da scrollbar
  ],
}
