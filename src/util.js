const getUrlQueries = () => {
  const queryStr = window.location.search.slice(1);  // 文頭?を除外
      let queries = {};

  // クエリがない場合は空のオブジェクトを返す
  if (!queryStr) {
    return queries;
  }

  // クエリ文字列を & で分割して処理
  queryStr.split('&').forEach(function(queryStr) {
    // = で分割してkey,valueをオブジェクトに格納
    var queryArr = queryStr.split('=');
    queries[queryArr[0]] = queryArr[1];
  });

  return queries;
}

const randomNums = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const zeroPadding = (num, len) => {
	return ( Array(len).join('0') + num ).slice( -len );
}

export default { getUrlQueries, randomNums, zeroPadding }