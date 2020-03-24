function textLength(text) {
  if (text.length > 300) {
    alert('The field cannot contain more than 300 characters');
    return false;
  } else {
    return true;
  }
}

export { textLength };
