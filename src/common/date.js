/** 日期工具 **/

/**
 * @name 格式倒计时
 * @param {string} [time=null] 日期：YYYY-MM-DD HH:mm:ss
 */
function formatCountdown (time = null) {
  const nowTime = +new Date();
  const nextTime = +new Date(time);
  const diff = nextTime - nowTime;
  if (diff >= 0) {
    const day = Math.floor(diff / 1000 / 3600 / 24);
    const hour = Math.floor(diff / 1000 / 60 / 60 % 24);
    const min = Math.floor(diff / 1000 / 60 % 60);
    const sec = Math.floor(diff / 1000 % 60);
    return `${day ? day + "天" : ""}${hour ? hour + "时" : ""}${min ? min + "分" : ""}${sec ? sec + "秒" : ""}`;
  } else {
    return "时间已到";
  }
}

/**
 * @name 格式时间差
 * @param {string} [time=null] 日期：YYYY-MM-DD HH:mm:ss
 */
function formatDiffTime (time = null) {
  const nowTime = +new Date();
  const tgtTime = +new Date(time);
  const diff = nowTime - tgtTime;
  const slot = diff >= 0 ? "前" : "后";
  const absDiff = Math.abs(diff);
  const monNum = 1461 / 48;
  const yearNum = 1461 / 4;
  const min = 1000 * 60;
  const hour = min * 60;
  const day = hour * 24;
  const mon = day * monNum;
  const year = day * yearNum;
  const minDiff = absDiff / min;
  const hourDiff = absDiff / hour;
  const dayDiff = absDiff / day;
  const monDiff = absDiff / mon;
  const yearDiff = absDiff / year;
  if (yearDiff >= 1 || monDiff >= 12) {
    return tgtTime.format("YYYY-MM-DD HH:mm:ss");
  } else if (monDiff >= 1 && monDiff < 12) {
    return `${parseInt(monDiff)}个月${slot}`;
  } else if (dayDiff >= 1 && dayDiff < monNum) {
    return `${parseInt(dayDiff)}天${slot}`;
  } else if (hourDiff >= 1 && hourDiff < 24) {
    return `${parseInt(hourDiff)}小时${slot}`;
  } else if (minDiff >= 1 && minDiff < 60) {
    return `${parseInt(minDiff)}分钟${slot}`;
  } else {
    return diff >= 0 ? "刚刚" : "准备";
  }
}

function dateToText (date) {
  if (date) {
    const diffTime = dayjs().valueOf() - dayjs(date).valueOf();
    const minutes = 60000;
    const hours = 3600000;
    const day = 86400000;
    const month = 2592000000;
    const year = 31104000000;
    if (diffTime < minutes) {
      return '刚刚';
    } else if (diffTime < hours) {
      return `${(diffTime / minutes).toFixed(0)}分钟前`;
    } else if (diffTime < day) {
      return `${(diffTime / hours).toFixed(0)}小时前`;
    } else if (diffTime < month) {
      return `${(diffTime / day).toFixed(0)}天前`;
    } else if (diffTime < year) {
      return `${(diffTime / month).toFixed(0)}月前`;
    }
    return `${(diffTime / year).toFixed(0)}年前`;
  }
  return '';
}

function formatRemainingTime (datetime, _now) {
  const now = _now || dayjs();
  const padTime = timeStr => {
    timeStr = timeStr.toString();
    return timeStr.length > 1 ? timeStr : `0${timeStr}`;
  };

  const hours = padTime(datetime.diff(now, 'H'));
  const mins = padTime(datetime.diff(now, 'm') % 60);
  const secs = padTime(datetime.diff(now, 'S') % 60);

  return `${hours == '00' ? '' : `${hours}:`}${mins}:${secs}`;
}

function formatDays (days = 0) {
  const year = parseInt(days / 365);
  const month = parseInt((days % 365) / 30);
  const date = (days % 365) % 30;
  return `${year > 0 ? year + '年' : ''}${month > 0 ? month + '个月' : ''}${date > 0 ? date + '天' : ''
    }`;
}

export {
  dateToText,
  formatCountdown,
  formatDays,
  formatDiffTime,
  formatRemainingTime
};