import { css } from 'styled-components';

export const progressTheme = {
    global: {
      font: {
        family: 'Roboto, sans-serif',
        size: '14px',
      },
      colors: {
        brand: '#D0011B',
        focus: '#D0011B',
        active: '#F3DE8A',
        lightBlack: '#343434',
        lighterBlack: 'rgba(52, 52, 52, 0.5)',
        lightGray: '#F0F2F5',
        border: 'transparent'
      },
      hover: {
        color: '#000000',
      },
      opacity: {
        medium: 1
      },
    },
    button: {
      border: {
        radius: '4px',
        color: 'transparent'
      }
    },
    layer: {
      background: 'rgba(0,0,0,0.6)'
    },
    tab: {
      active: {      
        color: 'brand'
      },
      background: 'white',
      color: 'black',
      hover: { 
        color: 'lighterBlack'
      },
      border: {
        active: {
          color: 'brand'
        },
        hover: {
          color: 'active'
        },
        size: '2px',
        color: 'transparent',
        side: 'bottom'
      },
      margin: undefined,
      pad: {
        bottom: '5px',
        horizontal: '25px'
      },
      extend: ({ theme }) => css`
        white-space: nowrap;
      `
    },
    tabs: {
      background: 'white',
      header: {
        background: 'white',
        extend: ({ theme }) => css`
          border-bottom: 1px solid lightGray;
          padding: 10px 5px 0px;
          flex-wrap: nowrap;
          overflow-x: scroll;
        `
      },
      gap: 'medium'
    },
    select: {
      icons: {
        color: '#D0011B'
      }
    },
    
  }