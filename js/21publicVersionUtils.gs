const trbArrayToHashMap = (rawTrbArray) => {

  trbArray = [].concat(...rawTrbArray).map(e => (!e || e === '') ? 'Kategorisoimaton' : e ); 
  Logger.log('TRB column: ' + trbArray);
 
  let previousVal = trbArray[0].toString();
  Logger.log(previousVal);
  let trbHashMap = {
    [previousVal]: { 
      'start': 2,
    },
  };
  let i = 0
  for (; i < trbArray.length; i++) {
    currentVal = trbArray[i].toString();
    if (currentVal !== previousVal) {
      trbHashMap[previousVal]['end'] = i + 1;
      trbHashMap[previousVal]['count'] = trbHashMap[previousVal]['end'] - trbHashMap[previousVal]['start'] + 1
      trbHashMap[currentVal] = {
        'start': i + 2,
      };
      previousVal = currentVal;
    }
  }
  trbHashMap[previousVal]['end'] = i + 1;
  trbHashMap[previousVal]['count'] = trbHashMap[previousVal]['end'] - trbHashMap[previousVal]['start'] + 1
  Logger.log('trbHashMap' + JSON.stringify(trbHashMap));  

  return trbHashMap;
}
