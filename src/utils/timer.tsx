export const getTime = (difference:number, className:string) => {
  let interval = setInterval(function() {
    let distance = difference - 1000;
    difference = distance;
    // @ts-ignore
    window['timer'] = {
    // @ts-ignore
      ...window['timer'],
      [className]: difference
    }
    // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let dateString = '';
    // days && (dateString += days + "d ")
    hours && (dateString += hours + "h ");
    minutes && (dateString += minutes + "m ");
    seconds && (dateString += seconds + "s ");
    const dom = document.getElementById(className)
    dom?.innerHTML?.length >= 0 ? dom.innerHTML = dateString : null;
    if (distance < 0) {
      clearInterval(interval);
      dom?.innerHTML?.length >= 0  ? dom.innerHTML = '--' : null;
    }
  }, 1000);
  return interval;
}

export function getDifference(startDate:Date, endDate:Date) {
  let startTime = new Date(startDate).getTime();
  let endTime = new Date(endDate).getTime();
  return endTime - startTime;
}