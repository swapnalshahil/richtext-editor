export const mergeTailwindClassNames = (classNames1: string, classNames2: string): string => {
    const classArray1 = classNames1.split(' ');
    const classArray2 = classNames2.split(' ');
    const mergedClassNames: string[] = [];
  
    // Add class names from classNames1 that are not already present and don't have a corresponding prefix in classNames2
    for (const className of classArray1) {
      const classPrefix = className.split('-')[0];
      if (!mergedClassNames.includes(className) && !classArray2.some((name) => name.startsWith(classPrefix))) {
        mergedClassNames.push(className);
      }
    }
  
    // Add class names from classNames2 that are not already present
    for (const className of classArray2) {
      if (!mergedClassNames.includes(className)) {
        mergedClassNames.push(className);
      }
    }
  
    // Join the merged class names array into a string
    const mergedClassNamesString = mergedClassNames.join(' ');
  
    return mergedClassNamesString;
  };
  
  export function addingCommasToNumber(x: number | string): string {
    if (!x) {
      return '0';
    }
  
    let isNegativeNumber = false;
    x = x.toString();
  
    if (x.charAt(0) === '-') {
      x = x.substr(1);
      isNegativeNumber = true;
    }
  
    let afterPoint = '';
    if (x.indexOf('.') > 0) {
      afterPoint = x.substring(x.indexOf('.'), x.length);
    }
  
    x = Math.floor(Number(x)).toString();
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
  
    if (otherNumbers !== '') {
      lastThree = `,${lastThree}`;
    }
  
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
  
    if (isNegativeNumber) {
      return `-${res}`;
    }
  
    return `${res}`;
  }
  