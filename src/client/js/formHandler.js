// HANDLE SUBMIT

async function handleSubmit(event) {
  event.preventDefault();

  const input = document.getElementById('name').value;

  if (input) {
    postData('http://localhost:8080/test', {
      text: input
    }).then(
      setTimeout(function() {
        updateUI();
      }, 1000)
    );
  }
  console.log('::: Form Submitted :::');
}

// POST DATA
const postData = async (url = '', data = {}) => {
  const input = document.getElementById('name').value;
  console.log('input', input);

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    console.log('post res', res);

    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// // UPDATA UI
const updateUI = async () => {
  console.log('updateUI');
  const req = await fetch('http://localhost:8080/all', {
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify()
  });
  try {
    const senti = await req.json();
    console.log('senti', senti);

    document.getElementById('results').innerHTML = '<h1>Sentiment</h1>';
  } catch (error) {
    console.log('error', error);
  }
};

export { handleSubmit };
