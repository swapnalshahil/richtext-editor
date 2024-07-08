module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  purge: {
    mode: 'all',
    enabled: true,
    preserveHtmlElements: false,
    content: [
      "./public/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.tsx",
    ],
    Options: {
      fontFace: true,
      keyframes: true,
      variables: true,
      rejected: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'text-color': '#464646',
        hello: 'var(--hello)',
        'sticky-header-bg-color': 'var(--sticky-header-bg-color)',
        'sticky-header-border-color': 'var(--sticky-header-border-color)',
        'dropdown-menu-border-color': 'var(--dropdown-menu-border-color)',
        'property-dropdown-menu-shadow': 'var(--property-dropdown-menu-shadow)',
        'save-search-color': 'var(--save-search-color)',
        'default-color': 'var(--default-color)',
        'secondary-color': '#009587',
        'border-color': 'var(--border-color)',
        'background-gray': '#efefef',
        'primary-color': '#fd3752',
        'green-approve-button': '#159588',
        cardbordercolor: '#d1d1d1',
        grayDark: '#444',
        'gray-light': '#787676',
        'gray-lighter': '#999',
        'border-color-action-icon': '#d3d3d3',
        'property-views-border-color': '#e1e1e1',
        'card-border-dark': '#e2e2e2',
        'card-overview-border-color': '#ebebeb',
        'focus-border-color': '#787878',
        'seo-footer-header-color': '#3f4950',
        'seo-footer-content-color': '#303b43',
        'error-color': '#d50000',
        'header-item-color': '#555',
        'header-grey': '#0000001b',
        'gray-lightest': 'var(--gray-lightest, #ccc)',
        'ls-primary-green': 'var(--ls-primary-green)',
        white: 'var(--white, #ffffff)',
        'appointment-status-background': 'var(--appointment-status-background)',
        'chat-date-background': '#cceae6',
        'usp-star-icon-color': '#fcb244',
        'background-color': '#f2f2f2',
        'background-gray-light': '#f8f8f8',
        'filter-reset-text-color': '#909496',
        'back-to-top-bg-color': '#909496',
        'back-to-top-shadow-color': 'var(--back-to-top-shadow-color)',
        'filter-header-border-color': '#e2e8ee',
        'info-chip-back-color': '#e5f4f3',
        'builder-mobile-header': 'hsla(0, 0%, 50%, 0.25)',
        'nbtip-border-color': '#209587',
        'nbtip-bg-color': '#EBFFFD',
        'payment-bg-color': '#E9F8F1',
        'bill-bg-color': '#F4F4F4',
        'fees-bg-color': '#EAEBF8',
        'rento-meter-color': '#C3B5D6',
        'nbselected-bg-color': '#0095871A',
        black: '#000',
        'alert-bar-back-color': '#f3f3f3',
        blue: '#2196f3',
        pink: '#ba68c8',
        'new-background-color': '#4D52a0',
        'new-background-secondary-color': '#F0F4FC',
        'nb-home-text': '#ACAFBC',
        'plan-detail-unselected': '#AEACAC',
        'nb-home-card-border': '#F1F1F1',
        'card-action-color': '#209586',
        'assist-plans-bg': '#EAE9F5',
        'assist-card-bg': '#FFF7F8',
        'chip-border-color': '#e3e0e0',
        'bluish-grey': '#334A5C',
        'hs-green': '#DBF2ED',
        'res-yellow': '#FCF0B9',
        'nb-grey': '#787676',
        'nb-nav-highlight': '#fa3a57',
        'nb-green': '#E7F2F1',
        'nb-teel': '#009588E6',
        'btn-green': '#007A6F',
        'plan-box-border': '#B8D3CD',
        'basic-header': '#47484a',
        'basic-plan-color': '#538dd1',
        'moneyback-plan-color': '#f25f5c',
        'last-search-border': '#ddd',
        'payment-type-filter': '#159386',
        'exit-inter-border': '#dbdbdb',
        tnc: '#AAAAAA',
        'bg-valid': '#7BA0A0',
        'back-container': '#F0F6F6',
        'background-color-light-orange': '#FEEBD2',
        'paining-card-block': '#F5FBFF',
        'rent-card-label': '#ad7528',
        'sale-card-label': '#386598',
        'light-green': '#f0f5f4',
        'light-background-red': '#ffdee0',
        'dislike-red': '#d7565b',
        'detail-card-header': '#333',
        'bg-faild': '#F93753',
        'pyp-explore-clr': '#06A88B',
        'dark-secondary': '#eaeaea',
        'pyp-text-clr': '#b3b3b3',
        'pyp-other-text-clr': '#7C7C7C',
        'popular-card': '#E9ECF8',
        'loader-bg-color': '#EDEDED',
        'loader-fg-color': '#D3D3D3',
        'modal-header-grey': '#9898AC',
        'loan-grey': '#334A5C',
        'border-grey': '#CCE6E1',
        'modal-title-bg-color': '#EEF5F1',
        'nb-promise-bg-color': '#F3F0FA',
        'ls-theme-dark': '#442c7f',
        'ls-theme-light': '#684ea9',
        'blue-light-background': '#E2EAF8',
        'blue-light-background-ls': '#3E4280',
        'pnm-theme-primary': '#5D4990',
        'pnm-theme-secondary': '#9095B2',
      },
      maxWidth: {
        'screen': '100vw',
        'screen-75': '75vw'
      },
      width: {
        '90p': '90px',
        'fit': 'fit-content',
        '100p': '100px',
        '280p': '280px',
        '187p': '187px',
        '332p': '332px',
        '300p': '300px',
        0: '0px',
        px: '1px',
        0.5: '0.125rem', // 2px
        1: '0.25rem', // 4px
        1.5: '0.375rem', // 6px
        2: '0.5rem', // 8px
        2.5: '0.625rem', // 10px
        3: '0.75rem', // 12px
        3.5: '0.875rem', // 14px
        4: '1rem', // 16px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        7: '1.75rem', // 28px
        8: '2rem', // 32px
        9: '2.25rem', // 36px
        10: '2.5rem', // 40px
        11: '2.75rem', // 44px
        12: '3rem', // 48px
        14: '3.5rem', // 56px
        16: '4rem', // 64px
        20: '5rem', // 80px
        24: '6rem', // 96px
        28: '7rem', // 112px
        32: '8rem', // 128px
        36: '9rem', // 144px
        40: '10rem', // 160px
        44: '11rem', // 176px
        48: '12rem', // 192px
        52: '13rem', // 208px
        56: '14rem', // 224px
        60: '15rem', // 240px
        64: '16rem', // 256px
        72: '18rem', // 288px
        80: '20rem', // 320px
        96: '24rem', // 384px
        auto: 'auto',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        full: '100%',
        screen: '100vw',
        svw: '100svw',
        lvw: '100lvw',
        dvw: '100dvw',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
        w33: '8rem', // 128px
        w8: '15px',
        vw: '32vw',

      },
      height: {
        '40p': '40px',
        '280p': '280px',
        '96p': '96px',
        '332p': '332px',
        '300p': '300px',
        0: '0px',
        px: '1px',
        0.5: '0.125rem', // 2px
        1: '0.25rem', // 4px
        1.5: '0.375rem', // 6px
        2: '0.5rem', // 8px
        2.5: '0.625rem', // 10px
        3: '0.75rem', // 12px
        3.5: '0.875rem', // 14px
        4: '1rem', // 16px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        7: '1.75rem', // 28px
        8: '2rem', // 32px
        9: '2.25rem', // 36px
        10: '2.5rem', // 40px
        11: '2.75rem', // 44px
        12: '3rem', // 48px
        14: '3.5rem', // 56px
        16: '4rem', // 64px
        20: '5rem', // 80px
        24: '6rem', // 96px
        28: '7rem', // 112px
        32: '8rem', // 128px
        36: '9rem', // 144px
        40: '10rem', // 160px
        44: '11rem', // 176px
        48: '12rem', // 192px
        52: '13rem', // 208px
        56: '14rem', // 224px
        60: '15rem', // 240px
        64: '16rem', // 256px
        72: '18rem', // 288px
        80: '20rem', // 320px
        96: '24rem', // 384px
        auto: 'auto',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        full: '100%',
        screen: '100vh',
        svh: '100svh',
        lvh: '100lvh',
        dvh: '100dvh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',

      },
      spacing: {
        '31p': '310px',
        '12.4p': '124px',
        '15.2p': '152px',
        '28p': '280px',
        '49vh': '49vh',
        '51vh': '51vh',
        '5.7p': '57px',
        '12vw': '12vw',
        '4.5re': '4.5rem',
        '0.1p-': '-1px',
        '3.6p': '36px',
        '0.1pe-': '-1%',
        '0.1p': '1px',
        '0.2p-': '-2px',
        '0.8p-': '-8px',
        '0.2p': '2px',
        '0.3p': '3px',
        '0.3p-': '-3px',
        '0.4p': '4px',
        '0.4pe-': '-4%',
        '0.4p-': '-4px',
        '0.5p': '5px',
        '0.5pe': '5%',
        '0.6': '6px',
        '0.6p': '6px',
        '8vh': '8vh',
        '0.6vh': '6vh',
        '6p-': '-60px',
        '0.7p': '7px',
        '0.7p-': '-7px',
        '0.7pe': '7%',
        '0.8p': '8px',
        '0.9p': '9px',
        '1p': '10px',
        '1.1p': '11px',
        '1.2p': '12px',
        '1.3p': '13px',
        '1.3p-': '-13px',
        '1.4p': '14px',
        '1.4p-': '-14px',
        '1.5p': '15px',
        '1.5p-': '-15px',
        '1.6p': '16px',
        '1.7p': '17px',
        '1.7p-': '-17px',
        '1.8': '18px',
        '12pe': '12%',
        '1.8p-': '-18px',
        '1.8pe-': '-18%',
        '2p': '20px',
        '20pe': '20%',
        '2.1p': '21px',
        '15vh-': '-15vh',
        '17vh': '17vh',
        '2.1p-': '-21px',
        '2.2p': '22px',
        '2.3p': '23px',
        '2.4p': '24px',
        '2.5p': '25px',
        '2.6': '26px',
        '2.7p': '27px',
        '2.8p': '28px',
        '2.9p': '29px',
        '2p-': '-20px',
        '3p': '30px',
        '3p-': '-30px',
        '3pe': '3%',
        '6pe': '6%',
        '3.2p': '32px',
        '3.4p': '34px',
        '3.5p': '35px',
        '3.9p': '39px',
        '4p': '40px',
        '4.1p': '41px',
        '4pe': '4%',
        '4.2p': '42px',
        '4.5p': '45px',
        '4.6p': '46px',
        '4.8p': '48px',
        '5p': '50px',
        '5pe': '5%',
        '5.2p': '52px',
        '5.4p': '54px',
        '5.5p': '55px',
        '5.8p': '58px',
        '6p': '60px',
        '6.1p': '61px',
        '6.5p': '65px',
        '6.6p': '66px',
        '7pe': '7%',
        '7p': '70px',
        '7.2p': '72px',
        '7.5p': '75px',
        '7.2p-': '-72px',
        '7.8p-': '-78px',
        '8p': '80px',
        '9p': '90px',
        '9.4p': '94px',
        '10p': '100px',
        '10.2p': '102px',
        '11p': '110px',
        '11.2p': '112px',
        '11.7p': '117px',
        '11.9p': '119px',
        '12p': '120px',
        '12.2p': '122px',
        '13.6p': '136px',
        '14p': '140px',
        '16p': '160px',
        '15p': '150px',
        '18p': '180px',
        '17p': '170px',
        '17.7p': '177px',
        '21p': '210px',
        '15pe': '15%',
        '30pe': '30%',
        '70pe': '70%',
        '20p': '200px',
        '20.8p': '208px',
        '22.2p': '222px',
        '23.5p': '235px',
        '23p': '230px',
        '24p': '240px',
        '25p': '250px',
        '26p': '260px',
        '27p': '270px',
        '30p': '300px',
        '35p': '350px',
        '28.5p': '285px',
        '40p': '400px',
        '42.5p': '425px',
        '44.5p': '445px',
        '45p': '450px',
        '50p': '500px',
        '57p': '570px',
        '60p': '600px',
        '10pe': '10%',
        '25pe': '25%',
        '28pe': '28%',
        '33pe': '33%',
        '33.3pe': '33.33%',
        '35pe': '35%',
        '40pe': '40%',
        '45pe': '45%',
        '49pe': '49%',
        '60pe': '60%',
        '50pe': '50%',
        '56pe': '56%',
        '65pe': '65%',
        '66pe': '66%',
        '66.6pe': '66.66666667%',
        '67pe': '67%',
        '69pe': '69%',
        '74pe': '74%',
        '80pe': '80%',
        '85pe': '85%',
        '90pe': '90%',
        '95pe': '95%',
        '100pe': '100%',
        '120vh': '120vh',
        '8.8p': '88px',
        '55pe': '55%',
        '10.8p': '108px',
        '10p-': '-10px',
        '30p-': '-30px',
        '5p-': '-5px',
        '0.5pe-': '-5%',
        '0.8pe-': '-8%',
        '0.8pe': '8%',
        '17.8p': '178px',
        '20vw': '20vw',
        '28vw': '28vw',
        '30vw': '30vw',
        '85vw': '85vw',
        '90vw': '90vw',
        '45vw': '45vw',
        '50vw': '50vw',
        '45vh': '45vh',
        '46vh': '46vh',
        '50vh': '50vh',
        '1rm': '1rem',
        '1.2rm': '1.2rem',
        '1.5rm': '1.5rem',
        '2rm-': '-2rem',
        '15px': '15px',
        '8.3p': '83px',
        '1vh': '1vh',
        '55p': '550px',
        '2pe': '2%',
        '42pe': '42%',
        '6.4p': '64px',
        '176p': '176px',
        '34.5p': '345px',
        '33.4pe': '33.4%',
        '14.1p': '141px',
        '8.5p': '85px',
        '6.2pe': '62%',
        '0.1pe': '1%',
        '80vh': '80vh',
        '92pe': '92%',
      },
      borderWidth: {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      borderRadius: {
        '2': '2px',
        '4': '4px',
        '5': '5px',
        '0.8p': '8px',
        '10': '10px',
        '15': '15px',
        '20': '20px',
        '100': '100px',
        '12': '12px',
        '50': '50%',
        '5pe': '50%',
        leftCorner: '16px 0 0 0',
        rightCorner: '0 16px 0 0',
      },
      boxShadow: {
        CouponShadow1: '0 3px 6px #00000029',
        CouponShadow2: '1px 1px #00000029 '
      },
      backgroundSize: {
        'BetterLuck': '200px 150px',
      },
      fontSize: {
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '15': '15px',
        '16': '16px',
        '17': '17px',
        '18': '18px',
        '20': '20px',
        '22': '22px',
        '24': '24px',
        '26': '26px',
        '28': '28px',
        '30': '30px',
        '32': '32px',
        '34': '34px',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      lineHeight: {
        'extra-loose': '2.5',
        '34p': '34px'
      },
      zIndex: {
        '1': '1',
      },
      keyframes: {
        ripple: {
          '0%': {
            opacity: '0.90',
          },
          '75%': {
            opacity: '0.95',
          },
          '100%': {
            opacity: '1',
          },
        },
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
