function fetchIBM(text) {
  return fetch('https://donations2.herokuapp.com/watson/'+text)
}

export { fetchIBM };
