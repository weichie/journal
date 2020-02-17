import Vue from 'vue';

Vue.filter('capitalize', val => {
  return val.toUpperCase()
});

Vue.filter('dayMonth', val => {
  const date = new Date(val);
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return (dt + '/' + month);
});

Vue.filter('dateFormat', val => {
  const date = new Date(val);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return (dt + '/'+ month + '/' + year);
});