export function getCookie(name) {
  const data = document.cookie.split(';');
  const findResult = data.find((item) => item.trim().startsWith(`${name}=`));
  if (!findResult) {
    return;
  }
  const value = findResult.split('=');
  if (value < 2) {
    return;
  }
  return value[1];
}

export function setCookie(cName, cValue) {
  const existed = getCookie(cName);
  if (existed) {
    deleteCookie(cName);
  }
  document.cookie = cName + '=' + cValue + '; path=/';
}

export function deleteCookie(name) {
  document.cookie = name + '=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
